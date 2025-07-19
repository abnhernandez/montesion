import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
export const dynamic = "force-dynamic";
export const revalidate = 0;
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CONF: Más que vencedores - Monte Sion",
  openGraph: {
    title: "CONF: Más que vencedores - Monte Sion",
    description: "Romanos 8:37 🙌🏻 - Más que vencedores por medio de JESÚS 👑 quién nos ama ❤️.",
    url: "https://montesion.me/conf",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <SpeedInsights />
      {children}
    </div>
  );
}