"use client";

import type React from "react";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UploadedImage {
  url: string;
  filename: string;
  size: number;
}

interface ImageUploaderProps {
  onUpload?: (images: UploadedImage[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  initialImages?: UploadedImage[];
}

export function ImageUploader({
  onUpload,
  maxFiles = 5,
  maxSize = 10,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  initialImages = [],
}: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImages, setUploadedImages] =
    useState<UploadedImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImages.length > 0 && onUpload) {
      onUpload(initialImages);
    }
  }, [initialImages, onUpload]);

  const uploadFile = async (file: File): Promise<UploadedImage> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `/api/upload?filename=${encodeURIComponent(file.name)}`,
      {
        method: "POST",
        body: file,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Upload failed");
    }

    const blob = await response.json();
    return {
      url: blob.url,
      filename: file.name,
      size: file.size,
    };
  };

  const handleFiles = useCallback(
    async (files: FileList) => {
      setError(null);
      const fileArray = Array.from(files);

      if (uploadedImages.length + fileArray.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Validate all files first
      const validateFile = (file: File): string | null => {
        if (!acceptedTypes.includes(file.type)) {
          return `File type ${file.type} is not supported`;
        }
        if (file.size > maxSize * 1024 * 1024) {
          return `File size must be less than ${maxSize}MB`;
        }
        return null;
      };

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
      }

      setUploading(true);
      setUploadProgress(0);

      try {
        const uploadPromises = fileArray.map(async (file, index) => {
          const result = await uploadFile(file);
          setUploadProgress(((index + 1) / fileArray.length) * 100);
          return result;
        });

        const results = await Promise.all(uploadPromises);
        const newImages = [...uploadedImages, ...results];
        setUploadedImages(newImages);
        onUpload?.(newImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [uploadedImages, maxFiles, onUpload, acceptedTypes, maxSize]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onUpload?.(newImages);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card
        className={`transition-colors ${
          isDragOver ? "border-primary bg-primary/5" : "border-dashed"
        }`}
      >
        <CardContent className="p-8">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              {uploading ? (
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
              ) : (
                <Upload className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            {uploading ? (
              <div className="space-y-2">
                <p className="text-lg font-medium">Uploading images...</p>
                <Progress
                  value={uploadProgress}
                  className="w-full max-w-xs mx-auto"
                />
                <p className="text-sm text-muted-foreground">
                  {Math.round(uploadProgress)}% complete
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    Drag and drop images here, or click to select
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports JPEG, PNG, WebP, and GIF up to {maxSize}MB each
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maximum {maxFiles} files • {uploadedImages.length}/
                    {maxFiles} uploaded
                  </p>
                </div>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadedImages.length >= maxFiles}
                  variant="outline"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Select Images
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uploaded Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.filename}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <p
                    className="text-sm font-medium truncate"
                    title={image.filename}
                  >
                    {image.filename}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(image.size)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(",")}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
