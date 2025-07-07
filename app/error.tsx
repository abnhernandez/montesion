"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { XCircle } from "lucide-react";

export default function CampusErrorLanding() {
  useEffect(() => {
    document.title = "Error | Monte Sion";
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="flex flex-col items-center gap-6 max-w-lg w-full">
        <XCircle className="w-20 h-20 text-red-600 dark:text-red-400 mb-2" />
        <h1 className="text-4xl font-semibold text-center">¡Algo salió mal!</h1>
        <p className="text-lg text-muted-foreground text-center">
          Lo sentimos, ha ocurrido un error inesperado al cargar la página de campus.<br />
          Por favor, intenta de nuevo más tarde o regresa al inicio.
        </p>
        <Link
          href="/"
          className="mt-2 px-6 py-3 rounded-full bg-[#831111] text-white font-medium text-lg shadow hover:bg-[#a98307] transition-colors"
        >
          Ir al inicio
        </Link>
              {/* Footer fijo igual que en loading */}
              <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-foreground font-lexend select-none z-50">
                <Image src="/next.svg" alt="Isotipo Monte Sion" width={24} height={24} priority />
                <span className="text-lg font-semibold">Monte Sion</span>
              </footer>
      </div>
    </main>
  );
}