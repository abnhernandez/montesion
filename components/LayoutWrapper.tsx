'use client';

import { usePathname } from 'next/navigation';
import { BarradeNavegacion } from '@/components/BarradeNavegacion';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Lista de rutas donde ocultar navbar y footer
  const hideLayoutRoutes = ['/usuarios', '/login', '/registro'];

  const shouldHideLayout = hideLayoutRoutes.some((path) => pathname.startsWith(path));

  return (
    <>
      {!shouldHideLayout && <BarradeNavegacion />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}