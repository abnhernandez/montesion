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
  title: "Jesús el centro de nuestras vidas - Monte Sion",
  openGraph: {
    title: "Dios te esta llamando - Monte Sion",
    description: "Jesús tienen un plan para tu vida",
    url: "https://montesion.vercel.app/acercade",
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