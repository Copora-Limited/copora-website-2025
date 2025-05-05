"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ChevronLeft,
  Copy,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import axios from "axios";

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

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

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

  // Handle copy link
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Handle social sharing
  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(blogPost?.title || "")}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct sharing API, but we'll open Instagram
        shareUrl = "https://www.instagram.com/";
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // First try to fetch the specific blog post
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_COPORA_BLOG_API}/${slug}`
        );
        const enhancedPost = assignDefaultCategory(response.data);
        setBlogPost(enhancedPost);

        // Then fetch all posts for related posts
        const allPostsResponse = await axios.get(
          process.env.NEXT_PUBLIC_COPORA_BLOG_API || ""
        );
        const allPosts = allPostsResponse.data.map(assignDefaultCategory);

        // Filter out the current post and get related posts (same category or random if no category)
        const filtered = allPosts.filter(
          (post: BlogPost) => post.id !== enhancedPost.id
        );
        let related;

        if (enhancedPost.category) {
          // Get posts with the same category
          related = filtered.filter(
            (post: BlogPost) => post.category === enhancedPost.category
          );

          // If not enough related posts, add some random ones
          if (related.length < 3) {
            const randomPosts = filtered
              .filter(
                (post: BlogPost) => post.category !== enhancedPost.category
              )
              .slice(0, 3 - related.length);
            related = [...related, ...randomPosts];
          }
        } else {
          // Just get random posts
          related = filtered.slice(0, 3);
        }

        setRelatedPosts(related.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blog post:", error);
        // If specific post fetch fails, try to find it in all posts
        try {
          const allPostsResponse = await axios.get(
            process.env.NEXT_PUBLIC_COPORA_BLOG_API || ""
          );
          const allPosts = allPostsResponse.data.map(assignDefaultCategory);
          const foundPost = allPosts.find(
            (post: BlogPost) => post.slug === slug
          );

          if (foundPost) {
            setBlogPost(foundPost);

            // Get related posts
            const filtered = allPosts.filter(
              (post: BlogPost) => post.id !== foundPost.id
            );
            let related;

            if (foundPost.category) {
              related = filtered.filter(
                (post: BlogPost) => post.category === foundPost.category
              );
              if (related.length < 3) {
                const randomPosts = filtered
                  .filter(
                    (post: BlogPost) => post.category !== foundPost.category
                  )
                  .slice(0, 3 - related.length);
                related = [...related, ...randomPosts];
              }
            } else {
              related = filtered.slice(0, 3);
            }

            setRelatedPosts(related.slice(0, 3));
          } else {
            // If post not found, redirect to blog listing
            router.push("/blog");
          }
        } catch (allError) {
          console.error("Error fetching all blog posts:", allError);
          router.push("/blog");
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/blog">
          <Button>Return to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="flex items-center text-gray-500 hover:text-primary"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to all articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="mb-4">
            <span className="inline-block bg-[#e6f7f7] text-secondary text-xs font-medium px-2.5 py-0.5 rounded">
              {blogPost.category || "General"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {blogPost.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-6 mb-2">
              <span className="mr-2">By</span>
              <span className="font-medium text-gray-700">
                {blogPost.author || "Copora Team"}
              </span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Calendar  className="mr-1" />
              <span>{formatDate(blogPost.date_uploaded)}</span>
            </div>
            <div className="flex items-center mb-2">
              <span>{blogPost.readTime || "5 min read"}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[300px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={blogPost.featured_image?.main_image || "/placeholder.svg"}
            alt={blogPost.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          {/* Social Share */}
          <div className="flex items-center justify-end mb-8 space-x-4">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Copy link"
            >
              {linkCopied ? (
                <span className="text-xs font-medium text-green-600">
                  Copied!
                </span>
              ) : (
                <Copy size={18} />
              )}
            </button>
            <button
              onClick={() => shareOnSocial("twitter")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Share on Twitter"
            >
              <Twitter size={18} />
            </button>
            <button
              onClick={() => shareOnSocial("facebook")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Share on Facebook"
            >
              <Facebook size={18} />
            </button>
            <button
              onClick={() => shareOnSocial("instagram")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Share on Instagram"
            >
              <Instagram size={18} />
            </button>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content || "" }} />
          </div>

          {/* Tags */}
          <div className="border-t border-b py-6 mb-12">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-700 font-medium">Tags:</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                {blogPost.category || "General"}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                Copora
              </span>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
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
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-[#099999]"
                  >
                    Read more{" "}
                    <ChevronLeft size={16} className="ml-1 rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
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
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-12 flex-1 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
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
