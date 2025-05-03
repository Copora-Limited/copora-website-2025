"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Add this custom style to override any transparency
const dialogContentStyles = cn(
  "bg-white border shadow-lg",
  "data-[state=open]:bg-white",
  "sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
);

// Sample job listings data
const jobsData = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    experienceLevel: "Senior Level",
    salary: "$120,000 - $150,000",
    salaryMin: 120000,
    salaryMax: 150000,
    posted: "2 days ago",
    logo: "/images/blog/digital-marketing.jpg",
    description:
      "We are looking for an experienced software engineer to join our team and help build cutting-edge applications. The ideal candidate will have strong experience with React, Node.js, and cloud infrastructure.",
    requirements: [
      "5+ years of experience in software development",
      "Strong proficiency in JavaScript, React, and Node.js",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Bachelor's degree in Computer Science or related field",
    ],
    workplaceType: "On-site",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Brands",
    location: "New York, NY",
    type: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$90,000 - $110,000",
    salaryMin: 90000,
    salaryMax: 110000,
    posted: "1 week ago",
    logo: "/images/blog/content-creation.jpg",
    description:
      "Join our marketing team to develop and implement marketing strategies across multiple channels. You'll be responsible for campaign planning, execution, and analysis.",
    requirements: [
      "3+ years of experience in marketing",
      "Experience with digital marketing platforms",
      "Strong analytical and communication skills",
      "Bachelor's degree in Marketing or related field",
    ],
    workplaceType: "Hybrid",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Remote",
    type: "Contract",
    experienceLevel: "Mid Level",
    salary: "$70 - $90 per hour",
    salaryMin: 70,
    salaryMax: 90,
    posted: "3 days ago",
    logo: "/images/blog/team-collaboration.jpg",
    description:
      "We need a talented designer to create intuitive and engaging user experiences for our digital products. You'll work closely with product managers and developers to bring designs to life.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Portfolio demonstrating strong design skills",
      "Experience with user research and testing",
    ],
    workplaceType: "Remote",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Data Insights Co.",
    location: "Chicago, IL",
    type: "Full-time",
    experienceLevel: "Entry Level",
    salary: "$80,000 - $95,000",
    salaryMin: 80000,
    salaryMax: 95000,
    posted: "5 days ago",
    logo: "/images/blog/future-work.jpg",
    description:
      "Looking for a data analyst to help us extract meaningful insights from our growing datasets. You'll be responsible for data analysis, visualization, and reporting.",
    requirements: [
      "1-2 years of experience in data analysis",
      "Proficiency in SQL and Excel",
      "Experience with data visualization tools",
      "Bachelor's degree in Statistics, Mathematics, or related field",
    ],
    workplaceType: "On-site",
  },
  {
    id: 5,
    title: "Project Manager",
    company: "Construction Experts",
    location: "Dallas, TX",
    type: "Full-time",
    experienceLevel: "Director",
    salary: "$85,000 - $105,000",
    salaryMin: 85000,
    salaryMax: 105000,
    posted: "1 day ago",
    logo: "/images/blog/remote-work.jpg",
    description:
      "Experienced project manager needed to oversee large-scale construction projects from planning to completion. You'll be responsible for team coordination, budget management, and client communication.",
    requirements: [
      "5+ years of experience in construction project management",
      "PMP certification preferred",
      "Strong leadership and communication skills",
      "Experience with project management software",
    ],
    workplaceType: "On-site",
  },
  {
    id: 6,
    title: "Frontend Developer",
    company: "Web Solutions Inc.",
    location: "Remote",
    type: "Part-time",
    experienceLevel: "Mid Level",
    salary: "$50 - $65 per hour",
    salaryMin: 50,
    salaryMax: 65,
    posted: "4 days ago",
    logo: "/images/blog/digital-marketing.jpg",
    description:
      "We're looking for a frontend developer to work on our web applications. You'll be responsible for implementing responsive designs and ensuring cross-browser compatibility.",
    requirements: [
      "3+ years of experience in frontend development",
      "Strong proficiency in HTML, CSS, and JavaScript",
      "Experience with React or Vue.js",
      "Knowledge of responsive design principles",
    ],
    workplaceType: "Remote",
  },
  {
    id: 7,
    title: "HR Specialist",
    company: "People First Co.",
    location: "Boston, MA",
    type: "Full-time",
    experienceLevel: "Entry Level",
    salary: "$60,000 - $75,000",
    salaryMin: 60000,
    salaryMax: 75000,
    posted: "1 week ago",
    logo: "/images/blog/team-collaboration.jpg",
    description:
      "Join our HR team to support recruitment, onboarding, and employee relations. You'll be responsible for maintaining employee records and assisting with HR initiatives.",
    requirements: [
      "1-2 years of experience in HR",
      "Knowledge of HR policies and procedures",
      "Strong organizational and communication skills",
      "Bachelor's degree in Human Resources or related field",
    ],
    workplaceType: "Hybrid",
  },
];

