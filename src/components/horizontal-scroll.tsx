"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export interface ScrollItem {
  stat: string;
  description: string;
}

interface HorizontalScrollProps {
  data: ScrollItem[];
}

const HorizontalScroll = ({ data }: HorizontalScrollProps) => {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = async () => {
    if (!isMobile) {
      const scrollDistance = -(
        data.length * 310 -
        Math.min(window.innerWidth * 0.8, 1200)
      );

      await controls.start({
        x: scrollDistance,
        transition: {
          duration: 5,
          ease: [0.33, 1, 0.68, 1],
        },
      });
    }
  };

  const handleMouseLeave = async () => {
    if (!isMobile) {
      await controls.start({
        x: 0,
        transition: {
          duration: 4,
          ease: [0.33, 1, 0.68, 1],
        },
      });
    }
  };

  return (
    <div
      className="w-full overflow-hidden py-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex gap-6 md:gap-10 w-full scrollbar-hide"
        animate={controls}
        drag={isMobile ? "x" : false}
        dragConstraints={{
          left: isMobile ? -(data.length * 310 - window.innerWidth + 32) : 0,
          right: 0,
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 border-l border-white pl-4 md:pl-10 pr-4 md:pr-8 min-w-[260px] md:w-[300px]"
          >
            <h2
              className="font-bold text-4xl md:text-6xl mb-2"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              {item.stat}
            </h2>
            <p
              className="text-sm md:text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalScroll;
