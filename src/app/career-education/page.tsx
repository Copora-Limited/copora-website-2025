/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FaqCareer from "@/components/faq-career";
export default function CareerEducationPage() {
  const nextSectionRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Define image paths for the parallax columns
  const images = [
    "/images/career/ClassCoder.jpg",
    "/images/career/coder.jpg",
    "/images/career/Typer.jpg",
    "/images/career/pinkbg.jpg",
    "/images/career/officeguys.jpg",
    "/images/career/customerservice.jpg",
    "/images/career/seriousguy.jpg",
    "/images/career/smilelady.jpg",
    "/images/career/glasses.jpg",
    "/images/career/lookmeeting.jpg",
    "/images/career/officecoder.jpg",
    "/images/career/eyeglasscoder.jpg",
    "/images/career/standcode.jpg",
    "/images/career/cardraw.jpg",
    "/images/career/headphone.jpg",
  ];

  // Split images into columns
  const columns = [
    images.slice(0, 3),
    images.slice(3, 6),
    images.slice(6, 9),
    images.slice(9, 12),
    images.slice(12, 15),
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Parallax Hero Section */}
      <section className="relative h-screen w-full overflow-hidden pt-[72px]">
        {/* Parallax Image Columns */}
        <div className="absolute inset-0 grid grid-cols-5 gap-0">
          {columns.map((columnImages, colIndex) => (
            <motion.div
              key={`column-${colIndex}`}
              className="w-full h-full col-span-1 flex flex-col"
              initial={{ y: colIndex % 2 === 0 ? "0%" : "-50%" }}
              animate={{ y: colIndex % 2 === 0 ? "-50%" : "0%" }}
              transition={{
                duration: 50,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            >
              {Array(2)
                .fill(columnImages)
                .flat()
                .map((src, imgIndex) => (
                  <div
                    key={`img-${colIndex}-${imgIndex}`}
                    className="w-full h-[33.33vh] relative"
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Career image ${colIndex}-${imgIndex}`}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                ))}
            </motion.div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-center bg-black bg-opacity-50 text-white px-4">
          <motion.h1
            className="text-3xl md:text-6xl font-bold mb-6 text-center max-w-[768px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "var(--font-bold)" }}
          >
            Welcome to Career Education Programme
          </motion.h1>

          <motion.p
            className="text-sm md:text-lg mb-8 max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontFamily: "var(--font-regular)" }}
          >
            Whether you're a student, professional organisation or educational
            authority, come, let's equip the workforce of the future together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] transition-colors duration-300"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Let's talk
            </Link>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="bg-black bg-opacity-40 rounded-full p-3 cursor-pointer hover:bg-opacity-60 transition-all"
            onClick={scrollToNextSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1, duration: 1 },
              y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </motion.div>
        </div>
      </section>

      {/* Program Overview Section */}
      <section ref={nextSectionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-6"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                Program Overview
              </h2>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <p
                className="text-gray-700"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Our Career Education Programme is designed to bridge the gap
                between education and employment, providing students and
                professionals with the skills, knowledge, and connections they
                need to thrive in today's rapidly evolving job market.
              </p>
              <p
                className="text-gray-700"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Through a combination of workshops, mentorship, industry
                partnerships, and hands-on learning experiences, we empower
                individuals to make informed career decisions and develop the
                competencies that employers value most.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3
                    className="text-xl font-bold text-[#0a2540] mb-3"
                    style={{ fontFamily: "var(--font-bold)" }}
                  >
                    For Students
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "var(--font-regular)" }}
                  >
                    Discover career paths, develop essential skills, and connect
                    with potential employers.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3
                    className="text-xl font-bold text-[#0a2540] mb-3"
                    style={{ fontFamily: "var(--font-bold)" }}
                  >
                    For Professionals
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "var(--font-regular)" }}
                  >
                    Upskill, reskill, and expand your professional network to
                    advance your career.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3
                    className="text-xl font-bold text-[#0a2540] mb-3"
                    style={{ fontFamily: "var(--font-bold)" }}
                  >
                    For Organizations
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "var(--font-regular)" }}
                  >
                    Partner with us to develop talent pipelines and support
                    workforce development initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-12 text-center"
            style={{ fontFamily: "var(--font-bold)" }}
          >
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Workshops & Training",
                description:
                  "Interactive sessions to build technical and soft skills tailored to industry needs.",
              },
              {
                title: "Mentorship Programs",
                description:
                  "One-on-one guidance from experienced professionals to navigate career paths.",
              },
              {
                title: "Industry Partnerships",
                description:
                  "Collaborations with leading companies for real-world projects and internships.",
              },
              {
                title: "Career Resources",
                description:
                  "Access to tools, templates, and guides for resumes, interviews, and more.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-xl font-bold text-[#0a2540] mb-3"
                  style={{ fontFamily: "var(--font-bold)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: "var(--font-regular)" }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-12 text-center"
            style={{ fontFamily: "var(--font-bold)" }}
          >
            What Our Participants Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                role: "Student",
                quote:
                  "The workshops helped me discover my passion for tech and land my first internship!",
              },
              {
                name: "James L.",
                role: "Professional",
                quote:
                  "The mentorship program gave me the confidence to switch careers and thrive in a new industry.",
              },
              {
                name: "Emily R.",
                role: "HR Manager",
                quote:
                  "Partnering with this program has transformed our talent acquisition strategy.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <p
                  className="text-gray-600 italic mb-4"
                  style={{ fontFamily: "var(--font-regular)" }}
                >
                  "{testimonial.quote}"
                </p>
                <p
                  className="text-[#0a2540] font-bold"
                  style={{ fontFamily: "var(--font-bold)" }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="text-gray-500"
                  style={{ fontFamily: "var(--font-regular)" }}
                >
                  {testimonial.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#0a2540] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-bold)" }}
          >
            Ready to Advance Your Career?
          </h2>
          <p
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-regular)" }}
          >
            Join our career education program and take the next step toward
            professional success. Whether you're starting out, changing careers,
            or aiming for advancement, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] transition-colors duration-300"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Contact Us
            </Link>
            <Link
              href="/career-education/programs"
              className="inline-flex items-center justify-center px-8 py-3 border border-white rounded-full text-white hover:bg-white/10 transition-colors duration-300"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <FaqCareer />
        </div>
      </section>
      <Footer />
    </main>
  );
}
