"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TaglineCard {
  id: string;
  title: string;
  description: string;
}

export default function HoverCardTagline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const taglines: TaglineCard[] = [
    {
      id: "1",
      title: "Expertise",
      description:
        "Our team brings decades of industry experience and specialized knowledge to every engagement.",
    },
    {
      id: "2",
      title: "Partnership",
      description:
        "We work as an extension of your team, aligning our goals with your business objectives.",
    },
    {
      id: "3",
      title: "Results",
      description:
        "We're committed to delivering measurable outcomes that drive your business forward.",
    },
    {
      id: "4",
      title: "Innovation",
      description:
        "We leverage cutting-edge technologies and methodologies to stay ahead of industry trends.",
    },
  ];

  return (
    <div className="w-full">
      <h2
        className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-12"
        style={{ fontFamily: "var(--font-bold)" }}
      >
        Why Choose Copora for Permanent Staffing
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {taglines.map((tagline, index) => (
          <motion.div
            key={tagline.id}
            className="bg-white border border-gray-200 rounded-lg p-6 h-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-1 w-12 bg-[#0AB5B5] mb-4"
              animate={{
                width: hoveredIndex === index ? "100%" : "3rem",
              }}
              transition={{ duration: 0.3 }}
            />
            <h3
              className="text-xl font-bold text-[#0a2540] mb-3"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              {tagline.title}
            </h3>
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              {tagline.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
