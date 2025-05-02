import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Clock, Filter } from "lucide-react";

export default function FindJobs() {
  // Sample job listings data
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      logo: "/images/blog/digital-marketing.jpg",
      description:
        "We are looking for an experienced software engineer to join our team and help build cutting-edge applications...",
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Global Brands",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      posted: "1 week ago",
      logo: "/images/blog/content-creation.jpg",
      description:
        "Join our marketing team to develop and implement marketing strategies across multiple channels...",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Solutions",
      location: "Remote",
      type: "Contract",
      salary: "$70 - $90 per hour",
      posted: "3 days ago",
      logo: "/images/blog/team-collaboration.jpg",
      description:
        "We need a talented designer to create intuitive and engaging user experiences for our digital products...",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Data Insights Co.",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$80,000 - $95,000",
      posted: "5 days ago",
      logo: "/images/blog/future-work.jpg",
      description:
        "Looking for a data analyst to help us extract meaningful insights from our growing datasets...",
    },
    {
      id: 5,
      title: "Project Manager",
      company: "Construction Experts",
      location: "Dallas, TX",
      type: "Full-time",
      salary: "$85,000 - $105,000",
      posted: "1 day ago",
      logo: "/images/blog/remote-work.jpg",
      description:
        "Experienced project manager needed to oversee large-scale construction projects from planning to completion...",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      {/* relative bg-gradient-to-r from-secondary to-appBlue text-white py-20 */}
      <div className="relative bg-gradient-to-r from-secondary to-appBlue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl mb-8">
              Discover thousands of job opportunities tailored to your skills
              and career goals
            </p>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="pl-10 h-12 w-full"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Location or remote"
                  className="pl-10 h-12 w-full"
                />
              </div>
              <Button className="h-12 px-8 bg-primary hover:bg-[#099999]">
                Search Jobs
              </Button>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Filter size={20} className="text-gray-500" />
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Job Type</h4>
                <div className="space-y-2">
                  {[
                    "Full-time",
                    "Part-time",
                    "Contract",
                    "Temporary",
                    "Internship",
                  ].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`type-${type}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`type-${type}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Experience Level</h4>
                <div className="space-y-2">
                  {[
                    "Entry Level",
                    "Mid Level",
                    "Senior Level",
                    "Director",
                    "Executive",
                  ].map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`level-${level}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`level-${level}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Salary Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="min-salary"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Min
                    </label>
                    <Input
                      type="text"
                      id="min-salary"
                      placeholder="$0"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="max-salary"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Max
                    </label>
                    <Input
                      type="text"
                      id="max-salary"
                      placeholder="No limit"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Location</h4>
                <div className="space-y-2">
                  {["On-site", "Remote", "Hybrid"].map((loc) => (
                    <div key={loc} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`loc-${loc}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`loc-${loc}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {loc}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-[#099999]">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available Positions</h2>
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{jobs.length}</span> jobs
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-16 md:h-16 flex-shrink-0">
                      <Image
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-secondary">
                          {job.title}
                        </h3>
                        <span className="text-sm text-gray-500 md:text-right">
                          {job.posted}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium mb-2">
                        {job.company}
                      </h4>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={16} className="mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase size={16} className="mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={16} className="mr-1" />
                          {job.posted}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="text-lg font-semibold text-green-700 mb-2 sm:mb-0">
                          {job.salary}
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-[#e6f7f7]"
                          >
                            Save
                          </Button>
                          <Button className="bg-primary hover:bg-[#099999]">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  &lt;
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    size="sm"
                    className={`h-8 w-8 p-0 ${page === 1 ? "bg-primary" : ""}`}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  &gt;
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Job Alert Section */}
      <div className="bg-gradient-to-r from-[#e6f7f7] to-[#f0f4f8] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Never Miss a Job Opportunity
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get personalized job alerts delivered straight to your inbox. Be
              the first to know about new positions that match your skills and
              preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 flex-1"
              />
              <Button className="h-12 px-8 bg-primary hover:bg-[#099999]">
                Create Job Alert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
