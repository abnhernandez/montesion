'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Home() {
  // Mensaje prellenado para WhatsApp
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
          className="text-green-500 hover:text-green-600 transition-transform duration-200 hover:scale-125"
          title="WhatsApp"
        >
          {/* WhatsApp Icon */}
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm5.2-7.19c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.13-.61.13s-.7.87-.86 1.05c-.16.18-.32.2-.59.07-.27-.14-1.11-.41-2.12-1.31a7.99 7.99 0 0 1-1.48-1.84c-.15-.25-.02-.39.11-.53.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.83-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.33-.25.27-.96.93-.96 2.26 0 1.33.98 2.62 1.12 2.8.14.18 1.93 2.95 4.68 3.7.49.13.87.21 1.16.27.49.08.93.07 1.28.04.39-.04 1.21-.5 1.38-.98.17-.49.17-.91.12-.99-.05-.08-.22-.13-.48-.26Z"/></svg>
        </a>
        <a
          href="https://instagram.com/montesionoaxaca"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-600 transition-transform duration-200 hover:scale-125"
          title="Instagram"
        >
          <FaInstagram size={28} />
        </a>
        <a
          href="https://www.youtube.com/@montesionoaxatv/shorts"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-600 transition-transform duration-200 hover:scale-125"
          title="YouTube"
        >
          <FaYoutube size={28} />
        </a>
        <a
          href="https://x.com/OaxacaSion33110"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-200 hover:text-[#831111] transition-transform duration-200 hover:scale-125"
          title="X"
        >
          {/* X Icon */}
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3H21.5l-7.19 8.21L22.5 21h-6.56l-5.18-6.13L4.47 21H.5l7.61-8.7L1.5 3h6.69l4.7 5.56L17.53 3Zm-1.06 15h2.08l-5.61-6.65-2.37 2.73L16.47 18ZM4.91 5l5.62 6.66L18.38 5h-2.1l-3.74 4.31L7.09 5H4.91Zm-1.41 12h2.13l3.15-3.64-1.97-2.33L3.5 17ZM12 13.08l1.13-1.31L19.56 19H21l-5.78-6.67L21 5h-2.07l-3.75 4.31L7.13 5H5.56l5.85 6.66L3.5 19h2.12l6.38-6.92Z"/></svg>
        </a>
        <a
          href="https://join.slack.com/t/montesionoaxaca/shared_invite/zt-1xyz12345-abcdefg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-purple-700 transition-transform duration-200 hover:scale-125"
          title="Slack"
        >
          {/* Slack Icon */}
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M5.1 15.9a2.1 2.1 0 1 1-2.1-2.1h2.1v2.1Zm1.05 0a2.1 2.1 0 1 1 4.2 0v5.1a2.1 2.1 0 1 1-4.2 0v-5.1Zm2.1-7.95A2.1 2.1 0 1 1 10.35 5.1v2.1h-2.1Zm0 1.05a2.1 2.1 0 1 1 0 4.2H3.15a2.1 2.1 0 1 1 0-4.2h5.1Zm7.95 2.1a2.1 2.1 0 1 1 2.1-2.1v2.1h-2.1Zm-1.05 0a2.1 2.1 0 1 1 0 4.2h-5.1a2.1 2.1 0 1 1 0-4.2h5.1ZM19.8 15.9a2.1 2.1 0 1 1-2.1 2.1v-2.1h2.1Zm0-1.05a2.1 2.1 0 1 1 0-4.2h-5.1a2.1 2.1 0 1 1 0 4.2h5.1Z" /></svg>
        </a>
        <a
          href="/auth"
          className="flex flex-col items-center gap-0.5 text-xs font-semibold tracking-widest text-blue-600 hover:text-blue-800 transition-colors select-none w-full hover:scale-110 hover:shadow"
          aria-label="Únete a nuestra comunidad"
          style={{ minHeight: 40 }}
        >
          <svg className="w-6 h-6 mb-0.5 animate-bounce text-blue-600 group-hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.59 7.41L11 15l-1.41-1.41L12.17 12l-3.58-3.59L9 7l5 5z" />
          </svg>
          <span className="leading-tight text-center">Únete<br />comunidad</span>
        </a>
      </aside>

      {/* Social Dock Mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <div className="flex flex-row gap-3 bg-card rounded-xl shadow-xl border border-border px-3 py-2 items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600 transition-transform duration-200 active:scale-110"
            title="WhatsApp"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm5.2-7.19c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.13-.61.13s-.7.87-.86 1.05c-.16.18-.32.2-.59.07-.27-.14-1.11-.41-2.12-1.31a7.99 7.99 0 0 1-1.48-1.84c-.15-.25-.02-.39.11-.53.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.83-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.33-.25.27-.96.93-.96 2.26 0 1.33.98 2.62 1.12 2.8.14.18 1.93 2.95 4.68 3.7.49.13.87.21 1.16.27.49.08.93.07 1.28.04.39-.04 1.21-.5 1.38-.98.17-.49.17-.91.12-.99-.05-.08-.22-.13-.48-.26Z"/></svg>
          </a>
          <a
            href="https://instagram.com/montesionoaxaca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition-transform duration-200 active:scale-110"
            title="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.youtube.com/@montesionoaxatv/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-600 transition-transform duration-200 active:scale-110"
            title="YouTube"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="https://x.com/OaxacaSion33110"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-200 hover:text-[#831111] transition-transform duration-200 active:scale-110"
            title="X"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3H21.5l-7.19 8.21L22.5 21h-6.56l-5.18-6.13L4.47 21H.5l7.61-8.7L1.5 3h6.69l4.7 5.56L17.53 3Zm-1.06 15h2.08l-5.61-6.65-2.37 2.73L16.47 18ZM4.91 5l5.62 6.66L18.38 5h-2.1l-3.74 4.31L7.09 5H4.91Zm-1.41 12h2.13l3.15-3.64-1.97-2.33L3.5 17ZM12 13.08l1.13-1.31L19.56 19H21l-5.78-6.67L21 5h-2.07l-3.75 4.31L7.13 5H5.56l5.85 6.66L3.5 19h2.12l6.38-6.92Z"/></svg>
          </a>
          <a
            href="https://join.slack.com/t/montesionoaxaca/shared_invite/zt-1xyz12345-abcdefg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-700 transition-transform duration-200 active:scale-110"
            title="Slack"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M5.1 15.9a2.1 2.1 0 1 1-2.1-2.1h2.1v2.1Zm1.05 0a2.1 2.1 0 1 1 4.2 0v5.1a2.1 2.1 0 1 1-4.2 0v-5.1Zm2.1-7.95A2.1 2.1 0 1 1 10.35 5.1v2.1h-2.1Zm0 1.05a2.1 2.1 0 1 1 0 4.2H3.15a2.1 2.1 0 1 1 0-4.2h5.1Zm7.95 2.1a2.1 2.1 0 1 1 2.1-2.1v2.1h-2.1Zm-1.05 0a2.1 2.1 0 1 1 0 4.2h-5.1a2.1 2.1 0 1 1 0-4.2h5.1ZM19.8 15.9a2.1 2.1 0 1 1-2.1 2.1v-2.1h2.1Zm0-1.05a2.1 2.1 0 1 1 0-4.2h-5.1a2.1 2.1 0 1 1 0 4.2h5.1Z" /></svg>
          </a>
          <a
            href="/auth"
            className="flex flex-col items-center gap-0.5 text-xs font-semibold tracking-widest text-blue-600 hover:text-blue-800 transition-colors select-none w-full"
            aria-label="Únete a nuestra comunidad"
            style={{ minHeight: 32 }}
          >
            <svg className="w-5 h-5 mb-0.5 animate-bounce text-blue-600 group-hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.59 7.41L11 15l-1.41-1.41L12.17 12l-3.58-3.59L9 7l5 5z" />
            </svg>
            <span className="leading-tight text-center">Únete<br />comunidad</span>
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

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 8, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="mt-4 inline-flex items-center gap-2 px-7 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <span>Quiero saber más</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </motion.a>
        </motion.section>
      </main>
    </>
  );
}
