"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import PlotArt from "./PlotArt";
import { ENQUIRE_INTEREST_EVENT } from "./EnquireSection";
import { landPortfolio as copy, type Plot } from "@/content/site";

/**
 * "Future developments": RD.K's land portfolio, after the client's inspiration.
 * Outside: a "Coming soon" card, an architectural drawing behind a frosted-glass panel.
 * Clicking it opens the card onto the plots: a dark panel spreads out from where you clicked
 * while the card grows to fit. Each plot leads to Enquire now, with the plot preselected.
 */

// "View detailed location": a small link under the plot name that opens the client's description
function LocationDetail({ location }: { location: NonNullable<Plot["location"]> }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold/90 underline decoration-gold/40 underline-offset-4 hover:text-gold hover:decoration-gold"
      >
        {open ? "Hide detailed location" : "View detailed location"}
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={`size-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M4 6l4 4 4-4z" />
        </svg>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-500 ease-out-quint motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden" inert={!open}>
          <p className="pt-3 text-sm leading-relaxed text-cream/80">{location.en}</p>
          <p lang="ar" dir="rtl" className="pt-2 text-sm leading-relaxed text-cream/60">
            {location.ar}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandPortfolio() {
  const wrap = useRef<HTMLDivElement>(null);
  const teaser = useRef<HTMLButtonElement>(null);
  const inside = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0, r: 0 }); // where the panel spreads from, and how far
  const [heights, setHeights] = useState<{ teaser: number; inside: number } | null>(null);

  // Track both heights so the card can grow from the teaser's height to the plots' height
  useEffect(() => {
    const t = teaser.current;
    const i = inside.current;
    if (!t || !i) return;
    const measure = () => setHeights({ teaser: t.offsetHeight, inside: i.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  function openAt(e: React.MouseEvent<HTMLButtonElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    // Keyboard clicks have no pointer position: spread from the middle
    const x = e.clientX || e.clientY ? e.clientX - box.left : box.width / 2;
    const y = e.clientX || e.clientY ? e.clientY - box.top : box.height / 2;
    const w = box.width;
    const h = Math.max(box.height, inside.current?.offsetHeight ?? 0);
    // Place the (still closed) circle at the click first, so it grows from there rather than sliding in
    flushSync(() => setOrigin({ x, y, r: Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 40 }));
    void inside.current?.offsetWidth;
    setOpen(true);
    title.current?.focus({ preventScroll: true });
  }

  function close() {
    setOpen(false);
    teaser.current?.focus({ preventScroll: true });
    if ((wrap.current?.getBoundingClientRect().top ?? 0) < 0) wrap.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function enquire(plot: string) {
    window.dispatchEvent(new CustomEvent<string>(ENQUIRE_INTEREST_EVENT, { detail: plot }));
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      ref={wrap}
      className="relative scroll-mt-28 overflow-hidden rounded-sm bg-cream transition-[height] duration-700 ease-in-out-drive motion-reduce:transition-none"
      style={heights ? { height: open ? heights.inside : heights.teaser } : undefined}
    >
      {/* Outside: the Coming soon card */}
      <button
        ref={teaser}
        type="button"
        onClick={openAt}
        aria-expanded={open}
        aria-controls="land-portfolio"
        inert={open}
        className="group relative isolate block h-[36rem] w-full overflow-hidden bg-gold/15 text-center md:h-[36rem] lg:h-[42rem]"
      >
        <span className="paper-grain absolute inset-0 -z-10" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element -- an SVG drawing: plain img keeps it crisp at any size */}
        <img
          src={copy.teaserImage}
          alt=""
          className="absolute bottom-0 left-1/2 -z-10 h-80 w-auto max-w-none -translate-x-1/2 origin-bottom transition-transform duration-[1600ms] ease-out-quint group-hover:scale-[1.03] motion-reduce:transition-none sm:h-96 md:h-auto md:w-full"
        />

        {/* The words, set on the paper like the client's "Something delicate is coming" reference */}
        <span className="absolute inset-x-6 top-12 flex flex-col items-center md:top-16">
          <span className="type-eyebrow text-moss">{copy.teaser.eyebrow}</span>
          <span className="mt-6 block max-w-[14ch] text-[clamp(2.125rem,5.2vw,4rem)] font-medium uppercase leading-[1.04] tracking-[0.05em] text-green">
            {copy.teaser.title}
          </span>
          <span className="type-eyebrow mt-6 text-green/70">{copy.teaser.text}</span>
          <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-green underline decoration-gold-deep decoration-2 underline-offset-[7px] transition-colors group-hover:text-moss">
            {copy.teaser.button}
            <span aria-hidden="true" className="transition-transform duration-500 ease-out-quint group-hover:translate-x-1">
              →
            </span>
          </span>
        </span>
      </button>

      {/* Inside: the plots, spreading out from the click */}
      <div
        ref={inside}
        id="land-portfolio"
        inert={!open}
        aria-hidden={!open}
        className="absolute inset-x-0 top-0 z-10 bg-green px-6 py-10 text-cream transition-[clip-path] duration-[900ms] ease-in-out-drive motion-reduce:transition-none sm:px-10 md:px-12 md:py-14 lg:px-14"
        style={{ clipPath: `circle(${open ? origin.r : 0}px at ${origin.x}px ${origin.y}px)` }}
      >
        <div className="flex items-start justify-between gap-6">
          <p className="flex items-center gap-3 type-eyebrow text-cream/80">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Close the land portfolio"
            className="-mr-2 -mt-2 grid size-11 shrink-0 place-items-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 ref={title} tabIndex={-1} className="type-h2 max-w-[22ch] outline-none">
              {copy.title}
            </h3>
            <p className="mt-5 max-w-[52ch] text-cream/80">{copy.intro}</p>
          </div>
          <dl className="flex shrink-0 gap-10">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="type-eyebrow mt-2 text-cream/65">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-gold md:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3 md:mt-12">
          {copy.plots.map((plot) => (
            <li key={plot.name} className="grid overflow-hidden rounded-sm border border-cream/15 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden bg-black/20 sm:aspect-auto sm:min-h-56 lg:aspect-[4/3] lg:min-h-0">
                <PlotArt plot={plot} className="absolute inset-0 size-full" />
                <span className="absolute left-4 top-4 rounded-full border border-gold/50 bg-green/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  {copy.status}
                </span>
              </div>
              <div className="flex flex-col p-6 md:p-7">
                {/* Room for a two-line name, so the areas line up across the cards */}
                <div className="flex flex-col lg:min-h-[5.25rem]">
                  <h4 className="type-h3">{plot.name}</h4>
                  <p lang="ar" dir="rtl" className="mt-1.5 self-start text-sm text-cream/60">
                    {plot.nameAr}
                  </p>
                </div>
                {/* The area, big: the land size is the selling point */}
                <dl className="mt-6 flex flex-col-reverse border-t border-cream/15 pt-5">
                  <dt className="type-eyebrow mt-2 text-cream/60">Land area</dt>
                  <dd className="whitespace-nowrap text-4xl font-semibold tracking-tight text-gold sm:text-5xl lg:text-4xl xl:text-5xl">{plot.area}</dd>
                </dl>
                {/* under the area, so a two-line name with the link doesn't push this card's area out of line */}
                {plot.location && <LocationDetail location={plot.location} />}
                <button
                  type="button"
                  onClick={() => enquire(plot.name)}
                  className="group/cta mt-auto flex items-center gap-2 self-start pt-8 font-semibold text-gold underline decoration-gold/40 decoration-2 underline-offset-[6px] hover:decoration-gold"
                >
                  {copy.button}
                  <span aria-hidden="true" className="transition-transform duration-500 ease-out-quint group-hover/cta:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-[60ch] text-sm text-cream/65">{copy.note}</p>
      </div>
    </div>
  );
}
