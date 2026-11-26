import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Soporte",
  description:
    "Encuentra ayuda para usar el sitio, consultar eventos y acceder a los recursos de Iglesia Cristiana Monte Sion.",
};

export default function SoportePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          ¿En qué podemos ayudarte?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
          Encuentra ayuda para usar el sitio de Monte Sion, consultar eventos y
          acceder a nuestros recursos.
        </p>
      </header>

      <nav aria-label="Accesos rápidos" className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/eventos"
          className="rounded-full border px-4 py-2.5 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Consultar eventos
        </Link>
        <Link
          href="/podcast"
          className="rounded-full border px-4 py-2.5 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Escuchar prédicas
        </Link>
      </nav>

      {/* Aquí se integrarán las preguntas frecuentes y los canales de soporte. */}
    </main>
  );
}
