"use client";

import { useState } from "react";
import FaqItem from "./faq-item";

interface Faq {
  title: string;
  content: string;
}

const FaqCareer = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: Faq[] = [
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
  ];

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-20">
      {/* FAQ Section Title */}
      <div className="w-full lg:w-1/3 text-center lg:text-left">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#0a2540]"
          style={{ fontFamily: "var(--font-bold)" }}
        >
          FAQs
        </h2>
        <p
          className="text-gray-600"
          style={{ fontFamily: "var(--font-regular)" }}
        >
          We&apos;re here to help with any queries you may have. Get in touch
          with our support team, and we&apos;ll be happy to assist you.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="w-full lg:w-2/3">
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              title={faq.title}
              content={faq.content}
              isExpanded={expandedIndex === index}
              toggleExpand={() => handleToggleExpand(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqCareer;
