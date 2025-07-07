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
  title: "Donar - Iglesia Monte Sion",
  openGraph: {
    title: "Donar - Monte Sion",
    description: "Cada uno debe dar según lo que haya decidido en su corazón, no de mala gana ni por obligación, porque Dios ama al que da con alegría. | 2 Corintios 9:7",
    url: "https://montesion.vercel.app/donativos",
    images: [
      {
        url: "https://montesion.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
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