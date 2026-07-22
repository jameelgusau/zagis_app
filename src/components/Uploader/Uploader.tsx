"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { Image as RxImage } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface AvatarUploaderProps {
  value?: File | null;
  imageUrl?: string | null;
  onChange?: (file: File | null) => void;
  size?: number;
  className?: string;
}

export default function AvatarUploader({
  value = null,
  imageUrl = null,
  onChange,
  size = 160,
  className = "",
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    if (!value && imageUrl) {
      return imageUrl;
    }
    return null;
  }, [value, imageUrl]);

  // cleanup object URLs
  useMemo(() => {
    if (!(value instanceof File)) return;
    const url = preview;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [preview, value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange?.(file);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };
  return (
    <div
      onClick={() => inputRef.current?.click()}
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center
        border border-dashed border-primary
        rounded-full cursor-pointer ${className}`}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />

      {preview ? (
        <>
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <Image
              src={preview}
              alt="Avatar"
              fill
              loading="eager"
              className="object-cover"
              unoptimized
            />
          </div>

          <Button
            type="button"
            onClick={handleDelete}
            className="absolute bottom-0 right-0 z-10
                       bg-white hover:bg-amber-50
                       text-gray-600 rounded-full shadow-md"
          >
            <X size={5} />
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <RxImage className="text-gray-400" size={30} />
          <p className="text-[0.69rem] text-gray">
            <span className="text-secondary-light">Upload</span> or drag & drop
          </p>
        </div>
      )}
    </div>
  );
}