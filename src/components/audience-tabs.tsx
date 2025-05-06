"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AudienceTab = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  conclusion: string;
  imageSrc: string;
  surveyUrl: string;
};

const audienceTabs: AudienceTab[] = [
  {
    id: "companies",
    label: "For Companies",
    title: "Shaping the Future of Career Education",
    subtitle:
      "Companies that invest in early career programs see real results, like:",
    bulletPoints: [
      "Up to 65% reduction in recruitment costs through apprenticeship programs.",
      "Higher retention rates, creating a more stable and loyal workforce.",
      "Enhanced employer branding, showcasing your commitment to social mobility and attracting top talent.",
    ],
    conclusion:
      "Your insights can make a difference in shaping a future where students are equipped for the workforce, and businesses can access skilled, motivated professionals.",
    imageSrc: "/images/career/business-professional.png",
    surveyUrl: "https://www.surveymonkey.com/r/SFLHCLL",
  },
  {
    id: "educators",
    label: "For Educators",
    title: "Partnering with Educators to Shape Career Guidance",
    subtitle:
      "Schools with robust career guidance programs see improved engagement, academic outcomes, and post-graduation success. Here's what we're building:",
    bulletPoints: [
      "Comprehensive Career Resources: Detailed, up-to-date information about industries, roles, and pathways.",
      "Direct Industry Engagement: Connecting students with professionals to make career options tangible and inspiring.",
      "Enhanced Career Guidance: Tools to support schools in developing strong, tailored career guidance programs.",
    ],
    conclusion:
      "Educators are cornerstone of this journey, your experiences and suggestions are invaluable to creating an impactful program that will empower the next generation.",
    imageSrc: "/images/career/educator-professional.png",
    surveyUrl: "https://www.surveymonkey.com/r/SFLHCLL",
  },
  {
    id: "students",
    label: "For Students",
    title: "Shaping Career Education with Your Feedback",
    subtitle:
      "Whether you're certain of your career path or still exploring, your voice matters. Our program offers:",
    bulletPoints: [
      "Career Clarity: Helping you explore different industries and career paths.",
      "Empowerment: Giving you the confidence to make informed decisions",
      "Real-World Experience & Mentorship: Access to work opportunities and guidance from professionals.",
      "Skill Development: Building the skills needed for long-term career success.",
    ],
    conclusion:
      "Share your challenges, experiences, and suggestions. Together, we can create a future where career paths are clearer and more accessible for everyone.",
    imageSrc: "/images/career/student-professional.png",
    surveyUrl: "https://www.surveymonkey.com/r/SFLHCLL",
  },
];

export default function AudienceTabs() {
  const [activeTab, setActiveTab] = useState("companies");

  const activeTabData =
    audienceTabs.find((tab) => tab.id === activeTab) || audienceTabs[0];

  return (
    <section
      className="relative bg-[#002147] text-white overflow-hidden"
      style={{
        backgroundImage: 'url("/images/HeaderBg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-6 pt-16 pb-0">
        {/* Tabs */}
        <div className="flex mb-12 border-b border-white/20">
          {audienceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-3 text-sm md:text-base font-medium transition-colors duration-200 mr-2",
                activeTab === tab.id
                  ? "bg-white text-[#002147] rounded-t-md"
                  : "text-white/80 hover:text-white hover:bg-white/10 rounded-t-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-12 pb-16">
            <div className="text-sm uppercase tracking-wider mb-2">
              Research Phase
            </div>
            <motion.h2
              key={`title-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              {activeTabData.title}
            </motion.h2>

            <motion.p
              key={`subtitle-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/80 mb-6"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              {activeTabData.subtitle}
            </motion.p>

            <motion.div
              key={`bullets-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 mb-6"
            >
              {activeTabData.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-[#0AB5B5] mr-2">►</div>
                  <p
                    className="text-white/90"
                    style={{ fontFamily: "var(--font-regular)" }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.p
              key={`conclusion-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/80 mb-8"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              {activeTabData.conclusion}
            </motion.p>

            <motion.a
              key={`button-${activeTab}`}
              href={activeTabData.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block bg-black hover:bg-black/80 text-white px-6 py-3 rounded-full transition-colors duration-200 mb-8"
            >
              Start survey
            </motion.a>
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0 relative flex items-end">
            <motion.div
              key={`image-${activeTab}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] w-full"
              style={{ marginBottom: 0 }}
            >
              <Image
                src={activeTabData.imageSrc || "/placeholder.svg"}
                alt={`${activeTabData.label} professional`}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
