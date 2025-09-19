"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { createClient } from "@supabase/supabase-js"
import { ChevronDown, Menu, X, Search } from "lucide-react"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function BarradeNavegacion() {
  const [username, setUsername] = useState<string>("")
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
    let _mounted = true;
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!_mounted) return;
      if (user) {
        setUsername(user.user_metadata?.username || user.email || "Usuario");
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
    fetchUser();
    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!_mounted) return;
      if (session?.user) {
        setUsername(session.user.user_metadata?.username || session.user.email || "Usuario");
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUsername("");
      }
    });
    return () => {
      _mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, [])

  const navigationItems = [
    { label: "Aprende", hasSubmenu: true },
    { label: "Productos", hasSubmenu: true },
    { label: "Convocatorias", hasSubmenu: true },
    { label: "Biblia", hasSubmenu: false, isIframe: true },
  ]

  const [showBible, setShowBible] = useState(false)
  // Memoize the iframe so it doesn't reload on every open
  const bibleIframeRef = useRef<HTMLIFrameElement | null>(null)

  const renderNavItems = () =>
    navigationItems.map((item) => (
      <li key={item.label}>
        {item.isIframe ? (
          <button
            className="flex items-center gap-1 font-semibold text-base hover:opacity-80 transition-colors"
            onClick={() => setShowBible(true)}
          >
            {item.label}
          </button>
        ) : (
          <button
            className="flex items-center gap-1 font-semibold text-base hover:opacity-80 transition-colors"
          >
            {item.label}
            {item.hasSubmenu && <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </li>
    ))

  return (
    <nav className="w-full sticky top-0 z-50 bg-transparent">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://dfbowysefibjlbmmizlq.supabase.co/storage/v1/object/public/assets/logo_minimalist_modern.png"
              alt="Logo Montesion"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-bold text-lg">montesion</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {renderNavItems()}
        </ul>

        {/* Buscador */}
        <div className="relative w-full md:w-[360px]">
  		<input
    	type="text"
   		placeholder="Buscar..."
    	className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-base transition-all duration-200 outline-none"
    	aria-label="Buscar"
  		/>
  			<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700" />
		</div>

        {/* Auth Buttons / Username */}
        <div className="hidden md:flex items-center gap-4 relative">
          {mounted ? (
            isAuthenticated ? (
              <>
                <button
                  className="relative focus:outline-none"
                  onClick={() => setAvatarMenuOpen((v) => !v)}
                  aria-label="Abrir menú de usuario"
                >
                  <img
                    src="https://dfbowysefibjlbmmizlq.supabase.co/storage/v1/object/public/assets/isotipo_montesion.webp"
                    alt="Avatar usuario"
                    className="h-12 w-12 rounded-full border-2 border-purple-300 shadow-md object-cover"
                    style={{ background: '#fff' }}
                  />
                  <ChevronDown className="absolute right-0 bottom-0 w-5 h-5 text-indigo-900" />
                </button>
                {avatarMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border z-50 animate-fade-in flex flex-col overflow-hidden">
                    <div className="bg-green-50 px-4 py-3 border-b border-gray-100">
                      <div className="font-semibold text-gray-700 text-sm mb-1">¡Hola, {username}!</div>
                      <div className="text-xs text-gray-500">Tu plan actual es:</div>
                      <div className="font-bold text-base text-gray-800">Plan Premium MAX</div>
                    </div>
                    <button className="text-left px-4 py-3 hover:bg-gray-100 font-semibold text-gray-800 text-base">Mi progreso</button>
                    <button className="text-left px-4 py-3 hover:bg-gray-100 font-semibold text-gray-800 text-base">Mi cuenta</button>
                    <button className="text-left px-4 py-3 hover:bg-gray-100 font-semibold text-gray-800 text-base">Mis paquetes</button>
                    <button className="text-left px-4 py-3 hover:bg-gray-100 font-semibold text-red-600 text-base border-t border-gray-100" onClick={() => { supabase.auth.signOut(); setAvatarMenuOpen(false); }}>Salir</button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link href="/users/sign_in" className="text-sm underline">Iniciar sesión</Link>
                <Link
                  href="/users/sign_up"
                  className="bg-green-400 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-lg text-sm"
                >
                  Regístrate
                </Link>
              </>
            )
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4">
            {renderNavItems()}
          </ul>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-4 pr-10 py-2 rounded-xl text-base bg-transparent shadow-none focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <span className="text-sm font-medium">Hola, {username}</span>
            ) : (
              <>
                <Link href="/users/sign_in" className="text-sm underline">Iniciar sesión</Link>
                <Link
                  href="/users/sign_up"
                  className="bg-green-400 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-lg text-sm"
                >
                  Regístrate
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {/* Biblia Iframe Modal */}
      {showBible && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90">
          <button
            className="absolute top-4 right-6 text-black hover:text-red-400 text-3xl font-bold z-20"
            onClick={() => setShowBible(false)}
            aria-label="Cerrar Biblia"
            style={{ position: 'fixed' }}
          >
            <X className="w-8 h-8" />
          </button>
          <iframe
            ref={bibleIframeRef}
            src="https://www.bible.com/bible/149/GEN.1.RVR1960"
            title="Biblia"
            className="w-full h-full border-0 rounded-none"
            allowFullScreen
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10, display: showBible ? 'block' : 'none' }}
          />
        </div>
      )}
    </nav>
  )
}