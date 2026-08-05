"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { objections } from "@/config/objections";
import Reveal from "./Reveal";

function Item({
  q,
  r,
  premier,
}: {
  q: string;
  r: string;
  premier: boolean;
}) {
  const [ouvert, setOuvert] = useState(false);
  return (
    <div
      className={`group transition-colors duration-300 ${
        premier ? "" : "border-t border-trait"
      } ${ouvert ? "bg-papier" : ""}`}
    >
      <button
        onClick={() => setOuvert(!ouvert)}
        aria-expanded={ouvert}
        className="flex w-full items-center justify-between gap-5 px-7 py-5 text-left"
      >
        <span
          className={`font-display text-lg font-semibold transition-colors duration-300 ${
            ouvert ? "text-signal" : "text-encre group-hover:text-signal"
          }`}
        >
          {q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            ouvert
              ? "rotate-45 border-signal text-signal"
              : "border-trait text-acier group-hover:border-signal group-hover:text-signal"
          }`}
        >
          <Plus size={16} strokeWidth={1.5} aria-hidden />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: ouvert ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl px-7 pb-6 text-[15px] leading-relaxed text-acier">
            {r}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Objections() {
  return (
    <section className="border-b border-trait">
      <div className="mx-auto max-w-[1200px] px-5 py-20 lg:py-24">
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full border border-trait bg-white px-4 py-1.5 text-sm font-medium text-acier">
              Vos questions
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold text-encre sm:text-4xl">
              Ce que vous vous dites probablement.
            </h2>
            <span className="filet-signal mx-auto mt-6" aria-hidden />
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-lg border border-trait bg-white">
            {objections.map((o, i) => (
              <Item key={o.q} q={o.q} r={o.r} premier={i === 0} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
