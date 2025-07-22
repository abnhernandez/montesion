"use client"

import type React from "react"


import { useState, useEffect } from "react"
import { MapPin, ExternalLink, Youtube, UserPlus, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Interfaces para TypeScript
interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "contact" | "assist"
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

interface TimerProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function MonteSionConf() {
  // ==================== COMPONENTE BUTTON ====================
  const Button = ({ children, variant = "primary", onClick, className = "", style }: ButtonProps) => {
    // Paleta Next.js/Tailwind: neutral, indigo, yellow, red, white, black
    const baseClasses =
      "px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
    const variantClasses = {
      primary:
        "bg-indigo-700 text-white border border-indigo-700 hover:bg-indigo-800 hover:border-indigo-800 focus:ring-indigo-500",
      secondary:
        "bg-yellow-400 text-neutral-900 border border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 focus:ring-yellow-500",
      outline:
        "bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500",
      contact:
        "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border border-neutral-900 dark:border-white hover:bg-neutral-800 dark:hover:bg-neutral-200 focus:ring-neutral-500",
      assist:
        "bg-neutral-100 text-neutral-900 border border-neutral-300 hover:bg-neutral-200 focus:ring-neutral-500",
    }
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
        style={style}
      >
        <span className="flex items-center gap-2">{children}</span>
      </button>
    )
  }

  // ==================== COMPONENTE TIMER ====================
  const Timer = ({ targetDate }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const distance = targetDate.getTime() - now

        if (distance > 0) {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          })
        }
      }, 1000)

      return () => clearInterval(timer)
    }, [targetDate])

    return (
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="flex flex-col">
          <span className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white">{timeLeft.days}</span>
          <span className="text-gray-700 dark:text-gray-400 text-sm">días</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white">{timeLeft.hours}</span>
          <span className="text-gray-700 dark:text-gray-400 text-sm">horas</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white">{timeLeft.minutes}</span>
          <span className="text-gray-700 dark:text-gray-400 text-sm">min</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white">{timeLeft.seconds}</span>
          <span className="text-gray-700 dark:text-gray-400 text-sm">seg</span>
        </div>
      </div>
    )
  }

  // ...existing code...

  // ==================== CONFIGURACIÓN DEL EVENTO ====================
  // Fecha objetivo para la cuenta regresiva (30 de agosto, 2024 a las 10:00 AM)
  const eventDate = new Date("2025-08-09T10:00:00")

  // ==================== RENDER PRINCIPAL ====================
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 relative">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* ==================== SECCIÓN IZQUIERDA - HEADER E INFO DEL EVENTO ==================== */}
          <div className="space-y-8">
            <div className="h-8" />
            {/* Header con logo y badge */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold tracking-wide">Monte Sion</span>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://youtube.com/@montesionoaxacatv', '_blank')}
                    className="font-bold px-3 py-2"
                    aria-label="Ir al Live"
                  >
                    <Youtube className="w-5 h-5" />
                    Ir al Live
                  </Button>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-wider text-neutral-900 dark:text-neutral-100">Confraternidad Más que Vencedores</h1>
            </div>

            {/* Ubicación y fecha del evento */}
            <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl p-6 border border-neutral-300 dark:border-neutral-700 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-neutral-900 dark:text-neutral-100 font-semibold text-lg">Sábado 9 y Domingo 10 de Agosto, 10:00 am</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-base font-medium">Salón de Unión de Camioneros y Materialistas del Estado de Oaxaca, A.C.</span>
                <a href="https://maps.app.goo.gl/8BigxhtzKFNgp6sD9" target="_blank" rel="noopener" className="ml-1 inline-flex items-center hover:text-neutral-900">
                  <ExternalLink className="w-4 h-4" aria-label="Ver mapa" />
                </a>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-bold">Referencia:</span> Pasando el Centro Comercial Meraz
              </div>
            </div>

            {/* Mensaje principal espiritual */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
                Dos días para vivir una experiencia de fe, comunidad y transformación espiritual.<br />
                <span className="text-neutral-400 dark:text-neutral-300">¡Sé parte de lo que Dios está haciendo!</span>
              </h2>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex gap-2 flex-wrap">
                <Button
                  variant="contact"
                  onClick={() => window.open('https://wa.me/529512091644?text=Hola%20quiero%20informacion%20de%20la%20confrarternidad', '_blank')}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-base"
                  aria-label="Contacto WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contacto
                </Button>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">¿Dudas? Escríbenos por WhatsApp.</div>
              </div>
            </div>

          </div>

          {/* ==================== SECCIÓN DERECHA - Imagen y Acciones ==================== */}
          <div className="space-y-8">
            {/* Imagen principal */}
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-neutral-700 dark:border-neutral-800 bg-white/10 dark:bg-neutral-900/30 backdrop-blur-lg">
              <Image
                src="/assets/congregacion-adorando.webp"
                alt="Congregación adorando"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Overlay oscuro para resaltar la imagen */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-br from-black/10 via-black/5 to-black/20 dark:from-black/40 dark:via-black/20 dark:to-black/60 absolute inset-0"></div>
              </div>
              {/* Texto lateral elegante */}
            </div>

            {/* Sección de llamada a la acción */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">Regístrate y asegura tu lugar</h3>
                <p className="text-neutral-700 dark:text-neutral-200 text-sm">
                  La entrada es gratuita, sólo necesitas registrarte para recibir información y acceso.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                  <Link href="https://maps.app.goo.gl/8BigxhtzKFNgp6sD9" target="_blank" rel="noopener" className="flex-1">
                    <Button
                      style={{ }}
                      className="w-full py-4 text-lg font-bold tracking-wide border-2 border-[#158331] hover:bg-[#1da851] bg-[#158331] text-white dark:bg-[#115c25] dark:border-[#115c25] dark:hover:bg-[#158331]"
                      aria-label="Asistir presencial"
                    >
                      <MapPin className="w-5 h-5" />
                      Asistir presencial
                    </Button>
                  </Link>
                  <div className="flex-1">
                    <Button
                      variant="assist"
                      className="w-full py-4 text-lg font-bold tracking-wide"
                      onClick={() => window.open('https://campusmontesion.online.church/', '_blank')}
                      aria-label="Asistir Online (Campus Monte Sion)"
                    >
                      <UserPlus className="w-5 h-5" />
                      Asistir Online
                    </Button>
                  </div>
                </div>
              </div>

              {/* Temporizador de cuenta regresiva */}
              <div className="space-y-4">
                <p className="text-neutral-700 dark:text-neutral-200 text-sm uppercase tracking-wide">INICIA EN:</p>
                <Timer targetDate={eventDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
