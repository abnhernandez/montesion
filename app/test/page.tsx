"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem("testPageSeen");
    if (alreadySeen) {
      setShowLoading(false);
      setShowCustomAlert(true);
      return;
    }
    const timer = setTimeout(() => {
      setShowLoading(true);
      setTimeout(() => {
        setShowCustomAlert(true);
        localStorage.setItem("testPageSeen", "true");
      }, 1000); // Muestra la alerta personalizada 1 segundo después del loading
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoading && !showCustomAlert) {
    return <Loading />;
  }

  return (
    <>
      {/* Alerta personalizada sobre el sitio */}
      {showCustomAlert && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-3xl">
          <div className="relative bg-background text-foreground rounded-2xl shadow-xl p-8 max-w-sm w-full text-center border border-foreground/10 animate-fade-in">
            <h2 className="text-2xl font-bold mb-3">Página de Pruebas</h2>
            <p className="mb-4">
              Estás viendo la página de pruebas (<b>/test</b>).<br />
              Esta sección está en desarrollo y será lanzada próximamente.<br />
              ¡Pronto lanzaremos oficialmente estos diseños! 🚀
            </p>
            <Link href="/" className="inline-block mt-2 px-6 py-2 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/80 transition">
              Volver al inicio
            </Link>
            <p className="mt-4 text-xs text-foreground/50">
              Puedes cerrar esta ventana para seguir navegando.<br />
              (Esta pantalla es parte de una campaña de marketing interna)
            </p>
            {/* Botón de cerrar eliminado, la alerta ya no se puede cerrar manualmente */}
          </div>
        </div>
      )}
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f0fdfa] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* HERO NUEVO */}
        <section className="relative flex flex-col md:flex-row items-center justify-between gap-10 px-6 pt-24 pb-16 max-w-7xl mx-auto w-full">
          <motion.div
            className="flex-1 flex flex-col items-start z-10"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-300 via-pink-200 to-blue-200 text-[#831111] font-semibold text-sm tracking-widest shadow-md">
              Iglesia Cristiana en Oaxaca
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-[#831111] dark:text-yellow-300 mb-6 drop-shadow-xl">
              Vive la fe{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                auténtica
              </span>{" "}
              <br /> en comunidad
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-xl">
              Monte Sion es tu familia espiritual en Oaxaca. Encuentra propósito,
              amistad y el amor de Jesús en un ambiente vibrante y moderno.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/planifica-visita"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#831111] via-pink-600 to-yellow-400 text-white font-bold text-xl shadow-xl hover:scale-105 hover:shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                ¡Planifica tu visita!
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#831111] border-2 border-[#831111] font-bold text-xl shadow-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Quiénes somos
              </Link>
            </div>
            <div className="flex gap-4 mt-2">
              <a
                href="https://wa.me/525586449993"
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
                className="group"
              >
                <Image
                  src="/whatsapp.webp"
                  alt="WhatsApp Monte Sion"
                  width={40}
                  height={40}
                  className="rounded-full shadow-md group-hover:scale-110 transition"
                />
              </a>
              <a
                href="https://instagram.com/montesionoaxaca"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="group"
              >
                <Image
                  src="/instagram.webp"
                  alt="Instagram Monte Sion"
                  width={40}
                  height={40}
                  className="rounded-full shadow-md group-hover:scale-110 transition"
                />
              </a>
              <a
                href="https://www.youtube.com/@montesionoaxatv"
                target="_blank"
                rel="noopener"
                aria-label="YouTube"
                className="group"
              >
                <Image
                  src="/youtube.webp"
                  alt="YouTube Monte Sion"
                  width={40}
                  height={40}
                  className="rounded-full shadow-md group-hover:scale-110 transition"
                />
              </a>
              <a
                href="mailto:rootmontesion@gmail.com"
                aria-label="Email"
                className="group"
              >
                <Image
                  src="/email.webp"
                  alt="Email Monte Sion"
                  width={40}
                  height={40}
                  className="rounded-full shadow-md group-hover:scale-110 transition"
                />
              </a>
            </div>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center items-center relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-tr from-yellow-200 via-pink-200 to-blue-200 rounded-full blur-2xl opacity-70 animate-pulse"
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                }}
              />
              <Image
                src="/avatar_montesion.webp"
                alt="Avatar comunidad Monte Sion Oaxaca"
                fill
                className="object-cover rounded-full border-8 border-white dark:border-gray-900 shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </section>

        {/* VALORES Y MISIÓN - NUEVO DISEÑO */}
        <section className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-16 px-6">
          <motion.div
            whileHover={{ scale: 1.07 }}
            className="flex flex-col items-center text-center p-8 bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all"
          >
            <div className="w-12 h-12 text-yellow-400 mb-3 animate-bounce">✨</div>
            <h3 className="font-extrabold text-xl mb-2 text-[#831111] dark:text-yellow-300">
              Fe Viva
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              Crecemos juntos en la Palabra y la presencia de Dios.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.07 }}
            className="flex flex-col items-center text-center p-8 bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all"
          >
            <div className="w-12 h-12 text-blue-400 mb-3 animate-bounce">👥</div>
            <h3 className="font-extrabold text-xl mb-2 text-[#831111] dark:text-yellow-300">
              Comunidad
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              Aquí eres parte de una familia, no solo un asistente.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.07 }}
            className="flex flex-col items-center text-center p-8 bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all"
          >
            <div className="w-12 h-12 text-purple-400 mb-3 animate-bounce">
              👨‍👩‍👧‍👦
            </div>
            <h3 className="font-extrabold text-xl mb-2 text-[#831111] dark:text-yellow-300">
              Para Todas las Edades
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              Ministerios para niños, jóvenes, adultos y familias.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.07 }}
            className="flex flex-col items-center text-center p-8 bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all"
          >
            <div className="w-12 h-12 text-green-400 mb-3 animate-bounce">📖</div>
            <h3 className="font-extrabold text-xl mb-2 text-[#831111] dark:text-yellow-300">
              Discipulado
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              Te acompañamos a crecer y descubrir tu propósito en Cristo.
            </p>
          </motion.div>
        </section>

        {/* EVENTOS DESTACADOS - NUEVO DISEÑO */}
        <section className="w-full max-w-7xl mx-auto py-16 px-6">
          <h2 className="text-4xl font-black text-center mb-12 text-[#831111] dark:text-yellow-300 tracking-tight">
            Próximos Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{
                scale: 1.06,
                boxShadow: "0 8px 32px 0 rgba(131,17,17,0.15)",
              }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 flex flex-col items-center transition-all"
            >
              <Image
                src="/evento_domingo.webp"
                alt="Reunión General Domingo Monte Sion"
                width={120}
                height={120}
                className="rounded-2xl mb-4 shadow-md"
              />
              <span className="text-2xl font-bold text-blue-700 mb-2">
                Domingo 2:30 PM
              </span>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Reunión General
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-4">
                Calle Cuicatlán #186, Santa María Atzompa
              </p>
              <Link
                href="/planifica-visita"
                className="px-5 py-2 rounded-full bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition"
              >
                Ver detalles
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.06,
                boxShadow: "0 8px 32px 0 rgba(34,197,94,0.15)",
              }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 flex flex-col items-center transition-all"
            >
              <Image
                src="/evento_miercoles.webp"
                alt="Estudio Bíblico y Oración Miércoles Monte Sion"
                width={120}
                height={120}
                className="rounded-2xl mb-4 shadow-md"
              />
              <span className="text-2xl font-bold text-green-700 mb-2">
                Miércoles 7:00 PM
              </span>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Estudio Bíblico y Oración
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-4">
                Calle Cuicatlán #186, Santa María Atzompa
              </p>
              <Link
                href="/events"
                className="px-5 py-2 rounded-full bg-green-100 text-green-900 font-semibold hover:bg-green-200 transition"
              >
                Ver eventos
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.06,
                boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)",
              }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 flex flex-col items-center transition-all"
            >
              <Image
                src="/evento_talleres.webp"
                alt="Talleres y Cursos Monte Sion"
                width={120}
                height={120}
                className="rounded-2xl mb-4 shadow-md"
              />
              <span className="text-2xl font-bold text-pink-700 mb-2">
                Talleres y Cursos
              </span>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Arte, discipulado, jóvenes y más
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-4">
                Consulta fechas y horarios
              </p>
              <Link
                href="/talleres/pintura"
                className="px-5 py-2 rounded-full bg-pink-100 text-pink-900 font-semibold hover:bg-pink-200 transition"
              >
                Ver talleres
              </Link>
            </motion.div>
          </div>
        </section>

        {/* UBICACIÓN Y MAPA - NUEVO DISEÑO */}
        <section className="w-full max-w-7xl mx-auto py-16 px-6 flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black mb-3 text-[#831111] dark:text-yellow-300">
              ¿Dónde estamos?
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg">
              Calle Cuicatlán #186, Col. Niños Héroes, Santa María Atzompa, Oaxaca
            </p>
            <Link
              href="https://maps.app.goo.gl/kUsfgWTp8vHADfed7"
              target="_blank"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-100 text-blue-900 font-bold border-2 border-blue-200 hover:bg-blue-200 transition text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <span className="text-xl">📍</span>
              Ver en Google Maps
            </Link>
          </motion.div>
          <motion.div
            className="flex-1 rounded-3xl overflow-hidden border-2 border-blue-200 dark:border-yellow-900 shadow-2xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://maps.google.com/maps?q=17.077581,-96.762143&z=18&output=embed"
              width="100%"
              height="320"
              style={{ border: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Monte Sion"
            ></iframe>
          </motion.div>
        </section>

        {/* FAQ - NUEVO DISEÑO */}
        <section className="w-full max-w-4xl mx-auto py-16 px-6">
          <h2 className="text-4xl font-black text-center mb-10 text-[#831111] dark:text-yellow-300 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold text-[#831111] dark:text-yellow-300 mb-3">
                ¿Debo ser cristiano para asistir?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                No, todos son bienvenidos sin importar su trasfondo o creencias.
              </p>
            </div>
            <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold text-[#831111] dark:text-yellow-300 mb-3">
                ¿Hay actividades para niños?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Sí, tenemos ministerio infantil seguro y divertido en cada reunión.
              </p>
            </div>
            <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold text-[#831111] dark:text-yellow-300 mb-3">
                ¿Cómo puedo integrarme a un grupo?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Puedes preguntar en recepción o escribirnos por WhatsApp para unirte
                a un grupo pequeño o discipulado.
              </p>
            </div>
            <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold text-[#831111] dark:text-yellow-300 mb-3">
                ¿Qué debo llevar o cómo vestir?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Solo ven como te sientas cómodo, no hay código de vestimenta.
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL Y REDES - NUEVO DISEÑO */}
        <section className="w-full py-16 bg-gradient-to-r from-[#831111]/90 via-yellow-100/60 to-blue-100/60 dark:from-[#831111]/90 dark:via-gray-900/80 dark:to-blue-900/60 border-t border-gray-200 dark:border-gray-800 text-center">
          <motion.h2
            className="text-4xl font-black mb-5 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            ¿Listo para dar el siguiente paso?
          </motion.h2>
          <motion.p
            className="mb-8 text-xl text-white/90"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            Descubre cómo integrarte, participa en grupos y vive la fe con nosotros.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              href="/acercade"
              className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white text-white bg-gradient-to-r from-[#831111] via-pink-600 to-yellow-400 rounded-full font-black text-2xl shadow-2xl hover:bg-white hover:text-[#831111] transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              <span className="text-yellow-300 animate-pulse text-2xl">✉️</span>
              Quiero saber más
              <span className="ml-2 text-2xl">→</span>
            </Link>
          </motion.div>
          <div className="flex justify-center gap-8 mt-10">
            <a
              href="https://wa.me/525586449993"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="group"
            >
              <Image
                src="/whatsapp.webp"
                alt="WhatsApp Monte Sion"
                width={48}
                height={48}
                className="rounded-full shadow-md group-hover:scale-110 transition"
              />
            </a>
            <a
              href="https://instagram.com/montesionoaxaca"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="group"
            >
              <Image
                src="/instagram.webp"
                alt="Instagram Monte Sion"
                width={48}
                height={48}
                className="rounded-full shadow-md group-hover:scale-110 transition"
              />
            </a>
            <a
              href="https://www.youtube.com/@montesionoaxatv"
              target="_blank"
              rel="noopener"
              aria-label="YouTube"
              className="group"
            >
              <Image
                src="/youtube.webp"
                alt="YouTube Monte Sion"
                width={48}
                height={48}
                className="rounded-full shadow-md group-hover:scale-110 transition"
              />
            </a>
            <a
              href="mailto:rootmontesion@gmail.com"
              aria-label="Email"
              className="group"
            >
              <Image
                src="/email.webp"
                alt="Email Monte Sion"
                width={48}
                height={48}
                className="rounded-full shadow-md group-hover:scale-110 transition"
              />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}