import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Les pages légales ne sont volontairement pas interdites ici : elles portent
 * déjà `robots: { index: false }` dans leur métadonnée, et un robot doit
 * pouvoir les charger pour lire cette consigne. Les bloquer au crawl produirait
 * l'effet inverse — une URL connue mais jamais lue, donc parfois indexée quand
 * même.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
