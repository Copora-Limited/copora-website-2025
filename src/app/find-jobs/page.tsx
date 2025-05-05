"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  Building,
  Calendar,
} from "lucide-react";
import JobApplicationModal from "@/components/job-application-modal";
import { fetchWithCache } from "@/lib/api-cache";
import ImageWithFallback from "@/components/image-with-fallback";

// Define job type
interface Job {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: {
    thumbnail: string | false;
    medium: string | false;
    large: string | false;
  };
  job_type: string;
  work_model: string;
  salary: string;
  date_created: string;
  application_end_date: string;
  location: string;
  requirements: string;
  employer: string;
  about_company: string;
}

export default function FindJobs() {
  // State for jobs data
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([]);
  const [workModelFilters, setWorkModelFilters] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  // State for job listings
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // State for application modal
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Add these state variables after the other state declarations
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5); // Number of jobs to display per page

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Use the cached fetch with a 5-minute cache time (default)
        const apiUrl = process.env.NEXT_PUBLIC_COPORA_JOB_API || "";
        const data = await fetchWithCache(apiUrl);

        setJobs(data);
        setFilteredJobs(data);

        // Extract unique locations for filtering
        const uniqueLocations = Array.from(
          new Set(data.map((job: Job) => job.location))
        );
        setLocations(uniqueLocations as string[]);

        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Rest of the component remains the same...

  // Filter jobs based on search and filters
  useEffect(() => {
    if (jobs.length === 0) return;

    let results = [...jobs];

    // Filter by search term (title, employer, description)
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTermLower) ||
          (job.employer &&
            job.employer.toLowerCase().includes(searchTermLower)) ||
          (job.description &&
            job.description.toLowerCase().includes(searchTermLower))
      );
    }

    // Filter by location
    if (searchLocation) {
      const locationLower = searchLocation.toLowerCase();
      results = results.filter(
        (job) =>
          job.location && job.location.toLowerCase().includes(locationLower)
      );
    }

    // Filter by job type
    if (jobTypeFilters.length > 0) {
      results = results.filter((job) => jobTypeFilters.includes(job.job_type));
    }

    // Filter by work model
    if (workModelFilters.length > 0) {
      results = results.filter((job) =>
        workModelFilters.includes(job.work_model)
      );
    }

    // Filter by salary range
    if (salaryMin && !isNaN(Number(salaryMin))) {
      results = results.filter((job) => {
        // Extract the minimum salary from range (e.g., "80000 - 120000" -> 80000)
        const jobSalaryMin = Number.parseInt(job.salary.split("-")[0].trim());
        return !isNaN(jobSalaryMin) && jobSalaryMin >= Number(salaryMin);
      });
    }

    if (salaryMax && !isNaN(Number(salaryMax))) {
      results = results.filter((job) => {
        // Extract the maximum salary from range or use the single value
        const salaryParts = job.salary.split("-");
        const jobSalaryMax =
          salaryParts.length > 1
            ? Number.parseInt(salaryParts[1].trim())
            : Number.parseInt(salaryParts[0].trim());
        return !isNaN(jobSalaryMax) && jobSalaryMax <= Number(salaryMax);
      });
    }

    setFilteredJobs(results);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [
    jobs,
    searchTerm,
    searchLocation,
    jobTypeFilters,
    workModelFilters,
    salaryMin,
    salaryMax,
  ]);

  // Calculate paginated jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Pagination handler functions
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of job listings when changing page
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Handle job type filter changes
  const handleJobTypeChange = (type: string) => {
    setJobTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Handle work model filter changes
  const handleWorkModelChange = (model: string) => {
    setWorkModelFilters((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  // Handle apply button click
  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
  };

  // Reset filters
  const resetFilters = () => {
    setJobTypeFilters([]);
    setWorkModelFilters([]);
    setSalaryMin("");
    setSalaryMax("");
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Calculate days ago from date
  const getDaysAgo = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-secondary to-appBlue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl mb-8">
              Discover job opportunities tailored to your skills and career
              goals
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  list="locations"
                />
                <datalist id="locations">
                  {locations.map((location, index) => (
                    <option key={index} value={location} />
                  ))}
                </datalist>
              </div>
              <Button
                className="h-12 px-8 bg-primary hover:bg-[#099999]"
                onClick={() => {
                  // Search is already handled by the useEffect
                }}
              >
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
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Reset
                  </button>
                  <Filter size={20} className="text-gray-500" />
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Job Type</h4>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Permanent"].map(
                    (type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox
                          id={`type-${type}`}
                          checked={jobTypeFilters.includes(type)}
                          onCheckedChange={() => handleJobTypeChange(type)}
                        />
                        <Label
                          htmlFor={`type-${type}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {type}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Work Model Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Work Model</h4>
                <div className="space-y-2">
                  {["Remote", "Hybrid", "Onsite"].map((model) => (
                    <div key={model} className="flex items-center">
                      <Checkbox
                        id={`model-${model}`}
                        checked={workModelFilters.includes(model)}
                        onCheckedChange={() => handleWorkModelChange(model)}
                      />
                      <Label
                        htmlFor={`model-${model}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {model}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Salary Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="min-salary"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Min
                    </Label>
                    <Input
                      type="text"
                      id="min-salary"
                      placeholder="$0"
                      className="h-10"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="max-salary"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Max
                    </Label>
                    <Input
                      type="text"
                      id="max-salary"
                      placeholder="No limit"
                      className="h-10"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-[#099999]"
                onClick={() => {
                  // Filters are already applied via useEffect
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available Positions</h2>
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium">{filteredJobs.length}</span> jobs
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Job Cards */}
            {!isLoading && !error && filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-16 md:h-16 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                        {job.image && job.image.thumbnail ? (
                          <ImageWithFallback
                            src={
                              job.image.thumbnail.toString() ||
                              "/placeholder.svg"
                            }
                            alt={job.employer || "Company logo"}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <Building size={32} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-secondary">
                            {job.title}
                          </h3>
                          <span className="text-sm text-gray-500 md:text-right">
                            {getDaysAgo(job.date_created)}
                          </span>
                        </div>
                        <h4 className="text-lg font-medium mb-2">
                          {job.employer || "Company Name"}
                        </h4>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin size={16} className="mr-1" />
                            {job.location || "Location not specified"}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Briefcase size={16} className="mr-1" />
                            {job.job_type || "Job type not specified"}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar size={16} className="mr-1" />
                            {formatDate(job.date_created)}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {job.description || "No description available"}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="text-lg font-semibold text-green-700 mb-2 sm:mb-0">
                            $
                            {job.salary
                              ? job.salary.replace(" - ", " - $")
                              : "Salary not specified"}
                          </div>
                          <Button
                            className="bg-primary hover:bg-[#099999] w-full sm:w-auto"
                            onClick={() => handleApply(job)}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !isLoading && !error ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <div className="text-gray-500 mb-4">
                  No jobs match your current filters
                </div>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            ) : null}

            {/* Pagination */}
            {!isLoading && !error && filteredJobs.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum: number;
                    if (totalPages <= 5) {
                      // If 5 or fewer pages, show all
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // If near start, show first 5
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // If near end, show last 5
                      pageNum = totalPages - 4 + i;
                    } else {
                      // Otherwise show current page and 2 on each side
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pageNum === currentPage ? "default" : "outline"
                        }
                        size="sm"
                        className={`h-8 w-8 p-0 ${
                          pageNum === currentPage ? "bg-primary" : ""
                        }`}
                        onClick={() => goToPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </Button>
                </nav>
              </div>
            )}
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

      {/* Application Modal */}
      <JobApplicationModal
        isOpen={isApplicationModalOpen}
        onOpenChange={setIsApplicationModalOpen}
        selectedJob={selectedJob}
      />
    </div>
  );
}
