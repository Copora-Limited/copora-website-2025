"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Briefcase, Filter, CheckCircle2, Building, Calendar } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Add this custom style to override any transparency
const dialogContentStyles = cn(
  "bg-white border shadow-lg",
  "data-[state=open]:bg-white",
  "sm:max-w-[600px] max-h-[90vh] overflow-y-auto",
)

// Define job type
interface Job {
  id: number
  title: string
  slug: string
  description: string
  image: {
    thumbnail: string | false
    medium: string | false
    large: string | false
  }
  job_type: string
  work_model: string
  salary: string
  date_created: string
  application_end_date: string
  location: string
  requirements: string
  employer: string
  about_company: string
}

// Application form schema
const applicationSchema = z.object({
  firstname: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastname: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phonenumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  cover_letter: z.string().optional(),
  resume: z.instanceof(File, { message: "Please upload your resume" }).refine(
    (file) => file.size < 5000000, // 5MB
    "File size must be less than 5MB",
  ),
  linkedIn: z.string().url({ message: "Please enter a valid LinkedIn URL" }).optional().or(z.literal("")),
  portfolio: z.string().url({ message: "Please enter a valid portfolio URL" }).optional().or(z.literal("")),
  availability: z.string().min(1, { message: "Please select your availability" }),
  workAuthorization: z.string().min(1, { message: "Please select your work authorization status" }),
})

type ApplicationFormValues = z.infer<typeof applicationSchema>

