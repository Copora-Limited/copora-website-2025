"use client"

import { useState, useRef } from "react"
import { useScroll, useTransform } from "framer-motion"

export default function TemporaryWorkerSystemPage() {
  const { scrollY } = useScroll()
  const yTransform = useTransform(scrollY, [0, 500], [0, 0])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const nextSectionRef = useRef<HTMLDivElement>(null)

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev)
  }

  // Card data for the card stack section
  const cardData = [
    {
      id: "1",

\
