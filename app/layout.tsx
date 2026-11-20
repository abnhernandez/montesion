
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Monte Sion Atzompa",
    template: "%s | Monte Sion Atzompa",
  },
  description:
    "Sitio web oficial de Iglesia Cristiana Monte Sion en Santa María Atzompa, Oaxaca.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-black text-white">
        {/* Navbar global */}
        <Navbar />

        {/* Contenido de cada página */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer global */}
        <Footer />
      </body>
    </html>
  );
}