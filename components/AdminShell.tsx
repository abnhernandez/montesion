
"use client";

import {
  useState,
  type ReactNode,
} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Settings,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  UserRound,
  ExternalLink,
} from "lucide-react";

import { adminLogout } from "@/lib/logoutAdmin";

type AdminShellProps = {
  children: ReactNode;
  admin: {
    nombre: string | null;
    username: string;
  };
};

const navigation = [
  {
    label: "Resumen general",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Eventos",
    href: "/admin/eventos",
    icon: CalendarDays,
  },
  {
    label: "Reseñas",
    href: "/admin/resenas",
    icon: MessageSquare,
  },
  {
    label: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export default function AdminShell({
  children,
  admin,
}: AdminShellProps) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [collapsed, setCollapsed] =
    useState(false);

  const displayName =
    admin.nombre || admin.username;

  const currentPage =
    navigation.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href)
    )?.label || "Administración";

  function SidebarContent() {
    return (
      <>
        <div
          className={`flex h-20 items-center border-b border-white/10 px-5 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="min-w-0"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F5BE52]">
                MONTE SION
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Administración
              </p>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white lg:block"
            aria-label={
              collapsed
                ? "Expandir menú"
                : "Contraer menú"
            }
          >
            {collapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <PanelLeftClose size={19} />
            )}
          </button>
        </div>

        <nav
          aria-label="Navegación administrativa"
          className="flex-1 space-y-1 px-3 py-6"
        >
          {!collapsed && (
            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
              Menú principal
            </p>
          )}

          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${
                  active
                    ? "bg-[#F5BE52]/10 text-[#F5BE52]"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                } ${
                  collapsed
                    ? "justify-center"
                    : ""
                }`}
              >
                <Icon
                  size={19}
                  className="shrink-0"
                />

                {!collapsed && (
                  <>
                    <span className="flex-1">
                      {item.label}
                    </span>

                    {active && (
                      <ChevronRight size={15} />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            title="Ver sitio público"
            onClick={() => setMobileOpen(false)}
            className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <ExternalLink size={18} />

            {!collapsed && "Ver sitio público"}
          </Link>

          <form action={adminLogout}>
            <button
              type="submit"
              title="Cerrar sesión"
              className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-red-400 transition hover:bg-red-500/10 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <LogOut size={18} />

              {!collapsed && "Cerrar sesión"}
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white">

      {/* SIDEBAR DESKTOP */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/10 bg-[#111111] transition-all duration-300 lg:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* FONDO MENÚ MÓVIL */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/75 lg:hidden"
        />
      )}

      {/* SIDEBAR MÓVIL */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#111111] transition-transform duration-300 lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-5 rounded-lg p-2 text-neutral-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex h-20 items-center border-b border-white/10 px-5">
          <div>
            <p className="text-sm font-black tracking-[0.2em] text-[#F5BE52]">
              MONTE SION
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              Administración
            </p>
          </div>
        </div>

        <nav
          aria-label="Navegación móvil"
          className="flex-1 space-y-1 px-3 py-6"
        >
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex h-12 items-center gap-3 rounded-xl px-3 text-sm ${
                  active
                    ? "bg-[#F5BE52]/10 text-[#F5BE52]"
                    : "text-neutral-400"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex h-11 items-center gap-3 px-3 text-sm text-neutral-400"
          >
            <ExternalLink size={18} />
            Ver sitio público
          </Link>

          <form action={adminLogout}>
            <button
              type="submit"
              className="flex h-11 w-full items-center gap-3 px-3 text-sm text-red-400"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed
            ? "lg:pl-20"
            : "lg:pl-64"
        }`}
      >
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#0D0D0D]/95 px-5 backdrop-blur-xl md:px-8">

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-neutral-300 hover:bg-white/10 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5BE52]">
                Panel administrativo
              </p>

              <h2 className="mt-1 text-sm font-semibold text-white md:text-base">
                {currentPage}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-white">
                {displayName}
              </p>
              <p className="mt-1 text-[10px] text-neutral-500">
                @{admin.username}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F5BE52]/20 bg-[#F5BE52]/10">
              <UserRound
                size={19}
                className="text-[#F5BE52]"
              />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-5 md:p-8 lg:p-10">
          {children}
        </main>

        <footer className="border-t border-white/5 px-5 py-5 text-center text-[11px] text-neutral-600">
          Monte Sion Atzompa · Sistema administrativo
        </footer>
      </div>
    </div>
  );
}