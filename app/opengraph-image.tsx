import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * Image de partage (WhatsApp, LinkedIn, iMessage). Générée à la construction,
 * avec la police par défaut de next/og : ImageResponse ne comprend qu'un
 * sous-ensemble de CSS, donc uniquement du flexbox et des couleurs en dur.
 */
export const alt = `${site.nom} : outils métier sur mesure pour PME`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ENCRE = "#0a1c17";
const PAPIER = "#f7faf9";
const SIGNAL = "#058c63";
const ACIER = "#9db0a8";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ENCRE,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 4, background: SIGNAL }} />
          <div style={{ fontSize: 30, fontWeight: 700, color: PAPIER }}>
            {site.nom}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.15,
              fontWeight: 700,
              color: PAPIER,
              letterSpacing: "-0.02em",
            }}
          >
            L&rsquo;administratif dévore vos journées.
          </div>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.15,
              fontWeight: 700,
              color: SIGNAL,
              letterSpacing: "-0.02em",
            }}
          >
            Ce n&rsquo;est pas votre métier.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 26, color: ACIER }}>
            Outils métier sur mesure pour les PME du BTP, de la logistique et du
            transport
          </div>
        </div>
      </div>
    ),
    size,
  );
}
