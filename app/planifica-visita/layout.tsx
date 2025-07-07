import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planifica tu Visita - Monte Sion",
  description: "Planifica tu visita a Monte Sion y conoce nuestros horarios y ubicación.",
  openGraph: {
    title: "Planifica tu Visita - Monte Sion",
    description: "Planifica tu visita a Monte Sion y conoce nuestros horarios y ubicación.",
    url: "https://montesion.me/planifica-visita",
  },
  alternates: {
    canonical: "https://montesion.me/planifica-visita",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function PlanificaVisitaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
