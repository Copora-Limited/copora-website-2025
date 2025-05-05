/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  Shield,
} from "lucide-react";
import { useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TemporaryWorkerSystemPage() {
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 500], [0, 0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Card data for the card stack section
  const cardData = [
    {
      id: "1",
      title: "Flexible Scheduling",
      description:
        "Choose when and where you work with our flexible scheduling system.",
      icon: <Clock className="h-6 w-6 text-[#0AB5B5]" />,
    },
    {
      id: "2",
      title: "Weekly Payments",
      description:
        "Get paid weekly for all completed assignments through our secure payment system.",
      icon: <DollarSign className="h-6 w-6 text-[#0AB5B5]" />,
    },
    {
      id: "3",
      title: "Diverse Opportunities",
      description:
        "Access a wide range of temporary positions across various industries and roles.",
      icon: <Briefcase className="h-6 w-6 text-[#0AB5B5]" />,
    },
    {
      id: "4",
      title: "Skill Development",
      description:
        "Enhance your skills through diverse work experiences and our training resources.",
      icon: <Users className="h-6 w-6 text-[#0AB5B5]" />,
    },
    {
      id: "5",
      title: "Worker Protection",
      description:
        "Enjoy comprehensive worker protections, benefits, and support services.",
      icon: <Shield className="h-6 w-6 text-[#0AB5B5]" />,
    },
  ];

  // FAQ data
  const faqData = [
    {
      question: "How does the temporary worker system work?",
      answer:
        "Our temporary worker system connects qualified candidates with short-term positions at our client companies. You register in our system, complete your profile, set your availability, and our matching algorithm will suggest suitable positions. Once you accept an assignment, you'll receive all details through our platform and can track your hours and payments in real-time.",
    },
    {
      question: "How quickly can I start working after registration?",
      answer:
        "After completing your registration and verification process (which typically takes 24-48 hours), you can start accepting assignments immediately. The speed at which you receive offers depends on your qualifications, availability, and current market demand.",
    },
    {
      question: "What types of temporary positions are available?",
      answer:
        "We offer a wide range of temporary positions across various industries including hospitality, administrative support, customer service, retail, warehouse operations, event staffing, and more. Positions range from entry-level to those requiring specialized skills and experience.",
    },
    {
      question: "How does payment work for temporary assignments?",
      answer:
        "Payments are processed weekly for all completed assignments. You'll track your hours through our mobile app or web platform, which are then verified and processed. Payments are made via direct deposit to your bank account or through other payment methods you select during registration.",
    },
    {
      question:
        "Are there opportunities for temporary-to-permanent conversion?",
      answer:
        "Yes, many of our client companies use temporary assignments as a way to evaluate potential permanent employees. If both you and the client express interest in a permanent arrangement, we facilitate the conversion process according to our client agreements.",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] bg-gradient-to-br from-[#0a2540] to-[#03254a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/HeaderBg.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-6 py-16 relative z-10 flex flex-col h-full justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Temporary Worker System
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-2xl">
              Flexible work opportunities with competitive pay, weekly payments,
              and the freedom to choose when and where you work.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-[#0AB5B5] hover:bg-[#099999] text-white px-8 py-6 rounded-full text-lg"
                onClick={toggleDrawer}
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="bg-black bg-opacity-40 rounded-full p-3 cursor-pointer hover:bg-opacity-60 transition-all"
            onClick={scrollToNextSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1, duration: 1 },
              y: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              },
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={nextSectionRef} className="w-full py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
              How Our Temporary Worker System Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes it easy to find temporary work that
              fits your schedule and skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-full bg-[#e6f7f7] flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#0AB5B5]">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">
                Register & Create Profile
              </h3>
              <p className="text-gray-600">
                Sign up and complete your profile with your skills, experience,
                and availability preferences.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-full bg-[#e6f7f7] flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#0AB5B5]">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">
                Get Matched to Jobs
              </h3>
              <p className="text-gray-600">
                Our system matches you with suitable temporary positions based
                on your profile and preferences.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-full bg-[#e6f7f7] flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#0AB5B5]">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">
                Work & Get Paid
              </h3>
              <p className="text-gray-600">
                Accept assignments, complete your work, and receive weekly
                payments directly to your account.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-6">
                Benefits of Our Temporary Worker System
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our system is designed to provide flexibility, security, and
                opportunity for temporary workers across all industries.
              </p>

              <div className="space-y-4">
                {cardData.map((card) => (
                  <div key={card.id} className="flex items-start gap-4">
                    <div className="mt-1">{card.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2540]">
                        {card.title}
                      </h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/talent-optimization/flexible-work.jpg"
                  alt="Temporary Worker System"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
              What Our Temporary Workers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from people who have found success through our temporary
              worker system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold text-[#0a2540]">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">
                    Hospitality Professional
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                "The temporary worker system has given me the flexibility I need
                while still providing consistent income. I can choose
                assignments that fit my schedule and skills."
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold text-[#0a2540]">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Event Staff</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been able to work at major events and venues thanks to
                Copora's temporary worker system. The weekly payments are
                reliable and the app makes tracking hours simple."
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold text-[#0a2540]">Aisha Patel</h4>
                  <p className="text-sm text-gray-500">Hotel Management</p>
                </div>
              </div>
              <p className="text-gray-600">
                "What started as temporary work through Copora led to a
                full-time position. The system allowed me to showcase my skills
                and connect with employers I wouldn't have found otherwise."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our temporary worker
              system.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="tab1">General Questions</TabsTrigger>
                <TabsTrigger value="tab2">Payment & Benefits</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <div className="space-y-6">
                  {faqData.slice(0, 3).map((faq, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-bold text-[#0a2540] mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tab2">
                <div className="space-y-6">
                  {faqData.slice(3).map((faq, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-bold text-[#0a2540] mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-[#0a2540] to-[#03254a] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join Our Temporary Worker System?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Register today to access flexible work opportunities, weekly
                payments, and career growth potential.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  className="bg-[#0AB5B5] hover:bg-[#099999] text-white px-8 py-6 rounded-full text-lg"
                  onClick={toggleDrawer}
                >
                  Register Now
                </Button>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
