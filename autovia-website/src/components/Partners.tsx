"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { partners } from "@/content/site";

/**
 * Partner logos in one strip, after Misr Italia's "Our Partners".
 * Hover (or tap) a tile and it turns green with the logo in cream and the description fading in.
 * Swipes sideways when the tiles don't fit; the arrows only show then.
 */
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
    <section aria-labelledby="partners-heading" className="py-20 md:py-28">
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
              className="group relative flex h-56 w-[72%] shrink-0 snap-start flex-col items-center justify-center bg-white px-8 text-center outline-offset-[-3px] transition-colors duration-500 ease-out-quint hover:bg-green focus:bg-green sm:w-[45%] md:h-64 md:min-w-0 md:flex-1 md:basis-0"
            >
              {partner.logo ? (
                <span className="relative block h-14 w-40 transition-[filter] duration-500 ease-out-quint md:h-16 md:w-48">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="12rem"
                    className="object-contain [filter:brightness(0)] group-hover:[filter:brightness(0)_invert(1)] group-focus:[filter:brightness(0)_invert(1)]"
                  />
                </span>
              ) : (
                <span className="text-2xl font-semibold uppercase tracking-[0.12em] text-green transition-colors duration-500 ease-out-quint group-hover:text-cream group-focus:text-cream md:text-3xl">
                  {partner.name}
                </span>
              )}
              {partner.description && (
                <p className="mt-4 max-w-[26ch] text-sm text-cream/85 opacity-0 transition-[opacity,transform] duration-500 ease-out-quint translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                  {partner.description}
                </p>
              )}
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
