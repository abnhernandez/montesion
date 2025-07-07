"use client";
import { useEffect } from "react";
import { Star, StarHalf } from "lucide-react";

export default function TestimonialSection() {
  useEffect(() => {
    // Removed dark mode detection logic
  }, []);

  return (
    <section className="w-full min-h-screen px-6 sm:px-12 lg:px-16 py-24 bg-white text-black">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Encabezado */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Esto dicen nuestros estudiantes</h2>
          <div className="flex justify-center gap-1">
            <div className="w-8 h-1 bg-green-500 rounded" />
            <div className="w-8 h-1 bg-pink-500 rounded" />
          </div>
          <p className="text-gray-600 max-w-4xl mx-auto">
            Desde el 2010 trabajamos en la formaci\u00f3n de programadores que trabajan en la industria tech en \u00e1reas como
            desarrollo Backend, Frontend, Ciencia de Datos, DevOps, desarrollo m\u00f3vil y m\u00e1s.
          </p>
        </div>

        {/* Rating Box */}
        <div className="max-w-2xl mx-auto border rounded-lg p-6 text-center">
          <p className="text-lg">
            <span className="font-semibold">4.5</span> de 5 en{" "}
            <span className="text-green-500">+200.000 evaluaciones</span> de nuestros cursos
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <StarHalf className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        {/* Iframes de Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* X (Twitter) */}
          <iframe src="https://maps.app.goo.gl/nbn8cZWzhK1hx1ou8"></iframe>

          {/* Google Maps con ubicaci\u00f3n actual o predeterminada */}
          <iframe src="https://maps.app.goo.gl/cqziCiwG4sSoCbLt8"></iframe>


          {/* Facebook */}
          <iframe src="https://maps.app.goo.gl/hAEuS6HPcUerCXif9"></iframe>

        </div>
      </div>
    </section>
  );
}