/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ValueCarousel from "@/components/value-carousel";
import type { CarouselSlide } from "@/components/value-carousel";

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  // Define the slides for the About page values carousel
  const aboutValueSlides: CarouselSlide[] = [
    {
      id: "collaboration",
      number: "01",
      title: "Collaboration",
      description:
        "We work together with clients and candidates to achieve shared goals and create mutual success.",
      image: "/images/slider/1.jpg",
      label: "Collaboration",
      color: "#6366f1",
    },
    {
      id: "flexibility",
      number: "02",
      title: "Flexibility",
      description:
        "We adapt our approach to meet the unique needs of each client and candidate we serve.",
      image: "/images/slider/2.jpg",
      label: "Flexibility",
      color: "#8b5cf6",
    },
    {
      id: "human-centric",
      number: "03",
      title: "Human Centric Approach",
      description:
        "We provide customized recruitment and talent management solutions to meet your specific needs.",
      image: "/images/slider/3.jpg",
      label: "Human Centric Approach",
      color: "#0AB5B5",
    },
    {
      id: "commitment",
      number: "04",
      title: "Commitment to Excellence",
      description:
        "We strive for the highest standards in everything we do, delivering exceptional results.",
      image: "/images/slider/4.jpg",
      label: "Commitment to Excellence",
      color: "#ec4899",
    },
    {
      id: "innovation",
      number: "05",
      title: "Innovation",
      description:
        "We continuously evolve our methods and technologies to stay ahead in the ever-changing talent landscape.",
      image: "/images/slider/5.jpg",
      label: "Innovation",
      color: "#f43f5e",
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative w-full min-h-screen pt-24">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/videos/about-us.mp4"
            autoPlay
            loop
            playsInline
            muted
            poster="/images/aboutUsPoster.jpg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-100"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full text-center text-white pt-16 pb-24">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-bold)" }}
          >
            Connecting Talent with
            <br />
            Opportunity Everywhere
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90"
            style={{ fontFamily: "var(--font-regular)" }}
          >
            At the heart of our mission is a commitment to connecting
            exceptional talent with forward-thinking companies.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] transition-colors duration-300"
            style={{ fontFamily: "var(--font-medium)" }}
          >
            Talk to an Expert
          </Link>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-6"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Our History
              </h2>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <p
                className="text-gray-700"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                The Copora team brings a rich history in being problem solvers,
                with a deep understanding of the recruitment landscape. Our
                journey started with a vision to improve the recruitment process
                by focusing on quality and personalised service. Over the years,
                we expanded our offerings to include a full spectrum of talent
                services, always adapting to the changing needs of the
                industries we serve.
              </p>
              <p
                className="text-gray-700"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Our evolution from RPO specialists to a comprehensive Talent
                Service solutions provider is a testament to our commitment to
                excellence and innovation. We've grown by consistently
                delivering value and building lasting relationships with both
                clients and candidates. This history shapes our approach today,
                driving us to create unique experiences that go beyond
                transactional relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles and Culture Section */}
      <section className="py-16 md:py-24 bg-[#032541] text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-6">
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Our Principles
                <br />
                and Culture
              </h2>
              <p style={{ fontFamily: "var(--font-regular)" }}>
                At Copora, we are dedicated to building meaningful connections
                between exceptional talent and forward-thinking companies. Our
                journey began in Recruitment Process Outsourcing (RPO) and has
                evolved into a comprehensive Talent Service solutions provider,
                catering to the diverse needs of both clients and candidates in
                the IT, telecommunications, and technology sectors.
              </p>
              <p style={{ fontFamily: "var(--font-regular)" }}>
                At Copora, our core principles and vibrant culture form the
                backbone of everything we do. We believe that by fostering
                collaboration, embracing flexibility, and maintaining a
                human-centric approach, we can create meaningful connections
                between businesses and individuals. Our guiding principles shape
                the way we work, ensuring that both clients and candidates
                receive exceptional service at every step.
              </p>
            </div>
            <div className="w-full md:w-1/2 relative h-[400px]">
              <Image
                src="/images/team-collaboration.jpg"
                alt="Team collaboration at Copora"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Carousel Section */}
      <section className="py-16 md:py-2 bg-white border border-red-600">
        <div className="container mx-auto px-6">
          <ValueCarousel
            slides={aboutValueSlides}
            heading="We believe in a collaborative journey that drives growth and success for all."
            initialSlide={2}
            trianglePosition="right"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
