import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
export const dynamic = "force-dynamic";
export const revalidate = 0;
      <SpeedInsights/>
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Curso de Dibujo y Pintura para Niños y Niñas de 6 a 12 años de edad | Monte Sion",
  description:
    "Descubre el arte y el amor de Jesús en un ambiente divertido, seguro y lleno de creatividad. No necesitas experiencia previa. ¡Todos son bienvenidos!",
  authors: [
    {
      name: "Monte Sion",
      url: "https://montesion.mx/talleres/pintura",
    },
  ],
  keywords: [
    "Curso de Dibujo", "Curso de Pintura", "Niños y Niñas", "Arte para Niños", "Taller de Arte", "Dibujo para Niños", "Pintura para Niños", "Taller de Pintura", "Taller de Dibujo", "Arte Infantil", "Creatividad Infantil", "Talleres de Arte", "Educación Artística", "Desarrollo Creativo", "Habilidades Artísticas", "Expresión Artística", "Técnicas de Dibujo", "Técnicas de Pintura", "Arte y Creatividad", "Taller gratuito", "Arte cristiano", "Arte Oaxaca", "Arte Santa María Atzompa", "Arte Monte Sion", "Arte para familias", "Arte seguro", "Arte con valores", "Arte cristiano para niños", "Arte en iglesia", "Arte en comunidad", "Arte para todos", "Arte sin experiencia", "Arte divertido", "Arte educativo", "Arte y fe", "Arte y Jesús", "Arte y valores", "Arte y creatividad infantil", "Arte y desarrollo personal", "Arte y educación", "Arte y familia", "Arte y niños Oaxaca"
  ],
  openGraph: {
    title: "Curso de Dibujo y Pintura para Niños y Niñas de 6 a 12 años de edad | Monte Sion",
    description:
      "Descubre el arte y el amor de Jesús en un ambiente divertido, seguro y lleno de creatividad. No necesitas experiencia previa. ¡Todos son bienvenidos!",
    url: "https://montesion.mx/talleres/pintura",
    siteName: "Monte Sion",
    images: [
      {
        url: "https://montesion.mx/logo-convocatorias-montesion-light.svg",
        width: 800,
        height: 600,
        alt: "Monte Sion Logo",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@montesionOaxaca",
    title: "Curso de Dibujo y Pintura para Niños y Niñas de 6 a 12 años de edad | Monte Sion",
    description:
      "Descubre el arte y el amor de Jesús en un ambiente divertido, seguro y lleno de creatividad. No necesitas experiencia previa. ¡Todos son bienvenidos!",
    images: [
      "https://montesion.mx/logo-convocatorias-montesion-light.svg"
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': "large",
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: "https://montesion.mx/talleres/pintura",
    languages: {
      "es-MX": "https://montesion.mx/talleres/pintura",
      "es": "https://montesion.mx/talleres/pintura",
      "en": "https://montesion.mx/talleres/pintura",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}