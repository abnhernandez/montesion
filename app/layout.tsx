import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';

import { AuthProvider } from '@/app/auth-context';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/providers';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Monte Sion · Iglesia Cristiana',
  description: 'Monte Sion · Iglesia Cristiana',
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://montesion.me',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <Providers>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <SpeedInsights />
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}