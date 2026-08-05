"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const auScroll = () => setDefile(window.scrollY > 24);
    auScroll();
    window.addEventListener("scroll", auScroll, { passive: true });
    return () => window.removeEventListener("scroll", auScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-papier/95 backdrop-blur-sm transition-all duration-300 ${
        defile
          ? "border-trait shadow-[0_1px_12px_rgba(18,35,58,0.06)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-encre"
        >
          FastWebApp
        </a>
        <a
          href="#diagnostic-form"
          className="group flex items-center gap-2 rounded-[4px] bg-signal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-signal-fonce"
        >
          Demander un diagnostic
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
      </div>
    </header>
  );
}
