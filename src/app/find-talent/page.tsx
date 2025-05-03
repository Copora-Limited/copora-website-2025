"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  CheckCircle,
  ChevronRight,
  Users,
  Clock,
  Award,
  Briefcase,
  Building,
  Calendar,
  DollarSign,
  FileText,
  Send,
} from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  positionTitle: z.string().min(2, "Position title is required"),
  industry: z.string().min(2, "Industry is required"),
  employmentType: z.string(),
  experienceLevel: z.string(),
  location: z.string().min(2, "Location is required"),
  remoteOption: z.string(),
  salaryRange: z.string(),
  startDate: z.string(),
  requirements: z.string().min(10, "Please provide detailed requirements"),
  additionalInfo: z.string().optional(),
})

export default function FindTalent() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      positionTitle: "",
      industry: "",
      employmentType: "full-time",
      experienceLevel: "mid-level",
      location: "",
      remoteOption: "hybrid",
      salaryRange: "",
      startDate: "",
      requirements: "",
      additionalInfo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)
      setIsSubmitted(true)
      toast({
        title: "Talent request submitted",
        description: "Our team will contact you within 24 hours to discuss your requirements.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#0a2540] text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/images/HeaderBg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="w-full md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-bold)" }}>
                Find Exceptional Talent <br />
                For Your Business
              </h1>
              <p className="text-lg mb-8 text-white/80 max-w-lg" style={{ fontFamily: "var(--font-regular)" }}>
                Connect with pre-vetted professionals who can drive your business forward. Our talent solutions are
                tailored to your specific needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="bg-[#0AB5B5] hover:bg-[#099999] text-white rounded-full px-8 py-6"
                  onClick={() => {
                    const formSection = document.getElementById("requirements-form")
                    formSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Submit Requirements
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Link href="https://calendly.com/copora-talent/consultation" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-8 py-6"
                  >
                    Schedule Consultation
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#0AB5B5] mr-2" />
                  <span>24-hour response time</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#0AB5B5] mr-2" />
                  <span>Vetted professionals</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#0AB5B5] mr-2" />
                  <span>95% satisfaction rate</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <Image
                  src="/business-meeting-collaboration.png"
                  alt="Business team collaboration"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-[#0a2540] p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="bg-[#0AB5B5]/20 p-2 rounded-full mr-3">
                      <Users className="h-6 w-6 text-[#0AB5B5]" />
                    </div>
                    <div>
                      <p className="font-bold">5,000+</p>
                      <p className="text-sm">Talent Pool</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white text-[#0a2540] p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="bg-[#0AB5B5]/20 p-2 rounded-full mr-3">
                      <Clock className="h-6 w-6 text-[#0AB5B5]" />
                    </div>
                    <div>
                      <p className="font-bold">48 hrs</p>
                      <p className="text-sm">Avg. Placement</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#0AB5B5]/20 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-[#0AB5B5]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">5,000+</p>
                    <p className="text-gray-500">Qualified Professionals</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Access our extensive network of pre-vetted talent across industries.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#0AB5B5]/20 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-[#0AB5B5]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">48 hrs</p>
                    <p className="text-gray-500">Average Placement Time</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Our efficient process ensures you get the right talent quickly.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#0AB5B5]/20 p-3 rounded-full mr-4">
                    <Award className="h-6 w-6 text-[#0AB5B5]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">95%</p>
                    <p className="text-gray-500">Client Satisfaction</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Our clients consistently rate our talent solutions as excellent.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#0AB5B5]/20 p-3 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-[#0AB5B5]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">1,200+</p>
                    <p className="text-gray-500">Successful Placements</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">We've helped businesses of all sizes find their perfect match.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-bold)" }}>
              How Our Talent Acquisition Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures you get the right talent for your specific needs quickly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md relative">
              <div className="absolute -top-5 -left-5 bg-[#0AB5B5] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <CardHeader>
                <CardTitle>Submit Requirements</CardTitle>
                <CardDescription>Tell us what you're looking for</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fill out our detailed requirements form to help us understand your specific needs, timeline, and
                  budget.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md relative">
              <div className="absolute -top-5 -left-5 bg-[#0AB5B5] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <CardHeader>
                <CardTitle>Talent Matching</CardTitle>
                <CardDescription>We find the perfect candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our team searches our extensive network to find pre-vetted professionals who match your requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md relative">
              <div className="absolute -top-5 -left-5 bg-[#0AB5B5] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <CardHeader>
                <CardTitle>Interview & Onboard</CardTitle>
                <CardDescription>Seamless integration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Meet your candidates, make your selection, and we'll handle all the paperwork and onboarding process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements Form */}
      <section id="requirements-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-bold)" }}>
                Submit Your Talent Requirements
              </h2>
              <p className="text-gray-600">
                Tell us about your needs and we'll find the perfect talent match for your business.
              </p>
            </div>

            {!isSubmitted ? (
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <Building className="mr-2 h-5 w-5 text-gray-400" />
                                    <Input placeholder="Your company name" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="contactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Person</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <Users className="mr-2 h-5 w-5 text-gray-400" />
                                    <Input placeholder="Your name" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} />
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

                          <FormField
                            control={form.control}
                            name="positionTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position Title</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <Briefcase className="mr-2 h-5 w-5 text-gray-400" />
                                    <Input placeholder="e.g. Software Engineer" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Technology" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="employmentType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Employment Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select employment type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="full-time">Full-time</SelectItem>
                                    <SelectItem value="part-time">Part-time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                    <SelectItem value="temporary">Temporary</SelectItem>
                                    <SelectItem value="freelance">Freelance</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="experienceLevel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Experience Level</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="entry-level">Entry Level</SelectItem>
                                    <SelectItem value="mid-level">Mid Level</SelectItem>
                                    <SelectItem value="senior">Senior</SelectItem>
                                    <SelectItem value="executive">Executive</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. New York, NY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="remoteOption"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Remote Option</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select remote option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="on-site">On-site</SelectItem>
                                    <SelectItem value="remote">Remote</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="salaryRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Salary Range</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <DollarSign className="mr-2 h-5 w-5 text-gray-400" />
                                    <Input placeholder="e.g. $80,000 - $100,000" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Desired Start Date</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                                    <Input placeholder="e.g. ASAP or MM/DD/YYYY" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="requirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Requirements & Skills</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <FileText className="mr-2 h-5 w-5 text-gray-400 mt-2" />
                                <Textarea
                                  placeholder="Describe the key requirements, skills, and qualifications needed for this position"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any other details that would help us find the right talent for you"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-[#0AB5B5] hover:bg-[#099999] text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Submit Requirements
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-none shadow-lg text-center py-12">
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Requirements Submitted Successfully!</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Thank you for submitting your talent requirements. Our team will review your needs and contact you
                      within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-[#0AB5B5] hover:bg-[#099999] text-white"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-bold)" }}>
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what businesses like yours have to say about our talent solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-bold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">CTO, TechStart Inc.</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Copora helped us find exceptional engineering talent in record time. Their vetting process is
                  thorough, and the candidates they sent were all high-quality matches for our needs."
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-bold">Michael Chen</p>
                    <p className="text-sm text-gray-500">HR Director, Global Solutions</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "We've worked with several staffing agencies, but Copora stands out for their personalized approach
                  and understanding of our company culture. They don't just fill positions; they find the right fit."
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-bold">Jessica Williams</p>
                    <p className="text-sm text-gray-500">Founder, Creative Minds</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "As a small business, finding specialized talent was challenging until we partnered with Copora. They
                  understood our budget constraints and still delivered exceptional candidates."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a2540] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-bold)" }}>
              Ready to Find Your Perfect Talent Match?
            </h2>
            <p className="text-lg mb-8 text-white/80">
              Submit your requirements today and let us help you build your dream team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[#0AB5B5] hover:bg-[#099999] text-white rounded-full px-8 py-6"
                onClick={() => {
                  const formSection = document.getElementById("requirements-form")
                  formSection?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Submit Requirements
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="https://calendly.com/copora-talent/consultation" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-8 py-6"
                >
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
