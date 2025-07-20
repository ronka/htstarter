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
  maxFiles = 1, // Changed default to 1 for single image
  maxSize = 10,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  initialImages = [],
}: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    initialImages.length > 0 ? initialImages[0] : null
  );
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      throw new Error(errorData.error || "העלאה נכשלה");
    }

    const blob = await response.json();
    return {
      url: blob.url,
      filename: file.name,
      size: file.size,
    };
  };

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // Validate file
      if (!acceptedTypes.includes(file.type)) {
        setError(`סוג הקובץ ${file.type} אינו נתמך`);
        return;
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(`גודל הקובץ חייב להיות פחות מ-${maxSize}MB`);
        return;
      }

      setUploading(true);
      setUploadProgress(0);

      try {
        const result = await uploadFile(file);
        setUploadProgress(100);
        setUploadedImage(result);
        onUpload?.([result]); // Pass as array to maintain compatibility
      } catch (err) {
        setError(err instanceof Error ? err.message : "העלאה נכשלה");
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [onUpload, acceptedTypes, maxSize]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
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
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const removeImage = () => {
    setUploadedImage(null);
    onUpload?.([]); // Pass empty array to maintain compatibility
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 בתים";
    const k = 1024;
    const sizes = ["בתים", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
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
                <p className="text-lg font-medium">מעלה תמונה...</p>
                <Progress
                  value={uploadProgress}
                  className="w-full max-w-xs mx-auto"
                />
                <p className="text-sm text-muted-foreground">
                  {Math.round(uploadProgress)}% הושלם
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    גרור ושחרר תמונה כאן, או לחץ לבחירה
                  </p>
                  <p className="text-sm text-muted-foreground">
                    תומך ב-JPEG, PNG, WebP ו-GIF עד {maxSize}MB
                  </p>
                </div>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!!uploadedImage}
                  variant="outline"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  בחר תמונה
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

      {/* Uploaded Image */}
      {uploadedImage && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">התמונה שהועלתה</h3>
          <Card className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={uploadedImage.url || "/placeholder.svg"}
                alt={uploadedImage.filename}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-3">
              <p
                className="text-sm font-medium truncate"
                title={uploadedImage.filename}
              >
                {uploadedImage.filename}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(uploadedImage.size)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
