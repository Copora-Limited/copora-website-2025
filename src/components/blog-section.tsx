"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  slug: string;
}

export default function BlogSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title:
        "Unlocking Potential Through Blind Hiring: A New Era in Recruitment",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      image: "/images/blog/content-creation.jpg",
      slug: "/blog/content-creation",
    },
    {
      id: "2",
      title: "CAN PLAY IMPROVE PRODUCTIVITY?",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      image: "/images/blog/boardmeeting.jpg",
      slug: "/blog/remote-work",
    },
    {
      id: "3",
      title:
        "The Importance of Upskilling and Reskilling: Empowering Employees and Driving Business Success",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      image: "/images/blog/peopleLauging.jpg",
      slug: "/blog/team-collaboration",
    },
    {
      id: "4",
      title: "Content Creation",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      image: "/images/blog/digital-marketing.jpg",
      slug: "/blog/digital-marketing",
    },
    {
      id: "5",
      title: "Content Creation",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      image: "/images/blog/future-work.jpg",
      slug: "/blog/future-work",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = (index: number) => {
    if (!isAnimating && activeIndex !== index) {
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev === blogPosts.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Touch and mouse events for mobile swiping
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current || isMobile) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!containerRef.current || !isMobile) return;

    // Determine which card is most visible and set it as active
    const containerWidth = containerRef.current.offsetWidth;
    const scrollPosition = containerRef.current.scrollLeft;
    const cardIndex = Math.round(scrollPosition / (containerWidth * 0.8));

    if (
      cardIndex !== activeIndex &&
      cardIndex >= 0 &&
      cardIndex < blogPosts.length
    ) {
      setActiveIndex(cardIndex);
    }
  };

  // Scroll to active card on mobile
  useEffect(() => {
    if (isMobile && containerRef.current) {
      const scrollTo = activeIndex * (containerRef.current.offsetWidth * 0.8);
      containerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [activeIndex, isMobile]);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h4
            className="text-[#0AB5B5] font-medium mb-2"
            style={{ fontFamily: "var(--font-medium)" }}
          >
            Blog
          </h4>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4"
            style={{ fontFamily: "var(--font-bold)" }}
          >
            Recent Insights & Innovations
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-regular)" }}
          >
            Explore the latest trends, share valuable tips, and tell compelling
            stories from the world of Copora.
          </p>
        </div>

        {/* Desktop Blog Cards */}
        <div className="hidden md:block relative">
          <div className="flex gap-6 justify-center">
            {blogPosts.slice(0, 3).map((post, index) => {
              const isActive = index === activeIndex;
              const isHovered = index === hoverIndex;

              return (
                <motion.div
                  key={post.id}
                  className={`relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
                    isActive || isHovered ? "w-[38%]" : "w-[28%]"
                  }`}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  initial={false}
                  animate={{
                    width: isActive || isHovered ? "38%" : "28%",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="flex h-full">
                    <div
                      className={`p-6 flex flex-col ${
                        isActive || isHovered ? "w-1/2" : "w-full"
                      } transition-all duration-500`}
                    >
                      <h3
                        className="text-xl font-bold text-[#0a2540] mb-2"
                        style={{ fontFamily: "var(--font-bold)" }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-gray-600 mb-4 flex-grow"
                        style={{ fontFamily: "var(--font-regular)" }}
                      >
                        {post.excerpt}
                      </p>
                      <Link
                        href={post.slug}
                        className="text-[#0AB5B5] font-medium hover:underline"
                        style={{ fontFamily: "var(--font-medium)" }}
                      >
                        Read More
                      </Link>
                    </div>

                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
                          className="relative w-1/2 h-auto"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "50%" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrevious}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous post"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next post"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Blog Cards */}
        <div
          className="md:hidden overflow-x-auto scrollbar-hide"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-4 pb-6 px-2">
            {blogPosts.map((post, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={post.id}
                  className={`flex-shrink-0 w-[80%] bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden scroll-snap-align-start ${
                    isActive ? "ring-2 ring-[#0AB5B5]" : ""
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="80vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3
                      className="text-xl font-bold text-[#0a2540] mb-2"
                      style={{ fontFamily: "var(--font-bold)" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-gray-600 mb-4"
                      style={{ fontFamily: "var(--font-regular)" }}
                    >
                      {post.excerpt}
                    </p>
                    <Link
                      href={post.slug}
                      className="text-[#0AB5B5] font-medium hover:underline"
                      style={{ fontFamily: "var(--font-medium)" }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? "bg-[#0AB5B5] w-4" : "bg-gray-300"
                } transition-all duration-300`}
                aria-label={`Go to post ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-2 border border-[#0AB5B5] rounded-full text-[#0AB5B5] hover:bg-gray-50 transition-colors"
            style={{ fontFamily: "var(--font-medium)" }}
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
