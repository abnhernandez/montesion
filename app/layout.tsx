import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { BarradeNavegacion } from "@/components/BarradeNavegacion"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/app/auth-context"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers"
import Script from "next/script"

// Import diagnostic runner for development
import "@/lib/diagnostic-runner"

export const metadata: Metadata = {
  title: "Monte Sion · Iglesia Cristiana",
  description: "Monte Sion · Iglesia Cristiana",
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://montesion.me',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <Script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B"
          strategy="beforeInteractive"
        />
        <Providers>
          <AuthProvider>
            <BarradeNavegacion />
            <main>{children}</main>
            <Footer />
            <SpeedInsights />
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}