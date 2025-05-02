"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientService() {
  const [activeService, setActiveService] = useState("high-volume");

  const services = [
    {
      id: "high-volume",
      title: "High-Volume Hiring",
      description:
        "At Copora, we provide dynamic contingent staffing solutions designed to empower your workforce and drive business success.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Unlock the power of fast, efficient high-volume hiring
          </h3>
          <p className="text-white/80 mb-6">
            Scale your workforce quickly with our streamlined high-volume hiring
            solutions. We handle the entire process from sourcing to onboarding.
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
                Rapid candidate screening and selection
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
                Bulk processing of applications
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
                Efficient onboarding automation
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "early-stage",
      title: "Early-Stage Professionals",
      description:
        "Invest in emerging talent that grows with your company. Our early-stage professionals bring fresh perspectives and adaptability.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Future-proof your business by hiring early-stage professionals
          </h3>
          <p className="text-white/80 mb-6">
            Invest in emerging talent that grows with your company. Our
            early-stage professionals bring fresh perspectives and adaptability.
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
                Access to top graduate talent
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
                Customized training programs
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
                Mentorship and development pathways
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "permanent-staffing",
      title: "Permanent Staffing Solutions",
      description:
        "Build a stable, committed workforce with our permanent staffing solutions. We find candidates who align with your company culture and long-term goals.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Strengthen your business with permanent hires
          </h3>
          <p className="text-white/80 mb-6">
            Build a stable, committed workforce with our permanent staffing
            solutions. We find candidates who align with your company culture
            and long-term goals.
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
              <span className="text-white/80">Thorough candidate vetting</span>
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
              <span className="text-white/80">Culture-fit assessment</span>
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
                Long-term retention strategies
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "talent-workforce",
      title: "Talent Workforce Solutions",
      description:
        "Access specialized talent on-demand with our flexible workforce solutions. Scale your team up or down based on project needs.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Simplify and scale with our workforce solutions
          </h3>
          <p className="text-white/80 mb-6">
            Access specialized talent on-demand with our flexible workforce
            solutions. Scale your team up or down based on project needs.
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
              <span className="text-white/80">Flexible staffing models</span>
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
              <span className="text-white/80">Specialized skill matching</span>
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
              <span className="text-white/80">Project-based team assembly</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "assessments",
      title: "Assessments",
      description:
        "We provide you with tools to highlight your strengths through evaluations of technical skills, soft skills, and cultural fit.",
      content: (
        <div className="mt-6 hidden">
          <h3 className="text-2xl font-bold mb-4">
            Showcase your potential with tailored assessments
          </h3>
          <p className="text-white/80 mb-6">
            We provide you with tools to highlight your strengths through
            evaluations of technical skills, soft skills, and cultural fit,
            opening doors to the right roles for you.
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
                Comprehensive skill evaluations
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
              <span className="text-white/80">Cultural fit analysis</span>
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
                Personalized feedback reports
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
    <section className="bg-[#0a2540] text-white py-16 min-h-screen relative ">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Left side */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Best Talent Solutions
            </h2>

            <Link
              href="/find-talent"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] font-medium"
            >
              Find Best Talent
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
      <div className="gradient-wrapper absolute -bottom-24 left-0 w-full">
        <div className="gradient-style ribbon-white h-24 w-full bg-no-repeat bg-cover bg-bottom"></div>
      </div>
    </section>
  );
}
