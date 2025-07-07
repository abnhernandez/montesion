import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil - Monte Sion",
  description: "Gestiona tu perfil y preferencias en Monte Sion.",
  openGraph: {
    title: "Perfil - Monte Sion",
    description: "Gestiona tu perfil y preferencias en Monte Sion.",
    url: "https://montesion.me/perfil",
  },
  alternates: {
    canonical: "https://montesion.me/perfil",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
