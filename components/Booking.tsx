import Reveal from "./Reveal";
import CalDiagnostic from "./CalDiagnostic";

/**
 * Section de prise de rendez-vous. Le calendrier est fourni par Cal.com, qui
 * gère les créneaux réels, la collecte des coordonnées et l'envoi des
 * confirmations. L'ancre #diagnostic-form est celle que visent tous les
 * appels à l'action de la page : elle ne doit pas changer.
 */
export default function Booking() {
  return (
    <section id="diagnostic-form" className="border-b border-trait">
      <div className="mx-auto max-w-[1000px] px-5 py-20 lg:py-24">
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full border border-trait bg-white px-4 py-1.5 text-sm font-medium text-acier">
              Demander
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold text-encre sm:text-4xl">
              Choisissez votre créneau.
            </h2>
            <span className="filet-signal mx-auto mt-6" aria-hidden />
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <CalDiagnostic />
        </Reveal>
      </div>
    </section>
  );
}
