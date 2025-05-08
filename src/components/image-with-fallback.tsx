"use client";

import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string;
  debug?: boolean;
};

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/images/placeholder.png?text=Image+Not+Found",
  debug = false,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    setImgSrc(typeof src === "string" ? src : null);
  }, [src]);

  // Handle cases where src might be an object or undefined
  const sourceSrc = typeof src === "string" ? src : fallbackSrc;

  if (debug) {
    console.log(`[ImageWithFallback] Loading image:`, {
      src: sourceSrc,
      alt,
      fallbackSrc,
    });
  }

  return (
    <div
      className={`relative ${isLoading ? "bg-gray-200 animate-pulse" : ""} ${
        hasError ? "bg-red-50" : ""
      }`}
    >
      {imgSrc !== null && (
        <Image
          {...rest}
          src={imgSrc || fallbackSrc}
          alt={alt}
          onLoadingComplete={() => {
            setIsLoading(false);
            if (debug)
              console.log(
                `[ImageWithFallback] Image loaded successfully:`,
                imgSrc
              );
          }}
          onError={() => {
            if (debug)
              console.warn(`[ImageWithFallback] Error loading image:`, imgSrc);
            setImgSrc(fallbackSrc);
            setHasError(true);
            setIsLoading(false);
          }}
          priority={rest.priority}
          loading={rest.loading || "lazy"}
          sizes={
            rest.sizes ||
            "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        />
      )}

      {/* Show a visual indicator if image failed to load and we're using fallback */}
      {hasError && debug && (
        <div className="absolute bottom-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5">
          Error
        </div>
      )}
    </div>
  );
}
