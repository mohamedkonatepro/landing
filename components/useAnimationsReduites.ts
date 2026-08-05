"use client";

import { useSyncExternalStore } from "react";

const REQUETE = "(prefers-reduced-motion: reduce)";

function sAbonner(prevenir: () => void) {
  const mq = window.matchMedia(REQUETE);
  mq.addEventListener("change", prevenir);
  return () => mq.removeEventListener("change", prevenir);
}

const lireClient = () => window.matchMedia(REQUETE).matches;

/**
 * Vrai quand l'utilisateur a demandé des animations réduites.
 *
 * Passe par `useSyncExternalStore` plutôt que par un `useState` rempli dans un
 * effet : la préférence est un état extérieur à React, la lire ainsi évite le
 * rendu en cascade que signale `react-hooks/set-state-in-effect`, et le
 * changement de réglage en cours de visite est pris en compte.
 *
 * Le rendu serveur ne connaît pas la préférence : il suppose les animations
 * autorisées, et la valeur réelle arrive à l'hydratation.
 */
export function useAnimationsReduites() {
  return useSyncExternalStore(sAbonner, lireClient, () => false);
}
