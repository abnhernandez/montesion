'use client';

import Link from "next/link";
export default function NoEncontrado() {
  return (
    <>
      <main className="fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground font-lexend px-4 text-center z-40">
        <h1 className="text-6xl font-semibold tracking-tight mb-2">404</h1>
        <p className="text-xl font-medium mb-6">Página no encontrada</p>
            <p>
              La página que estás buscando no existe o fue movida. <br />
              Es posible que hayas escrito mal la dirección.
            </p>
        <br />
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition-colors duration-300 mb-4"
        >
          Ir al inicio
        </Link>
      </main>
    </>
  );
}