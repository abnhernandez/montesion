
import { notFound } from "next/navigation";

export const instant = false;

const sections: Record<string, {
  title: string;
  description: string;
}> = {
  eventos: {
    title: "Gestión de eventos",
    description:
      "Aquí podrás crear, editar y administrar los eventos de Monte Sion.",
  },
  resenas: {
    title: "Gestión de reseñas",
    description:
      "Aquí podrás administrar las reseñas del sitio público.",
  },
  configuracion: {
    title: "Configuración",
    description:
      "Aquí podrás administrar las preferencias del sistema.",
  },
};

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ seccion: string }>;
}) {
  const { seccion } = await params;
  const section = sections[seccion];

  if (!section) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F5BE52]">
          MONTE SION · ADMINISTRACIÓN
        </p>

        <h1 className="text-3xl font-black text-white md:text-4xl">
          {section.title}
        </h1>

        <p className="mt-4 text-sm text-neutral-400">
          {section.description}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#151515] p-8 text-center">
        <p className="text-sm font-semibold text-[#F5BE52]">
          MÓDULO EN DESARROLLO
        </p>

        <p className="mt-3 text-sm text-neutral-500">
          Esta herramienta estará disponible cuando
          implementemos su funcionalidad.
        </p>
      </div>
    </div>
  );
}