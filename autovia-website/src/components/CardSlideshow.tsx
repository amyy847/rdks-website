"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDE_MS = 3000;

/**
 * Photos that crossfade on a loop, for a development's card. Decorative (the card names the development).
 * Only runs while the card is on screen and the tab is visible; stays on the first photo with reduced motion.
 */
export default function CardSlideshow({ images, sizes, className = "" }: { images: string[]; sizes: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const count = images.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % count);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [visible, count]);

  return (
    <div ref={root} className={`absolute inset-0 ${className}`}>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-1000 ease-out-quint ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