// Application form schema
const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  resume: z.instanceof(File, { message: "Please upload your resume" }).refine(
    (file) => file.size < 5000000, // 5MB
    "File size must be less than 5MB"
  ),
  coverLetter: z.string().optional(),
  linkedIn: z
    .string()
    .url({ message: "Please enter a valid LinkedIn URL" })
    .optional()
    .or(z.literal("")),
  portfolio: z
    .string()
    .url({ message: "Please enter a valid portfolio URL" })
    .optional()
    .or(z.literal("")),
  availability: z
    .string()
    .min(1, { message: "Please select your availability" }),
  workAuthorization: z
    .string()
    .min(1, { message: "Please select your work authorization status" }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function FindJobs() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([]);
  const [experienceLevelFilters, setExperienceLevelFilters] = useState<
    string[]
  >([]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [workplaceTypeFilters, setWorkplaceTypeFilters] = useState<string[]>(
    []
  );

  // State for job listings
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [selectedJob, setSelectedJob] = useState<(typeof jobsData)[0] | null>(
    null
  );

  // State for application modal
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Form for job application
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      linkedIn: "",
      portfolio: "",
      availability: "",
      workAuthorization: "",
    },
  });

  // Filter jobs based on search and filters
  useEffect(() => {
    let results = jobsData;

    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTermLower) ||
          job.company.toLowerCase().includes(searchTermLower) ||
          job.description.toLowerCase().includes(searchTermLower)
      );
    }

    // Filter by location
    if (searchLocation) {
      const locationLower = searchLocation.toLowerCase();
      results = results.filter((job) =>
        job.location.toLowerCase().includes(locationLower)
      );
    }

    // Filter by job type
    if (jobTypeFilters.length > 0) {
      results = results.filter((job) => jobTypeFilters.includes(job.type));
    }

    // Filter by experience level
    if (experienceLevelFilters.length > 0) {
      results = results.filter((job) =>
        experienceLevelFilters.includes(job.experienceLevel)
      );
    }

    // Filter by salary range
    if (salaryMin && !isNaN(Number(salaryMin))) {
      results = results.filter((job) => job.salaryMin >= Number(salaryMin));
    }
    if (salaryMax && !isNaN(Number(salaryMax))) {
      results = results.filter((job) => job.salaryMax <= Number(salaryMax));
    }

    // Filter by workplace type
    if (workplaceTypeFilters.length > 0) {
      results = results.filter((job) =>
        workplaceTypeFilters.includes(job.workplaceType)
      );
    }

    setFilteredJobs(results);
  }, [
    searchTerm,
    searchLocation,
    jobTypeFilters,
    experienceLevelFilters,
    salaryMin,
    salaryMax,
    workplaceTypeFilters,
  ]);

  // Handle job type filter changes
  const handleJobTypeChange = (type: string) => {
    setJobTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Handle experience level filter changes
  const handleExperienceLevelChange = (level: string) => {
    setExperienceLevelFilters((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  // Handle workplace type filter changes
  const handleWorkplaceTypeChange = (type: string) => {
    setWorkplaceTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Handle apply button click
  const handleApply = (job: (typeof jobsData)[0]) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
    setApplicationSubmitted(false);
    form.reset();
  };

  // Handle application form submission
  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Application submitted:", data);

    setIsSubmitting(false);
    setApplicationSubmitted(true);

    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted.",
    });
  };

  // Reset filters
  const resetFilters = () => {
    setJobTypeFilters([]);
    setExperienceLevelFilters([]);
    setSalaryMin("");
    setSalaryMax("");
    setWorkplaceTypeFilters([]);
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
                />
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
                  {[
                    "Full-time",
                    "Part-time",
                    "Contract",
                    "Temporary",
                    "Internship",
                  ].map((type) => (
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
                      <Checkbox
                        id={`level-${level}`}
                        checked={experienceLevelFilters.includes(level)}
                        onCheckedChange={() =>
                          handleExperienceLevelChange(level)
                        }
                      />
                      <Label
                        htmlFor={`level-${level}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {level}
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

              {/* Location Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Workplace Type</h4>
                <div className="space-y-2">
                  {["On-site", "Remote", "Hybrid"].map((loc) => (
                    <div key={loc} className="flex items-center">
                      <Checkbox
                        id={`loc-${loc}`}
                        checked={workplaceTypeFilters.includes(loc)}
                        onCheckedChange={() => handleWorkplaceTypeChange(loc)}
                      />
                      <Label
                        htmlFor={`loc-${loc}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {loc}
                      </Label>
                    </div>
                  ))}
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

            {/* Job Cards */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
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
                          <div></div>
                          {/* <div className="text-lg font-semibold text-green-700 mb-2 sm:mb-0">{job.salary}</div> */}
                          <Button
                            className="bg-primary text-white hover:bg-[#099999] w-full sm:w-auto"
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
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <div className="text-gray-500 mb-4">
                  No jobs match your current filters
                </div>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredJobs.length > 0 && (
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
                      className={`h-8 w-8 p-0 ${
                        page === 1 ? "bg-primary" : ""
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
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
      <Dialog
        open={isApplicationModalOpen}
        onOpenChange={setIsApplicationModalOpen}
      >
        <DialogContent className={dialogContentStyles}>
          {!applicationSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
                <DialogDescription>
                  Complete the form below to apply for this position at{" "}
                  {selectedJob?.company}.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
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
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                            }}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload your resume (PDF, DOC, or DOCX format, max 5MB)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coverLetter"
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
                            <Input
                              placeholder="https://linkedin.com/in/username"
                              {...field}
                            />
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
                            <Input
                              placeholder="https://yourportfolio.com"
                              {...field}
                            />
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Immediate
                              </SelectItem>
                              <SelectItem value="2weeks">
                                2 Weeks Notice
                              </SelectItem>
                              <SelectItem value="1month">
                                1 Month Notice
                              </SelectItem>
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="citizen">
                                US Citizen
                              </SelectItem>
                              <SelectItem value="permanent">
                                Permanent Resident
                              </SelectItem>
                              <SelectItem value="visa">Work Visa</SelectItem>
                              <SelectItem value="sponsorship">
                                Need Sponsorship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsApplicationModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-[#099999]"
                      disabled={isSubmitting}
                    >
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
              <h2 className="text-2xl font-bold mb-2">
                Application Submitted!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for applying to {selectedJob?.title} at{" "}
                {selectedJob?.company}. We've received your application and will
                be in touch soon.
              </p>
              <Button
                className="bg-primary hover:bg-[#099999]"
                onClick={() => setIsApplicationModalOpen(false)}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
