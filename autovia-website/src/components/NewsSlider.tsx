"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { newsPage, type NewsItem } from "@/content/site";
import { longDate, newsHref } from "@/lib/news";

/**
 * News & events as a slider of wide cards, after Misr Italia's "News & Events":
 * a dark band, All / Events / News tabs (only when both kinds exist), cream cards with the words
 * on one side and the photo on the other, and arrows to step through.
 */

const TAB_LABEL: Record<NewsItem["kind"], string> = { Event: "Events", News: "News" };

export default function NewsSlider({ items }: { items: NewsItem[] }) {
  const strip = useRef<HTMLUListElement>(null);
  const kinds = [...new Set(items.map((i) => i.kind))];
  const [kind, setKind] = useState<NewsItem["kind"] | null>(null);
  const shown = kind ? items.filter((i) => i.kind === kind) : items;
  const [edges, setEdges] = useState({ overflow: false, start: true, end: true });

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
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
  }, [kind]);

  const step = (dir: number) => {
    const el = strip.current;
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="news-slider-heading" className="overflow-hidden bg-green py-20 text-cream md:py-32">
      <div className="container-site">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <h2 id="news-slider-heading" className="type-h2">
            {newsPage.heading}
          </h2>
          {kinds.length > 1 && (
            <div role="tablist" aria-label="Show" className="flex rounded-sm border border-cream/25">
              {[null, ...kinds].map((k) => (
                <button
                  key={k ?? "all"}
                  type="button"
                  role="tab"
                  aria-selected={kind === k}
                  onClick={() => setKind(k)}
                  className={`h-11 px-5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${kind === k ? "bg-cream text-green" : "text-cream/70 hover:text-cream"}`}
                >
                  {k ? TAB_LABEL[k] : "All"}
                </button>
              ))}
            </div>
          )}
        </div>

        <ul ref={strip} className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          {shown.map((item) => (
            <li key={item.slug} className="w-[86%] shrink-0 snap-start sm:w-[70%] lg:w-[min(52rem,72%)]">
              <Link href={newsHref(item)} className="group grid h-full overflow-hidden rounded-sm bg-cream text-green md:min-h-[26rem] md:grid-cols-[1fr_1.05fr]">
                <div className="relative order-first aspect-[4/3] overflow-hidden md:order-last md:aspect-auto">
                  <Image
                    src={item.cover.image}
                    alt={item.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 28rem, 86vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col p-7 md:p-10">
                  <p className="flex items-center gap-2.5 type-eyebrow text-moss">
                    <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
                    {item.kind} · {longDate(item.date)}
                  </p>
                  <h3 className="type-h3 mt-5">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-green/80">{item.excerpt}</p>
                  <span className="mt-auto flex items-center gap-2 self-start pt-8 font-semibold underline decoration-moss/40 decoration-2 underline-offset-[6px] group-hover:decoration-moss">
                    Read more
                    <span aria-hidden="true" className="transition-transform duration-500 ease-out-quint group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between gap-6">
          <Link href="/news" className="font-semibold underline decoration-gold decoration-2 underline-offset-[6px] hover:text-gold">
            {newsPage.allLabel}
          </Link>
          {edges.overflow && (
            <div className="flex overflow-hidden rounded-sm border border-cream/30">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={edges.start}
                aria-label="Previous"
                className="grid size-11 place-items-center transition-colors hover:bg-cream hover:text-green disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cream"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M10 3L5 8l5 5z" />
                </svg>
              </button>
              <span className="w-px bg-cream/30" aria-hidden="true" />
              <button
                type="button"
                onClick={() => step(1)}
                disabled={edges.end}
                aria-label="Next"
                className="grid size-11 place-items-center transition-colors hover:bg-cream hover:text-green disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cream"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M6 3l5 5-5 5z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
