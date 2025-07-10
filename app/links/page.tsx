'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
  FaPinterest,
  FaThreads,
} from 'react-icons/fa6';

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/@montesionoaxaca",
    icon: <FaInstagram />
  },
  {
    name: "Facebook",
    url: "https://facebook.com/@montesionoax",
    icon: <FaFacebook />
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@montesionoaxacatv",
    icon: <FaYoutube />
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@montesionoaxaca",
    icon: <FaTiktok />
  },
  {
    name: "X (Anteriormente Twitter)",
    url: "https://x.com",
    icon: <FaXTwitter />
  },
  {
    name: "Pinterest",
    url: "https://pinterest.com/@montesionoaxaca",
    icon: <FaPinterest />
  },
  {
    name: "Threads",
    url: "https://threads.com/@montesionoaxaca",
    icon: <FaThreads />
  },
];

export default function LinksPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(108,0,39,0.9) 0%, rgba(26,36,68,0.85) 60%, rgba(27,94,32,0.8) 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="text-center mb-8 px-4 z-10">
        <Image
          src="/favicon.ico"
          alt="Profile"
          width={96}
          height={96}
          className="rounded-full mx-auto mb-4 shadow-xl border-4 border-white/30"
        />
        <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-tight">Monte Sion</h1>
        <p className="text-lg font-medium mt-2 text-center text-white/90">
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
            className="w-full flex items-center gap-4 text-lg font-semibold py-3 px-6 rounded-xl border-none shadow-lg bg-white/20 backdrop-blur-md text-white hover:text-white transition-all duration-200 group cursor-pointer"
            aria-label={`Ir a ${link.name}`}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(67, 97, 238, 0.30)',
              boxShadow: '0 4px 32px 0 rgba(67, 97, 238, 0.18)',
              filter: 'brightness(1.1) saturate(1.3)'
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              border: "1.5px solid rgba(255,255,255,0.18)",
              boxShadow: "0 2px 16px 0 rgba(60,20,60,0.10)",
              letterSpacing: "0.01em"
            }}
          >
            <span className="text-2xl transition-colors duration-200 group-hover:scale-110">{link.icon}</span>
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
