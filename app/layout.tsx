import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // Nécessaire pour que l'image de partage soit servie en URL absolue.
  metadataBase: new URL(site.url),
  title: `${site.nom} : outils métier sur mesure pour PME du BTP, de la logistique et du transport`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.nom} : outils métier sur mesure`,
    description: site.description,
    url: site.url,
    siteName: site.nom,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nom} : outils métier sur mesure`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
