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
          Por favor, intenta de nuevo más tarde o reporta este error a <a href={`mailto:ministeriomontesionoaxaca@gmail.com?subject=Reporte%20de%20error%20en%20campus&body=Hola%2C%20encontr%C3%A9%20un%20error%20al%20cargar%20la%20p%C3%A1gina%20de%20campus.%20Por%20favor%20ay%C3%BAdenme%20a%20resolverlo.%0A%0ADetalles%20del%20error%3A%20%28describe%20aqu%C3%AD%20lo%20que%20ocurri%C3%B3%29`}>ministeriomontesionoaxaca@gmail.com</a>.
        </p>
        <Link
          href={`mailto:ministeriomontesionoaxaca@gmail.com?subject=Reporte%20de%20error%20en%20campus&body=Hola%2C%20encontr%C3%A9%20un%20error%20al%20cargar%20la%20p%C3%A1gina%20de%20campus.%20Por%20favor%20ay%C3%BAdenme%20a%20resolverlo.%0A%0ADetalles%20del%20error%3A%20%28describe%20aqu%C3%AD%20lo%20que%20ocurri%C3%B3%29`}
          className="mt-2 px-6 py-3 rounded-full bg-[#831111] text-white font-medium text-lg shadow hover:bg-[#a98307] transition-colors"
        >
          Reportar
        </Link>
              <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-foreground font-lexend select-none z-50">
                <Image src="/assets/isotipo_montesion.webp" alt="Isotipo Monte Sion" width={24} height={24} priority />
                <span className="text-lg font-semibold">Monte Sion</span>
              </footer>
      </div>
    </main>
  );
}