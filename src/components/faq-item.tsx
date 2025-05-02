"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  title: string;
  content: string;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const FaqItem = ({
  title,
  content,
  isExpanded,
  toggleExpand,
}: FaqItemProps) => {
  return (
    <div className="bg-white border-b border-gray-100 overflow-hidden">
      <div
        className="flex justify-between items-center cursor-pointer py-5 px-4"
        onClick={toggleExpand}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleExpand();
            e.preventDefault();
          }
        }}
      >
        <h3
          className="text-[#0a2540] text-lg font-bold"
          style={{ fontFamily: "var(--font-bold)" }}
        >
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex-shrink-0 text-[#0a2540]"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-5 text-gray-600"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;
