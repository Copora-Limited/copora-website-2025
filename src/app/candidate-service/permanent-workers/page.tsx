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

export default function PermanentWorkersPage() {
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
      title: "Career Stability",
      description:
        "Build a long-term career with organizations that value your contributions and invest in your growth.",
      image: "/images/career-stability.jpg",
    },
    {
      id: "2",
      title: "Comprehensive Benefits",
      description:
        "Access full benefits packages including healthcare, retirement plans, and paid time off.",
      image: "/images/comprehensive-benefits.jpg",
    },
    {
      id: "3",
      title: "Professional Development",
      description:
        "Take advantage of training and advancement opportunities to grow your skills and career.",
      image: "/images/professional-development.jpg",
    },
    {
      id: "4",
      title: "Company Culture",
      description:
        "Become an integral part of an organization's culture and contribute to its long-term success.",
      image: "/images/company-culture.jpg",
    },
    {
      id: "5",
      title: "Work-Life Balance",
      description:
        "Enjoy predictable schedules and policies that support a healthy work-life balance.",
      image: "/images/work-life-balance.jpg",
    },
  ];

  // Tabs data for permanent roles section
  const permanentRolesTabs = [
    {
      title: "Career Path Planning",
      content:
        "We help you map out your long-term career goals and identify permanent positions that align with your aspirations.",
      image: "/images/talent-optimization/career-path-planning.jpg",
    },
    {
      title: "Exclusive Opportunities",
      content:
        "Access our network of unadvertised permanent positions with top employers across various industries.",
      image: "/images/talent-optimization/exclusive-opportunities.jpg",
    },
    {
      title: "Interview Preparation",
      content:
        "Receive comprehensive coaching to help you excel in interviews for permanent roles.",
      image: "/images/talent-optimization/interview-preparation.jpg",
    },
    {
      title: "Salary Negotiation",
      content:
        "Benefit from our expertise in negotiating competitive compensation packages for permanent positions.",
      image: "/images/talent-optimization/salary-negotiation.jpg",
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative w-full min-h-[80vh] pt-[72px] bg-[#0a2540] bg-cover bg-center"
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
                Permanent Workers
              </div>
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Build a Stable, Rewarding Career
              </h1>
              <p
                className="text-white/90 text-base md:text-lg"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Find long-term roles that offer stability, growth opportunities,
                and comprehensive benefits packages with top employers across
                various industries.
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
                src="/images/permanent-workers-hero.jpg"
                alt="Professional in permanent role"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Permanent Roles Section */}
      <section ref={nextSectionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0a2540] mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Your Path to Permanent Employment
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              We connect talented professionals with rewarding permanent
              positions that offer stability, growth potential, and
              comprehensive benefits.
            </p>
          </div>

          <TalentOptimizationTabs tabs={permanentRolesTabs} />
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="relative w-full py-24 bg-cover bg-center flex items-center justify-center">
        <Image
          src="/images/vector-bg.png"
          alt="Professional office environment"
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
              Build your future with a stable career
            </h2>
            <p
              className="text-white/90 text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Permanent positions offer the stability, benefits, and growth
              opportunities you need to build a fulfilling long-term career and
              achieve your professional goals.
            </p>
          </div>
        </div>
      </section>

      {/* Card Stack Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <CardStackContainer
            title="Benefits of permanent employment"
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
            title="Find Your Ideal Permanent Role"
            description="Our extensive network and industry expertise help you find permanent positions that match your skills, experience, and career goals. Let us help you take the next step in your professional journey."
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