export default function FindJobs() {
  // State for jobs data
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [locations, setLocations] = useState<string[]>([])

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([])
  const [workModelFilters, setWorkModelFilters] = useState<string[]>([])
  const [salaryMin, setSalaryMin] = useState("")
  const [salaryMax, setSalaryMax] = useState("")

  // State for job listings
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // State for application modal
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  // Add these state variables after the other state declarations
  const [currentPage, setCurrentPage] = useState(1)
  const [jobsPerPage] = useState(5) // Number of jobs to display per page

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_COPORA_JOB_API}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`)
        }

        const data = await response.json()
        setJobs(data)
        setFilteredJobs(data)

        // Extract unique locations for filtering
        const uniqueLocations = Array.from(new Set(data.map((job: Job) => job.location)))
        setLocations(uniqueLocations as string[])

        setError(null)
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError("Failed to load jobs. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Form for job application
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      cover_letter: "",
      linkedIn: "",
      portfolio: "",
      availability: "",
      workAuthorization: "",
    },
  })

  // Filter jobs based on search and filters
  useEffect(() => {
    if (jobs.length === 0) return

    let results = [...jobs]

    // Filter by search term (title, employer, description)
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase()
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTermLower) ||
          (job.employer && job.employer.toLowerCase().includes(searchTermLower)) ||
          (job.description && job.description.toLowerCase().includes(searchTermLower)),
      )
    }

    // Filter by location
    if (searchLocation) {
      const locationLower = searchLocation.toLowerCase()
      results = results.filter((job) => job.location && job.location.toLowerCase().includes(locationLower))
    }

    // Filter by job type
    if (jobTypeFilters.length > 0) {
      results = results.filter((job) => jobTypeFilters.includes(job.job_type))
    }

    // Filter by work model
    if (workModelFilters.length > 0) {
      results = results.filter((job) => workModelFilters.includes(job.work_model))
    }

    // Filter by salary range
    if (salaryMin && !isNaN(Number(salaryMin))) {
      results = results.filter((job) => {
        // Extract the minimum salary from range (e.g., "80000 - 120000" -> 80000)
        const jobSalaryMin = Number.parseInt(job.salary.split("-")[0].trim())
        return !isNaN(jobSalaryMin) && jobSalaryMin >= Number(salaryMin)
      })
    }

    if (salaryMax && !isNaN(Number(salaryMax))) {
      results = results.filter((job) => {
        // Extract the maximum salary from range or use the single value
        const salaryParts = job.salary.split("-")
        const jobSalaryMax =
          salaryParts.length > 1 ? Number.parseInt(salaryParts[1].trim()) : Number.parseInt(salaryParts[0].trim())
        return !isNaN(jobSalaryMax) && jobSalaryMax <= Number(salaryMax)
      })
    }

    setFilteredJobs(results)
  }, [jobs, searchTerm, searchLocation, jobTypeFilters, workModelFilters, salaryMin, salaryMax])

  // Add this after the other useEffect hooks
  // Calculate paginated jobs
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  // Add these pagination handler functions
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top of job listings when changing page
    window.scrollTo({ top: 500, behavior: "smooth" })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  // Handle job type filter changes
  const handleJobTypeChange = (type: string) => {
    setJobTypeFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Handle work model filter changes
  const handleWorkModelChange = (model: string) => {
    setWorkModelFilters((prev) => (prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]))
  }

  // Handle apply button click
  const handleApply = (job: Job) => {
    setSelectedJob(job)
    setIsApplicationModalOpen(true)
    setApplicationSubmitted(false)
    form.reset()
  }

  // Handle application form submission
  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true)

    try {
      // Create FormData object to handle file upload
      const formData = new FormData()
      formData.append("firstname", data.firstname)
      formData.append("lastname", data.lastname)
      formData.append("email", data.email)
      formData.append("phonenumber", data.phonenumber)
      formData.append("cover_letter", data.cover_letter || "")
      formData.append("resume_url", data.resume)
      formData.append("job_id", selectedJob?.id.toString() || "")

      // Optional fields
      if (data.linkedIn) {
        formData.append("linkedin_url", data.linkedIn)
      }
      if (data.portfolio) {
        formData.append("portfolio_url", data.portfolio)
      }

      // Send the application to the API
      const response = await fetch("https://api.copora.com/wp-json/wp/v1/apply", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Application submission failed: ${response.status}`)
      }

      const result = await response.json()
      console.log("Application submitted successfully:", result)

      setIsSubmitting(false)
      setApplicationSubmitted(true)

      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      })
    } catch (error) {
      console.error("Error submitting application:", error)
      setIsSubmitting(false)

      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Reset filters
  const resetFilters = () => {
    setJobTypeFilters([])
    setWorkModelFilters([])
    setSalaryMin("")
    setSalaryMax("")
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Calculate days ago from date
  const getDaysAgo = (dateString: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""

    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    return `${diffDays} days ago`
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-secondary to-appBlue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Dream Job</h1>
            <p className="text-xl mb-8">Discover job opportunities tailored to your skills and career goals</p>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="pl-10 h-12 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
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
                  <button onClick={resetFilters} className="text-sm text-primary hover:underline">
                    Reset
                  </button>
                  <Filter size={20} className="text-gray-500" />
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Job Type</h4>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Permanent"].map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={jobTypeFilters.includes(type)}
                        onCheckedChange={() => handleJobTypeChange(type)}
                      />
                      <Label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                        {type}
                      </Label>
                    </div>
                  ))}
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
                      <Label htmlFor={`model-${model}`} className="ml-2 text-sm text-gray-700">
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
                    <Label htmlFor="min-salary" className="block text-xs text-gray-500 mb-1">
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
                    <Label htmlFor="max-salary" className="block text-xs text-gray-500 mb-1">
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
                Showing <span className="font-medium">{filteredJobs.length}</span> jobs
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
                <Button variant="outline" onClick={() => window.location.reload()}>
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
                          <Image
                            src={job.image.thumbnail.toString() || "/placeholder.svg" || "/placeholder.svg"}
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
                          <h3 className="text-xl font-semibold text-secondary">{job.title}</h3>
                          <span className="text-sm text-gray-500 md:text-right">{getDaysAgo(job.date_created)}</span>
                        </div>
                        <h4 className="text-lg font-medium mb-2">{job.employer || "Company Name"}</h4>
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
                            ${job.salary ? job.salary.replace(" - ", " - $") : "Salary not specified"}
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
                <div className="text-gray-500 mb-4">No jobs match your current filters</div>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            ) : null}

            {/* Replace the existing pagination section with this: */}
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
                    let pageNum: number
                    if (totalPages <= 5) {
                      // If 5 or fewer pages, show all
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      // If near start, show first 5
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      // If near end, show last 5
                      pageNum = totalPages - 4 + i
                    } else {
                      // Otherwise show current page and 2 on each side
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "outline"}
                        size="sm"
                        className={`h-8 w-8 p-0 ${pageNum === currentPage ? "bg-primary" : ""}`}
                        onClick={() => goToPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    )
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
            <h2 className="text-3xl font-bold mb-4">Never Miss a Job Opportunity</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get personalized job alerts delivered straight to your inbox. Be the first to know about new positions
              that match your skills and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input type="email" placeholder="Enter your email address" className="h-12 flex-1" />
              <Button className="h-12 px-8 bg-primary hover:bg-[#099999]">Create Job Alert</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Dialog open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
        <DialogContent className={dialogContentStyles}>
          {!applicationSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
                <DialogDescription>
                  Complete the form below to apply for this position at {selectedJob?.employer || "the company"}.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phonenumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Resume</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                onChange(file)
                              }
                            }}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormDescription>Upload your resume (PDF, DOC, or DOCX format, max 5MB)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cover_letter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="linkedIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="portfolio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio/Website (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourportfolio.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate</SelectItem>
                              <SelectItem value="2weeks">2 Weeks Notice</SelectItem>
                              <SelectItem value="1month">1 Month Notice</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workAuthorization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Authorization</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="citizen">US Citizen</SelectItem>
                              <SelectItem value="permanent">Permanent Resident</SelectItem>
                              <SelectItem value="visa">Work Visa</SelectItem>
                              <SelectItem value="sponsorship">Need Sponsorship</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsApplicationModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-[#099999]" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </>
          ) : (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for applying to {selectedJob?.title} at {selectedJob?.employer || "the company"}. We've
                received your application and will be in touch soon.
              </p>
              <Button className="bg-primary hover:bg-[#099999]" onClick={() => setIsApplicationModalOpen(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
