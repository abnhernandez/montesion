import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";

export const metadata = {
  title: "Templos - Monte Sion",
  description: "Descubre los templos y lugares de reunión de Monte Sion.",
  openGraph: {
    title: "Templos - Monte Sion",
    description: "Descubre los templos y lugares de reunión de Monte Sion.",
    url: "https://montesion.vercel.app/campus",
    images: [
      {
        url: "https://montesion.vercel.app/isotipo_montesion.png",
        width: 800,
        height: 800,
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
    <>
      <SpeedInsights />
      {children}
    </>
  );
}