"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A wide drawing (the master plan) shown whole and small, that opens full screen when clicked.
 * Full screen it fits the width on large screens; on phones it stays big enough to read and pans sideways.
 */
export default function PlanViewer({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Enlarge the master plan"
        className="group relative block w-full overflow-hidden rounded-2xl bg-[#e6e6e6] text-left"
      >
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1280px) 1200px, 100vw" className="h-auto w-full" />
        <span className="absolute bottom-2 right-2 flex items-center gap-2 rounded-sm bg-green/85 p-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors group-hover:bg-green sm:bottom-3 sm:right-3 sm:px-3.5 sm:py-2">
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Enlarge</span>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label="Master plan"
        onClose={() => setOpen(false)}
        className="m-0 size-full max-h-none max-w-none border-0 bg-green p-0 text-cream backdrop:bg-green"
      >
        {open && (
          <div className="flex h-full flex-col">
            <div className="container-site flex h-[4.5rem] shrink-0 items-center justify-between md:h-20">
              <p className="type-eyebrow text-cream/75">
                Master plan<span className="md:hidden"> · swipe to explore</span>
              </p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid size-11 place-items-center text-cream/80 hover:text-cream">
                <svg viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center overflow-auto px-4 pb-6 md:px-10">
              <div className="mx-auto w-[64rem] max-w-none shrink-0 md:w-full">
                <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 100vw, 64rem" className="h-auto w-full rounded-xl bg-[#e6e6e6]" />
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
