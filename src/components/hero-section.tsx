"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
// import { ChevronDownIcon } from "lucide-react";

interface HeroSectionProps {
  onTabChange?: (tab: "hiring" | "freelancers") => void;
}

export default function HeroSection({ onTabChange }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<"hiring" | "freelancers">(
    "hiring"
  );

  const handleTabChange = (tab: "hiring" | "freelancers") => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // const scrollToNextSection = () => {
  //   // Calculate the height of the viewport
  //   const viewportHeight = window.innerHeight;

  //   // Scroll to the next section (viewport height + some offset)
  //   window.scrollTo({
  //     top: viewportHeight, // Subtract header height
  //     behavior: "smooth",
  //   });
  // };

  return (
    <section
      className="w-full min-h-screen md:h-screen overflow-hidden bg-[#0a2540] text-white"
      style={{
        backgroundImage: "url('/images/HeaderBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row">
          <motion.div
            className="w-full md:w-1/2 pt-10"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Toggle buttons */}
            <div className="inline-flex items-center bg-[#0a2540]/30 rounded-full p-1 mb-8">
              <button
                className={`px-4 py-1 rounded-full ${
                  activeTab === "hiring"
                    ? "bg-white text-[#0a2540]"
                    : "text-white/80"
                } transition-colors`}
                onClick={() => handleTabChange("hiring")}
                style={{ fontFamily: "var(--font-medium)" }}
              >
                Looking for hire
              </button>
              <button
                className={`px-4 py-1 rounded-full ${
                  activeTab === "freelancers"
                    ? "bg-white text-[#0a2540]"
                    : "text-white/80"
                } transition-colors`}
                onClick={() => handleTabChange("freelancers")}
                style={{ fontFamily: "var(--font-medium)" }}
              >
                Looking For Job
              </button>
            </div>

            {/* Hero content */}
            {activeTab === "hiring" ? (
              <>
                <h1
                  className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                  style={{ fontFamily: "var(--font-bold)" }}
                >
                  Empowering Biz
                  <br />
                  with Talent Solutions
                </h1>

                <p
                  className="text-white/80 mb-8 max-w-md"
                  style={{ fontFamily: "var(--font-regular)" }}
                >
                  At Copora, we empower your business by providing flexible,
                  cost-effective, and scalable contingent staffing solutions. We
                  understand your unique challenges.
                </p>

                <Link
                  href="/find-talent"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] mb-8"
                  style={{ fontFamily: "var(--font-medium)" }}
                >
                  Find Best Talent
                </Link>

                {/* Profile avatars */}
                <div className="flex items-center mt-6">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                      <Image
                        src="/images/avatar/1.png"
                        alt="Professional in suit"
                        width={100}
                        height={100}
                        className="object-contain"
                        style={{ marginBottom: 0 }}
                        priority
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                      <Image
                        src="/images/avatar/2.png"
                        alt="Professional in suit"
                        width={100}
                        height={100}
                        className="object-contain"
                        style={{ marginBottom: 0 }}
                        priority
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                      <Image
                        src="/images/avatar/3.png"
                        alt="Professional in suit"
                        width={100}
                        height={100}
                        className="object-contain"
                        style={{ marginBottom: 0 }}
                        priority
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                      <Image
                        src="/images/avatar/4.png"
                        alt="Professional in suit"
                        width={100}
                        height={100}
                        className="object-contain"
                        style={{ marginBottom: 0 }}
                        priority
                      />
                    </div>
                  </div>
                  <span
                    className="ml-3 text-sm text-white/80"
                    style={{ fontFamily: "var(--font-regular)" }}
                  >
                    Find best talents for your team
                  </span>
                </div>
              </>
            ) : (
              <>
                <h1
                  className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                  style={{ fontFamily: "var(--font-bold)" }}
                >
                  Your Path to Career
                  <br />
                  Growth Starts Here
                </h1>

                <p
                  className="text-white/80 mb-8 max-w-md"
                  style={{ fontFamily: "var(--font-regular)" }}
                >
                  At Copora, we provide you with the right opportunities to take
                  your career to the next level.
                </p>

                <Link
                  href="/find-jobs"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] mb-8"
                  style={{ fontFamily: "var(--font-medium)" }}
                >
                  Find Best Job
                </Link>

                {/* Company logos */}
                <div className="flex items-center mt-6">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Image
                        src="/images/avatar/company-1.png"
                        alt="Company 1"
                        width={100}
                        height={100}
                        className="object-contain"
                        style={{ marginBottom: 0 }}
                        priority
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Image
                        src="/images/avatar/company-2.png"
                        alt="Company 2"
                        width={100}
                        height={100}
                        className="object-contain"
                        style={{ marginBottom: 0 }}
                        priority
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Image
                        src="/images/avatar/company-3.png"
                        alt="Company 3"
                        width={100}
                        height={100}
                        className="object-contain"
                        style={{ marginBottom: 0 }}
                        priority
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Image
                        src="/images/avatar/company-4.png"
                        alt="Company 4"
                        width={100}
                        height={100}
                        className="object-contain"
                        style={{ marginBottom: 0 }}
                        priority
                      />
                    </div>
                  </div>
                  <span
                    className="ml-3 text-sm text-white/80"
                    style={{ fontFamily: "var(--font-regular)" }}
                  >
                    Work with top companies in the world
                  </span>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            className="hidden md:block w-full md:w-1/2 relative h-full flex items-end"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {activeTab === "hiring" ? (
              <Image
                src="/images/career/business-professional.png"
                alt="Professional in suit"
                width={500}
                height={600}
                className="object-contain"
                style={{ marginBottom: 0 }}
                priority
              />
            ) : (
              <Image
                src="/images/smiling-1.png"
                alt="Smiling professionals"
                width={500}
                height={600}
                className="object-contain"
                style={{ marginBottom: 0 }}
                priority
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute z-20 bottom-24 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-16 h-16 lg:w-20 lg:h-20 bg-[#00000033] rounded-full flex items-center justify-center hover:bg-[#00000060] cursor-pointer"
          onClick={scrollToNextSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 1 },
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            },
          }}
        >
          <ChevronDownIcon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
        </motion.div>
      </div> */}
    </section>
  );
}
