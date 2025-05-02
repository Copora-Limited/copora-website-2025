"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CandidateService() {
  const [activeService, setActiveService] = useState("permanent-roles");

  const services = [
    {
      id: "permanent-roles",
      title: "Permanent Roles",
      description:
        "Find long-term roles that offer stability, growth opportunities, and comprehensive benefits packages with top employers.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Build a stable career with permanent positions
          </h3>
          <p className="text-white/80 mb-6">
            Find long-term roles that offer stability, growth opportunities, and
            comprehensive benefits packages with top employers.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Exclusive access to unadvertised positions
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Career path planning assistance
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">Salary negotiation support</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "contract-work",
      title: "Contract Work",
      description:
        "Explore short-term and project-based roles that offer competitive rates, diverse experiences, and work-life balance.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Flexibility and variety with contract opportunities
          </h3>
          <p className="text-white/80 mb-6">
            Explore short-term and project-based roles that offer competitive
            rates, diverse experiences, and work-life balance.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                High-paying contract positions
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">Rapid placement process</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Continuous pipeline of opportunities
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "remote-opportunities",
      title: "Remote Opportunities",
      description:
        "Discover fully remote roles that let you work from your preferred location while maintaining a fulfilling career path.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Work from anywhere with remote positions
          </h3>
          <p className="text-white/80 mb-6">
            Discover fully remote roles that let you work from your preferred
            location while maintaining a fulfilling career path.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Global opportunities without relocation
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Work-life balance focused roles
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Remote work best practices training
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "career-development",
      title: "Career Development",
      description:
        "Access professional development tools, mentorship programs, and skill-building resources to advance your career.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Accelerate your career growth with our resources
          </h3>
          <p className="text-white/80 mb-6">
            Access professional development tools, mentorship programs, and
            skill-building resources to advance your career.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Personalized career coaching
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Industry-specific training programs
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Resume and interview preparation
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "skill-assessment",
      title: "Skill Assessment",
      description:
        "Evaluate your technical and soft skills to identify strengths and areas for improvement.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Discover your strengths with our assessment tools
          </h3>
          <p className="text-white/80 mb-6">
            Our comprehensive skill assessments help you identify your strengths
            and areas for growth, positioning you for the right opportunities.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">Technical skill evaluations</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">Soft skills assessment</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#0AB5B5] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white/80">
                Personalized development plans
              </span>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const handleServiceClick = (id: string) => {
    setActiveService(id);
  };

  return (
    <section className="bg-[#0a2540] text-white py-16   ">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Left side */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Career Opportunities
            </h2>

            <Link
              href="/find-jobs"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] font-medium"
            >
              Find Best Jobs
            </Link>
          </div>

          {/* Right side */}
          <div className="w-full md:w-3/5">
            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-l-4 border-transparent pl-4"
                >
                  <button
                    onClick={() => handleServiceClick(service.id)}
                    className={`text-left w-full transition-all duration-300 ${
                      activeService === service.id
                        ? "text-[#0AB5B5] border-l-4 border-[#0AB5B5] -ml-4 pl-4"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <h3 className="text-xl md:text-2xl font-medium">
                      {service.title}
                    </h3>
                  </button>

                  <AnimatePresence>
                    {activeService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/80 mt-2">
                          {service.description}
                        </p>
                        {service.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Ribbon divider using image */}
      {/* <div className="gradient-wrapper absolute -bottom-24 left-0 w-full hidden">
        <div className="gradient-style ribbon-blue h-24 w-full bg-no-repeat bg-cover bg-bottom"></div>
      </div> */}
    </section>
  );
}
