"use client";

import { useEffect, useRef, useState } from "react";
import { REVEAL_EVENT } from "./PageTransition";

/**
 * Numbers roll into place like a car's odometer when they come into view.
 * Each digit is a column of 0–9 that slides to the right digit.
 */
export default function Odometer({
  value,
  prefix,
  suffix,
  className = "",
  delay = 0,
}: {
  value: number;
  prefix?: string; // small text before the number, e.g. a currency
  suffix?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = () => setRun(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          // During a page transition the panels hide the page: roll once they start lifting
          if (document.documentElement.hasAttribute("data-page-transition")) {
            window.addEventListener(REVEAL_EVENT, start, { once: true });
          } else {
            start();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener(REVEAL_EVENT, start);
    };
  }, []);

  const chars = value.toLocaleString("en-US").split("");
  let digitIndex = 0;

  return (
    <span ref={ref} className={`inline-flex items-end tabular-nums leading-none ${className}`}>
      <span className="sr-only">
        {prefix && `${prefix} `}
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
      {prefix && (
        <span aria-hidden="true" className="mb-[0.16em] mr-1.5 text-[0.45em] font-semibold">
          {prefix}
        </span>
      )}
      <span aria-hidden="true" className="inline-flex items-end">
        {chars.map((c, i) => {
          if (!/\d/.test(c)) {
            return (
              <span key={i} className="inline-block h-[1.2em] leading-[1.2]">
                {c}
              </span>
            );
          }
          const d = Number(c);
          const order = digitIndex++;
          return (
            <span key={i} className="relative inline-block h-[1.2em] overflow-hidden leading-[1.2]">
              <span
                className="flex flex-col transition-transform ease-in-out-drive"
                style={{
                  transform: `translateY(${run ? -d * 10 : 0}%)`,
                  transitionDuration: "1800ms",
                  transitionDelay: `${delay + order * 120}ms`,
                }}
              >
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n} className="block h-[1.2em] leading-[1.2]">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
      {suffix && (
        <span aria-hidden="true" className="mb-[0.16em] ml-1 text-[0.45em] font-semibold">
          {suffix}
        </span>
      )}
    </span>
  );
}
