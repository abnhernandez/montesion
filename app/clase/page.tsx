"use client";

import Image from "next/image";

export default function ClasesPremiumLanding() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 lg:px-32 py-20 bg-white">
      <div className="flex-1 max-w-2xl md:mr-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          ¿Cómo funcionan las <span className="text-emerald-500">Clases Premium</span>?
          <span className="inline-block align-middle ml-3">
            <span className="bg-yellow-300 text-gray-900 text-xs font-bold px-3 py-1 rounded-lg align-middle">BETA</span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mb-5">
          Las <b>clases premium</b> son sesiones en vivo (Live) donde puedes aprender en tiempo real junto con el instructor desde la comodidad de tu hogar.
        </p>
        <p className="text-lg md:text-xl text-gray-800 mb-5">
          A diferencia de los cursos que los puedes seguir a tu propio ritmo, las clases premium tienen una fecha y hora específica para que asistas y puedas recibir retroalimentación directa, aclarar dudas y profundizar de un tema de tu interés.
        </p>
        <p className="text-lg md:text-xl text-gray-800 mb-5">
          Recibirás una notificación dentro de tu cuenta Premium cuando la clase vaya a empezar con un enlace de acceso exclusivo.
        </p>
        <p className="text-lg md:text-xl text-gray-800">
          Puedes consultar los horarios de las próximas clases en el módulo de la parte inferior de ésta página.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 max-w-md">
        <Image
          src="https://dfbowysefibjlbmmizlq.supabase.co/storage/v1/object/public/assets/learn-deeper.svg"
          alt="Clases Premium Ilustración"
          width={420}
          height={320}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}