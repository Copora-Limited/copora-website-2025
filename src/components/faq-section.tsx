/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GradientDivider from "./gradient-divider";

interface FaqItem {
  title: string;
  content: string;
}

interface FaqTabsProps {
  candidateFaqs: FaqItem[];
  clientFaqs: FaqItem[];
}

export default function FaqSection() {
  // FAQ data
  const faqData = {
    candidates: [
      {
        title: "How do I get started with Copora as a candidate?",
        content:
          "You can register by uploading your CV on our website. Once registered, we will match your profile with suitable roles and keep you informed of relevant opportunities.",
      },
      {
        title: "What industries does Copora specialise in?",
        content:
          "Copora specialises in a variety of industries, including finance, healthcare, IT, and more.",
      },
      {
        title: "How does Copora ensure candidates are a good fit for roles?",
        content:
          "Copora uses a tailored approach by assessing candidates' skills, experience, and career goals to ensure a perfect match.",
      },
      {
        title: "How can Copora help passive candidates?",
        content:
          "Passive candidates can benefit from Copora's extensive network, offering opportunities that align with their long-term goals.",
      },
    ],
    clients: [
      {
        title: "What services does Copora offer to clients?",
        content:
          "Copora offers recruitment services, workforce planning, and talent management solutions tailored to your business needs.",
      },
      {
        title: "How does Copora source top talent for clients?",
        content:
          "Copora utilises an extensive database, industry expertise, and innovative sourcing techniques to find the best talent.",
      },
      {
        title: "Does Copora provide international recruitment?",
        content:
          "Yes, Copora has expertise in international recruitment, connecting businesses with top talent globally.",
      },
    ],
  };

  return (
    <section className="pt-16 md:pt-24 bg-white ">
      <div className="container mx-auto px-4">
        <FaqTabs
          candidateFaqs={faqData.candidates}
          clientFaqs={faqData.clients}
        />
      </div>
      <div className="mt-4">
        <GradientDivider height="h-2" />
      </div>
    </section>
  );
}

function FaqTabs({ candidateFaqs, clientFaqs }: FaqTabsProps) {
  const [activeTab, setActiveTab] = useState<"candidates" | "clients">(
    "candidates"
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-20">
      <div className="w-full md:w-1/3 text-center md:text-left">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#0a2540]"
          style={{ fontFamily: "var(--font-bold)" }}
        >
          FAQS
        </h2>
        <p
          className="text-gray-600 mb-8"
          style={{ fontFamily: "var(--font-regular)" }}
        >
          We're here to help with any queries you may have. Get in touch with
          our support team, and we'll be happy to assist you.
        </p>
      </div>

      <div className="w-full md:w-2/3">
        <div className="flex border-b border-b-[#0a2540]">
          <button
            className={`w-1/2 px-4 py-3 md:py-4 font-medium text-sm md:text-base flex items-center justify-center transition-colors ${
              activeTab === "candidates" ? "bg-[#E6E6E6]" : "bg-white"
            }`}
            onClick={() => setActiveTab("candidates")}
            style={{ fontFamily: "var(--font-medium)" }}
          >
            For Candidates
          </button>
          <button
            className={`w-1/2 px-4 py-3 md:py-4 font-medium text-sm md:text-base flex items-center justify-center transition-colors ${
              activeTab === "clients" ? "bg-[#E6E6E6]" : "bg-white"
            }`}
            onClick={() => setActiveTab("clients")}
            style={{ fontFamily: "var(--font-medium)" }}
          >
            For Clients
          </button>
        </div>

        {/* FAQ Items */}
        <div className="mt-6 space-y-1">
          <AnimatePresence initial={false}>
            {(activeTab === "candidates" ? candidateFaqs : clientFaqs).map(
              (faq, index) => (
                <FaqItem
                  key={`${activeTab}-${index}`}
                  title={faq.title}
                  content={faq.content}
                  isExpanded={expandedIndex === index}
                  toggleExpand={() => handleToggleExpand(index)}
                />
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

interface FaqItemProps {
  title: string;
  content: string;
  isExpanded: boolean;
  toggleExpand: () => void;
}

function FaqItem({ title, content, isExpanded, toggleExpand }: FaqItemProps) {
  return (
    <motion.div
      className="bg-white border-b border-gray-100 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
    </motion.div>
  );
}
