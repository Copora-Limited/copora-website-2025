/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import axios from "axios";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  slug: string;
  featured_image?: {
    main_image: string;
    thumbnail: string;
  };
  readTime?: number;
}

export default function BlogSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper functions for text processing
  const stripHtmlTags = (html: string) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const truncateText = (text: string, maxLines = 2) => {
    if (!text) return "";
    const words = text.split(" ");
    let truncated = "";
    let lineCount = 0;
    for (let i = 0; i < words.length; i++) {
      truncated += words[i] + " ";
      if ((i + 1) % 10 === 0) lineCount++;
      if (lineCount >= maxLines) break;
    }
    return truncated.trim() + (lineCount >= maxLines ? "..." : "");
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Use environment variable for API URL or fallback to a default
        const apiUrl =
          process.env.NEXT_PUBLIC_COPORA_BLOG_API ||
          "https://api.example.com/blogs"; // Replace with your actual API endpoint

        const response = await axios.get(apiUrl);

        // Transform the API response to match our BlogPost interface
        const transformedData = response.data.map((blog: any) => ({
          id: blog.id || String(Math.random()),
          title: blog.title || "Untitled Blog Post",
          category: blog.category || "Marketing",
          excerpt: stripHtmlTags(blog.content).substring(0, 150) + "...",
          content: blog.content || "",
          image:
            blog.featured_image?.main_image ||
            "/images/blog/content-creation.jpg",
          slug: blog.slug
            ? blog.slug.startsWith("/blog/")
              ? blog.slug
              : `/blog/${blog.slug}`
            : `/blog/${blog.id}`,
          featured_image: blog.featured_image,
          readTime: blog.readTime || 5,
        }));

        setBlogPosts(transformedData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // Fallback to static data if API fails
        setBlogPosts(fallbackBlogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fallback blog posts in case the API fails
  const fallbackBlogPosts: BlogPost[] = [
    {
      id: "1",
      title:
        "Unlocking Potential Through Blind Hiring: A New Era in Recruitment",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      content:
        "Call me crazy, but you cannot market a business without content. The ads your customers see? That's content. The posts on your social media? That's content too. The words on your website? You guessed it – content.",
      image: "/images/blog/content-creation.jpg",
      slug: "/blog/unlocking-potential-through-blind-hiring",
    },
    {
      id: "2",
      title: "CAN PLAY IMPROVE PRODUCTIVITY?",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      content:
        "Call me crazy, but you cannot market a business without content. The ads your customers see? That's content. The posts on your social media? That's content too. The words on your website? You guessed it – content.",
      image: "/images/blog/boardmeeting.jpg",
      slug: "/blog/can-play-improve-productivity",
    },
    {
      id: "3",
      title:
        "The Importance of Upskilling and Reskilling: Empowering Employees and Driving Business Success",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      content:
        "Call me crazy, but you cannot market a business without content. The ads your customers see? That's content. The posts on your social media? That's content too. The words on your website? You guessed it – content.",
      image: "/images/blog/peopleLauging.jpg",
      slug: "/blog/importance-of-upskilling-and-reskilling",
    },
    {
      id: "4",
      title: "Content Creation",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      content:
        "Call me crazy, but you cannot market a business without content. The ads your customers see? That's content. The posts on your social media? That's content too. The words on your website? You guessed it – content.",
      image: "/images/blog/digital-marketing.jpg",
      slug: "/blog/content-creation",
    },
    {
      id: "5",
      title: "Future of Work",
      category: "Marketing",
      excerpt:
        "Call me crazy, but you cannot market a business without content. The ads your customers see?",
      content:
        "Call me crazy, but you cannot market a business without content. The ads your customers see? That's content. The posts on your social media? That's content too. The words on your website? You guessed it – content.",
      image: "/images/blog/future-work.jpg",
      slug: "/blog/future-of-work",
    },
  ];

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

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-[#0AB5B5] font-lg text-3xl md:text-4xl mb-2"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Blog
            </h2>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Recent Insights & Innovations
            </h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-[#0AB5B5] animate-spin" />
            <span className="ml-2 text-[#0a2540]">Loading blog posts...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-[#0AB5B5] font-lg text-3xl md:text-4xl mb-2"
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            Blog
          </h2>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4"
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            Recent Insights & Innovations
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
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
                  <div className="flex h-[280px]">
                    <div
                      className={`p-6 flex flex-col ${
                        isActive || isHovered ? "w-1/2" : "w-full"
                      } transition-all duration-500`}
                    >
                      <h3
                        className="text-xl font-bold text-[#0a2540] mb-2"
                        style={{
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-gray-600 mb-4 flex-grow line-clamp-4"
                        style={{
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {post.excerpt ||
                          stripHtmlTags(post.content).substring(0, 150) + "..."}
                      </p>
                      <Link
                        href={post.slug}
                        className="text-[#0AB5B5] font-medium hover:underline mt-auto"
                        style={{
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
                          className="relative w-1/2 h-[280px]"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "50%" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={
                              post.featured_image?.main_image ||
                              post.image ||
                              "/placeholder.svg"
                            }
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

        {/* Mobile Blog Cards with Arrow Navigation */}
        <div className="md:hidden relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-r-full p-2 transition-all active:scale-95"
            aria-label="Previous post"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-l-full p-2 transition-all active:scale-95"
            aria-label="Next post"
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Card Container */}
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {blogPosts.map((post, index) => (
                <div key={post.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={
                          post.featured_image?.thumbnail ||
                          post.image ||
                          "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-sm mb-2">
                        <span className="text-[#0AB5B5]">{post.category}</span>
                        <span className="mx-2">•</span>
                        <span className="text-gray-500">
                          {post.readTime || 5} min read
                        </span>
                      </div>
                      <h3
                        className="text-xl font-bold text-[#0a2540] mb-2"
                        style={{
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-gray-600 mb-4 line-clamp-3"
                        style={{
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {post.excerpt ||
                          stripHtmlTags(post.content).substring(0, 100) + "..."}
                      </p>
                      <Link
                        href={post.slug}
                        className="text-[#0AB5B5] font-medium hover:underline"
                        style={{
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
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
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
