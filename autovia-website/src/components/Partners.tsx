"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { partners } from "@/content/site";

/**
 * Partner logos in one strip, after Misr Italia's "Our Partners".
 * Each tile is white with the logo in colour. On hover (or tap) a green panel sweeps up
 * from the bottom with a slanted edge that levels out; the logo changes colour as the edge
 * passes it, moves up, and the description slides in underneath.
 * Swipes sideways when the tiles don't fit; the arrows only show then.
 */

// The panel is clipped below the tile, slanted (left side higher), and rises to cover it
const PANEL =
  "[clip-path:polygon(0_105%,100%_125%,100%_125%,0_125%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] group-focus:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]";
// Same box and movement in both layers, so the two logos line up exactly
const LOGO_BOX =
  "absolute left-1/2 top-1/2 h-20 w-48 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-in-out-drive group-hover:-translate-y-[calc(50%+3rem)] group-focus:-translate-y-[calc(50%+3rem)]";

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

        <ul
          ref={strip}
          className="flex snap-x snap-mandatory gap-px overflow-x-auto rounded-sm border border-laurel bg-laurel [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {partners.list.map((partner) => (
            <li
              key={partner.name}
              tabIndex={0}
              className="group relative h-72 w-[78%] shrink-0 snap-start overflow-hidden bg-white outline-offset-[-3px] sm:w-[45%] md:min-w-0 md:flex-1 md:basis-0"
            >
              <span className={LOGO_BOX}>
                <Image src={partner.logo} alt={partner.name} fill sizes="12rem" className="object-contain" />
              </span>

              <div className={`absolute inset-0 bg-green transition-[clip-path] duration-500 ease-in-out-drive ${PANEL}`}>
                <span className={LOGO_BOX}>
                  {/* eager: the browser treats the clipped panel as hidden and would delay loading it */}
                  <Image src={partner.logoOnGreen} alt="" fill sizes="12rem" loading="eager" className="object-contain" />
                </span>
                <p className="absolute inset-x-6 bottom-8 translate-y-full text-center text-sm leading-relaxed text-cream/80 opacity-0 transition-[transform,opacity] duration-500 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150 group-focus:translate-y-0 group-focus:opacity-100 group-focus:delay-150 md:inset-x-8">
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
