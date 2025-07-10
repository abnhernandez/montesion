'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaFacebook, FaYoutube, FaTiktok,
  FaXTwitter, FaPinterest, FaThreads,
} from 'react-icons/fa6';

// Enlaces sociales con iconos oficiales
const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/@montesionoaxaca", icon: <FaInstagram /> },
  { name: "Facebook", url: "https://facebook.com/@montesionoax", icon: <FaFacebook /> },
  { name: "YouTube", url: "https://youtube.com/@montesionoaxacatv", icon: <FaYoutube /> },
  { name: "TikTok", url: "https://tiktok.com/@montesionoaxaca", icon: <FaTiktok /> },
  { name: "X (Anteriormente Twitter)", url: "https://x.com", icon: <FaXTwitter /> },
  { name: "Pinterest", url: "https://pinterest.com/@montesionoaxaca", icon: <FaPinterest /> },
  { name: "Threads", url: "https://threads.com/@montesionoaxaca", icon: <FaThreads /> },
];

// Gradiente dinámico con Tailwind + style dinámico (JS)
function useDynamicGradient(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setGradient = (x: number, y: number) => {
      const w = window.innerWidth, h = window.innerHeight;
      const px = x / w, py = y / h;
      el.style.background = `
        radial-gradient(ellipse 120% 80% at ${px * 100}% ${py * 100}%,
          #00d9ff99 0%, #490048cc 40%, #000000ee 90%
        ),
        linear-gradient(120deg, #00ffaa66, #bf40bf66)
      `;
    };
    setGradient(window.innerWidth / 2, window.innerHeight / 2);
    const mouseMove = (e: MouseEvent) => setGradient(e.clientX, e.clientY);
    const touchMove = (e: TouchEvent) => {
      if (e.touches?.[0]) setGradient(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('touchmove', touchMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('touchmove', touchMove);
    };
  }, [ref]);
}

// Avatar con glow animado por Tailwind
function AnimatedAvatar() {
  return (
    <div className="relative flex items-center justify-center w-28 h-28 mx-auto mb-4">
      <span className="absolute inset-0 rounded-full pointer-events-none animate-glow" />
      <Image
        src="/favicon.ico"
        alt="Profile"
        width={96}
        height={96}
        className="rounded-full z-10 border-4 border-black/50 shadow-xl"
      />
    </div>
  );
}

export default function LinksPage() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  useDynamicGradient(bgRef);

  return (
    <div
      ref={bgRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500"
    >
      <div className="text-center mb-8 px-4 z-10">
        <AnimatedAvatar />
        <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-tight">Monte Sion</h1>
        <p className="text-lg font-medium mt-2 text-center text-white/80">
          Iglesia cristiana guiada por el Espíritu Santo <br /> y dirigida por los pastores Lemuel Acosta e Irma Ruelas.
        </p>
      </div>
      <div className="flex flex-col items-center space-y-4 w-full max-w-lg px-6 z-10">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-4 text-lg font-semibold py-3 px-6 rounded-xl border-none shadow-lg bg-white/20 backdrop-blur-md text-white hover:bg-cyan-400/20 transition-all duration-200 group cursor-pointer"
            aria-label={`Ir a ${link.name}`}
            whileHover={{
              scale: 1.05,
              filter: 'brightness(1.1) saturate(1.3)',
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              border: "1.5px solid rgba(255,255,255,0.18)",
              boxShadow: "0 2px 16px 0 rgba(50,20,60,0.13)",
              letterSpacing: "0.01em"
            }}
          >
            <span className="text-2xl transition-transform duration-200 group-hover:scale-110">{link.icon}</span>
            <span className="flex-1 text-left">{link.name}</span>
          </motion.a>
        ))}
      </div>
      <footer className="mt-10 text-white/60 text-sm z-10">
        © {new Date().getFullYear()} Monte Sion Oaxaca. Todos los derechos reservados.
      </footer>
    </div>
  );
}
