"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Play, PlayCircle, List, Bookmark, Award, Calendar} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
};

const navItems: NavItem[] = [
    {
    label: "Mi actividad",
    href: "/usuarios/mis_cursos",
    icon: <PlayCircle className="w-[22px] h-[22px]" />,
    iconActive: <PlayCircle className="w-[22px] h-[22px]" />,
  },
  {
    label: "Mis bootcamps",
    href: "/usuarios/mis_bootcamps",
    icon: <Play className="w-[22px] h-[22px]" />,
    iconActive: <Play className="w-[22px] h-[22px]" />,
  },
  {
    label: "Mis rutas",
    href: "/usuarios/mis_rutas",
    icon: <List className="w-[22px] h-[22px]" />,
    iconActive: <List className="w-[22px] h-[22px]" />,
  },
  {
    label: "Mi lista",
    href: "/usuarios/mis_cursos?favoritos=true",
    icon: <Bookmark className="w-[22px] h-[22px]" />,
    iconActive: <Bookmark className="w-[22px] h-[22px]" />,
  },
  {
    label: "Mis certificados",
    href: "/usuarios/mis_certificados",
    icon: <Award className="w-[22px] h-[22px]" />,
    iconActive: <Award className="w-[22px] h-[22px]" />,
  },
  {
    label: "Agenda",
    href: "/agenda",
    icon: <Calendar className="w-[22px] h-[22px]" />,
    iconActive: <Calendar className="w-[22px] h-[22px]" />,
  },
];

const BarranavAula: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="w-full">
      <div
        className="flex flex-nowrap gap-1 sm:gap-2 md:gap-3 lg:gap-4 overflow-x-auto pb-2 px-1 sm:px-2 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollbarGutter: 'stable',
          overscrollBehaviorX: 'contain',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x'
        }}
      >
        {navItems.map((item) => {
          const url = new URL(item.href, 'http://localhost');
          const targetPath = url.pathname;
          const itemHasFavoritos = url.searchParams.get('favoritos') === 'true';
          const currentHasFavoritos = searchParams?.get('favoritos') === 'true';

          let isActive = false;
          // Coincidencia por ruta base
          if (pathname === targetPath || pathname?.startsWith(targetPath)) {
            // Si el item requiere favoritos, validar también el query
            if (targetPath === '/usuarios/mis_cursos') {
              isActive = itemHasFavoritos === currentHasFavoritos;
            } else {
              isActive = true;
            }
          }
          return (
            <div key={item.href} className="relative flex-shrink-0 snap-start">
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 h-11 sm:h-12 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-colors whitespace-nowrap border ${
                  isActive
                    ? "text-emerald-600 bg-gradient-to-r from-emerald-50 to-white border-emerald-200"
                    : "text-foreground/80 hover:text-foreground border-transparent"
                }`}
                style={isActive ? { border: '1px solid rgba(16,185,129,0.25)' } : undefined}
              >
                <span
                  className={`inline-flex items-center justify-center rounded-full ${
                    isActive ? "text-emerald-600" : "text-foreground"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
              {isActive && (
                <div className="absolute left-2 right-2 -bottom-1 h-px rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
              )}
            </div>
          );
        })}
        <style>{`
          .overflow-x-auto::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
};

export default BarranavAula;