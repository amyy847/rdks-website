"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { company } from "@/content/site";

type Video = { desktop: string; mobile: string; posterStart: string; posterEnd: string };

/**
 * Home hero as RD.K's logo reveal film. The film carries the logo and slogan itself,
 * so only the buttons sit on top. Plays once, muted, and holds on the final logo; a small
 * button replays it. With reduced motion it shows the final frame as a still.
 */
export default function HeroVideo({ video }: { video: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStill(true);
  }, []);

  const replay = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    setEnded(false);
    v.play().catch(() => {});
  };

  return (
    // Phones: the film full-width under the header (it's widescreen, so a tall crop would cut the logo), buttons below.
    // Larger screens: the film fills the screen behind the buttons.
    <section
      aria-label={company.fullName}
      className="relative isolate flex flex-col overflow-hidden bg-green pt-[4.5rem] text-white md:min-h-[100svh] md:justify-end md:pt-0"
    >
      <h1 className="sr-only">
        {company.fullName}: {company.tagline}
      </h1>

      <div className="relative aspect-video w-full md:absolute md:inset-0 md:-z-10 md:aspect-auto">
        {still ? (
          <Image src={video.posterEnd} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <video
            ref={ref}
            className="size-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={video.posterStart}
            onEnded={() => setEnded(true)}
            aria-hidden="true"
          >
            {/* Phones get the lighter file */}
            <source src={video.mobile} type="video/mp4" media="(max-width: 767px)" />
            <source src={video.desktop} type="video/mp4" />
          </video>
        )}
        {/* Darken only the bottom, behind the buttons, so the film itself stays untouched */}
        <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-green/80 to-transparent md:block" />
      </div>

      {/* Raised on larger screens so the buttons clear the film's own small print along its bottom edge */}
      <div className="container-site flex flex-col items-center gap-6 pb-12 pt-8 md:pb-[12svh] md:pt-0">
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="#enquire" className="btn btn-gold">
            Enquire now
          </Link>
          <Link href="/developments" className="btn btn-ghost-light">
            Our developments
          </Link>
        </div>
      </div>

      {/* Replay: on phones at the film's bottom-right corner, on larger screens at the screen's bottom-right */}
      {ended && !still && (
        <button
          type="button"
          onClick={replay}
          aria-label="Replay the film"
          className="absolute right-3 top-[calc(4.5rem+56.25vw-3rem)] flex items-center gap-2 rounded-full bg-green/60 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur transition-colors hover:bg-green md:bottom-8 md:right-8 md:top-auto"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9M2.5 2.5v3h3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replay
        </button>
      )}
    </section>
  );
}
