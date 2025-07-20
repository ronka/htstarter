import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: "jpeg" | "png" | "webp";
}

async function compressImage(
  buffer: Buffer,
  originalFormat: string,
  options: CompressionOptions = {}
): Promise<{
  buffer: Buffer;
  format: string;
  originalSize: number;
  compressedSize: number;
}> {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 80,
    format = "webp",
  } = options;

  const originalSize = buffer.length;

  let sharpInstance = sharp(buffer);

  // Get image metadata
  const metadata = await sharpInstance.metadata();

  // Resize if image is larger than max dimensions
  if (metadata.width && metadata.height) {
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }
  }

  // Apply format-specific compression
  let compressedBuffer: Buffer;
  let outputFormat = format;

  switch (format) {
    case "webp":
      compressedBuffer = await sharpInstance
        .webp({ quality, effort: 6 })
        .toBuffer();
      break;
    case "jpeg":
      compressedBuffer = await sharpInstance
        .jpeg({ quality, progressive: true })
        .toBuffer();
      outputFormat = "jpeg";
      break;
    case "png":
      compressedBuffer = await sharpInstance
        .png({ quality, progressive: true, compressionLevel: 9 })
        .toBuffer();
      break;
    default:
      // Default to WebP for best compression
      compressedBuffer = await sharpInstance
        .webp({ quality, effort: 6 })
        .toBuffer();
      outputFormat = "webp";
  }

  return {
    buffer: compressedBuffer,
    format: outputFormat,
    originalSize,
    compressedSize: compressedBuffer.length,
  };
}

function getCompressionOptions(
  fileSize: number,
  mimeType: string
): CompressionOptions {
  // Adjust compression based on file size and type
  let quality = 80;
  let maxWidth = 800;
  let maxHeight = 800;

  // More aggressive compression for larger files
  if (fileSize > 5 * 1024 * 1024) {
    // > 5MB
    quality = 60;
    maxWidth = 1600;
    maxHeight = 900;
  } else if (fileSize > 2 * 1024 * 1024) {
    // > 2MB
    quality = 70;
    maxWidth = 1800;
    maxHeight = 1000;
  }

  // Determine output format based on input
  let format: "jpeg" | "png" | "webp" = "webp";
  if (mimeType === "image/png" && fileSize < 1024 * 1024) {
    // Keep PNG for small images (might be logos with transparency)
    format = "png";
  } else if (mimeType === "image/jpeg") {
    format = "jpeg";
  }

  return { maxWidth, maxHeight, quality, format };
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");
    const compress = searchParams.get("compress") !== "false"; // Default to true

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    // Convert request body to buffer
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get original file info
    const originalSize = buffer.length;
    let processedBuffer = buffer;
    let compressionInfo = null;

    // Compress image if requested and it's an image file
    if (compress) {
      try {
        // Detect if it's an image by trying to process it with Sharp
        const metadata = await sharp(buffer).metadata();
        const mimeType = `image/${metadata.format}`;

        const compressionOptions = getCompressionOptions(
          originalSize,
          mimeType
        );
        const compressed = await compressImage(
          buffer,
          metadata.format || "jpeg",
          compressionOptions
        );

        processedBuffer = compressed.buffer;
        compressionInfo = {
          originalSize: compressed.originalSize,
          compressedSize: compressed.compressedSize,
          compressionRatio: (
            ((compressed.originalSize - compressed.compressedSize) /
              compressed.originalSize) *
            100
          ).toFixed(1),
          format: compressed.format,
        };

        // Update filename extension if format changed
        const originalExt = filename.split(".").pop()?.toLowerCase();
        if (compressed.format !== originalExt) {
          const nameWithoutExt = filename.substring(
            0,
            filename.lastIndexOf(".")
          );
          const newFilename = `${nameWithoutExt}.${compressed.format}`;

          // Update the filename for blob storage
          const blob = await put(newFilename, processedBuffer, {
            access: "public",
            addRandomSuffix: true,
          });

          return NextResponse.json({
            ...blob,
            compression: compressionInfo,
          });
        }
      } catch (compressionError) {
        console.warn(
          "Image compression failed, uploading original:",
          compressionError
        );
        // If compression fails, continue with original buffer
      }
    }

    // Upload to Vercel Blob
    const blob = await put(filename, processedBuffer, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      ...blob,
      compression: compressionInfo,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
