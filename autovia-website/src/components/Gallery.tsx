"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/site";

/**
 * Photo grid that opens into a full-screen viewer.
 * Phones get a swipeable row; larger screens get one big photo with the rest around it.
 */
export default function Gallery({ photos }: { photos: Photo[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef(0);
  const [index, setIndex] = useState<number | null>(null);
  const count = photos.length;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
    document.body.style.overflow = index !== null ? "hidden" : "";
  }, [index]);

  const step = (dir: number) => setIndex((i) => (i === null ? i : (i + dir + count) % count));
  const current = index !== null ? photos[index] : null;

  return (
    <>
      <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:auto-rows-[14rem] md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:auto-rows-[18rem]">
        {photos.map((photo, i) => (
          <li
            key={photo.image}
            className={`aspect-[4/5] w-[78%] shrink-0 snap-start md:aspect-auto md:w-auto ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block size-full overflow-hidden rounded-sm bg-laurel"
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 66vw, 80vw" : "(min-width: 768px) 33vw, 80vw"}
                className="object-cover transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
        className="m-0 size-full max-h-none max-w-none border-0 bg-green p-0 text-white backdrop:bg-green"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="container-site flex h-[4.5rem] shrink-0 items-center justify-between md:h-20">
              <p className="text-sm tabular-nums text-white/70">
                {index! + 1} / {count}
              </p>
              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Close photo viewer"
                className="grid size-11 place-items-center rounded-full hover:bg-white/10"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="relative mx-5 flex-1 md:mx-24">
              <Image key={current.image} src={current.image} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>

            <div className="container-site flex shrink-0 items-center justify-between gap-4 py-5">
              {count > 1 && (
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-green">
                  <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
                    <path d="M10 3L5 8l5 5z" />
                  </svg>
                </button>
              )}
              <p className="text-center text-sm text-white/75">{current.alt}</p>
              {count > 1 && (
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-green">
                  <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
                    <path d="M6 3l5 5-5 5z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
