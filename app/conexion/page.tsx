
import type { Metadata } from "next";
import { Link2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Conexión",
  description: "Conexión | Monte Sion Atzompa",
};

export default function ConexionPage() {
  return (
    <section className="flex min-h-[calc(100svh-140px)] w-full items-center justify-center bg-[#050505]">
      <Link2
        size={180}
        strokeWidth={1.5}
        absoluteStrokeWidth
        className="h-auto w-[min(55vw,220px)] text-white"
        aria-label="Conexión"
      />
    </section>
  );
}