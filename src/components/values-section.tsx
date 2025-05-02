"use client";

import ValueCarousel, { type CarouselSlide } from "./value-carousel";

export default function ValuesSection() {
  const slides: CarouselSlide[] = [
    {
      id: "collaboration",
      number: "01",
      title: "Collaboration",
      description:
        "We work closely with clients and candidates to create meaningful connections that benefit everyone.",
      image: "/images/slider/1.jpg",
      label: "Collaboration",
      color: "#6366f1", // indigo-500
    },
    {
      id: "flexibility",
      number: "02",
      title: "Flexibility",
      description:
        "We adapt our approach to meet the unique needs of each client and candidate we serve.",
      image: "/images/slider/2.jpg",
      label: "Flexibility",
      color: "#8b5cf6", // violet-500
    },
    {
      id: "human-centric",
      number: "03",
      title: "Human Centric Approach",
      description:
        "We provide customized recruitment and talent management solutions to meet your specific needs.",
      image: "/images/slider/3.jpg",
      label: "Human Centric",
      color: "#0AB5B5", // teal (primary)
    },
    {
      id: "excellence",
      number: "04",
      title: "Commitment to Excellence",
      description:
        "We strive for the highest standards in everything we do, ensuring quality results for all stakeholders.",
      image: "/images/slider/4.jpg",
      label: "Commitment to Excellence",
      color: "#ec4899", // pink-500
    },
    {
      id: "innovation",
      number: "05",
      title: "Innovation",
      description:
        "We continuously evolve our methods and technologies to stay ahead in the ever-changing talent landscape.",
      image: "/images/slider/5.jpg",
      label: "Innovation",
      color: "#f43f5e", // rose-500
    },
  ];

  return <ValueCarousel slides={slides} />;
}
