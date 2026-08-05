import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Seule la landing y figure. Les mentions légales et la politique de
 * confidentialité sont en `noindex` : les déclarer ici reviendrait à demander
 * leur indexation tout en l'interdisant par ailleurs.
 *
 * `lastModified` est figé à la construction du site, ce qui correspond bien à
 * la dernière modification du contenu servi.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
