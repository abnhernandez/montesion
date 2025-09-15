"use client";

import Link from "next/link";
import Image from "next/image";
import { FooterSocialIcons } from "./FooterSocialIcons";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
          {/* Identidad */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src="/assets/isotipo_montesion.webp"
              alt="Monte Sion Logo"
              width={56}
              height={56}
              className="rounded-full shadow-lg border border-border bg-white dark:bg-background"
              priority
            />
            <span className="font-semibold text-lg mt-1">Monte Sion</span>
            <span className="text-sm text-muted-foreground font-medium text-center md:text-left"></span>
            <FooterSocialIcons />
          </div>

          {/* Comunidad */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Comunidad</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/planifica-visita"
                  className="hover:text-primary transition-colors"
                >
                  Planifica tu visita
                </Link>
              </li>
              <li>
                <Link
                  href="/oracion"
                  className="hover:text-primary transition-colors"
                >
                  Pide oración
                </Link>
              </li>
              <li>
                <Link
                  href="/donativos"
                  className="hover:text-primary transition-colors"
                >
                  Donativos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos útiles */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Recursos útiles</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/links"
                  className="hover:text-primary transition-colors"
                >
                  Links
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Legales</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Aviso de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/conduct"
                  className="hover:text-primary transition-colors"
                >
                  Código de Conducta
                </Link>
              </li>
            </ul>
          </div>

          {/* Suscríbete */}
          <div className="flex flex-col items-start w-full justify-between">
            <h3 className="font-semibold text-lg mb-2">Suscríbete</h3>
            <form className="flex flex-col md:flex-row items-center gap-2 w-full">
              <input
                type="email"
                required
                placeholder="tucorreo@montesion.mx"
                className="px-4 py-2 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary flex-1 min-w-0"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-colors"
              >
                Suscribirse
              </button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground text-left w-full">
              Al registrarte aceptas los{' '}
              <Link href="/terms" className="underline hover:text-primary">Términos y Condiciones</Link> y el{' '}
              <Link href="/privacy" className="underline hover:text-primary">Aviso de Privacidad</Link> de Monte Sion.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Monte Sion. Todos los derechos reservados.
          <br />
          Diseñado y Desarrollado con{" "}
          <span role="img" aria-label="corazón">
            ❤️
          </span>{" "}
          por Monte Sion
        </div>
      </div>
    </footer>
  );
}

