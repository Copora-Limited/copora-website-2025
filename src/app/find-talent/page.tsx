/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  Users,
  Clock,
  Award,
  Briefcase,
} from "lucide-react";

export default function FindTalent() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#032541] to-[#0a2540] py-20 md:py-28">
        <div className="absolute inset-0 opacity-10 bg-grid-white/[0.2]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Find the Perfect Talent for Your Business
              </h1>
              <p
                className="text-lg text-gray-200 mb-8"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Connect with qualified professionals who can help your business
                grow. Our talent pool includes experts across various industries
                and specializations.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Job title or skill"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5]"
                        style={{
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5B5] appearance-none bg-white"
                        style={{
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        <option value="">Industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                      </select>
                      <ChevronRight className="absolute right-3 top-3 h-5 w-5 text-gray-400 transform rotate-90" />
                    </div>
                  </div>
                  <button
                    className="bg-[#0AB5B5] hover:bg-[#099999] text-white py-3 px-6 rounded-md transition-colors"
                    style={{
                      fontFamily:
                        "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/isometric-hiring-dashboard.png"
                alt="Talent Dashboard"
                width={600}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-[#0a2540] mb-4"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Why Choose Copora for Your Hiring Needs
            </h2>
            <p
              className="text-gray-600 max-w-3xl mx-auto"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              We connect businesses with top talent across various industries,
              ensuring you find the perfect match for your requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-14 h-14 bg-[#e6f7f7] rounded-full flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-[#0AB5B5]" />
              </div>
              <h3
                className="text-xl font-bold text-[#0a2540] mb-3"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Extensive Talent Pool
              </h3>
              <p
                className="text-gray-600"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Access to a diverse range of pre-screened professionals across
                multiple industries and specializations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-14 h-14 bg-[#e6f7f7] rounded-full flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-[#0AB5B5]" />
              </div>
              <h3
                className="text-xl font-bold text-[#0a2540] mb-3"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Time-Efficient Hiring
              </h3>
              <p
                className="text-gray-600"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Our streamlined process reduces time-to-hire by up to 50%,
                allowing you to fill positions quickly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-14 h-14 bg-[#e6f7f7] rounded-full flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-[#0AB5B5]" />
              </div>
              <h3
                className="text-xl font-bold text-[#0a2540] mb-3"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Quality Assurance
              </h3>
              <p
                className="text-gray-600"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Rigorous screening and assessment processes ensure you only meet
                candidates who match your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-[#0a2540] mb-4"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              How It Works
            </h2>
            <p
              className="text-gray-600 max-w-3xl mx-auto"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Our simple 4-step process makes finding the right talent quick and
              efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0AB5B5] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                1
              </div>
              <h3
                className="text-xl font-bold text-[#0a2540] mb-3"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Submit Requirements
              </h3>
              <p
                className="text-gray-600"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Tell us about your hiring needs, job requirements, and company
                culture.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0AB5B5] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                2
              </div>
              <h3
                className="text-xl font-bold text-[#0a2540] mb-3"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Candidate Matching
              </h3>
              <p
                className="text-gray-600"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                We match your requirements with our pre-screened talent pool.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0AB5B5] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                3
              </div>
              <h3
                className="text-xl font-bold text-[#0a2540] mb-3"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Interview & Select
              </h3>
              <p
                className="text-gray-600"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Review profiles, interview candidates, and select the best fit
                for your team.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0AB5B5] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                4
              </div>
              <h3
                className="text-xl font-bold text-[#0a2540] mb-3"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Onboarding Support
              </h3>
              <p
                className="text-gray-600"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                We assist with the onboarding process to ensure a smooth
                transition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-[#0a2540] mb-4"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Hospitality Talent Categories
            </h2>
            <p
              className="text-gray-600 max-w-3xl mx-auto"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              We currently specialize in recruiting for the hospitality
              industry. Browse our hospitality talent categories below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Hotel Management", count: 320, icon: "🏨" },
              { title: "Food & Beverage", count: 475, icon: "🍽️" },
              { title: "Event Planning", count: 210, icon: "🎪" },
              { title: "Culinary Arts", count: 380, icon: "👨‍🍳" },
              { title: "Guest Services", count: 290, icon: "🛎️" },
              { title: "Housekeeping", count: 240, icon: "🧹" },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-[#0AB5B5] flex items-center"
              >
                <div className="text-4xl mr-4">{category.icon}</div>
                <div>
                  <h3
                    className="text-lg font-bold text-[#0a2540]"
                    style={{
                      fontFamily:
                        "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    {category.title}
                  </h3>
                  <p
                    className="text-gray-500 text-sm"
                    style={{
                      fontFamily:
                        "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    {category.count}+ professionals available
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-[#0a2540] mb-4"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              What Our Clients Say
            </h2>
            <p
              className="text-gray-600 max-w-3xl mx-auto"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Hear from businesses that have found exceptional talent through
              our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                position: "HR Director, TechSolutions Inc.",
                quote:
                  "Copora helped us find specialized tech talent in record time. Their pre-screening process saved us countless hours of interviews.",
                image: "/placeholder.svg?height=80&width=80&key=sarah",
              },
              {
                name: "Michael Chen",
                position: "CEO, GrowthPartners",
                quote:
                  "We've hired multiple roles through Copora and have been consistently impressed with the quality of candidates and the level of service.",
                image: "/placeholder.svg?height=80&width=80&key=michael",
              },
              {
                name: "Jessica Williams",
                position: "Operations Manager, HealthPlus",
                quote:
                  "Finding qualified healthcare professionals was a challenge until we partnered with Copora. Their specialized talent pool is exceptional.",
                image: "/placeholder.svg?height=80&width=80&key=jessica",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4
                      className="font-bold text-[#0a2540]"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className="text-sm text-gray-500"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <p
                  className="text-gray-600 italic"
                  style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  }}
                >
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#032541] to-[#0a2540] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Ready to Find Your Perfect Talent Match?
            </h2>
            <p
              className="text-lg text-gray-200 mb-8"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Join thousands of businesses that have found the right talent
              through Copora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#0AB5B5] hover:bg-[#099999] text-white py-3 px-8 rounded-full transition-colors text-center"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Contact Our Team
              </Link>
              {/* <Link
                href="/post-job"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0a2540] text-white py-3 px-8 rounded-full transition-colors text-center"
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Post a Job
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-[#0a2540] mb-4"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-gray-600 max-w-3xl mx-auto"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              Find answers to common questions about our talent acquisition
              services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How does your talent matching process work?",
                answer:
                  "Our talent matching process combines AI-powered algorithms with human expertise. We analyze your requirements and match them with candidates from our pre-screened talent pool based on skills, experience, and cultural fit.",
              },
              {
                question: "What industries do you specialize in?",
                answer:
                  "We specialize in a wide range of industries including Technology, Finance, Healthcare, Education, Retail, Manufacturing, and more. Our talent pool includes professionals across various specializations within these industries.",
              },
              {
                question:
                  "How quickly can I expect to find suitable candidates?",
                answer:
                  "Most clients receive their first batch of matched candidates within 48-72 hours of submitting their requirements. The time to hire depends on the specificity of your requirements and the availability of suitable candidates.",
              },
              {
                question: "What is your pricing structure?",
                answer:
                  "We offer flexible pricing models including success-based fees, subscription plans, and custom packages tailored to your hiring volume and requirements. Contact our team for a personalized quote.",
              },
              {
                question: "Do you offer any guarantees?",
                answer:
                  "Yes, we offer a satisfaction guarantee. If a placed candidate doesn't meet your expectations within the first 30 days, we'll find a replacement at no additional cost.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <summary
                  className="flex justify-between items-center p-6 cursor-pointer"
                  style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  }}
                >
                  <h3 className="text-lg font-medium text-[#0a2540]">
                    {faq.question}
                  </h3>
                  <span className="ml-6 flex-shrink-0 text-[#0AB5B5] group-open:rotate-180 transition-transform">
                    <ChevronRight className="h-5 w-5 transform rotate-90" />
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily:
                        "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
