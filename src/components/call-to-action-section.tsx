/* eslint-disable react/no-unescaped-entities */
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRef, useEffect } from "react"

interface CallToActionSectionProps {
  activeTab: "hiring" | "freelancers"
}

export default function CallToActionSection({ activeTab }: CallToActionSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }
  }, [])

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-[#0a2540]"
            key={activeTab} // This forces re-animation when tab changes
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-bold)" }}
          >
            {activeTab === "hiring" ? "Need a tailor-made hiring solution?" : "Unlock Your Potential with Copora"}
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 mb-10"
            key={`p-${activeTab}`} // This forces re-animation when tab changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: "var(--font-regular)" }}
          >
            If you're interested in more customized service, reach out to us today. Together, we'll unlock the right
            path forward for you and your team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0AB5B5] rounded-full text-white hover:bg-[#099999] transition-colors duration-300 text-lg"
              style={{ fontFamily: "var(--font-medium)" }}
            >
              Talk to us
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient video strip at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/Gradient.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}
