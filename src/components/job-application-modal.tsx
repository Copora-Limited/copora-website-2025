"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Add this custom style to override any transparency
const dialogContentStyles = cn(
  "bg-white border shadow-lg",
  "data-[state=open]:bg-white",
  "sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
);

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

// Application form schema
const applicationSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phonenumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
  cover_letter: z.string().optional(),
  resume: z.instanceof(File, { message: "Please upload your resume" }).refine(
    (file) => file.size < 5000000, // 5MB
    "File size must be less than 5MB"
  ),
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

interface JobApplicationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedJob: Job | null;
}

export default function JobApplicationModal({
  isOpen,
  onOpenChange,
  selectedJob,
}: JobApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

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
  });

  // Handle application form submission
  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);

    try {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("phonenumber", data.phonenumber);
      formData.append("cover_letter", data.cover_letter || "");
      formData.append("resume_url", data.resume);
      formData.append("job_id", selectedJob?.id.toString() || "");

      // Optional fields
      if (data.linkedIn) {
        formData.append("linkedin_url", data.linkedIn);
      }
      if (data.portfolio) {
        formData.append("portfolio_url", data.portfolio);
      }

      // Send the application to the API
      const response = await fetch(
        "https://api.copora.com/wp-json/wp/v1/apply",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Application submission failed: ${response.status}`);
      }

      const result = await response.json();
      console.log("Application submitted successfully:", result);

      setIsSubmitting(false);
      setApplicationSubmitted(true);

      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);

      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Reset the form and state when the modal is closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset form if modal is closing
      form.reset();
      setApplicationSubmitted(false);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={dialogContentStyles}>
        {!applicationSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
              <DialogDescription>
                Complete the form below to apply for this position at{" "}
                {selectedJob?.employer || "the company"}.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                            <SelectItem value="immediate">Immediate</SelectItem>
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
                            <SelectItem value="citizen">US Citizen</SelectItem>
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
                    onClick={() => onOpenChange(false)}
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
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying to {selectedJob?.title} at{" "}
              {selectedJob?.employer || "the company"}. We've received your
              application and will be in touch soon.
            </p>
            <Button
              className="bg-primary hover:bg-[#099999]"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
