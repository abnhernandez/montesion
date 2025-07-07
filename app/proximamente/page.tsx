"use client";

import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useState } from "react";
import { Mail, Headphones } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

 const handleSubscribe = async () => {
  if (!email.trim()) return;

  try {
    const res = await fetch(`${backendUrl}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        setEmail("");
        toast.success(result.message);
      } else {
        // Mensaje controlado de fallo (success:false), mostrar como error sin lanzar excepción
        toast.error(result.message);
      }
    } else {
      throw new Error("Respuesta inesperada del servidor");
    }
  } catch (err) {
    console.error("Error al suscribirse", err);
    toast.error("❌ Ocurrió un error inesperado. Intenta más tarde.");
  }
};

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white relative px-4 transition-colors">
      <SpeedInsights />
      <Toaster position="top-right" />

      <div className="absolute top-6 right-6">
        <button
          onClick={() => (true)}
          className="text-sm px-4 py-2 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition font-medium shadow"
        >
          Acceder
        </button>
      </div>

      <div className="flex flex-col items-center gap-8 max-w-md text-center">
        <Image src="/next.svg" alt="Next.js Logo" width={120} height={40} priority />
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Próximamente
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Este sitio está en construcción.<br />
          Powered by <span className="font-medium text-foreground">Next.js</span>.
        </p>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
            className="flex flex-col gap-2 w-full"
            noValidate
          >
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white rounded-xl placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-xl text-sm font-bold transition"
              disabled={!email.trim()}
            >
              NOTIFICARME
            </button>
          </form>
        ) : (
          <p className="text-sm text-green-600 dark:text-green-400">🎉 ¡Gracias por registrarte! Te avisaremos cuando la app esté lista 🚀</p>
        )}
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
        <a
          href="https://wa.me/+525586449993?text=--Soporte"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-2 bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white rounded-xl text-sm hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
        >
          <Headphones size={18} />
          Soporte
        </a>
        <a
          href="mailto:rootmontesion@gmail.com"
          className="flex items-center gap-1 px-3 py-2 bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white rounded-xl text-sm hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
        >
          <Mail size={18} />
          Crear Solicitud
        </a>
      </div>
    </main>
  );
}