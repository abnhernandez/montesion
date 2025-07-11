'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import { FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const whatsappMsg = encodeURIComponent(
    "¡Hola! 🙌 Me gustaría saber más sobre la comunidad Monte Sion y cómo puedo participar. ✨🙏"
  );
  const whatsappUrl = `https://wa.me/525586449993?text=${whatsappMsg}`;

  return (
    <>
      <Head>
        <title>Servimos a Jesús | Ministerio en Línea</title>
        <meta name="description" content="Somos una comunidad dedicada a servir y glorificar a Jesús. Únete a nosotros en esta misión con propósito y amor." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Language" content="es" />
        {/* Open Graph */}
        <meta property="og:title" content="Servimos a Jesús" />
        <meta property="og:description" content="Una página dedicada al servicio y adoración de Jesús. Conéctate y forma parte." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Servimos a Jesús" />
        <meta name="twitter:description" content="Descubre una comunidad digital que sirve a Jesús con fe y propósito." />
        <meta name="twitter:image" content="/og-image.jpg" />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Servimos a Jesús" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>

      {/* Social Dock Desktop */}
      <aside className="hidden md:flex fixed top-1/2 left-4 -translate-y-1/2 flex-col gap-4 bg-card rounded-2xl shadow-2xl border border-border py-6 px-3 items-center w-20 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-green-500 hover:text-green-600 hover:bg-green-50/60 hover:shadow-lg hover:scale-110 transition-all duration-200"
          title="WhatsApp"
        >
          <FaWhatsapp size={28} />
        </a>
        <a
          href="https://instagram.com/montesionoaxaca"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-pink-500 hover:text-pink-600 hover:bg-pink-50/60 hover:shadow-lg hover:scale-110 transition-all duration-200"
          title="Instagram"
        >
          <FaInstagram size={28} />
        </a>
        <a
          href="https://www.youtube.com/@montesionoaxacatv"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-red-500 hover:text-red-600 hover:bg-red-50/60 hover:shadow-lg hover:scale-110 transition-all duration-200"
          title="YouTube"
        >
          <FaYoutube size={28} />
        </a>
      </aside>

      {/* Social Dock Mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <div className="flex flex-row gap-3 bg-card rounded-xl shadow-xl border border-border px-3 py-2 items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-green-500 hover:text-green-600 hover:bg-green-50/60 hover:shadow-lg hover:scale-110 transition-all duration-200"
            title="WhatsApp"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://instagram.com/montesionoaxaca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-pink-500 hover:text-pink-600 hover:bg-pink-50/60 hover:shadow-lg hover:scale-110 transition-all duration-200"
            title="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.youtube.com/@montesionoaxacatv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-red-500 hover:text-red-600 hover:bg-red-50/60 hover:shadow-lg hover:scale-110 transition-all duration-200"
            title="YouTube"
          >
            <FaYoutube size={24} />
          </a>
        </div>
      </div>

      <main
        className="flex min-h-screen items-center justify-center bg-background px-2 sm:px-4 transition-colors duration-500"
        role="main"
      >
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-xl mx-auto rounded-3xl bg-card shadow-2xl p-6 sm:p-10 flex flex-col items-center text-center gap-6 border border-border backdrop-blur-md"
        >
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground drop-shadow-sm"
          >
            Servimos a{' '}
            <span className="inline-block font-handwritten text-primary text-5xl sm:text-6xl md:text-7xl italic relative">
              Jesús
              <span className="absolute left-0 bottom-0 w-full h-2 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full blur-sm -z-10" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-2 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Esta es una comunidad que vive para servir a Jesús con fe, acción y amor. Nos reunimos para glorificar Su nombre y llevar Su mensaje al mundo. Te invitamos a ser parte de este llamado.
          </motion.p>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 8, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="mt-4 inline-flex items-center gap-2 px-7 py-3 border-2 border-white bg-transparent text-white font-semibold rounded-full shadow-lg hover:bg-white/10 hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2"
          >
            <span>Quiero saber más</span>
            <span className="transition-transform duration-200">→</span>
          </motion.a>
        </motion.section>
      </main>
      <div className="fixed bottom-4 right-4 z-30 text-primary/70">
          <Sparkles size={32} />
      </div>
    </>
  );
}
