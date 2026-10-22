"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Numbers roll into place like a car's odometer when they come into view.
 * Each digit is a column of 0–9 that slides to the right digit.
 */
export default function Odometer({
  value,
  suffix,
  className = "",
  delay = 0,
}: {
  value: number;
  suffix?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chars = value.toLocaleString("en-US").split("");
  let digitIndex = 0;

  return (
    <span ref={ref} className={`inline-flex items-end tabular-nums leading-none ${className}`}>
      <span className="sr-only">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
      <span aria-hidden="true" className="inline-flex items-end">
        {chars.map((c, i) => {
          if (!/\d/.test(c)) {
            return (
              <span key={i} className="inline-block h-[1em] leading-none">
                {c}
              </span>
            );
          }
          const d = Number(c);
          const order = digitIndex++;
          return (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden leading-none">
              <span
                className="flex flex-col transition-transform ease-in-out-drive"
                style={{
                  transform: `translateY(${run ? -d * 10 : 0}%)`,
                  transitionDuration: "1800ms",
                  transitionDelay: `${delay + order * 120}ms`,
                }}
              >
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n} className="block h-[1em] leading-none">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
      {suffix && (
        <span aria-hidden="true" className="mb-[0.06em] ml-1 text-[0.45em] font-semibold [font-stretch:100%]">
          {suffix}
        </span>
      )}
    </span>
  );
}
