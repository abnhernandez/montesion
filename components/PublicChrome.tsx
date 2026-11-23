
"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type PublicChromeProps = {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
};

export default function PublicChrome({
  children,
  navbar,
  footer,
}: PublicChromeProps) {
  const pathname = usePathname();

  const isAdmin =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {navbar}

      <main className="flex-1">
        {children}
      </main>

      {footer}
    </div>
  );
}