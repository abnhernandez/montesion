import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { BarradeNavegacion } from "@/components/BarradeNavegacion"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/app/auth-context"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Monte Sion · Iglesia Cristiana",
  description: "Monte Sion · Iglesia Cristiana",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Dominio preferido para canonical
  const canonical =
    typeof window !== "undefined"
      ? `https://montesion.me${window.location.pathname}`
      : undefined
  return (
    <html lang="es">
      <Head>
        {/* Etiqueta canonical para SEO multi-dominio */}
        <link rel="canonical" href={canonical || "https://montesion.me/"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased bg-background text-foreground">
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