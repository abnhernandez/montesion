'use client'

import { useState, useEffect } from "react";
import { Paintbrush, Mail, User } from "lucide-react";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { LuShare2 } from 'react-icons/lu';
import { SiGooglemaps } from "react-icons/si";
import Image from "next/image";

export default function LandingPage() {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-between">
      {/* HERO */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-pink-900/40 via-background/80 to-blue-900/40 relative">
        {/* Decoraciones */}
        <div className="hidden md:block absolute left-10 top-10 w-32 h-32 rounded-full bg-pink-900/40 blur-2xl animate-pulse" />
        <div className="hidden md:block absolute right-10 bottom-10 w-40 h-40 rounded-full bg-blue-900/40 blur-2xl animate-pulse" />
        <Paintbrush className="w-16 h-16 text-pink-300 mb-6 drop-shadow-xl relative z-10" />
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-center leading-snug tracking-tight max-w-2xl mx-auto relative z-10">
          Curso de Dibujo y Pintura para Niños y Niñas
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-center mb-4 relative z-10">
          Descubre el arte y el amor de Jesús en un ambiente divertido, seguro y lleno de creatividad. No necesitas experiencia previa. ¡Todos son bienvenidos!
        </p>
        <div className="mb-6 relative z-10">
          <span className="inline-block bg-pink-900 text-pink-200 font-medium rounded-full px-5 py-2 text-base shadow-sm border border-pink-800">
            Sábados de 4:50 a 5:50 PM
          </span>
        </div>
        <div className="mb-8 max-w-xl mx-auto relative z-10">
          <div className="bg-pink-950/60 border border-pink-800 rounded-xl p-4 text-sm text-pink-100 text-center">
            <span className="font-semibold">Por favor, trae estos materiales si puedes:</span><br />
            Bloc de dibujo u hojas blancas, Lápiz HB, Goma.
          </div>
        </div>
        {/* BOTÓN WHATSAPP CON GLOW MULTICOLOR SOLO MODO OSCURO */}
        <div className="relative inline-block z-10">
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              zIndex: 0,
              borderRadius: '9999px',
              background: 'radial-gradient(circle at 50% 50%, #2563eb 0%, #2563eb 35%, #22c55e 55%, #ec4899 75%, #fde047 90%)',
              opacity: 0.5,
              filter: 'blur(10px)',
            }}
          />
          <a
            href="https://wa.me/525586449993?text=Hola!%20Quiero%20inscribir%20a%20mi%20hijo%20o%20hija%20al%20curso%20de%20Dibujo%20y%20Pintura%20de%20Montesión.%20Me%20pueden%20dar%20más%20información,%20por%20favor?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-full bg-black text-white font-semibold text-lg shadow-lg border-none hover:bg-neutral-900 transition relative z-10"
          >
            ¡Quiero info por WhatsApp!
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-20 px-4">
        <div className="feature-pop flex flex-col items-center bg-card rounded-3xl shadow-md border border-primary/20 p-10 transition-transform duration-200 hover:scale-105 active:scale-100 cursor-pointer">
          <User className="w-16 h-16 text-primary mb-4" />
          <h3 className="font-semibold text-2xl mb-3">Para todos</h3>
          <p className="text-muted-foreground text-center text-lg">
            No necesitas experiencia previa. ¡Solo ganas de crear y divertirte!
          </p>
        </div>
        <div className="feature-pop flex flex-col items-center bg-card rounded-3xl shadow-md border border-primary/20 p-10 transition-transform duration-200 hover:scale-105 active:scale-100 cursor-pointer">
          <Paintbrush className="w-16 h-16 text-primary mb-4" />
          <h3 className="font-semibold text-2xl mb-3">Materiales y colores</h3>
          <p className="text-muted-foreground text-center text-lg">
            Pinceles, pinturas y lienzos para cada participante. ¡Trae tus materiales favoritos si quieres!
          </p>
        </div>
        <div className="feature-pop flex flex-col items-center bg-card rounded-3xl shadow-md border border-primary/20 p-10 transition-transform duration-200 hover:scale-105 active:scale-100 cursor-pointer">
          <Mail className="w-16 h-16 text-primary mb-4" />
          <h3 className="font-semibold text-2xl mb-3">Arte con propósito</h3>
          <p className="text-muted-foreground text-center text-lg">
            A través del arte, conocerán historias de amor, fe y valores cristianos.
          </p>
        </div>
      </section>

      {/* QUIÉNES IMPULSAN EL TALLER */}
      <section className="w-full max-w-2xl mx-auto mt-20 mb-0">
        <div className="flex flex-col items-center bg-card rounded-3xl p-10 shadow-none">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-center">¿Quién impulsa el taller?</h2>
          <span className="text-lg font-medium mb-2 text-[#831111]">Grupo de Jóvenes Monte Sion</span>
          <span className="text-muted-foreground text-center text-base max-w-xl">El taller es impulsado y facilitado por el grupo de jóvenes de la iglesia, quienes comparten su creatividad, fe y entusiasmo para inspirar a los niños y niñas a descubrir el arte y los valores cristianos en un ambiente seguro y divertido.</span>
        </div>
      </section>

      {/* MAPA Y DIRECCIÓN + PRÓXIMOS TALLERES */}
      <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-stretch justify-center py-16">
        {/* Mapa y dirección */}
        <div className="flex-1 flex flex-col justify-center bg-card rounded-3xl p-8 shadow-none">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">¿Dónde es el taller?</h2>
          <div className="mb-3 text-muted-foreground text-base">
            <strong className="text-foreground">Iglesia Cristiana Monte Sion</strong><br />
            Cuicatlán 184, Colonia Niños <br /> Héroes, Santa María Atzompa, <br /> 71222 Oaxaca de Juárez, <br /> Oaxaca, México. <br />
            <a 
              href="https://maps.app.goo.gl/kUsfgWTp8vHADfed7" 
              target="_blank" 
              rel="noopener" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200"
            >
              <SiGooglemaps className="w-5 h-5 text-[#4285F4]" />
              <span className="font-medium">
                <span className="text-blue-400">G</span>
                <span className="text-red-400">o</span>
                <span className="text-yellow-400">o</span>
                <span className="text-blue-400">g</span>
                <span className="text-green-400">l</span>
                <span className="text-red-400">e</span>
                <span className="ml-1 text-muted-foreground">Maps</span>
              </span>
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden mt-2">
            <iframe
              src="https://maps.google.com/maps?q=17.077581,-96.762143&z=18&output=embed"
              width="100%"
              height="220"
              style={{ border: "none", borderRadius: '1.5rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* Próximos talleres y eventos */}
        <div className="flex-1 flex flex-col justify-center bg-card rounded-3xl p-8 shadow-none mt-8 md:mt-0">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Próximos talleres y eventos</h2>
          <p className="mb-4 text-muted-foreground">¡Muy pronto anunciaremos más actividades para niños, jóvenes y familias! Síguenos en Instagram para no perderte nada.</p>
          <a
            href="https://instagram.com/montesionaxaca"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 text-white font-semibold text-lg shadow-lg transition-all duration-200 hover:scale-105 focus:scale-105 active:scale-95"
            style={{ boxShadow: '0 2px 12px 0 rgba(236,72,153,0.15)' }}
          >
            <FaInstagram className="h-7 w-7" />
            Seguir en Instagram
          </a>
        </div>
      </section>

      {/* COMPARTIR */}
      <section className="w-full flex flex-col items-center gap-2 mb-16 mt-0">
        <span className="text-sm text-muted-foreground">¡Comparte este taller!</span>
        <div className="flex gap-4">
          {/* Botón de compartir general */}
          <button
            onClick={async () => {
              const link = url || (typeof window !== 'undefined' ? window.location.href : '');
              if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                  await navigator.clipboard.writeText(link);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                } catch {
                  alert('No se pudo copiar el enlace');
                }
              } else {
                // Fallback: create a temporary input
                const tempInput = document.createElement('input');
                tempInput.value = link;
                document.body.appendChild(tempInput);
                tempInput.select();
                try {
                  document.execCommand('copy');
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                } catch {
                  alert('No se pudo copiar el enlace');
                }
                document.body.removeChild(tempInput);
              }
            }}
            className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors shadow-none flex items-center justify-center text-foreground text-2xl"
            aria-label="Compartir"
          >
            <LuShare2 /> {copied && <span className="ml-2 text-xs font-semibold">¡Copiado!</span>}
          </button>
          {/* Botón de WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent('¡Mira este taller de pintura para niños en Monte Sion! ' + url)}`}
            target="_blank"
            rel="noopener"
            className="p-3 rounded-full bg-green-600 hover:bg-green-700 transition-colors shadow-none flex items-center justify-center text-white text-2xl"
            aria-label="Compartir por WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </section>

      {/* LOGO FIJO SOLO DENTRO DEL HERO */}
      <div className="absolute top-0 left-0 z-50 flex items-start" style={{pointerEvents: 'none', top: '-2.2rem', left: '-0.7rem'}}>
        <Image src="/logo-convocatorias-montesion-light.svg" alt="Monte Sion Logo" width={144} height={144} className="h-36 w-auto max-w-xs drop-shadow-xl" style={{minHeight: '100px', minWidth: '100px', margin: 0, position: 'absolute', top: 0, left: 0, pointerEvents: 'auto'}} />
      </div>

      {/* FOOTER */}
      <footer className="w-full py-6 text-center text-muted-foreground text-xs border-t border-border mt-8">
        © {new Date().getFullYear()} Monte Sion. Todos los derechos reservados.
      </footer>
    </main>
  );
}
