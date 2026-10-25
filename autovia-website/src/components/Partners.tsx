"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { partners } from "@/content/site";

/**
 * Partner logos in one strip, after Misr Italia's "Our Partners".
 * Each tile is white with the logo in colour. On hover (or tap) a green panel sweeps up
 * from the bottom with a slanted edge that levels out; the logo changes colour as the edge
 * passes it, moves up, and the description slides in underneath.
 * Below wide screens it's a 2-column grid instead, every description shown, no hover effect.
 */

// The panel is clipped below the tile, slanted (left side higher), and rises to cover it
const PANEL =
  "[clip-path:polygon(0_105%,100%_125%,100%_125%,0_125%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] group-focus:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]";
// Same box and movement in both layers, so the two logos line up exactly
const LOGO_BOX =
  "absolute left-1/2 top-1/2 h-16 w-44 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-in-out-drive group-hover:-translate-y-[calc(50%+4.75rem)] group-focus:-translate-y-[calc(50%+4.75rem)]";

export default function Partners() {
  const strip = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ overflow: false, start: true, end: true });

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const update = () =>
      setEdges({
        overflow: el.scrollWidth > el.clientWidth + 1,
        start: el.scrollLeft <= 1,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: number) => {
    const el = strip.current;
    const tile = el?.querySelector("li");
    if (el && tile) el.scrollBy({ left: dir * tile.getBoundingClientRect().width, behavior: "smooth" });
  };

  if (partners.list.length === 0) return null;

  return (
    <section aria-labelledby="partners-heading" className="pb-20 md:pb-32">
      <div className="container-site">
        <h2 id="partners-heading" className="type-h2 mb-10 md:mb-14">
          {partners.heading}
        </h2>

        {/* Phones and tablets: a grid, logo and description always visible (after Misr Italia's mobile partners) */}
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-laurel/40 xl:hidden">
          {partners.list.map((partner) => (
            <li key={partner.name} className="flex flex-col items-center bg-white px-4 py-10 text-center odd:last:col-span-2">
              {partner.logo ? (
                <span className="relative block h-16 w-full max-w-36">
                  <Image src={partner.logo} alt={partner.name} fill sizes="9rem" className="object-contain" />
                </span>
              ) : (
                <span className="text-base font-semibold uppercase leading-snug tracking-[0.12em] text-green">{partner.name}</span>
              )}
              <p className="mt-6 max-w-[30ch] text-sm leading-relaxed text-green/80">{partner.description}</p>
            </li>
          ))}
        </ul>

        {/* Wide screens: one strip; the green panel sweeps up on hover with the description. Narrower tiles can't fit the text */}
        <ul
          ref={strip}
          className="hidden snap-x snap-mandatory gap-px overflow-x-auto rounded-2xl bg-laurel/40 [scrollbar-width:none] xl:flex [&::-webkit-scrollbar]:hidden"
        >
          {partners.list.map((partner) => (
            <li
              key={partner.name}
              tabIndex={0}
              className="group relative h-80 min-w-0 flex-1 basis-0 snap-start overflow-hidden bg-white outline-offset-[-3px]"
            >
              {partner.logo ? (
                <span className={LOGO_BOX}>
                  <Image src={partner.logo} alt={partner.name} fill sizes="12rem" className="object-contain" />
                </span>
              ) : (
                <span className={`${LOGO_BOX} grid place-items-center text-center text-lg font-semibold uppercase leading-snug tracking-[0.12em] text-green`}>
                  {partner.name}
                </span>
              )}

              <div className={`absolute inset-0 bg-green transition-[clip-path] duration-500 ease-in-out-drive ${PANEL}`}>
                {partner.logoOnGreen ? (
                  <span className={LOGO_BOX}>
                    {/* eager: the browser treats the clipped panel as hidden and would delay loading it */}
                    <Image src={partner.logoOnGreen} alt="" fill sizes="12rem" loading="eager" className="object-contain" />
                  </span>
                ) : (
                  <span aria-hidden="true" className={`${LOGO_BOX} grid place-items-center text-center text-lg font-semibold uppercase leading-snug tracking-[0.12em] text-cream`}>
                    {partner.name}
                  </span>
                )}
                <p className="absolute inset-x-6 top-[8.25rem] translate-y-4 text-center text-sm leading-relaxed text-cream/80 opacity-0 transition-[transform,opacity] duration-500 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150 group-focus:translate-y-0 group-focus:opacity-100 group-focus:delay-150">
                  {partner.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {edges.overflow && (
          <div className="mt-8 flex justify-end">
            <div className="flex overflow-hidden rounded-full border border-green/30">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={edges.start}
                aria-label="Previous partners"
                className="grid size-11 place-items-center transition-colors hover:bg-green hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-green"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M10 3L5 8l5 5z" />
                </svg>
              </button>
              <span className="w-px bg-green/30" aria-hidden="true" />
              <button
                type="button"
                onClick={() => step(1)}
                disabled={edges.end}
                aria-label="Next partners"
                className="grid size-11 place-items-center transition-colors hover:bg-green hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-green"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M6 3l5 5-5 5z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
