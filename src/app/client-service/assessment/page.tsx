"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import TalentOptimizationTabs from "@/components/talent-optimization-tabs";
import CardStackContainer from "@/components/card-stack-container";
import InfoGraphics from "@/components/info-graphics";
import HoverCardTagline from "@/components/hover-card-tagline";
import ContactDrawer from "@/components/contact-drawer";

export default function AssessmentPage() {
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 500], [0, 0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Card data for the card stack section
  const cardData = [
    {
      id: "1",
      title: "Technical Skills Assessment",
      description:
        "Evaluate candidates' technical abilities with precision through our comprehensive skills assessment tools.",
      image: "/images/talent-optimization/technical-skills-assessment.jpg",
    },
    {
      id: "2",
      title: "Behavioral Analysis",
      description:
        "Understand how candidates will perform in real-world scenarios with our behavioral assessments.",
      image: "/images/talent-optimization/behavioral-analysis.jpg",
    },
    {
      id: "3",
      title: "Cultural Fit Evaluation",
      description:
        "Ensure candidates align with your organization's values and work environment.",
      image: "/images/talent-optimization/cultural-fit-evaluation.jpg",
    },
    {
      id: "4",
      title: "Cognitive Ability Testing",
      description:
        "Measure problem-solving abilities, critical thinking, and learning potential.",
      image: "/images/talent-optimization/cognitive-ability.jpg",
    },
    {
      id: "5",
      title: "Personality Profiling",
      description:
        "Gain insights into candidates' work styles, motivations, and interpersonal dynamics.",
      image: "/images/talent-optimization/personality-profiling.jpg",
    },
  ];

  // Tabs data for assessment methods section
  const assessmentTabs = [
    {
      title: "Comprehensive Skill Evaluation",
      content:
        "Our multi-dimensional assessment approach evaluates technical skills, soft skills, and cultural fit to provide a complete picture of each candidate.",
      image: "/images/talent-optimization/evaluation.jpg",
    },
    {
      title: "Data-Driven Insights",
      content:
        "We leverage advanced analytics to provide actionable insights about candidates' strengths, weaknesses, and potential.",
      image: "/images/talent-optimization/data-driven-insights.jpg",
    },
    {
      title: "Customized Assessment Design",
      content:
        "We create tailored assessment processes that align with your specific role requirements and company culture.",
      image: "/images/talent-optimization/customized-assessment-design.jpg",
    },
    {
      title: "Objective Decision Support",
      content:
        "Our assessment tools help eliminate bias and provide objective data to support your hiring decisions.",
      image: "/images/talent-optimization/objective-decision-support.jpg",
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative w-full min-h-[80vh] pt-[32px] bg-[#0a2540] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/vector-bg-blue.png')",
        }}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex flex-col-reverse md:flex-row items-center h-full py-12">
            <div className="w-full md:w-1/2 flex flex-col justify-start items-start gap-4 md:gap-6 z-10">
              <div
                className="text-[#0AB5B5] text-lg"
                style={{ fontFamily: "var(--font-medium)" }}
              >
                Assessment Solutions
              </div>
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Make Data-Driven Hiring Decisions
              </h1>
              <p
                className="text-white/90 text-base md:text-lg"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Our comprehensive assessment solutions help you evaluate
                candidates' technical skills, soft skills, and cultural fit to
                ensure you make the right hiring decisions every time.
              </p>
              <button
                onClick={toggleDrawer}
                className="mt-4 px-8 py-3 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] transition-colors"
                style={{ fontFamily: "var(--font-medium)" }}
              >
                Talk to us
              </button>
            </div>
            <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative mb-8 md:mb-0">
              <Image
                src="/images/project-teams.jpg"
                alt="Professional assessment process"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Methods Section */}
      <section ref={nextSectionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0a2540] mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Our Assessment Methodology
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              We combine cutting-edge assessment tools with human expertise to
              provide a comprehensive evaluation of candidates, helping you
              identify the best talent for your organization.
            </p>
          </div>

          <TalentOptimizationTabs tabs={assessmentTabs} />
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="relative w-full py-24 bg-cover bg-center flex items-center justify-center">
        <Image
          src="/images/manreading.jpg"
          alt="Assessment process visualization"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              The right assessment tools lead to the right hiring decisions
            </h2>
            <p
              className="text-white/90 text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our assessment solutions provide objective data and insights that
              help you identify candidates who will excel in their roles and
              contribute to your organization's success.
            </p>
          </div>
        </div>
      </section>

      {/* Card Stack Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <CardStackContainer
            title="Our comprehensive assessment solutions"
            cards={cardData}
            defaultOpen={0}
          />
        </div>
      </section>

      {/* Info Graphics Section */}
      <section
        className="py-16 md:py-24 bg-[#0a2540] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/vector-bg.png')",
        }}
      >
        <div className="container mx-auto px-6">
          <InfoGraphics
            title="Elevate Your Hiring Process"
            description="Our assessment solutions provide deep insights into candidates' capabilities, helping you make informed hiring decisions that lead to better outcomes for your organization. Let us help you identify the right talent for your specific needs."
            btnText="Talk to us"
            onButtonClick={toggleDrawer}
          />
        </div>
      </section>

      {/* Hover Card Tagline Section */}
      <motion.section
        style={{ y: yTransform }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <HoverCardTagline />
        </div>
      </motion.section>

      {/* Contact Drawer */}
      <ContactDrawer open={drawerOpen} onClose={toggleDrawer} />

      <Footer />
    </main>
  );
}
