'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NoEncontrado() {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  return (
    <>
      <main className="fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground font-lexend px-4 text-center z-40">
        <h1 className="text-6xl font-semibold tracking-tight mb-2">404</h1>
        <p className="text-xl font-medium mb-6">Página no encontrada</p>

        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition-colors duration-300 mb-4"
        >
          Ir al inicio
        </Link>

        {/* Botón para mostrar/ocultar detalles */}
        <button
          onClick={() => setMostrarDetalles(!mostrarDetalles)}
          className="text-sm text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1"
        >
          {mostrarDetalles ? "Ocultar detalles" : "¿Ver detalles técnicos?"}
          {mostrarDetalles ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Detalles técnicos colapsables */}
        {mostrarDetalles && (
          <div className="mt-4 text-sm text-foreground/70 max-w-md space-y-2 leading-relaxed">
            <p>
              La página que estás buscando no existe o fue movida.
              Es posible que hayas escrito mal la dirección.
            </p>
            <p>
              Si eres el propietario de la aplicación, consulta los registros para obtener más información.
            </p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-foreground font-lexend select-none z-50">
        <Image src="/next.svg" alt="Isotipo Monte Sion" width={24} height={24} priority />
        <span className="text-lg font-semibold">Monte Sion</span>
      </footer>
    </>
  );
}