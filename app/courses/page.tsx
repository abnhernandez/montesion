"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CoursesLanding() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center py-32"
      >
        <div className="flex flex-col items-center gap-8">
          <Image src="/bible.webp" width={80} height={80} alt="Sin cursos" className="mx-auto mb-2" />
          <h1 className="text-3xl font-semibold tracking-wide uppercase mb-2">Próximamente</h1>
          <p className="text-muted-foreground leading-relaxed text-lg font-medium">
            Por ahora no hay cursos disponibles.<br />
            ¡Estamos trabajando para ofrecerte lo mejor muy pronto!
          </p>
        </div>
      </motion.div>
    </main>
  )
}