"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/auth-context";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function BarradeNavegacion() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [showBible, setShowBible] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // const { user, signOut, loading } = useAuth();

  // Cerrar menú de usuario cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-user-menu]')) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

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
          {/* Botón Biblia y Auth a la derecha en desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setShowBible(true)}
              className="bg-[#222] text-white px-6 py-2 rounded-full text-base hover:bg-primary/10 transition-colors flex items-center gap-2 focus:outline-none"
              type="button"
            >
              <span>Biblia</span>
              <span className="ml-1">📖</span>
            </button>
            
            {/* Auth Section */}
            {/* {user ? (
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block">
                    {user.user_metadata?.nombre || user.email?.split('@')[0] || 'Usuario'}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-neutral-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.user_metadata?.nombre} {user.user_metadata?.apellido}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setShowUserMenu(false);
                      }}
                      disabled={loading}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-700 disabled:opacity-50"
                    >
                      {loading ? 'Cerrando...' : 'Cerrar Sesión'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
             <Link href="/users/sign_in">
                <Button variant="default" size="sm">
                  Acceso
                </Button>
              </Link>
            )}  */}
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
          
          {/* Auth Section para móvil */}
          {/* <div className="flex flex-col items-center gap-4 mb-6 w-full">
            {user ? (
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="flex items-center space-x-3 text-white">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-lg font-medium">
                      {user.user_metadata?.nombre} {user.user_metadata?.apellido || ''}
                    </p>
                    <p className="text-sm text-gray-300">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <Link
                    href="/perfil"
                    onClick={toggleMenu}
                    className="bg-white/10 text-white px-4 py-2 rounded-lg text-center hover:bg-white/20 transition-colors"
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      toggleMenu();
                    }}
                    disabled={loading}
                    className="bg-red-600/80 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Cerrando...' : 'Cerrar Sesión'}
                  </button>
                </div>
              </div>
            ) : (
             <Link
                href="/users/sign_in"
                onClick={toggleMenu}
                className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium w-full max-w-xs text-center hover:bg-primary/90 transition-colors"
              >
                Acceso
              </Link>
            )}
          </div> */}
          
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
