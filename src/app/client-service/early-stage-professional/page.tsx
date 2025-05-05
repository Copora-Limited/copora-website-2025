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

export default function EarlyStageProPage() {
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
      title: "Fresh Perspectives",
      description:
        "Early-stage professionals bring new ideas and innovative approaches to solve your business challenges.",
      image: "/images/talent-optimization/fresh-perspective.jpg",
    },
    {
      id: "2",
      title: "Growth Potential",
      description:
        "Invest in talent that can grow with your company and adapt to evolving business needs.",
      image: "/images/talent-optimization/growth-potential.jpg",
    },
    {
      id: "3",
      title: "Digital Natives",
      description:
        "Leverage the natural digital fluency of professionals who grew up in the technology era.",
      image: "/images/talent-optimization/digital-natives.jpg",
    },
    {
      id: "4",
      title: "Cost Effective",
      description:
        "Build your workforce strategically with talent that offers excellent value and long-term ROI.",
      image: "/images/talent-optimization/cost-effective.jpg",
    },
    {
      id: "5",
      title: "Adaptability",
      description:
        "Early-stage professionals typically demonstrate high adaptability to new environments and challenges.",
      image: "/images/talent-optimization/adaptability.jpg",
    },
  ];

  // Tabs data for talent optimization section
  const talentTabs = [
    {
      title: "Talent Identification",
      content:
        "We identify promising early-stage professionals with the right mix of skills, attitude, and potential to thrive in your organization.",
      image: "/images/talent-optimization/talent-identification.jpg",
    },
    {
      title: "Customized Training",
      content:
        "We provide tailored training programs to equip early-stage professionals with the specific skills needed for your business.",
      image: "/images/talent-optimization/customized-training.jpg",
    },
    {
      title: "Mentorship Programs",
      content:
        "Our mentorship frameworks help accelerate the development of early-stage talent within your organization.",
      image: "/images/talent-optimization/mentorship-program.jpg",
    },
    {
      title: "Career Path Development",
      content:
        "We help design clear career progression paths to retain and motivate your early-stage professionals.",
      image: "/images/talent-optimization/career-path-development.jpg",
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
                Early Stage Professional
              </div>
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Nurture Tomorrow's Leaders Today
              </h1>
              <p
                className="text-white/90 text-base md:text-lg"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Invest in emerging talent that grows with your company. Our
                early-stage professionals bring fresh perspectives,
                adaptability, and the latest skills to drive your business
                forward.
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
                src="/images/early-stage-hero.jpg"
                alt="Young professionals in a collaborative environment"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Talent Development Section */}
      <section ref={nextSectionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0a2540] mb-6"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Developing Future-Ready Talent
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Our early-stage professional program identifies, develops, and
              integrates promising talent into your organization, creating a
              pipeline of skilled professionals ready to grow with your
              business.
            </p>
          </div>

          <TalentOptimizationTabs tabs={talentTabs} />
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="relative w-full py-24 bg-cover bg-center flex items-center justify-center">
        <Image
          src="/images/peoplemeeting.jpg"
          alt="Young professionals collaborating"
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
              Invest in talent today for tomorrow's success
            </h2>
            <p
              className="text-white/90 text-lg"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              Early-stage professionals bring energy, fresh perspectives, and
              cutting-edge knowledge to your organization, creating a dynamic
              workforce ready to tackle future challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Card Stack Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <CardStackContainer
            title="The advantages of investing in early-stage professionals"
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
            title="Build Your Future Workforce"
            description="At Copora, we help you identify, develop, and retain early-stage professionals who will become your organization's future leaders. Our comprehensive approach ensures these professionals integrate seamlessly into your culture and contribute meaningfully from day one."
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
