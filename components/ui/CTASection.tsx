"use client";

import { Button } from "@/components/ui/button";

export default function CTASection() {

  return (
    <>
      <section className={`relative w-full h-auto overflow-hidden`}>
        {/* Contenido principal */}
        <div className="max-w-[1400px] mx-auto pt-32 pb-24 sm:pb-32 px-6 sm:px-16">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-8">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl">
                ¡Es hora de mejorar tu futuro, comienza ahora!
              </h2>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 text-lg sm:px-8 sm:py-6 px-6 py-4 rounded-lg">
                ¡Comienza gratis ahora!
              </Button>
            </div>

            {/* Espacio reservado para la imagen */}
            <div className="w-full sm:w-[500px] h-[300px] sm:h-[500px] bg-cover bg-center rounded-xl" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}></div>
          </div>
        </div>

        {/* Líneas decorativas en las esquinas */}
        <div className="absolute top-0 left-0 hidden sm:block">
          {/* Aquí irá la imagen de las líneas decorativas */}
        </div>
        <div className="absolute top-0 right-0 hidden sm:block">
          {/* Aquí irá la imagen de las líneas decorativas */}
        </div>

      </section>
    </>
  );
}