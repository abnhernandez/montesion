'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Home() {
  const [open, setOpen] = useState(false);

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
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-primary mb-2"
            aria-hidden="true"
          >
            {/* <Sparkles size={40} /> */}
          </motion.div>

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

          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileHover={{ x: 8, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="mt-4 inline-flex items-center gap-2 px-7 py-3 bg-card border border-border text-foreground font-semibold rounded-full shadow-lg hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-primary group"
          >
            <span>Quiero saber más</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </motion.button>
        </motion.section>
        {/* Modal Mejorado tipo social sidebar refinado */}
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            {/* Sidebar social desktop (md+) */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25, type: 'spring' }}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col gap-4 bg-card rounded-2xl shadow-2xl border border-border py-6 px-3 items-center w-20"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} className="mb-2 text-gray-400 hover:text-[#831111] transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-[#831111]" aria-label="Cerrar">
                <X className="w-6 h-6" />
              </button>
              {/* Redes sociales con animación hover */}
              <a href="https://wa.me/525586449993?text=Soporte" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-transform duration-200 hover:scale-125 hover:shadow-lg" aria-label="WhatsApp">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 7.07-2.93A10 10 0 0 1 12 22Zm5.2-7.2c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.08-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.1 9.1 0 0 1-1.68-2.08c-.18-.31 0-.48.13-.62.13-.13.28-.34.42-.51a.56.56 0 0 0 .08-.56c-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48h-.53a1 1 0 0 0-.72.34A3.06 3.06 0 0 0 6.1 9.7c0 1.13.8 2.23 2.3 3.44a11.6 11.6 0 0 0 4.1 2.13c.57.15 1.1.13 1.51.08a2.1 2.1 0 0 0 1.36-.95c.19-.28.19-.52.13-.7s-.25-.18-.53-.32Z"/></svg>
              </a>
              <a href="https://instagram.com/montesionoaxaca" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-transform duration-200 hover:scale-125 hover:shadow-lg" aria-label="Instagram">
                <FaInstagram size={28} />
              </a>
              <a href="https://www.youtube.com/@montesionoaxatv/shorts" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600 transition-transform duration-200 hover:scale-125 hover:shadow-lg" aria-label="YouTube Shorts">
                <FaYoutube size={28} />
              </a>
              <a href="https://x.com/OaxacaSion33110" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-[#831111] transition-transform duration-200 hover:scale-125 hover:shadow-lg" aria-label="X">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3H21.5l-7.19 8.21L22.5 21h-6.56l-5.18-6.13L4.47 21H.5l7.61-8.7L1.5 3h6.69l4.7 5.56L17.53 3Zm-1.06 15h2.09L7.59 5.97H5.41L16.47 18Z"/></svg>
              </a>
              <a href="https://join.slack.com/t/montesionoaxaca/shared_invite/zt-1xyz12345-abcdefg" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 transition-transform duration-200 hover:scale-125 hover:shadow-lg" aria-label="Slack">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M5.1 15.9a2.1 2.1 0 1 1-2.1-2.1h2.1v2.1Zm1.05 0a2.1 2.1 0 1 1 4.2 0v5.1a2.1 2.1 0 1 1-4.2 0v-5.1Zm2.1-7.95A2.1 2.1 0 1 1 10.35 5.1v2.1H8.25v-2.1Zm0 1.05a2.1 2.1 0 1 1 0 4.2H3.15a2.1 2.1 0 1 1 0-4.2h5.1Zm7.95 2.1a2.1 2.1 0 1 1 2.1-2.1v2.1h-2.1v-2.1Zm-1.05 0a2.1 2.1 0 1 1-4.2 0V3.15a2.1 2.1 0 1 1 4.2 0v5.1Zm-2.1 7.95a2.1 2.1 0 1 1-2.1 2.1v-2.1h2.1v2.1Zm0-1.05a2.1 2.1 0 1 1 0-4.2h5.1a2.1 2.1 0 1 1 0 4.2h-5.1Z"/></svg>
              </a>
              <a
                href="/auth"
                className="flex flex-col items-center gap-0.5 text-xs font-semibold tracking-widest text-blue-600 hover:text-blue-800 transition-colors select-none w-full hover:scale-110 hover:shadow-lg"
                aria-label="Únete a nuestra comunidad"
                style={{ minHeight: 40 }}
              >
                <svg className="w-6 h-6 mb-0.5 animate-bounce text-blue-600 group-hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.59 7.41L11 15l-1.41-1.41L12.17 12l-3.58-3.59L9 7l5 5z"/>
                </svg>
                <span className="leading-tight text-center">Únete<br/>comunidad</span>
              </a>
            </motion.div>
            {/* Modal principal centrado */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, type: 'spring' }}
              className="relative bg-card rounded-2xl shadow-2xl border border-border max-w-md w-full p-4 sm:p-8 text-center flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <Mail className="w-10 h-10 text-[#831111] mb-2 animate-pulse" />
              <h2 className="text-2xl font-semibold mb-2 text-primary">¡Conéctate con nosotros!</h2>
              <p className="text-muted-foreground mb-4">Déjanos tus datos y te contactaremos para que formes parte de la comunidad.</p>
              <form className="w-full flex flex-col gap-3">
                <input type="text" placeholder="Nombre" className="rounded-lg border border-border px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="email" placeholder="Correo electrónico" className="rounded-lg border border-border px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <button type="submit" className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6 py-2 transition">Enviar</button>
              </form>
              {/* Social dock mobile (sm-) */}
              <div className="flex md:hidden w-full justify-center mt-6">
                <div className="flex flex-row gap-4 bg-card rounded-xl shadow-xl border border-border px-3 py-2 items-center">
                  <a href="https://wa.me/525586449993?text=Soporte" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-transform duration-200 active:scale-110" aria-label="WhatsApp">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 7.07-2.93A10 10 0 0 1 12 22Zm5.2-7.2c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.08-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.1 9.1 0 0 1-1.68-2.08c-.18-.31 0-.48.13-.62.13-.13.28-.34.42-.51a.56.56 0 0 0 .08-.56c-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48h-.53a1 1 0 0 0-.72.34A3.06 3.06 0 0 0 6.1 9.7c0 1.13.8 2.23 2.3 3.44a11.6 11.6 0 0 0 4.1 2.13c.57.15 1.1.13 1.51.08a2.1 2.1 0 0 0 1.36-.95c.19-.28.19-.52.13-.7s-.25-.18-.53-.32Z"/></svg>
                  </a>
                  <a href="https://instagram.com/montesionoaxaca" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-transform duration-200 active:scale-110" aria-label="Instagram">
                    <FaInstagram size={24} />
                  </a>
                  <a href="https://www.youtube.com/@montesionoaxatv/shorts" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600 transition-transform duration-200 active:scale-110" aria-label="YouTube Shorts">
                    <FaYoutube size={24} />
                  </a>
                  <a href="https://x.com/OaxacaSion33110" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-[#831111] transition-transform duration-200 active:scale-110" aria-label="X">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3H21.5l-7.19 8.21L22.5 21h-6.56l-5.18-6.13L4.47 21H.5l7.61-8.7L1.5 3h6.69l4.7 5.56L17.53 3Zm-1.06 15h2.09L7.59 5.97H5.41L16.47 18Z"/></svg>
                  </a>
                  <a href="https://join.slack.com/t/montesionoaxaca/shared_invite/zt-1xyz12345-abcdefg" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 transition-transform duration-200 active:scale-110" aria-label="Slack">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M5.1 15.9a2.1 2.1 0 1 1-2.1-2.1h2.1v2.1Zm1.05 0a2.1 2.1 0 1 1 4.2 0v5.1a2.1 2.1 0 1 1-4.2 0v-5.1Zm2.1-7.95A2.1 2.1 0 1 1 10.35 5.1v2.1H8.25v-2.1Zm0 1.05a2.1 2.1 0 1 1 0 4.2H3.15a2.1 2.1 0 1 1 0-4.2h5.1Zm7.95 2.1a2.1 2.1 0 1 1 2.1-2.1v2.1h-2.1v-2.1Zm-1.05 0a2.1 2.1 0 1 1-4.2 0V3.15a2.1 2.1 0 1 1 4.2 0v5.1Zm-2.1 7.95a2.1 2.1 0 1 1-2.1 2.1v-2.1h2.1v2.1Zm0-1.05a2.1 2.1 0 1 1 0-4.2h5.1a2.1 2.1 0 1 1 0 4.2h-5.1Z"/></svg>
                  </a>
                  <a
                    href="/auth"
                    className="flex flex-col items-center gap-0.5 text-xs font-semibold tracking-widest text-blue-600 hover:text-blue-800 transition-colors select-none w-full"
                    aria-label="Únete a nuestra comunidad"
                    style={{ minHeight: 32 }}
                  >
                    <svg className="w-5 h-5 mb-0.5 animate-bounce text-blue-600 group-hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.59 7.41L11 15l-1.41-1.41L12.17 12l-3.58-3.59L9 7l5 5z"/>
                    </svg>
                    <span className="leading-tight text-center">Únete<br/>comunidad</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </>
  );
}