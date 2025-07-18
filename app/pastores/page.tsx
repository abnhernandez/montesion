'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';

export default function PastoresPage() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#000] text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-16">
        <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          <div className="flex-shrink-0 w-full md:w-2/5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs md:max-w-md h-56 md:h-80 flex items-center justify-center overflow-hidden rounded-xl shadow-xl">
              <span className="absolute inset-0 bg-gradient-to-t from-blue-400 via-yellow-300 to-pink-400 opacity-40"></span>
              <Image src="/assets/pastores.svg" alt="Pastores" fill priority className="relative w-full h-full object-cover object-top z-10" style={{borderRadius: '1rem 1rem 0 0'}} />
            </div>
          </div>
          <div className="w-full md:w-3/5 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-2 text-blue-700 dark:text-yellow-300 text-center md:text-left">Lemuel Acosta & Irma Ruelas</h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2 font-medium text-center md:text-left">
                Amamos a Dios, amamos la vida y amamos a las personas. Somos esposos, padres y amigos, y nuestra mayor alegría es ver cómo el amor de Jesús transforma corazones y familias. Nos apasiona enseñar la Biblia de manera sencilla y práctica, acompañar a quienes buscan propósito y celebrar cada historia de fe y esperanza.
              </p>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2 font-medium text-center md:text-left">
                Nuestra trayectoria está marcada por el servicio, la cercanía y el deseo de ver a cada generación crecer en su relación con Dios. Hemos dedicado años a formar líderes, fortalecer matrimonios y crear espacios donde todos puedan encontrar comunidad y dirección espiritual. Creemos que la iglesia es una familia donde cada persona es valiosa y bienvenida.
              </p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2 text-center md:text-left">
                Si buscas un lugar para crecer, sanar, reír y descubrir tu propósito, Montesión es tu casa. Nos encanta compartir reflexiones, momentos familiares y recursos que te ayuden a vivir tu fe cada día. ¡Ven como eres, aquí eres bienvenido!
              </p>
              <div className="mt-2 text-base md:text-lg font-semibold text-blue-700 dark:text-yellow-300 text-center md:text-left">Descubre nuestros horarios y ubicación, y únete a la familia Montesión.</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <MapPin size={24} className="text-blue-600 dark:text-yellow-300" />
                <span className="text-base md:text-lg font-medium">Cuicatlán 184, Colonia Niños Héroes Santa María Atzompa, 71222 Oaxaca de Juárez, Oax.</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={24} className="text-blue-600 dark:text-yellow-300 mt-1" />
                <div className="text-base md:text-lg w-full">
                  <span className="font-semibold block mb-1">Horarios:</span>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <div className="font-semibold text-green-600 dark:text-green-400">Viernes</div>
                    <div className="font-mono">6–8 p.m.</div>
                    <div className="font-semibold text-green-600 dark:text-green-400">Domingo</div>
                    <div className="font-mono">2:30–5 p.m.</div>
                    <div className="font-semibold text-green-600 dark:text-green-400">Jueves</div>
                    <div className="font-mono">6–8 p.m.</div>
                    <div className="font-semibold text-gray-400">Sábado</div>
                    <div className="font-mono text-gray-400">Cerrado</div>
                    <div className="font-semibold text-gray-400">Lunes</div>
                    <div className="font-mono text-gray-400">Cerrado</div>
                    <div className="font-semibold text-gray-400">Martes</div>
                    <div className="font-mono text-gray-400">Cerrado</div>
                    <div className="font-semibold text-gray-400">Miércoles</div>
                    <div className="font-mono text-gray-400">Cerrado</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Contacto:</span>
                <a href="https://wa.me/529512091644?text=Hola%20pastores%2C%20les%20saludo%20y%20me%20gustaría%20conocer%20más%20sobre%20la%20comunidad%20Montesión." target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-yellow-300 underline text-base md:text-lg font-bold">+52 951 209 1644</a>
              </div>
            </div>
            <div className="mt-4 flex justify-center md:justify-start">
              <a
                href="https://maps.app.goo.gl/FjATGf16ELzq9zUE9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 rounded-full font-semibold transition-colors duration-200 shadow"
                style={{
                  backgroundColor: 'white',
                  color: '#000',
                  border: 'none',
                }}
                onMouseEnter={e => {
                  if (document.documentElement.classList.contains('dark')) {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  } else {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={e => {
                  if (document.documentElement.classList.contains('dark')) {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  } else {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#000';
                  }
                }}
              >
                Ver ubicación
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}