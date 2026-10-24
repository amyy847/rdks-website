"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroVideo from "./HeroVideo";
import Logo from "./Logo";
import { company, hero } from "@/content/site";

const SLIDE_MS = 6500;

/** Home hero: RD.K's photos crossfading behind the logo and slogan */
export default function Hero() {
  return hero.video ? <HeroVideo video={hero.video} /> : <HeroPhotos />;
}

function HeroPhotos() {
  const { slides } = hero;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % count), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, paused, count]);

  return (
    <section
      aria-roledescription={count > 1 ? "carousel" : undefined}
      aria-label={company.fullName}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-green text-white"
    >
      {/* Photos: crossfade with a slow push-in on the active one */}
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out-quint ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={i === active ? { animation: `push-in ${SLIDE_MS + 1500}ms var(--ease-out-quint) both` } : undefined}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-green via-green/45 to-green/50" />
      </div>

      <div className="container-site pt-32 md:pt-40">
        <p className="mb-5 flex items-center gap-3 type-eyebrow text-white/85">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          {company.tagline}
        </p>
        <h1>
          <span className="sr-only">{company.fullName}</span>
          <Logo className="w-[min(80vw,30rem)] text-cream" />
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="type-lead max-w-[34ch] text-white/85">{hero.subline}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="#enquire" className="btn btn-gold">
              Enquire now
            </Link>
            <Link href="/developments" className="btn btn-ghost-light">
              Our developments
            </Link>
          </div>
        </div>
      </div>

      {/* Slide controls (only with more than one photo) */}
      {count > 1 ? (
        <div className="container-site mt-12 md:mt-16">
          <div className="border-t border-white/20 py-7 md:py-9">
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show photo ${i + 1} of ${count}`}
                  aria-current={i === active}
                  className="group relative h-8 w-10 md:w-12"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                    {i === active && (
                      <span
                        key={`${active}-${paused}`}
                        className="absolute inset-0 origin-left bg-gold"
                        style={{
                          animation: paused ? "none" : `lane-fill ${SLIDE_MS}ms linear both`,
                          transform: paused ? "scaleX(1)" : undefined,
                        }}
                      />
                    )}
                  </span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="ml-1 grid size-8 place-items-center rounded-full text-white/70 hover:text-white"
              >
                {paused ? (
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M4 2.5v11l9-5.5z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M4 2h3v12H4zM9 2h3v12H9z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-16 md:h-24" aria-hidden="true" />
      )}
    </section>
  );
}
