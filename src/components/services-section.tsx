"use client";

import { useEffect, useState } from "react";
import ClientService from "./client-service";
import CandidateService from "./candidate-service";

interface ServicesSectionProps {
  activeTab: "hiring" | "freelancers";
}

export default function ServicesSection({ activeTab }: ServicesSectionProps) {
  const [currentTab, setCurrentTab] = useState<"hiring" | "freelancers">(
    activeTab
  );

  // Update the current tab when the activeTab prop changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <div className="relative">
      {currentTab === "hiring" ? <ClientService /> : <CandidateService />}
    </div>
  );
}
