"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CarrouselLetrasMonteSion() {
  const { resolvedTheme } = useTheme();
  // Define stroke color for light/dark mode
  const strokeColor = resolvedTheme === "dark"
    ? "#d1d5db" // Tailwind gray-300 for dark mode
    : "#4b5563"; // Tailwind gray-700 for light mode

  return (
    <div className="relative w-full overflow-hidden bg-background py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, ease: "linear", duration: 7 }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4"
              style={{
                WebkitTextStroke: `1px ${strokeColor}`,
              }}
            >
              Monte Sion
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

