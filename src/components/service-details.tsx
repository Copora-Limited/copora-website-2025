/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UsersIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  PresentationChartBarIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

interface ServiceDetailsProps {
  activeTab: "hiring" | "freelancers";
}

export default function ServiceDetails({ activeTab }: ServiceDetailsProps) {
  if (activeTab === "hiring") {
    return <ClientServiceDetails />;
  } else {
    return <CandidateServiceDetails />;
  }
}

function ClientServiceDetails() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  const [pathLengths, setPathLengths] = useState<number[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    // Initialize visibility array
    setVisibleSections(new Array(5).fill(false));

    // Calculate path lengths for animation
    const lengths = pathRefs.current.map((path) =>
      path ? path.getTotalLength() : 0
    );
    setPathLengths(lengths);

    // Play videos when they come into view
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            video
              .play()
              .catch((error) => console.error("Error playing video:", error));
          } else {
            const video = entry.target as HTMLVideoElement;
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    // Track section visibility for line animation
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setVisibleSections((prev) => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" }
    );

    videoRefs.current.forEach((video) => {
      if (video) videoObserver.observe(video);
    });

    sectionRefs.current.forEach((section) => {
      if (section) sectionObserver.observe(section);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) videoObserver.unobserve(video);
      });
      sectionRefs.current.forEach((section) => {
        if (section) sectionObserver.unobserve(section);
      });
    };
  }, []);

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* SVG connecting line */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Path 1: First to Second */}
          <path
            ref={(el) => {
              if (el) pathRefs.current[0] = el;
            }}
            d="M 50% 20% C 75% 20%, 75% 40%, 50% 40%"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          <path
            ref={(el) => {
              if (el) pathRefs.current[0] = el;
            }}
            d="M 50% 20% C 75% 20%, 75% 40%, 50% 40%"
            fill="none"
            stroke="#0AB5B5"
            strokeWidth="2"
            strokeDasharray={pathLengths[0]}
            strokeDashoffset={visibleSections[0] ? 0 : pathLengths[0]}
            className="transition-all duration-1000 ease-out"
          />

          {/* Path 2: Second to Third */}
          <path
            ref={(el) => {
              if (el) pathRefs.current[1] = el;
            }}
            d="M 50% 40% C 25% 40%, 25% 60%, 50% 60%"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          <path
            d="M 50% 40% C 25% 40%, 25% 60%, 50% 60%"
            fill="none"
            stroke="#0AB5B5"
            strokeWidth="2"
            strokeDasharray={pathLengths[1]}
            strokeDashoffset={visibleSections[1] ? 0 : pathLengths[1]}
            className="transition-all duration-1000 ease-out"
          />

          {/* Path 3: Third to Fourth */}
          <path
            ref={(el) => {
              if (el) pathRefs.current[2] = el;
            }}
            d="M 50% 60% C 75% 60%, 75% 80%, 50% 80%"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          <path
            d="M 50% 60% C 75% 60%, 75% 80%, 50% 80%"
            fill="none"
            stroke="#0AB5B5"
            strokeWidth="2"
            strokeDasharray={pathLengths[2]}
            strokeDashoffset={visibleSections[2] ? 0 : pathLengths[2]}
            className="transition-all duration-1000 ease-out"
          />

          {/* Path 4: Fourth to Fifth */}
          <path
            ref={(el) => {
              if (el) pathRefs.current[3] = el;
            }}
            d="M 50% 80% C 25% 80%, 25% 95%, 50% 95%"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          <path
            d="M 50% 80% C 25% 80%, 25% 95%, 50% 95%"
            fill="none"
            stroke="#0AB5B5"
            strokeWidth="2"
            strokeDasharray={pathLengths[3]}
            strokeDashoffset={visibleSections[3] ? 0 : pathLengths[3]}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6">
        {/* High-Volume Hiring */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[0] = el;
          }}
          className="flex flex-col md:flex-row items-center mb-10 gap-8 relative  border-b"
        >
          <motion.div
            className="w-full md:w-1/2 "
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <UsersIcon className="w-5 h-5 mr-2 text-[#0F6CBD]" />
              High-Volume Hourly Rate Hiring
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Unlock the power of fast, efficient high-volume hiring
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Whether you're facing seasonal peaks or long-term growth, we
              provide a streamlined process to hire top talent quickly, ensuring
              your workforce keeps pace with business demands.
            </p>

            <ul
              className="mb-6 space-y-2 text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-center font-azoSansMedium">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Rapid identification of qualified candidates for immediate
                  roles
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Reduced time-to-hire, minimizing operational delays
                </span>
              </li>
            </ul>
            <Link
              href="/high-volume-hiring"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[0] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/G.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Early-Stage Professionals */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[1] = el;
          }}
          className="flex flex-col md:flex-row-reverse items-center mb-10 gap-8 relative border-b"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <BriefcaseIcon className="w-5 h-5 mr-2 " />
              Early-Stage Professionals
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Future-proof your business by hiring early-stage professionals
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              We help you attract and nurture young talent, building a pipeline
              of fresh, innovative thinkers who will drive your company's
              long-term success.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Cost-effective hiring for entry-level roles
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Scalable hiring to meet seasonal demands
                </span>
              </li>
            </ul>
            <Link
              href="/early-stage-professionals"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[1] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/C.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Permanent Staffing */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[2] = el;
          }}
          className="flex flex-col md:flex-row items-center mb-10 gap-8 relative border-b"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-[#C50F1F]" />
              Permanent Staffing Solutions
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Strengthen your business with permanent hires
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Build a stable, committed workforce with our permanent staffing
              solutions. We find candidates who align with your company culture
              and long-term goals.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Thorough candidate vetting and culture-fit assessment
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Long-term retention strategies and support
                </span>
              </li>
            </ul>
            <Link
              href="/permanent-staffing"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[2] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/A.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Talent Workforce */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[3] = el;
          }}
          className="flex flex-col md:flex-row-reverse items-center mb-10 gap-8 relative border-b"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <PresentationChartBarIcon className="w-5 h-5 mr-2 text-[#0F548C]" />
              Talent Workforce Solutions
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Simplify and scale with our workforce solutions
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Access specialized talent on-demand with our flexible workforce
              solutions. Scale your team up or down based on project needs.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Flexible staffing models and specialized skill matching
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Project-based team assembly and management
                </span>
              </li>
            </ul>
            <Link
              href="/talent-workforce"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[3] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/E.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Assessments */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[4] = el;
          }}
          className="flex flex-col md:flex-row items-center gap-8 relative"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <PencilIcon className="w-5 h-5 mr-2 " />
              Assessments
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Make data-driven hiring decisions with our assessment tools
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our comprehensive assessment solutions help you evaluate
              candidates' technical skills, soft skills, and cultural fit to
              ensure you make the right hiring decisions.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Comprehensive skill evaluations and testing
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Personality and cultural fit analysis
                </span>
              </li>
            </ul>
            <Link
              href="/assessments"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[4] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/F.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CandidateServiceDetails() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  const [pathLengths, setPathLengths] = useState<number[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    // Initialize visibility array
    setVisibleSections(new Array(5).fill(false));

    // Calculate path lengths for animation
    const lengths = pathRefs.current.map((path) =>
      path ? path.getTotalLength() : 0
    );
    setPathLengths(lengths);

    // Play videos when they come into view
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            video
              .play()
              .catch((error) => console.error("Error playing video:", error));
          } else {
            const video = entry.target as HTMLVideoElement;
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    // Track section visibility for line animation
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setVisibleSections((prev) => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" }
    );

    videoRefs.current.forEach((video) => {
      if (video) videoObserver.observe(video);
    });

    sectionRefs.current.forEach((section) => {
      if (section) sectionObserver.observe(section);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) videoObserver.unobserve(video);
      });
      sectionRefs.current.forEach((section) => {
        if (section) sectionObserver.unobserve(section);
      });
    };
  }, []);

  return (
    <section className="bg-white py-16 relative">
      {/* SVG connecting line */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Path 1: First to Second */}
          <path
            ref={(el) => {
              if (el) pathRefs.current[0] = el;
            }}
            d="M 50% 20% C 75% 20%, 75% 40%, 50% 40%"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          <path
            ref={(el) => {
              if (el) pathRefs.current[0] = el;
            }}
            d="M 50% 20% C 75% 20%, 75% 40%, 50% 40%"
            fill="none"
            stroke="#0AB5B5"
            strokeWidth="2"
            strokeDasharray={pathLengths[0]}
            strokeDashoffset={visibleSections[0] ? 0 : pathLengths[0]}
            className="transition-all duration-1000 ease-out"
          />

          {/* Path 2: Second to Third */}
          <path
            ref={(el) => {
              if (el) pathRefs.current[1] = el;
            }}
            d="M 50% 40% C 25% 40%, 25% 60%, 50% 60%"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          <path
            d="M 50% 40% C 25% 40%, 25% 60%, 50% 60%"
            fill="none"
            stroke="#0AB5B5"
            strokeWidth="2"
            strokeDasharray={pathLengths[1]}
            strokeDashoffset={visibleSections[1] ? 0 : pathLengths[1]}
            className="transition-all duration-1000 ease-out"
          />

          {/* Path 3: Third to Fourth */}
          <path
            ref={(el) => {
              if (el) pathRefs.current[2] = el;
            }}
            d="M 50% 60% C 75% 60%, 75% 80%, 50% 80%"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          <path
            d="M 50% 60% C 75% 60%, 75% 80%, 50% 80%"
            fill="none"
            stroke="#0AB5B5"
            strokeWidth="2"
            strokeDasharray={pathLengths[2]}
            strokeDashoffset={visibleSections[2] ? 0 : pathLengths[2]}
            className="transition-all duration-1000 ease-out"
          />

          {/* Path 4: Fourth to Fifth */}
          <path
            ref={(el) => {
              if (el) pathRefs.current[3] = el;
            }}
            d="M 50% 80% C 25% 80%, 25% 95%, 50% 95%"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          <path
            d="M 50% 80% C 25% 80%, 25% 95%, 50% 95%"
            fill="none"
            stroke="#0AB5B5"
            strokeWidth="2"
            strokeDasharray={pathLengths[3]}
            strokeDashoffset={visibleSections[3] ? 0 : pathLengths[3]}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 overflow-hidden">
        {/* Permanent Roles */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[0] = el;
          }}
          className="flex flex-col md:flex-row items-center mb-10 gap-8 relative border-b"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-[#C50F1F]" />
              Permanent Roles
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Build a stable career with permanent positions
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Find long-term roles that offer stability, growth opportunities,
              and comprehensive benefits packages with top employers.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Exclusive access to unadvertised positions
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Career path planning and salary negotiation support
                </span>
              </li>
            </ul>
            <Link
              href="/permanent-roles"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[0] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/A.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Contract Work */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[1] = el;
          }}
          className="flex flex-col md:flex-row-reverse items-center mb-10 gap-8 relative border-b"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <BriefcaseIcon className="w-5 h-5 mr-2 " />
              Contract Work
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Flexibility and variety with contract opportunities
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Explore short-term and project-based roles that offer competitive
              rates, diverse experiences, and work-life balance.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  High-paying contract positions with rapid placement
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Continuous pipeline of diverse opportunities
                </span>
              </li>
            </ul>
            <Link
              href="/contract-work"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[1] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/C.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Remote Opportunities */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[2] = el;
          }}
          className="flex flex-col md:flex-row items-center mb-10 gap-8 relative border-b"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <PresentationChartBarIcon className="w-5 h-5 mr-2 text-[#0F548C]" />
              Remote Opportunities
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Work from anywhere with remote positions
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Discover fully remote roles that let you work from your preferred
              location while maintaining a fulfilling career path.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Global opportunities without relocation requirements
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Work-life balance focused roles and training
                </span>
              </li>
            </ul>
            <Link
              href="/remote-opportunities"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[2] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/E.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Career Development */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[3] = el;
          }}
          className="flex flex-col md:flex-row-reverse items-center mb-10 gap-8 relative border-b"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <UsersIcon className="w-5 h-5 mr-2 text-[#0F6CBD]" />
              Career Development
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Accelerate your career growth with our resources
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Access professional development tools, mentorship programs, and
              skill-building resources to advance your career.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Personalized career coaching and training programs
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Resume and interview preparation assistance
                </span>
              </li>
            </ul>
            <Link
              href="/career-development"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[3] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/G.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Skill Assessment */}
        <div
          ref={(el) => {
            if (el) sectionRefs.current[4] = el;
          }}
          className="flex flex-col md:flex-row items-center gap-8 relative"
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg sm:text-2xl font-Crimson text-[#0F6CBD] font-medium mb-2 flex items-center"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              <PencilIcon className="w-5 h-5 mr-2 " />
              Skill Assessment
            </div>
            <h2
              className="text-3xl md:text-44 text-appBlue mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Discover your strengths with our assessment tools
            </h2>
            <p
              className="text-gray-600 text-lg font-inter mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our comprehensive skill assessments help you identify your
              strengths and areas for growth, positioning you for the right
              opportunities.
            </p>
            <ul
              className="space-y-2 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Technical and soft skills evaluations
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">✔</span>
                <span className="text-gray-600">
                  Personalized development plans and feedback
                </span>
              </li>
            </ul>
            <Link
              href="/skill-assessment"
              className="inline-flex items-center justify-center px-5 py-2 border border-primary rounded-full text-primary hover:bg-gray-50"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[4] = el;
              }}
              className="w-full h-auto rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/F.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
