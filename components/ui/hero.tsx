"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, Mail } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt, FaComments, FaTimes } from "react-icons/fa";
import CarrouselLetrasMonteSion from '@/components/ui/AnimationCarruselLetras';
import { useState } from "react";

export default function HeroSection() {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-background text-foreground overflow-hidden transition-colors duration-500">
      {/* Blobs decorativos */}
      <img
        src="/assets/blob_bottom_left_973fc0f8fe.svg"
        alt=""
        className="pointer-events-none select-none absolute left-0 bottom-0 w-48 md:w-72 lg:w-96"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />
        <img
        src="/assets/blob_bottom_left_973fc0f8fe.svg"
        alt=""
        className="pointer-events-none select-none absolute left-0 bottom-0 w-48 md:w-72 lg:w-96"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />

      {/* Contenido principal */}
      <main className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-12 gap-8 max-w-2xl mx-auto">
        {/* Mensaje de bienvenida */}
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground text-center leading-tight drop-shadow-lg mb-2">
          Bienvenido a la iglesia
        </h1>
        {/* Marquee animado: nombre iglesia */}
        <div className="w-full flex justify-center mb-2">
          <CarrouselLetrasMonteSion />
        </div>
        {/* Versículo */}
        <p className="text-base md:text-lg text-muted-foreground font-medium text-center max-w-md mx-auto drop-shadow italic mb-2">
          Jesús te dice: Venid en pos de mí, y os haré pescadores de hombres. Mat. 11:19
        </p>
        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full justify-center items-center mt-1 md:mt-2">
          {/* CTA 1: Programa tu Visita */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="w-full md:w-1/2 max-w-xs"
          >
            <Link href="/planifica-visita" aria-label="Programa tu visita" className="w-full">
              <motion.button
                className="w-full bg-primary text-primary-foreground px-4 py-3 md:px-7 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-2xl flex items-center justify-center gap-2 md:gap-3 overflow-hidden"
                whileHover={{ scale: 1.08, boxShadow: "0 0 0 12px rgba(59,130,246,0.25)" }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    "0 0 16px 4px rgba(59,130,246,0.45)",
                    "0 0 32px 8px rgba(59,130,246,0.60)",
                    "0 0 16px 4px rgba(59,130,246,0.45)"
                  ],
                  transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                exit={{ opacity: 0, y: 40 }}
                type="button"
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex"
                >
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </motion.span>
                <span>Programa tu Visita</span>
              </motion.button>
            </Link>
          </motion.div>
          {/* CTA 2: Experiencia Monte Sion */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
            className="w-full md:w-1/2 max-w-xs"
          >
            <Link href="/experiencia" aria-label="Experiencia Monte Sion" className="w-full">
              <motion.button
                className="w-full bg-background text-primary px-4 py-3 md:px-7 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-xl flex items-center justify-center gap-2 md:gap-3 overflow-hidden"
                whileHover={{ scale: 1.08, boxShadow: "0 0 0 8px rgba(59,130,246,0.10)", backgroundColor: "#2563eb", color: "#fff" }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    "0 4px 24px 0 rgba(255,255,255,0.15)",
                    "0 0px 32px 0 rgba(255,255,255,0.25)",
                    "0 4px 24px 0 rgba(255,255,255,0.15)"
                  ],
                  transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                exit={{ opacity: 0, y: 40 }}
                type="button"
              >
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex"
                >
                  <Handshake className="w-5 h-5 md:w-6 md:h-6" />
                </motion.span>
                <span>Experiencia Monte Sion</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Botón de contacto flotante estilo moderno con react-icons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <button
          className="bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center shadow-4xl hover:bg-primary/90 active:bg-primary/80 transition-all outline-none focus:outline-2 focus:outline-primary"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
          onClick={() => setShowContacts((v) => !v)}
          aria-label={showContacts ? "Cerrar menú de contacto" : "Abrir menú de contacto"}
        >
          <span className="flex items-center justify-center w-full h-full">
            {showContacts ? (
              <FaTimes className="mx-auto my-auto" />
            ) : (
              <FaComments className="mx-auto my-auto" />
            )}
          </span>
        </button>
        {showContacts && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: -32 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col gap-4 mb-2 p-4 rounded-3xl bg-background/90 shadow-2xl border border-border min-w-[200px] backdrop-blur-xl"
          >
            <a href="https://bit.ly/3NFICPy" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-all group focus:ring-2 focus:ring-green-500">
              <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform" />
              WhatsApp
            </a>
            <a href="tel:9512091644" aria-label="Llamar" className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all group focus:ring-2 focus:ring-gray-500">
              <FaPhoneAlt className="text-2xl group-hover:scale-110 transition-transform" />
              Llamar
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
