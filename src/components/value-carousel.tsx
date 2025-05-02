/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface CarouselSlide {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  label: string;
  color: string;
}

interface ValueCarouselProps {
  slides: CarouselSlide[];
  heading?: string;
  initialSlide?: number;
  trianglePosition?: "left" | "right";
}

export default function ValueCarousel({
  slides,
  heading = "We believe in a collaborative journey that drives growth and success for all.",
  initialSlide = 2, // Start with the middle slide by default
  trianglePosition = "left",
}: ValueCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 600); // Match this with animation duration
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 600); // Match this with animation duration
  };

  const handleSlideClick = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 600); // Match this with animation duration
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-between items-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0a2540] max-w-2xl"
            style={{ fontFamily: "var(--font-bold)" }}
          >
            {heading}
          </h2>

          {/* Navigation arrows - only visible on desktop */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={handlePrevious}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel - Desktop */}
        <div className="hidden md:flex h-[400px] relative justify-center gap-3">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={slide.id}
                className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-500 ${
                  isActive ? "flex-grow" : "flex-shrink-0"
                }`}
                style={{
                  width: isActive ? "60%" : "8%",
                  height: "100%",
                  zIndex: isActive ? 10 : 5,
                }}
                onClick={() => handleSlideClick(index)}
                initial={false}
                animate={{ width: isActive ? "60%" : "8%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Background image with overlay */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={isActive}
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-40"
                    style={{
                      background: isActive
                        ? "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))"
                        : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7))`,
                    }}
                  ></div>
                </div>

                {/* Number indicator */}
                <div className="absolute top-6 left-6 text-white font-bold text-xl">
                  {slide.number}
                </div>

                {/* Triangle overlay for active slide */}
                {isActive && (
                  <div
                    className={`absolute top-0 ${
                      trianglePosition === "left" ? "left-0" : "right-0"
                    } h-full w-1/3`}
                    style={{
                      clipPath:
                        trianglePosition === "left"
                          ? "polygon(0 0, 0% 100%, 100% 100%)"
                          : "polygon(100% 0, 0 100%, 100% 100%)",
                      background: slide.color,
                      opacity: 0.8,
                    }}
                  ></div>
                )}

                {/* Content */}
                {isActive ? (
                  <div className="absolute bottom-10 left-10 right-10 text-white z-20">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`title-${slide.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <h3
                          className="text-4xl font-bold mb-3"
                          style={{ fontFamily: "var(--font-bold)" }}
                        >
                          {slide.title}
                        </h3>
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`desc-${slide.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <p
                          className="text-white text-opacity-90 max-w-lg"
                          style={{ fontFamily: "var(--font-regular)" }}
                        >
                          {slide.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    <h3
                      className="text-white text-xl font-medium tracking-wide"
                      style={{ fontFamily: "var(--font-medium)" }}
                    >
                      {slide.label}
                    </h3>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Carousel - Mobile */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-lg h-[400px]">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, x: index > currentIndex ? 100 : -100 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x:
                    index === currentIndex
                      ? 0
                      : index > currentIndex
                      ? 100
                      : -100,
                  zIndex: index === currentIndex ? 10 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
                    }}
                  ></div>
                </div>

                {/* Triangle overlay */}
                <div
                  className={`absolute top-0 ${
                    trianglePosition === "left" ? "left-0" : "right-0"
                  } h-full w-1/3`}
                  style={{
                    clipPath:
                      trianglePosition === "left"
                        ? "polygon(0 0, 0% 100%, 100% 100%)"
                        : "polygon(100% 0, 0 100%, 100% 100%)",
                    background: slide.color,
                    opacity: 0.8,
                  }}
                ></div>

                {/* Number indicator */}
                <div className="absolute top-6 left-6 text-white font-bold text-xl">
                  {slide.number}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                  {index === currentIndex && (
                    <motion.div
                      className="absolute bottom-10 left-6 right-6 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h3
                        className="text-3xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-bold)" }}
                      >
                        {slide.title}
                      </h3>
                      <p
                        className="text-white text-opacity-90"
                        style={{ fontFamily: "var(--font-regular)" }}
                      >
                        {slide.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-[#0AB5B5] w-4" : "bg-gray-300"
                } transition-all duration-300`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>

          {/* Mobile navigation arrows */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
