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

export default function TalentWorkforcePage() {
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
      title: "Flexible Staffing Models",
      description:
        "Adapt your workforce to changing business needs with our flexible staffing solutions.",
      image: "/images/flexible-staffing.jpg",
    },
    {
      id: "2",
      title: "Specialized Skill Matching",
      description:
        "Access professionals with the exact skills your projects require, when you need them.",
      image: "/images/skill-matching.jpg",
    },
    {
      id: "3",
      title: "Project-Based Teams",
      description:
        "Assemble complete teams tailored to your specific project requirements.",
      image: "/images/project-teams.jpg",
    },
    {
      id: "4",
      title: "Scalable Solutions",
      description:
        "Easily scale your workforce up or down based on business demands.",
      image: "/images/scalable-solutions.jpg",
    },
    {
      id: "5",
      title: "Reduced Administrative Burden",
      description:
        "We handle the complexities of workforce management, allowing you to focus on your core business.",
      image: "/images/reduced-admin.jpg",
    },
  ];

  // Tabs data for workforce solutions section
  const workforceTabs = [
    {
      title: "On-Demand Talent Access",
      content:
        "Gain immediate access to specialized professionals when you need them, without the long-term commitment of traditional hiring.",
      image: "/images/talent-optimization/on-demand-talent-access.jpg",
    },
    {
      title: "Strategic Workforce Planning",
      content:
        "We help you develop a comprehensive workforce strategy that aligns with your business objectives and adapts to changing needs.",
      image: "/images/talent-optimization/strategic-workforce-planning.jpg",
    },
    {
      title: "Managed Service Solutions",
      content:
        "Our end-to-end managed service offerings provide complete oversight of your contingent workforce.",
      image: "/images/talent-optimization/managed-service-solutions.jpg",
    },
    {
      title: "Workforce Analytics",
      content:
        "Gain valuable insights into your workforce performance, utilization, and costs to optimize your talent strategy.",
      image: "/images/talent-optimization/workforce-analytics.jpg",
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
                Talent Workforce Solutions
              </div>
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Flexible Talent for Dynamic Business Needs
              </h1>
              <p
                className="text-white/90 text-base md:text-lg"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Access specialized talent on-demand with our flexible workforce
                solutions. Scale your team up or down based on project needs
                while maintaining quality and efficiency.
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
                src="/images/talent-workforce-hero.jpg"
                alt="Diverse professional team"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workforce Solutions Section */}
      <section ref={nextSectionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0a2540] mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Agile Workforce Solutions
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our talent workforce solutions provide the flexibility, expertise,
              and efficiency your business needs to thrive in today's dynamic
              market environment.
            </p>
          </div>

          <TalentOptimizationTabs tabs={workforceTabs} />
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="w-full py-24 bg-cover bg-center flex items-center justify-center">
        <Image
          src="/images/peoplemeeting.jpg"
          alt="Collaborative professional environment"
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
              The right talent at the right time
            </h2>
            <p
              className="text-white/90 text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our talent workforce solutions give you access to specialized
              skills when you need them, helping you maintain agility and
              competitiveness in a rapidly changing business landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Card Stack Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <CardStackContainer
            title="Benefits of our talent workforce solutions"
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
            title="Transform Your Workforce Strategy"
            description="Our talent workforce solutions help you build a more agile, efficient, and effective organization. Let us help you access the specialized skills you need, when you need them, without the overhead of traditional hiring."
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
