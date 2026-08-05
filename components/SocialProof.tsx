import BandeLogos from "./BandeLogos";

/**
 * Projets sur lesquels nous sommes intervenus. Formulation factuelle, qui
 * n'affirme aucune relation client directe avec les entreprises citées.
 * Liste éditable dans config/site.ts, logos servis depuis public/logos :
 * aucune image n'est chargée depuis un domaine tiers.
 */
export default function SocialProof() {
  return (
    <section className="border-b border-trait bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-12">
        <p className="text-center text-sm text-acier">
          Projets sur lesquels nous sommes intervenus
        </p>
        <BandeLogos />
      </div>
    </section>
  );
}
