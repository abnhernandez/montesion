
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const logoUrl = SUPABASE_URL
  ? `${SUPABASE_URL}/storage/v1/object/public/branding/logo.png`
  : "";

const links = [
  { label: "INICIO", href: "/" },
  { label: "EVENTOS", href: "/eventos" },
  { label: "PODCAST", href: "/podcast" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-black">
      <nav className="relative mx-auto flex h-[140px] max-w-[1140px] items-center px-6 md:px-0">
        {/* Logo */}
        <Link href="/" className="relative z-10 shrink-0">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Logo"
              width={76}
              height={76}
              unoptimized
              priority
              className="h-[76px] w-[76px] object-contain"
            />
          )}
        </Link>

        {/* Navegación */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-12 md:gap-[85px]">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-[16px] font-normal tracking-wide transition-colors duration-200 md:text-[23px] ${
                  active
                    ? "text-[#F5B52E]"
                    : "text-white hover:text-[#F5B52E]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}