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

export default function PermanentStaffingPage() {
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
      title: "Human-Centric Approach",
      description:
        "We prioritize people in every interaction, creating personalized experiences for both clients and candidates.",
      image: "/images/slider/1.jpg",
    },
    {
      id: "2",
      title: "Collaboration",
      description:
        "We work together with clients and candidates to achieve shared goals and create mutual success.",
      image: "/images/slider/2.jpg",
    },
    {
      id: "3",
      title: "Flexibility",
      description:
        "We adapt our approach to meet the unique needs of each client and candidate we serve.",
      image: "/images/slider/3.jpg",
    },
    {
      id: "4",
      title: "Commitment to Excellence",
      description:
        "We strive for the highest standards in everything we do, delivering exceptional results.",
      image: "/images/slider/4.jpg",
    },
    {
      id: "5",
      title: "Innovation",
      description:
        "We continuously evolve our methods and technologies to stay ahead in the ever-changing talent landscape.",
      image: "/images/slider/5.jpg",
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
                Permanent Staff Solutions
              </div>
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Transform Your Talent Acquisition
              </h1>
              <p
                className="text-white/90 text-base md:text-lg"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Get flexible, skilled talent with Copora&apos;s dynamic staffing
                solutions. Our scalable approach reduces risks and helps you
                reach your goals. Empower your workforce with Copora.
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
                src="/images/permanent-staffing-hero.jpg"
                alt="Professional team meeting"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Talent Optimization Section */}
      <section ref={nextSectionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0a2540] mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Comprehensive Solutions for Talent Optimization
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our talent optimization strategies are designed to help you build
              and maintain a high-performing workforce that drives business
              success.
            </p>
          </div>

          <TalentOptimizationTabs tabs={workforceTabs} />
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="w-full py-24 bg-cover bg-center flex items-center justify-center">
        <Image
          src="/images/trading-view.jpg"
          alt="Professional business environment"
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
              A strong employer brand attracts top talent, especially new
              professionals.
            </h2>
            <p
              className="text-white/90 text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our comprehensive approach ensures deep, lasting change by
              addressing root causes and developing proven solutions that work
              the first time.
            </p>
          </div>
        </div>
      </section>

      {/* Card Stack Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <CardStackContainer
            title="We believe in a collaborative journey that drives growth and success for all."
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
            title="Empowering Your Business"
            description="At Copora, we provide flexible, cost-effective contingent staffing solutions tailored to your business needs. Maximize your potential with a workforce aligned to your goals."
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
