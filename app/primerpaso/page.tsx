'use client'

import React, { useState } from "react";
import { CaminoDeCrecimiento } from "@/components/ui/discipleshipIcons";

export default function PrimerPasoPage() {
  const [showModal, setShowModal] = useState(false);
  // Para el acordeón de FAQ
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero principal con diseño más moderno */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse"></div>
        <div className="relative flex flex-col items-center text-center py-20 px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <span className="mr-2">✨</span>
            Nueva experiencia disponible
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent leading-tight">
            ¡Da tu Primer Paso!
          </h1>
          <h2 className="text-xl md:text-3xl mb-8 font-medium text-foreground/80 max-w-2xl">
            Descubre el inicio de una nueva vida en comunidad
          </h2>
          <p className="text-lg md:text-xl mb-10 text-foreground/70 max-w-3xl leading-relaxed">
            El <span className="font-semibold text-primary">Primer Paso</span> es una experiencia diseñada para quienes desean conocer más sobre la fe, la iglesia y cómo integrarse a nuestra familia. Aquí te acompañamos, resolvemos tus dudas y te ayudamos a dar ese gran primer paso en tu camino espiritual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="/contact"
              className="group relative inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-primary/90"
            >
              <span className="mr-2">💬</span>
              Quiero más información
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="https://forms.gle/f4ca3hi8LtXNFxp37"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <span className="mr-2">📝</span>
              Registrarme ahora
            </a>
          </div>
        </div>
      </section>

      {/* Imagen/video con mejor presentación */}
      <section className="w-full flex justify-center mb-20 px-4">
        <div className="relative max-w-4xl w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-card backdrop-blur-sm">
        <div className="aspect-video flex items-center justify-center">
          <video
            src="/assets/promoapp.webm"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/assets/congregacion-vista-frontal.webp"
            className="object-cover w-full h-full rounded-3xl"
          >
            Tu navegador no soporta el video.
          </video>
        </div>
          </div>
        </div>
      </section>

      {/* Proceso mejorado con animaciones y mejor diseño */}
      <section className="w-full max-w-6xl mx-auto mb-20 px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo es el proceso?
          </h3>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Un camino sencillo y acompañado hacia tu nueva vida espiritual
          </p>
        </div>
        
        <div className="relative">
          {/* Línea de conexión de fondo */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-full transform -translate-y-1/2 z-0"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 z-10">
            {/* Paso 1 - Mejorado */}
            <div className="group flex flex-col items-center flex-1 p-6 rounded-2xl bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[400px]">
              <div className="relative mb-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-3xl">📝</span>
            </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
              </div>
              <div className="flex items-center justify-center mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                <h4 className="text-xl font-bold text-center">Regístrate</h4>
              </div>
              <p className="text-sm text-foreground/70 text-center leading-relaxed mb-4">
                Completa nuestro sencillo formulario en línea o acércate personalmente a nosotros.<br />
                <span className="block mt-2 text-foreground/60">¡Es el primer paso para recibir acompañamiento y descubrir todo lo que tenemos para ti!</span>
              </p>
              <a
                href="https://forms.gle/f4ca3hi8LtXNFxp37"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-medium border border-primary/20"
              >
                <span className="mr-2">🔗</span>
                Ir al formulario
              </a>
            </div>

            {/* Paso 2 - Mejorado */}
            <div className="group flex flex-col items-center flex-1 p-6 rounded-2xl bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[400px]">
              <div className="relative mb-6">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-secondary to-secondary/80 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl">🤝</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
              </div>
              <div className="flex items-center justify-center mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                <h4 className="text-xl font-bold text-center">Únete a la comunidad</h4>
              </div>
              <p className="text-sm text-foreground/70 text-center leading-relaxed mb-4">
                Únete a nuestro grupo exclusivo de WhatsApp.<br />
                Además, recibe invitaciones a actividades, talleres y grupos pequeños para seguir avanzando.
              </p>
              <a
                href="https://wa.me/525586449993?text=Hola%2C%20quiero%20unirme%20al%20grupo%20de%20bienvenida"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium border border-green-500/20 hover:bg-green-500/20 hover:text-green-700 transition-all duration-300"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="mr-2"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A12.13 12.13 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.77 0-3.5-.46-5.01-1.33l-.36-.21-3.68.96.98-3.59-.23-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.54 0 4.93.99 6.73 2.77A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                Unirme al grupo de WhatsApp
              </a>
            </div>

            {/* Paso 3 - Mejorado */}
            <div className="group flex flex-col items-center flex-1 p-6 rounded-2xl bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[400px]">
              <div className="relative mb-6">
            <div className="w-20 h-20 flex items-center justify-center">
              <span className="text-3xl">🌱</span>
            </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
              </div>
              <div className="flex items-center justify-center mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                <h4 className="text-xl font-bold text-center">Conéctate</h4>
              </div>
              <p className="text-sm text-center leading-relaxed mb-4">
                Únete a nuestra comunidad y continúa creciendo en tu camino espiritual.<br />
                <span className="block mt-2 text-foreground/60">Conoce cómo puedes crecer tu relación con Dios y la comunidad</span>
              </p>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                onClick={() => setShowModal(true)}
              >
                <span className="mr-2">🎯</span>
                Tu meta
              </button>
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-black rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
                    <button
                      className="absolute top-3 right-3 text-2xl"
                      onClick={() => setShowModal(false)}
                      aria-label="Cerrar"
                    >
                      ×
                    </button>
                    <CaminoDeCrecimiento />
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios rediseñados con mejor impacto visual */}
      <section className="w-full max-w-6xl mx-auto mb-20 px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué dar el Primer Paso?
          </h3>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Descubre los beneficios de unirte a nuestra comunidad
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden bg-card/50">
            <div className="relative z-10">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Acompañamiento según la Palabra</h4>
              <p className="text-foreground/70 leading-relaxed">
                Jesús prometió: <span className="italic">"Y yo estaré con ustedes todos los días, hasta el fin del mundo"</span> (Mateo 28:20). En este proceso, te acompañamos para que experimentes el amor y la guía de Dios en comunidad, conforme a Su Palabra.
              </p>
            </div>
          </div>

          <div className="group relative p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden bg-card/50">
            <div className="relative z-10">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-3xl">🤗</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Comunidad Cristocéntrica</h4>
              <p className="text-foreground/70 leading-relaxed">
                "En esto conocerán todos que son mis discípulos, si se aman los unos a los otros" (Juan 13:35). Aquí encontrarás una comunidad que te recibe y te anima a crecer en Cristo, viviendo el amor y la unidad que enseña la Biblia.
              </p>
            </div>
          </div>

          <div className="group relative p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden bg-card/50">
            <div className="relative z-10">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Crecimiento Integral en Cristo</h4>
              <p className="text-foreground/70 leading-relaxed">
                "Antes bien, creced en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo" (2 Pedro 3:18). Queremos ayudarte a descubrir tu propósito y a crecer espiritualmente, fundamentando cada paso en la Palabra de Dios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ mejorado con mejor diseño */}
      <section className="w-full max-w-4xl mx-auto mb-20 px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Preguntas frecuentes
          </h3>
          <p className="text-lg text-foreground/70">
            Resolvemos las dudas más comunes sobre el Primer Paso
          </p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              icon: <span className="w-8 h-8 flex items-center justify-center mr-3 text-primary">👥</span>,
              question: "¿Quién puede dar el Primer Paso?",
              answer: (
                <span>
                  Toda persona que desee conocer a Jesús y crecer en su fe es bienvenida. Jesús dijo: <span className="italic">"Vengan a mí todos los que están cansados y cargados, y yo les daré descanso"</span> (Mateo 11:28). Aquí hay un lugar para ti, sin importar tu trasfondo.
                </span>
              ),
            },
            {
              icon: <span className="w-8 h-8 flex items-center justify-center mr-3 text-green-600">💰</span>,
              question: "¿Tiene algún costo?",
              answer: (
                <span>
                  No, todos nuestros servicios son gratuitos. "De gracia recibisteis, dad de gracia" (Mateo 10:8). Queremos compartir el amor de Dios sin barreras económicas.
                </span>
              ),
            },
            {
              icon: <span className="w-8 h-8 flex items-center justify-center mr-3 text-purple-600">🚀</span>,
              question: "¿Qué sucede después?",
              answer: (
                <span>
                  Te invitamos a seguir creciendo en comunidad, como enseña Hebreos 10:24-25: <span className="italic">"Y considerémonos unos a otros para estimularnos al amor y a las buenas obras... no dejando de congregarnos"</span>. Además, puedes consultar más preguntas generales en <a href="/faq" className="text-primary underline">/faq</a>.
                </span>
              ),
            },
            {
              icon: <span className="w-8 h-8 flex items-center justify-center mr-3 text-blue-600">⏰</span>,
              question: "¿Cuánto tiempo dura?",
              answer: (
                <span>
                  La reunión de bienvenida es breve, pero el caminar con Cristo es para toda la vida. "Enseñándoles que guarden todas las cosas que os he mandado" (Mateo 28:20). Si tienes más dudas, visita <a href="/faq" className="text-primary underline">/faq</a>.
                </span>
              ),
            },
          ].map((faq, idx) => (
            <div key={idx} className="group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-card/50">
              <button
                className="w-full flex items-center justify-between p-6 font-semibold text-lg cursor-pointer outline-none focus:bg-primary/5 transition-colors duration-200 bg-transparent border-none text-left"
                aria-expanded={openIndex === idx}
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                type="button"
              >
                <span className="flex items-center">{faq.icon}{faq.question}</span>
                <span className={"text-primary transition-transform duration-300 " + (openIndex === idx ? "rotate-180" : "")}>▼</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-foreground/80 leading-relaxed border-t pt-4 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final rediseñado */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-primary-foreground">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para dar tu Primer Paso?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Estamos aquí para acompañarte en este emocionante camino. Contáctanos y comencemos juntos.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                href="https://wa.me/525586449993?text=Hola%2C%20quiero%20más%20información%20sobre%20el%20Primer%20Paso"
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center px-8 py-4 rounded-full text-primary font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                <span className="text-2xl mr-3 group-hover:animate-pulse">📱</span>
                WhatsApp
                <div className="ml-2 w-5 h-5 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full animate-pulse"></div>
                </div>
                </a>
              
                <a 
                href="mailto:ministeriomontesionoaxaca@gmail.com?subject=Quiero%20más%20información%20sobre%20el%20Primer%20Paso&body=Hola%2C%20me%20gustaría%20recibir%20más%20información%20sobre%20el%20Primer%20Paso.%20Gracias."
                className="group inline-flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
                >
                <span className="text-2xl mr-3 group-hover:animate-bounce">✉️</span>
                Email
                </a>
            </div>
            
            <div className="mt-8 text-sm opacity-75">
              <p>También puedes visitarnos los domingos a las 02:30 p.m.</p>
            </div>
          </div>
          
          {/* Elementos decorativos */}
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/5 animate-pulse delay-700"></div>
        </div>
      </section>
    </div>
  );
}