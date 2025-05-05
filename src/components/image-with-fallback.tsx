"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${isLoading ? "bg-gray-200 animate-pulse" : ""}`}>
      <Image
        {...rest}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc);
          setIsLoading(false);
        }}
        priority={rest.priority}
        loading={rest.loading || "lazy"}
        sizes={
          rest.sizes ||
          "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
      />
    </div>
  );
}
