"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Updated interface to match the actual API response
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content?: string;
  date_uploaded: string;
  featured_image: {
    thumbnail: string;
    main_image: string;
  };
  // Fields we'll add as defaults since they don't exist in the API
  category?: string;
  author?: string;
  readTime?: string;
  excerpt?: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Helper functions
  const stripHtmlTags = (html?: string) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const truncateText = (text?: string, maxLines = 2) => {
    if (!text) return "";
    const words = text.split(" ");
    let truncated = "";
    let lineCount = 0;
    for (let i = 0; i < words.length; i++) {
      truncated += words[i] + " ";
      if ((i + 1) % 10 === 0) lineCount++;
      if (lineCount >= maxLines) break;
    }
    return (
      truncated.trim() +
      (lineCount >= maxLines && words.length > lineCount * 10 ? "..." : "")
    );
  };

  // Format blog URL
  const formatBlogUrl = (slug?: string, id?: number) => {
    if (!slug) return `/blog/${id || "post"}`;
    return `/blog/${slug}`;
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Assign default categories based on content analysis
  const assignDefaultCategory = (post: BlogPost): BlogPost => {
    // Create a copy of the post to avoid mutating the original
    const enhancedPost = { ...post };

    // Default values
    enhancedPost.category = "General";
    enhancedPost.author = "Copora Team";
    enhancedPost.readTime = "5 min read";

    // Try to extract an excerpt from content
    if (post.content) {
      enhancedPost.excerpt = truncateText(stripHtmlTags(post.content), 3);
    }

    // Attempt to determine category from content
    const content = post.content?.toLowerCase() || "";
    const title = post.title?.toLowerCase() || "";

    if (
      content.includes("hiring") ||
      title.includes("hiring") ||
      content.includes("recruitment")
    ) {
      enhancedPost.category = "Recruitment";
    } else if (
      content.includes("productivity") ||
      title.includes("productivity")
    ) {
      enhancedPost.category = "Productivity";
    } else if (
      content.includes("skill") ||
      title.includes("skill") ||
      content.includes("learning")
    ) {
      enhancedPost.category = "Skills Development";
    } else if (
      content.includes("work") ||
      title.includes("work") ||
      content.includes("career")
    ) {
      enhancedPost.category = "Career";
    }

    // Estimate read time based on content length
    if (post.content) {
      const wordCount = stripHtmlTags(post.content).split(/\s+/).length;
      const minutes = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed
      enhancedPost.readTime = `${minutes} min read`;
    }

    return enhancedPost;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_COPORA_BLOG_API || ""
        );
        // Enhance each blog post with default values
        const enhancedBlogs = response.data.map(assignDefaultCategory);
        setBlogs(enhancedBlogs);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // Fallback to static data
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search query and active tab
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      (blog.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (blog.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.content
        ? stripHtmlTags(blog.content)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : false);

    const matchesCategory =
      activeTab === "all" ||
      (blog.category || "").toLowerCase() === activeTab.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const otherPosts = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  // Extract unique categories from blogs
  const allCategories = blogs
    .map((blog) => blog.category || "General")
    .filter(Boolean);
  const uniqueCategories = [
    "All Categories",
    ...Array.from(new Set(allCategories)),
  ];

  // Fallback blog data
  const fallbackBlogs: BlogPost[] = [
    {
      id: 1,
      title:
        "The Future of Work: How Remote Collaboration is Reshaping Industries",
      slug: "future-of-work",
      excerpt:
        "Explore how remote work is transforming traditional business models and creating new opportunities for global talent acquisition.",
      featured_image: {
        main_image: "/images/blog/future-work.jpg",
        thumbnail: "/images/blog/future-work.jpg",
      },
      author: "Sarah Johnson",
      date_uploaded: "2023-05-15",
      category: "Future of Work",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "Effective Strategies for Remote Team Collaboration",
      slug: "effective-remote-team-collaboration",
      excerpt:
        "Discover proven methods to enhance productivity and communication in distributed teams.",
      featured_image: {
        main_image: "/images/blog/team-collaboration.jpg",
        thumbnail: "/images/blog/team-collaboration.jpg",
      },
      author: "Michael Chen",
      date_uploaded: "2023-04-28",
      category: "Team Management",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "How to Build a Strong Personal Brand in the Digital Age",
      slug: "building-personal-brand",
      excerpt:
        "Learn the essential steps to establish your professional identity online and stand out in your industry.",
      featured_image: {
        main_image: "/images/blog/content-creation.jpg",
        thumbnail: "/images/blog/content-creation.jpg",
      },
      author: "Emma Wilson",
      date_uploaded: "2023-04-15",
      category: "Career Development",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "The Rise of Digital Marketing: Trends to Watch in 2023",
      slug: "digital-marketing-trends-2023",
      excerpt:
        "Stay ahead of the curve with these emerging digital marketing strategies that are reshaping how businesses connect with customers.",
      featured_image: {
        main_image: "/images/blog/digital-marketing.jpg",
        thumbnail: "/images/blog/digital-marketing.jpg",
      },
      author: "David Park",
      date_uploaded: "2023-03-30",
      category: "Digital Marketing",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Balancing Work and Life in a Remote-First World",
      slug: "work-life-balance-remote",
      excerpt:
        "Practical tips for maintaining boundaries and wellbeing when your home is also your office.",
      featured_image: {
        main_image: "/images/blog/remote-work.jpg",
        thumbnail: "/images/blog/remote-work.jpg",
      },
      author: "Lisa Rodriguez",
      date_uploaded: "2023-03-22",
      category: "Wellbeing",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "The Impact of AI on Recruitment and Hiring Processes",
      slug: "ai-in-recruitment",
      excerpt:
        "How artificial intelligence is transforming talent acquisition and what it means for job seekers and employers.",
      featured_image: {
        main_image: "/images/human-centric.jpg",
        thumbnail: "/images/human-centric.jpg",
      },
      author: "James Wilson",
      date_uploaded: "2023-03-10",
      category: "Technology",
      readTime: "9 min read",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-secondary to-appBlue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Copora Insights
            </h1>
            <p className="text-xl mb-8">
              Expert perspectives on workforce trends, career development, and
              industry innovations
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 h-12 w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            <div className="flex gap-4">
              {uniqueCategories.map((category, index) => {
                // Safely handle category toLowerCase
                const categoryValue =
                  index === 0 ? "all" : (category || "").toLowerCase();

                return (
                  <Button
                    key={index}
                    variant={
                      activeTab === categoryValue ? "default" : "outline"
                    }
                    className={`whitespace-nowrap ${
                      activeTab === categoryValue ? "bg-primary" : ""
                    }`}
                    onClick={() => setActiveTab(categoryValue)}
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-full">
                <Image
                  src={
                    featuredPost.featured_image?.main_image ||
                    "/placeholder.svg"
                  }
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block bg-[#e6f7f7] text-secondary text-xs font-medium px-2.5 py-0.5 rounded">
                    {featuredPost.category || "General"}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt ||
                    (featuredPost.content
                      ? truncateText(stripHtmlTags(featuredPost.content), 4)
                      : "")}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6 mt-auto">
                  <User size={16} className="mr-1" />
                  <span className="mr-4">
                    {featuredPost.author || "Copora Team"}
                  </span>
                  <Calendar size={16} className="mr-1" />
                  <span className="mr-4">
                    {formatDate(featuredPost.date_uploaded)}
                  </span>
                  <span>{featuredPost.readTime || "5 min read"}</span>
                </div>
                <Link href={formatBlogUrl(featuredPost.slug, featuredPost.id)}>
                  <Button className="self-start bg-primary hover:bg-[#099999]">
                    Read Article
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Tabs */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="latest">Latest Articles</TabsTrigger>
            <TabsTrigger value="popular">Popular Articles</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="latest">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.featured_image?.thumbnail || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-[#e6f7f7] text-secondary text-xs font-medium px-2.5 py-0.5 rounded">
                        {post.category || "General"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt ||
                        (post.content
                          ? truncateText(stripHtmlTags(post.content), 2)
                          : "")}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User size={14} className="mr-1" />
                      <span className="mr-3">
                        {post.author || "Copora Team"}
                      </span>
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(post.date_uploaded)}</span>
                    </div>
                    <Link
                      href={formatBlogUrl(post.slug, post.id)}
                      className="inline-flex items-center text-primary hover:text-[#099999]"
                    >
                      Read more <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {otherPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">
                  No articles found matching your criteria.
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}

            {/* Load More Button */}
            {otherPosts.length > 0 && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-blue-50"
                >
                  Load More Articles
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular">
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                Popular articles feature coming soon.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                Trending articles feature coming soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#e6f7f7] to-[#f0f4f8] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with Industry Insights
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter and receive the latest articles,
              trends, and insights directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 flex-1"
              />
              <Button className="h-12 px-8 bg-primary hover:bg-[#099999]">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
