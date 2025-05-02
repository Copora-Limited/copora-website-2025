"use client";

import { useRef, useEffect } from "react";

interface GradientDividerProps {
  height?: string;
}

export default function GradientDivider({
  height = "h-2",
}: GradientDividerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  return (
    <div className={`w-full ${height} relative overflow-hidden`}>
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/Gradient.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
