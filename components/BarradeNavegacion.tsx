"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export function BarradeNavegacion() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [showBible, setShowBible] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Funciones para controlar el hover de los dropdowns
  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdown(name);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdown(null), 120);
  };
  const handleMobileDropdown = (name: string) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300 ease-in-out">
      {/* IFRAME BIBLIA FULLSCREEN */}
      {showBible && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-95 flex items-center justify-center">
          <button
            onClick={() => {
              setShowBible(false);
              setIsMenuOpen(false);
            }}
            className="absolute top-5 right-6 w-8 h-8 flex items-center justify-center bg-[#222] text-white rounded-full shadow-lg z-[1000] cursor-pointer p-[4px_2px]"
            aria-label="Cerrar Biblia"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <iframe
            src="https://www.bible.com/bible/149/GEN.1.RVR1960"
            title="Biblia"
            className="w-full h-full border-0 rounded-none"
            allowFullScreen
          />
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo a la izquierda */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl tracking-tight font-semibold">
              montesion
            </Link>
          </div>
          {/* Menú centrado en desktop */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-6">
            {/* NOSOTROS dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('sobre nosotros')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-base hover:text-primary flex items-center gap-1">
                Sobre Nosotros <span>+</span>
              </button>
              {dropdown === 'sobre nosotros' && (
                <div
                  className="absolute left-0 mt-2 bg-black text-white dark:bg-white dark:text-black rounded-2xl shadow-lg py-4 px-8 min-w-[220px] z-50 flex flex-col gap-3 animate-fade-in"
                  onMouseEnter={() => handleDropdownEnter('sobre nosotros')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link href="/nuestra-mision-vison" className="hover:underline">Nuestra Misión / Visión</Link>
                  <Link href="/declaraciondefe" className="hover:underline">Declaraciones de Fe</Link>
                  <Link href="/pastores" className="hover:underline">Nuestros Pastores</Link>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('Templos')}
              onMouseLeave={handleDropdownLeave}
            >
            {/* TEMPLOS (no dropdown) */}
            <Link href="/templos" onClick={toggleMenu} className="text-base hover:text-primary flex items-center gap-1">
              Templos
            </Link>
            </div>
            {/* INVOLÚCRATE dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('involucrate')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-base hover:text-primary flex items-center gap-1">
                Involúcrate <span>+</span>
              </button>
              {dropdown === 'involucrate' && (
                <div
                  className="absolute left-0 mt-2 bg-black text-white dark:bg-white dark:text-black rounded-2xl shadow-lg py-4 px-8 min-w-[260px] z-50 flex flex-col gap-3 animate-fade-in"
                  onMouseEnter={() => handleDropdownEnter('involucrate')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link href="/primerpaso" className="hover:underline">Tu Primer Paso</Link>
                  <Link href="/kids" className="hover:underline">Niños | Monte Sion Kids</Link>
                  <Link href="/mujeres" className="hover:underline">Mujeres | Unidas</Link>
                  <Link href="/oracion" className="hover:underline">Oración</Link>
                  <Link href="/experiencia" className="hover:underline">Experiencia Monte Sion</Link>
                </div>
              )}
            </div>
            {/* FORMACIÓN dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('formacion')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-base hover:text-primary flex items-center gap-1">
                Formación <span>+</span>
              </button>
              {dropdown === 'formacion' && (
                <div
                  className="absolute left-0 mt-2 bg-black text-white dark:bg-white dark:text-black rounded-2xl shadow-lg py-4 px-8 min-w-[220px] z-50 flex flex-col gap-3 animate-fade-in"
                  onMouseEnter={() => handleDropdownEnter('formacion')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link href="/talleres/pintura" className="hover:underline">Talleres</Link>
                  <Link href="/courses" className="hover:underline">Cursos en Línea</Link>

                </div>
              )}
            </div>
          </div>
          {/* Botón Biblia a la derecha en desktop */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setShowBible(true)}
              className="bg-[#222] text-white px-6 py-2 rounded-full text-base hover:bg-primary/10 transition-colors flex items-center gap-2 focus:outline-none"
              type="button"
            >
              <span>Biblia</span>
              <span className="ml-1">📖</span>
            </button>
          </div>
          {/* Menú hamburguesa móvil */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-primary focus:outline-none">
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black z-50 flex flex-col justify-between p-4">
          {/* Header: Logo y botón cerrar */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl text-white font-semibold">montesion</span>
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Menu Items: igual que desktop, con dropdowns móviles */}
          <div className="flex flex-col gap-4 items-start flex-1 justify-center w-full">
            {/* SOBRE NOSOTROS (dropdown) */}
            <button onClick={() => handleMobileDropdown('sobre nosotros')} className="text-white text-2xl tracking-wide flex items-center gap-2 uppercase w-full justify-between">
              Sobre Nosotros <span className={`transition-transform ${mobileDropdown==='sobre nosotros' ? 'rotate-45' : ''}`}>+</span>
            </button>
            {mobileDropdown==='sobre nosotros' && (
              <div className="flex flex-col gap-2 pl-4 w-full">
                <Link href="/nuestra-mision-vision" onClick={toggleMenu} className="text-white text-lg">Nuestra Misión/Visión</Link>
                <Link href="/declaraciondefe" onClick={toggleMenu} className="text-white text-lg">Declaraciones de Fe</Link>
                <Link href="/pastores" onClick={toggleMenu} className="text-white text-lg">Nuestros Pastores</Link>
              </div>
            )}
            {/* TEMPLOS (no dropdown) */}
            <Link href="/templos" onClick={toggleMenu} className="text-white text-2xl tracking-wide uppercase w-full py-2">
              Templos
            </Link>
            {/* INVOLÚCRATE (dropdown) */}
            <button onClick={() => handleMobileDropdown('involucrate')} className="text-white text-2xl tracking-wide flex items-center gap-2 uppercase w-full justify-between">
              Involúcrate <span className={`transition-transform ${mobileDropdown==='involucrate' ? 'rotate-45' : ''}`}>+</span>
            </button>
            {mobileDropdown==='involucrate' && (
              <div className="flex flex-col gap-2 pl-4 w-full">
                <Link href="/primerpaso" onClick={toggleMenu} className="text-white text-lg">Tu Primer Paso</Link>
                <Link href="/kids" onClick={toggleMenu} className="text-white text-lg">Niños | Monte Sion Kids</Link>
                <Link href="/mujeres" onClick={toggleMenu} className="text-white text-lg">Mujeres | Unidas</Link>
                <Link href="/oracion" onClick={toggleMenu} className="text-white text-lg">Oración</Link>
                <Link href="/experiencia" onClick={toggleMenu} className="text-white text-lg">Experiencia Monte Sion</Link>
              </div>
            )}
            {/* FORMACIÓN (dropdown) */}
            <button onClick={() => handleMobileDropdown('formacion')} className="text-white text-2xl tracking-wide flex items-center gap-2 uppercase w-full justify-between">
              Formación <span className={`transition-transform ${mobileDropdown==='formacion' ? 'rotate-45' : ''}`}>+</span>
            </button>
            {mobileDropdown==='formacion' && (
              <div className="flex flex-col gap-2 pl-4 w-full">
                <Link href="/talleres/pintura" onClick={toggleMenu} className="text-white text-lg">Talleres</Link>
                <Link href="/courses" onClick={toggleMenu} className="text-white text-lg">Cursos en Línea</Link>
              </div>
            )}
          </div>
          {/* Biblia Button animado */}
          <div className="flex flex-col items-center gap-4 mb-2">
            <button
              onClick={() => setShowBible(true)}
              className="group text-white px-8 py-3 rounded-full text-lg flex items-center gap-2 w-full justify-center overflow-hidden relative"
              style={{minWidth: 180}}
            >
              <span className="block transition-transform duration-300 group-hover:-translate-y-7 group-hover:opacity-0">Biblia</span>
              <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center transition-transform duration-300 translate-y-7 group-hover:translate-y-0 group-hover:opacity-100 opacity-0">¡Palabra Viva!</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">📖</span>
            </button>
          </div>
          {/* Icono de contacto (decorativo) */}
          <div className="absolute bottom-6 right-6">
            <Link href="/contact" aria-label="Contacto" className="bg-[#222] rounded-full p-3 shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}