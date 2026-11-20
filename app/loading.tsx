
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conexión",
  description: "Conexión | Monte Sion Atzompa",
};

export default function ConexionPage() {
  return (
    <section className="relative flex min-h-[calc(100svh-140px)] w-full items-center justify-center overflow-hidden bg-black">

      {/* Icono de conexión espacial */}
      <div className="relative flex h-40 w-40 items-center justify-center">

        {/* Ondas de señal */}
        <div className="absolute h-24 w-24 animate-ping rounded-full border border-[#F5BE52]/30 motion-reduce:animate-none" />

        <div className="absolute h-32 w-32 rounded-full border border-[#F5BE52]/15" />

        {/* Icono central */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5BE52"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Conexión espacial"
          className="relative z-10 drop-shadow-[0_0_20px_rgba(245,190,82,0.35)]"
        >
          {/* Satélite */}
          <rect
            x="9"
            y="9"
            width="6"
            height="6"
            rx="1"
            transform="rotate(45 12 12)"
          />

          <path d="m7 7-4-4" />
          <path d="m17 17 4 4" />

          <path d="m3 7 4-4" />
          <path d="m17 21 4-4" />

          {/* Señal */}
          <path d="M16 8a4 4 0 0 1 0 8" />
          <path d="M18 5a8 8 0 0 1 0 14" />
        </svg>

      </div>
    </section>
  );
}