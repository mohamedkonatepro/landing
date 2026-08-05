import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Les captures de l'outil portent du texte de petite taille : à la qualité
     * par défaut, les glyphes fins bavent. Le niveau 90 doit être déclaré ici,
     * l'optimiseur refusant depuis la version 16 toute valeur hors de cette liste.
     */
    qualities: [75, 90],
  },
};

export default nextConfig;
