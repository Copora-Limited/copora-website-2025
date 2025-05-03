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

export default function TemporaryWorkerPage() {
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
      title: "Flexibility",
      description:
        "Enjoy the freedom to choose when and where you work, creating a schedule that fits your lifestyle.",
      image: "/images/temp-flexibility.jpg",
    },
    {
      id: "2",
      title: "Diverse Experience",
      description:
        "Build a varied skill set by working in different roles, industries, and company cultures.",
      image: "/images/diverse-experience.jpg",
    },
    {
      id: "3",
      title: "Competitive Pay",
      description:
        "Access high-paying contract positions that often offer premium rates for specialized skills.",
      image: "/images/competitive-pay.jpg",
    },
    {
      id: "4",
      title: "Rapid Placement",
      description:
        "Get to work quickly with our streamlined process for temporary role placement.",
      image: "/images/rapid-placement.jpg",
    },
    {
      id: "5",
      title: "Potential for Permanence",
      description:
        "Many temporary positions can lead to permanent opportunities as you prove your value.",
      image: "/images/potential-for-permanence.jpg",
    },
  ];

  // Tabs data for temporary work section
  const temporaryWorkTabs = [
    {
      title: "Short-Term Assignments",
      content:
        "Access project-based roles that allow you to work for specific periods while maintaining flexibility in your schedule.",
      image: "/images/talent-optimization/shot-term-assignment.jpg",
    },
    {
      title: "Seasonal Opportunities",
      content:
        "Take advantage of high-demand seasonal positions that offer competitive pay during peak business periods.",
      image: "/images/talent-optimization/seasonal-opportunities.jpg",
    },
    {
      title: "Temp-to-Perm Pathways",
      content:
        "Start in temporary roles that have the potential to convert to permanent positions.",
      image: "/images/talent-optimization/temp-to-perm-pathways.jpg",
    },
    {
      title: "Specialized Contract Work",
      content:
        "Leverage your expertise in high-demand temporary roles that value your specialized skills.",
      image: "/images/talent-optimization/specialized-contract-work.jpg",
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
                Temporary Worker
              </div>
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Flexibility and Variety in Your Career
              </h1>
              <p
                className="text-white/90 text-base md:text-lg"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Explore short-term and project-based roles that offer
                competitive rates, diverse experiences, and work-life balance
                tailored to your preferences.
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
                src="/images/temporary-worker-hero.jpg"
                alt="Professional in temporary role"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Temporary Work Section */}
      <section ref={nextSectionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0a2540] mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Temporary Work Opportunities
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              We connect professionals with rewarding temporary positions that
              offer flexibility, competitive pay, and opportunities to expand
              your skills and experience.
            </p>
          </div>

          <TalentOptimizationTabs tabs={temporaryWorkTabs} />
        </div>
      </section>

      {/* Full-width Image Section */}

      <section
        className=" relative w-full py-24 bg-cover  bg-[#0a2540] bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/vector-bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Work on your terms
            </h2>
            <p
              className="text-white/90 text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Temporary work offers the flexibility to balance your career with
              other priorities while building a diverse portfolio of skills and
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Card Stack Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <CardStackContainer
            title="Benefits of temporary work"
            cards={cardData}
            defaultOpen={0}
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
