"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function KidsLanding() {
  const [location, setLocation] = useState<string | null>(null)
  const [micActive, setMicActive] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [soundLevel, setSoundLevel] = useState<number | null>(null)

  useEffect(() => {
    document.title = "Vida Kids - Monte Sion"
  }, [])

  // GPS
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`)
        },
        () => setLocation("No se pudo obtener ubicación"),
        { enableHighAccuracy: true },
      )
    } else {
      setLocation("No disponible")
    }
  }

  // Micrófono
  const handleMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicActive(true)
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      source.connect(analyser)
      analyser.fftSize = 256
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      const getVolume = () => {
        analyser.getByteFrequencyData(dataArray)
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
        setSoundLevel(Math.round(avg))
        if (micActive) requestAnimationFrame(getVolume)
      }
      getVolume()
    } catch {
      setMicActive(false)
    }
  }

  // Cámara
  const handleCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      setCameraActive(true)
    } catch {
      setCameraActive(false)
    }
  }

  // Animaciones GSAP avanzadas
  const heroRef = useRef<HTMLElement | null>(null)
  const bannerRef = useRef<HTMLElement | null>(null)
  const campusRef = useRef<HTMLElement | null>(null)
  const { ref: inViewHero, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { ref: inViewBanner, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { ref: inViewCampus, inView: campusInView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (typeof window === "undefined") return

    if (heroInView && heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out" },
      )
    }
    if (bannerInView && bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, x: 120, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power4.out" },
      )
    }
    if (campusInView && campusRef.current) {
      gsap.fromTo(
        campusRef.current,
        { opacity: 0, y: 100, rotate: 6 },
        { opacity: 1, y: 0, rotate: 0, duration: 1.2, ease: "back.out(1.7)" },
      )
    }
  }, [heroInView, bannerInView, campusInView])

  // Helper para refs de animación GSAP + inView
  function setSectionRef(
    refSetter: React.RefObject<HTMLElement | null>,
    inViewSetter: (el: HTMLElement | null) => void,
  ) {
    return (el: HTMLElement | null) => {
      ;(refSetter as unknown as { current: HTMLElement | null }).current = el
      inViewSetter(el)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-start w-full relative overflow-x-hidden">
      {/* FONDO ANIMADO: Figuras Material 3 Expressive */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full" style={{ filter: "blur(2.5px)" }}>
          <g>
            {/* Círculo amarillo grande */}
            <motion.circle
              cx="15%"
              cy="20%"
              r="160"
              fill="#F9C846"
              style={{ mixBlendMode: "multiply" }}
              animate={{ cy: ["20%", "25%", "20%"] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" }}
              opacity="0.35"
            />
            {/* Rectángulo morado */}
            <motion.rect
              x="65%"
              y="8%"
              width="220"
              height="220"
              rx="60"
              fill="#7C3AED"
              style={{ mixBlendMode: "multiply" }}
              animate={{ y: ["8%", "13%", "8%"] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "easeInOut" }}
              opacity="0.22"
            />
            {/* Polígono rosa */}
            <motion.polygon
              points="80,600 280,800 80,1000"
              fill="#F472B6"
              style={{ mixBlendMode: "multiply" }}
              animate={{
                points: ["80,600 280,800 80,1000", "120,640 320,840 120,1040", "80,600 280,800 80,1000"],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 12, ease: "easeInOut" }}
              opacity="0.22"
            />
            {/* Elipse azul */}
            <motion.ellipse
              cx="85%"
              cy="80%"
              rx="180"
              ry="80"
              fill="#22D3EE"
              style={{ mixBlendMode: "multiply" }}
              animate={{ rx: [180, 220, 180] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 9, ease: "easeInOut" }}
              opacity="0.18"
            />
            {/* Rectángulo naranja */}
            <motion.rect
              x="8%"
              y="70%"
              width="180"
              height="180"
              rx="50"
              fill="#F59E42"
              style={{ mixBlendMode: "multiply" }}
              animate={{ x: ["8%", "13%", "8%"] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 11, ease: "easeInOut" }}
              opacity="0.18"
            />
            {/* Círculo verde */}
            <motion.circle
              cx="80%"
              cy="30%"
              r="90"
              fill="#4ADE80"
              style={{ mixBlendMode: "multiply" }}
              animate={{ cy: ["30%", "35%", "30%"] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 13, ease: "easeInOut" }}
              opacity="0.18"
            />
            {/* Polígono azul oscuro */}
            <motion.polygon
              points="1200,100 1300,200 1200,300"
              fill="#2563EB"
              style={{ mixBlendMode: "multiply" }}
              animate={{
                points: ["1200,100 1300,200 1200,300", "1220,120 1320,220 1220,320", "1200,100 1300,200 1200,300"],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 14, ease: "easeInOut" }}
              opacity="0.18"
            />
          </g>
        </svg>
      </div>

      {/* HERO tipo referencia: gran tipografía, imagen, botón */}
      <section
        ref={setSectionRef(heroRef, inViewHero)}
        className="w-full flex flex-col items-center pt-16 md:pt-24 px-4"
      >
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl mx-auto gap-8 md:gap-16">
          <div className="flex-1 flex flex-col items-start md:items-center">
            <h1
              className="text-6xl md:text-8xl font-semibold tracking-tight text-foreground leading-none mb-4"
              style={{ fontFamily: "Inter, Arial, sans-serif" }}
            >
              VIDA
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-3xl overflow-hidden w-32 h-20 md:w-44 md:h-28 bg-secondary shadow-lg">
                <Image
                  src="/placeholder.svg?height=120&width=220"
                  alt="Kids sonriendo"
                  width={220}
                  height={120}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <span
                className="text-6xl md:text-8xl font-semibold tracking-tight text-foreground"
                style={{ fontFamily: "Inter, Arial, sans-serif" }}
              >
                KIDS
              </span>
            </div>
            <motion.a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              VIDA KIDS EN YOUTUBE
            </motion.a>
          </div>
          <div className="flex-1 flex flex-col items-start md:items-end mt-8 md:mt-0">
            <p
              className="text-lg md:text-2xl text-neutral-700 dark:text-neutral-200 max-w-xl mb-6 md:mb-10 leading-relaxed"
              style={{ fontFamily: "Inter, Arial, sans-serif" }}
            >
              ¡En MásVida, los niños también tienen un lugar! Dios quiere hablarles a través de clases bíblicas
              entretenidas y divertidas que hemos preparado para ustedes; dediquen tiempo esta semana y disfruten
              juntos.
            </p>

            {/* Controles interactivos */}
            <div className="flex flex-wrap gap-3 mt-4">
              <motion.button
                onClick={handleGetLocation}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium shadow hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📍 Ubicación
              </motion.button>
              <motion.button
                onClick={handleMic}
                className={`px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors ${
                  micActive ? "bg-red-500 text-white" : "bg-green-500 text-white hover:bg-green-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎤 {micActive ? "Activo" : "Micrófono"}
              </motion.button>
              <motion.button
                onClick={handleCamera}
                className={`px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors ${
                  cameraActive ? "bg-red-500 text-white" : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📷 {cameraActive ? "Activa" : "Cámara"}
              </motion.button>
            </div>

            {/* Información de estado */}
            <div className="mt-4 space-y-2 text-sm">
              {location && <div className="text-blue-600 dark:text-blue-400">📍 {location}</div>}
              {soundLevel !== null && (
                <div className="text-green-600 dark:text-green-400">🎤 Nivel de sonido: {soundLevel}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Imagen grande tipo banner */}
      <section
        ref={setSectionRef(bannerRef, inViewBanner)}
        className="w-full flex justify-center items-center py-12 md:py-20 px-4"
      >
        <motion.div
          className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/placeholder.svg?height=500&width=1200"
            alt="Niños jugando y aprendiendo"
            width={1200}
            height={500}
            className="object-cover w-full h-[260px] md:h-[400px]"
            priority
          />
        </motion.div>
      </section>

      {/* Info campus y horarios */}
      <section
        ref={setSectionRef(campusRef, inViewCampus)}
        className="w-full flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-8 md:gap-16 px-4 pb-24"
      >
        <div className="flex-1 flex flex-col items-center md:items-start">
          <motion.div
            className="w-40 h-40 flex items-center justify-center mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="70" cy="70" r="65" stroke="#F9C846" strokeWidth="2" fill="none" opacity="0.3" />
              <text
                x="70"
                y="70"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontFamily="Inter, monospace"
                fill="#222"
                transform="rotate(-20 70 70)"
              >
                VIDA KIDS
              </text>
              <text
                x="70"
                y="70"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontFamily="Inter, monospace"
                fill="#666"
                transform="rotate(45 70 70)"
              >
                MONTE SION
              </text>
            </svg>
          </motion.div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h2
            className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 text-center md:text-left"
            style={{ fontFamily: "Inter, Arial, sans-serif" }}
          >
            Ubica tu campus y horarios de reuniones
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-200 mb-6 max-w-xl leading-relaxed text-center md:text-left">
            Durante nuestras reuniones, además de tratar diversos temas interesantes, también organizamos sesiones
            especiales para niños. En estas sesiones, los más pequeños podrán aprender y participar en actividades
            diseñadas específicamente para ellos, todo en un ambiente que les permite comprender mejor las ideas en su
            propio lenguaje y a su propio ritmo.
          </p>
          <motion.a
            href="/campus"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Campus
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </section>

      {/* Sección adicional de características */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="text-center p-6 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Actividades Creativas</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Manualidades, arte y proyectos que estimulan la creatividad de los niños.
            </p>
          </motion.div>

          <motion.div
            className="text-center p-6 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Historias Bíblicas</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Relatos adaptados para niños con lecciones de vida y valores cristianos.
            </p>
          </motion.div>

          <motion.div
            className="text-center p-6 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎵</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Música y Alabanza</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Canciones y coros que ayudan a los niños a expresar su fe con alegría.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}