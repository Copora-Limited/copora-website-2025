"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Define the interface for a single tab
interface Tab {
  title: string;
  content: string;
  image: string;
}

// Define the props interface for the component
interface TalentOptimizationTabsProps {
  tabs: Tab[];
}

export default function TalentOptimizationTabs({
  tabs,
}: TalentOptimizationTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-rotate tabs every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [tabs.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="col-span-2 space-y-4">
        {tabs.map((tab, index) => (
          <motion.div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`p-4 border-l-4 cursor-pointer transition-colors ${
              activeTab === index
                ? "border-[#0AB5B5] text-[#0a2540]"
                : "border-gray-300 text-gray-500 hover:border-gray-400"
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3
              className="text-xl md:text-2xl font-bold"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              {tab.title}
            </h3>
            <AnimatePresence mode="wait">
              {activeTab === index && (
                <motion.p
                  className="mt-3 text-gray-700"
                  style={{ fontFamily: "var(--font-regular)" }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.content}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="col-span-1 h-[300px] md:h-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={tabs[activeTab].image || "/placeholder.svg"}
              alt={tabs[activeTab].title}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
