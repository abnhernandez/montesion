import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Declaración de Fe - Monte Sion",
  description: "Conoce la declaración de fe y principios de Monte Sion.",
  openGraph: {
    title: "Declaración de Fe - Monte Sion",
    description: "Conoce la declaración de fe y principios de Monte Sion.",
    url: "https://montesion.me/declaraciondefe",
  },
  alternates: {
    canonical: "https://montesion.me/declaraciondefe",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DeclaracionDeFeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
