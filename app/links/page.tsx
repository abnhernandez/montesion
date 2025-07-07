'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LinksPage() {
  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com/@montesionoaxaca" },
    { name: "Facebook", url: "https://facebook.com/@montesionoax" },
    { name: "YouTube", url: "https://youtube.com/@montesionoaxacatv" },
    { name: "TikTok", url: "https://tiktok.com/@montesionoaxaca" },
    { name: "X (Anteriormente Twitter)", url: "https://x.com" },
    { name: "Pinterest", url: "https://pinterest.com/@montesionoaxaca" },
    { name: "Threads", url: "https://threads.com/@montesionoaxaca" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center mb-8 px-4">
        <Image
          src="/favicon.ico"
          alt="Profile"
          width={96}
          height={96}
          className="rounded-full mx-auto mb-4 shadow-lg"
        />
        <h1 className="text-3xl font-semibold">Monte Sion</h1>
        <p className="text-md font-medium mt-2 text-center">
          Iglesia cristiana guiada por el Espíritu Santo <br /> y dirigida por los pastores Lemuel Acosta e Irma Ruelas.
        </p>
      </div>
      <div className="flex flex-col items-center space-y-4 w-full max-w-lg px-6">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            className="w-full text-center text-lg font-medium py-3 px-6 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            aria-label={`Ir a ${link.name}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.name}
          </motion.a>
        ))}
      </div>
    </div>
  );
}