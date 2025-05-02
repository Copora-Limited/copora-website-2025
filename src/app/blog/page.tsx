import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
  // Sample blog posts data
  const featuredPost = {
    id: 1,
    title:
      "The Future of Work: How Remote Collaboration is Reshaping Industries",
    excerpt:
      "Explore how remote work is transforming traditional business models and creating new opportunities for global talent acquisition.",
    image: "/images/blog/future-work.jpg",
    author: "Sarah Johnson",
    date: "May 15, 2023",
    category: "Future of Work",
    readTime: "8 min read",
  };

  const posts = [
    {
      id: 2,
      title: "Effective Strategies for Remote Team Collaboration",
      excerpt:
        "Discover proven methods to enhance productivity and communication in distributed teams.",
      image: "/images/blog/team-collaboration.jpg",
      author: "Michael Chen",
      date: "April 28, 2023",
      category: "Team Management",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "How to Build a Strong Personal Brand in the Digital Age",
      excerpt:
        "Learn the essential steps to establish your professional identity online and stand out in your industry.",
      image: "/images/blog/content-creation.jpg",
      author: "Emma Wilson",
      date: "April 15, 2023",
      category: "Career Development",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "The Rise of Digital Marketing: Trends to Watch in 2023",
      excerpt:
        "Stay ahead of the curve with these emerging digital marketing strategies that are reshaping how businesses connect with customers.",
      image: "/images/blog/digital-marketing.jpg",
      author: "David Park",
      date: "March 30, 2023",
      category: "Digital Marketing",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Balancing Work and Life in a Remote-First World",
      excerpt:
        "Practical tips for maintaining boundaries and wellbeing when your home is also your office.",
      image: "/images/blog/remote-work.jpg",
      author: "Lisa Rodriguez",
      date: "March 22, 2023",
      category: "Wellbeing",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "The Impact of AI on Recruitment and Hiring Processes",
      excerpt:
        "How artificial intelligence is transforming talent acquisition and what it means for job seekers and employers.",
      image: "/images/human-centric.jpg",
      author: "James Wilson",
      date: "March 10, 2023",
      category: "Technology",
      readTime: "9 min read",
    },
  ];

  const categories = [
    "All Categories",
    "Future of Work",
    "Team Management",
    "Career Development",
    "Digital Marketing",
    "Wellbeing",
    "Technology",
    "Leadership",
    "Industry Insights",
  ];

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
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className={`whitespace-nowrap ${
                    index === 0 ? "bg-primary" : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-full">
              <Image
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col">
              <div className="mb-2">
                <span className="inline-block bg-[#e6f7f7] text-secondary text-xs font-medium px-2.5 py-0.5 rounded">
                  {featuredPost.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-6 mt-auto">
                <User size={16} className="mr-1" />
                <span className="mr-4">{featuredPost.author}</span>
                <Calendar size={16} className="mr-1" />
                <span className="mr-4">{featuredPost.date}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <Button className="self-start bg-primary hover:bg-[#099999]">
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Articles */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-[#e6f7f7] text-secondary text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User size={14} className="mr-1" />
                  <span className="mr-3">{post.author}</span>
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary hover:text-[#099999]"
                >
                  Read more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-blue-50"
          >
            Load More Articles
          </Button>
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
