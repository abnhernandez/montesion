'use client';

import { usePathname } from 'next/navigation';
import { BarradeNavegacion } from '@/components/ui/BarradeNavegacion';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Lista de rutas donde ocultar navbar y footer
  const hideLayoutRoutes = ['/users', '/agenda'];

  const shouldHideLayout = hideLayoutRoutes.some((path) => pathname.startsWith(path));

  return (
    <>
      {!shouldHideLayout && <BarradeNavegacion />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}