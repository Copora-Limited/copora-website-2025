"use client";

import { motion } from "framer-motion";

interface InfoGraphicsProps {
  title: string;
  description: string;
  btnText: string;
  onButtonClick: () => void;
}

export default function InfoGraphics({
  title,
  description,
  btnText,
  onButtonClick,
}: InfoGraphicsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-white"
        style={{ fontFamily: "var(--font-bold)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p
          className="text-white/90 text-lg mb-6"
          style={{ fontFamily: "var(--font-regular)" }}
        >
          {description}
        </p>
        <button
          onClick={onButtonClick}
          className="self-start px-8 py-3 bg-white text-[#0a2540] rounded-full hover:bg-gray-100 transition-colors"
          style={{ fontFamily: "var(--font-medium)" }}
        >
          {btnText}
        </button>
      </motion.div>
    </div>
  );
}
