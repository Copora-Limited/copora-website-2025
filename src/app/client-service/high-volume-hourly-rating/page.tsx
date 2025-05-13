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

export default function HighVolumeHourlyPage() {
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
      title: "Rapid Scaling",
      description:
        "Quickly scale your workforce up or down to meet seasonal demands or business growth.",
      image: "/images/rapid-scaling.jpg",
    },
    {
      id: "2",
      title: "Quality Consistency",
      description:
        "Maintain consistent quality standards across large volumes of hires.",
      image: "/images/computer.jpg",
    },
    {
      id: "3",
      title: "Streamlined Processes",
      description:
        "Benefit from our efficient, technology-enabled recruitment and onboarding processes.",
      image: "/images/streamlined-processes.jpg",
    },
    {
      id: "4",
      title: "Cost Efficiency",
      description:
        "Optimize your recruitment budget with our volume-based hiring solutions that reduce cost-per-hire.",
      image: "/images/cost-efficiency.jpg",
    },
    {
      id: "5",
      title: "Compliance Management",
      description:
        "We ensure all hiring processes comply with relevant regulations and standards.",
      image: "/images/compliance-management.jpg",
    },
  ];

  // Tabs data for high volume hiring section
  const highVolumeTabs = [
    {
      title: "Mass Recruitment Campaigns",
      content:
        "We design and execute large-scale recruitment campaigns that efficiently attract and process high volumes of candidates.",
      image: "/images/talent-optimization/mass-recruitment-campaigns.jpg",
    },
    {
      title: "Automated Screening",
      content:
        "Our technology-enabled screening processes quickly identify qualified candidates from large applicant pools.",
      image: "/images/talent-optimization/job-screening.jpg",
    },
    {
      title: "Bulk Onboarding",
      content:
        "We streamline the onboarding process for large groups of new hires, ensuring efficiency and compliance.",
      image: "/images/talent-optimization/bulk-onboarding.jpg",
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
                High Volume Hourly Rating
              </div>
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Efficient Large-Scale Hiring Solutions
              </h1>
              <p
                className="text-white/90 text-base md:text-lg"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Whether you're facing seasonal peaks or long-term growth, we
                provide a streamlined process to hire top talent quickly,
                ensuring your workforce keeps pace with business demands.
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
                src="/images/showingmeet.jpg"
                alt="Large team of professionals"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* High Volume Solutions Section */}
      <section ref={nextSectionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0a2540] mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Scalable Hiring Solutions
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our high-volume hourly rating solutions combine technology,
              expertise, and proven processes to help you efficiently hire large
              numbers of qualified candidates.
            </p>
          </div>

          <TalentOptimizationTabs tabs={highVolumeTabs} />
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="w-full py-24 bg-cover bg-center flex items-center justify-center">
        <Image
          src="/images/twolooking.jpg"
          alt="Large-scale recruitment process"
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
              Scale your workforce without sacrificing quality
            </h2>
            <p
              className="text-white/90 text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our high-volume hiring solutions help you quickly build a
              qualified workforce while maintaining consistency, quality, and
              compliance throughout the process.
            </p>
          </div>
        </div>
      </section>

      {/* Card Stack Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <CardStackContainer
            title="Benefits of our high-volume hiring solutions"
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
            title="Transform Your High-Volume Hiring"
            description="Our high-volume hourly rating solutions help you efficiently manage large-scale recruitment needs while maintaining quality and compliance. Let us help you build a scalable workforce strategy that adapts to your business demands."
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
