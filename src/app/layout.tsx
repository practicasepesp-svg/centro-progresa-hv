import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Centro Progresa HV - Creador de Hoja de Vida Institucional",
  description: "Plataforma institucional para la creación de hojas de vida para prácticas profesionales de UNIMINUTO.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.className}>
      <body className="bg-blue-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
