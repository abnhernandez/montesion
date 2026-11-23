
import Link from "next/link";

import {
  CalendarDays,
  MessageSquare,
  ShieldCheck,
  Settings,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";

import { getAdminSession } from "@/lib/session";

export const instant = false;

export const metadata = {
  title: "Panel administrativo | Monte Sion",
  robots: {
    index: false,
    follow: false,
  },
};

const modules = [
  {
    title: "Gestión de eventos",
    description:
      "Administra las actividades y eventos de la iglesia.",
    href: "/admin/eventos",
    icon: CalendarDays,
    status: "Próximamente",
  },
  {
    title: "Gestión de reseñas",
    description:
      "Organiza las reseñas que aparecen en el sitio público.",
    href: "/admin/resenas",
    icon: MessageSquare,
    status: "Próximamente",
  },
  {
    title: "Configuración",
    description:
      "Gestiona las preferencias administrativas.",
    href: "/admin/configuracion",
    icon: Settings,
    status: "Próximamente",
  },
];

export default async function AdminPage() {
  const admin = await getAdminSession();

  if (!admin) {
    return null;
  }

  return (
    <div className="space-y-10">

      {/* ENCABEZADO */}
      <div>
        <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F5BE52]">
          <LayoutDashboard size={15} />
          Resumen general
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
          PANEL DE CONTROL
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          Bienvenido,{" "}
          <span className="font-semibold text-white">
            {admin.nombre || admin.username}
          </span>
          . Administra las herramientas digitales de
          Monte Sion desde un solo lugar.
        </p>
      </div>

      {/* ESTADO DE SEGURIDAD */}
      <section className="rounded-2xl border border-[#F5BE52]/15 bg-[#F5BE52]/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5BE52]/10">
            <ShieldCheck
              size={23}
              className="text-[#F5BE52]"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-white">
              Sesión administrativa activa
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Has accedido con una cuenta administrativa
              autorizada. Utiliza el menú lateral para
              navegar entre los módulos.
            </p>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">
            Módulos administrativos
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Herramientas que formarán parte del sistema.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.title}
                className="group rounded-2xl border border-white/10 bg-[#151515] p-6 transition hover:border-[#F5BE52]/30"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F5BE52]/15 bg-[#F5BE52]/10">
                    <Icon
                      size={22}
                      className="text-[#F5BE52]"
                    />
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold text-neutral-400">
                    {module.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {module.title}
                </h3>

                <p className="mt-3 min-h-12 text-sm leading-relaxed text-neutral-500">
                  {module.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  Pendiente de implementación
                  <ArrowUpRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INFORMACIÓN DEL SISTEMA */}
      <section className="rounded-2xl border border-white/10 bg-[#111111] p-6">
        <h2 className="text-lg font-bold text-white">
          Información de tu cuenta
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500">
              Nombre
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {admin.nombre || "Sin nombre"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500">
              Usuario
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              @{admin.username}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5BE52] transition hover:text-white"
          >
            Visitar sitio público
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}