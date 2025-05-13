"use client";

import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ServiceDetails from "@/components/service-details";
import CallToActionSection from "@/components/call-to-action-section";
import ValuesSection from "@/components/values-section";
import BlogSection from "@/components/blog-section";
import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"hiring" | "freelancers">(
    "hiring"
  );

  const handleTabChange = (tab: "hiring" | "freelancers") => {
    setActiveTab(tab);
  };

  return (
    <main className="min-h-screen">
      <Header />
      {/* <div className="fixed top-[72px] left-0 w-full h-screen z-0"> */}
      <HeroSection onTabChange={handleTabChange} />
      {/* </div> */}
      {/* <div className="relative z-10 mt-screen"> */}
      <ServicesSection activeTab={activeTab} />
      <ServiceDetails activeTab={activeTab} />
      <CallToActionSection activeTab={activeTab} />
      <ValuesSection />
      <BlogSection />
      <FaqSection />
      <Footer />
      {/* </div> */}
    </main>
  );
}
