import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - Monte Sion",
  description: "Resuelve tus dudas sobre Monte Sion, reuniones, actividades y más.",
  openGraph: {
    title: "Preguntas Frecuentes - Monte Sion",
    description: "Resuelve tus dudas sobre Monte Sion, reuniones, actividades y más.",
    url: "https://montesion.me/faq",
  },
  alternates: {
    canonical: "https://montesion.me/faq",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
