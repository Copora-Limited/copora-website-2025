"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface CardStackContainerProps {
  title: string;
  cards: Card[];
  defaultOpen: number;
}

export default function CardStackContainer({
  title,
  cards,
  defaultOpen,
}: CardStackContainerProps) {
  const [activeIndex, setActiveIndex] = useState(defaultOpen);

  return (
    <div className="w-full">
      <h2
        className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-12"
        style={{ fontFamily: "var(--font-bold)" }}
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card Navigation */}
        <div className="col-span-1 space-y-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`p-4 border-l-4 cursor-pointer transition-colors ${
                activeIndex === index
                  ? "border-[#0AB5B5] text-[#0a2540]"
                  : "border-gray-300 text-gray-500 hover:border-gray-400"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                {card.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Card Content */}
        <div className="col-span-2 relative h-[400px] md:h-[500px]">
          <AnimatePresence mode="wait">
            {cards.map(
              (card, index) =>
                activeIndex === index && (
                  <motion.div
                    key={card.id}
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-8">
                      <h3
                        className="text-2xl md:text-3xl font-bold text-white mb-3"
                        style={{ fontFamily: "var(--font-bold)" }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-white/90"
                        style={{ fontFamily: "var(--font-regular)" }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
