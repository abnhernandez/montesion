'use client';

import { usePathname } from 'next/navigation';
import { BarradeNavegacion } from '@/components/BarradeNavegacion';
import Footer from '@/components/Footer';
import { useAuth } from '@/app/auth-context';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth() || {};

  // Lista de rutas donde ocultar navbar y footer
  const hideLayoutRoutes = ['/usuarios', '/login', '/registro', '/agenda'];
  const shouldHideLayout = hideLayoutRoutes.some((path) => pathname.startsWith(path));

  // Si está en una ruta protegida y la autenticación está cargando o el usuario está autenticado, no renderizar navbar/footer
  const hideForAuth = shouldHideLayout && (loading || user);

  return (
    <>
      {!hideForAuth && <BarradeNavegacion />}
      <main>{children}</main>
      {!hideForAuth && <Footer />}
    </>
  );
}