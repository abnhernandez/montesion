
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicChrome from "@/components/PublicChrome";

export const metadata: Metadata = {
  title: "Monte Sion Atzompa",
  description:
    "Iglesia Cristiana Monte Sion Atzompa, Oaxaca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        <PublicChrome
          navbar={<Navbar />}
          footer={<Footer />}
        >
          {children}
        </PublicChrome>
      </body>
    </html>
  );
}