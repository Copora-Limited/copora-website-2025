"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle2 } from "lucide-react"

const talentRequirementSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  positionTitle: z.string().min(2, { message: "Position title is required" }),
  industry: z.string().min(1, { message: "Please select an industry" }),
  employmentType: z.string().min(1, { message: "Please select employment type" }),
  experienceLevel: z.string().min(1, { message: "Please select experience level" }),
  location: z.string().min(2, { message: "Location is required" }),
  remoteOption: z.string().min(1, { message: "Please select remote work option" }),
  salaryRangeMin: z.string().min(1, { message: "Minimum salary is required" }),
  salaryRangeMax: z.string().min(1, { message: "Maximum salary is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  keySkills: z.string().min(2, { message: "Key skills are required" }),
  additionalRequirements: z.string().optional(),
})

type TalentRequirementFormData = z.infer<typeof talentRequirementSchema>

export default function TalentRequirementsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TalentRequirementFormData>({
    resolver: zodResolver(talentRequirementSchema),
    defaultValues: {
      industry: "",
      employmentType: "",
      experienceLevel: "",
      remoteOption: "",
    },
  })

  const onSubmit = async (data: TalentRequirementFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real application, you would send the data to your backend here
      console.log("Form submitted:", data)

      setIsSubmitted(true)
      toast({
        title: "Requirements submitted successfully",
        description: "Our team will contact you shortly to discuss your talent needs.",
      })
      reset()
    } catch (error) {
      toast({
        title: "Error submitting form",
        description: "Please try again later or contact our support team.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-8 rounded-lg shadow-md text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-[#0a2540] mb-4">Requirements Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for submitting your talent requirements. Our team will review your needs and contact you within 1-2
          business days to discuss how we can help.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-[#0AB5B5] hover:bg-[#099999] text-white py-3 px-6 rounded-md transition-colors"
        >
          Submit Another Request
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-lg shadow-md"
    >
      <h3 className="text-2xl font-bold text-[#0a2540] mb-6">Tell us about your talent needs</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#0a2540]">Company Information</h4>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                {...register("companyName")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName.message}</p>}
            </div>

            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name *
              </label>
              <input
                id="contactName"
                type="text"
                {...register("contactName")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                  errors.contactName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contactName && <p className="mt-1 text-sm text-red-500">{errors.contactName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Position Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#0a2540]">Position Details</h4>

            <div>
              <label htmlFor="positionTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Position Title *
              </label>
              <input
                id="positionTitle"
                type="text"
                {...register("positionTitle")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                  errors.positionTitle ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.positionTitle && <p className="mt-1 text-sm text-red-500">{errors.positionTitle.message}</p>}
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry *
              </label>
              <select
                id="industry"
                {...register("industry")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                  errors.industry ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="hospitality">Hospitality</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry.message}</p>}
            </div>

            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type *
              </label>
              <select
                id="employmentType"
                {...register("employmentType")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                  errors.employmentType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Employment Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
                <option value="internship">Internship</option>
              </select>
              {errors.employmentType && <p className="mt-1 text-sm text-red-500">{errors.employmentType.message}</p>}
            </div>

            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level *
              </label>
              <select
                id="experienceLevel"
                {...register("experienceLevel")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                  errors.experienceLevel ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Experience Level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="executive">Executive</option>
              </select>
              {errors.experienceLevel && <p className="mt-1 text-sm text-red-500">{errors.experienceLevel.message}</p>}
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              id="location"
              type="text"
              {...register("location")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
          </div>

          <div>
            <label htmlFor="remoteOption" className="block text-sm font-medium text-gray-700 mb-1">
              Remote Work Option *
            </label>
            <select
              id="remoteOption"
              {...register("remoteOption")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                errors.remoteOption ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Remote Option</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site Only</option>
            </select>
            {errors.remoteOption && <p className="mt-1 text-sm text-red-500">{errors.remoteOption.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="salaryRangeMin" className="block text-sm font-medium text-gray-700 mb-1">
              Salary Range (Minimum) *
            </label>
            <input
              id="salaryRangeMin"
              type="text"
              {...register("salaryRangeMin")}
              placeholder="e.g. $50,000"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                errors.salaryRangeMin ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.salaryRangeMin && <p className="mt-1 text-sm text-red-500">{errors.salaryRangeMin.message}</p>}
          </div>

          <div>
            <label htmlFor="salaryRangeMax" className="block text-sm font-medium text-gray-700 mb-1">
              Salary Range (Maximum) *
            </label>
            <input
              id="salaryRangeMax"
              type="text"
              {...register("salaryRangeMax")}
              placeholder="e.g. $70,000"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
                errors.salaryRangeMax ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.salaryRangeMax && <p className="mt-1 text-sm text-red-500">{errors.salaryRangeMax.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Desired Start Date *
          </label>
          <input
            id="startDate"
            type="date"
            {...register("startDate")}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>}
        </div>

        <div>
          <label htmlFor="keySkills" className="block text-sm font-medium text-gray-700 mb-1">
            Key Skills Required *
          </label>
          <textarea
            id="keySkills"
            {...register("keySkills")}
            rows={3}
            placeholder="List the essential skills and qualifications needed for this position"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] ${
              errors.keySkills ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.keySkills && <p className="mt-1 text-sm text-red-500">{errors.keySkills.message}</p>}
        </div>

        <div>
          <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Requirements (Optional)
          </label>
          <textarea
            id="additionalRequirements"
            {...register("additionalRequirements")}
            rows={3}
            placeholder="Any additional information about the position or specific requirements"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5]"
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0AB5B5] hover:bg-[#099999] text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Talent Requirements"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
