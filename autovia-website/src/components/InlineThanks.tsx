"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Thank-you shown in place of a form: the form fades out, then the message fades in
 * in the same space (the box keeps its height, so nothing below jumps).
 */
export function useInlineThanks() {
  const box = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"form" | "leaving" | "sent">("form");
  const [minHeight, setMinHeight] = useState<number>();
  const [name, setName] = useState("");

  const show = (fullName: string) => {
    setMinHeight(box.current?.offsetHeight);
    setName(fullName.trim().split(/\s+/)[0]);
    setPhase("leaving");
    setTimeout(() => setPhase("sent"), 450); // matches the fade-out below
  };
  const reset = () => {
    setPhase("form");
    setMinHeight(undefined);
  };

  return { box, phase, minHeight, name, show, reset, formClass: `transition-opacity duration-[450ms] ease-out-quint ${phase === "leaving" ? "opacity-0" : ""}` };
}

export function InlineThanks({ name, line, note, children }: { name: string; line: string; note?: string; children?: React.ReactNode }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []); // screen readers and keyboards land on the message

  return (
    <div role="status" className="flex flex-1 flex-col justify-center">
      <h2 ref={heading} tabIndex={-1} className="fade-up type-h2 outline-none">
        Thank you{name ? `, ${name}` : ""}.
      </h2>
      <p className="fade-up mt-5 max-w-[30ch] text-2xl font-light leading-snug md:text-[1.75rem]" style={{ animationDelay: "120ms" }}>
        {line}
      </p>
      {note && (
        <p className="fade-up mt-5 max-w-[46ch] text-green/70" style={{ animationDelay: "240ms" }}>
          {note}
        </p>
      )}
      {children && (
        <div className="fade-up mt-8" style={{ animationDelay: "360ms" }}>
          {children}
        </div>
      )}
    </div>
  );
}
