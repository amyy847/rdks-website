"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import Logo from "./Logo";

/**
 * Page transition, after misritaliaproperties.com.
 * Clicking an internal link sweeps a dark panel down from the top with a light one close behind.
 * The next page loads underneath, then both pull back up to reveal it.
 * Catches every same-site link, so plain <Link>s need nothing extra. Off with reduced motion.
 */

// Timings in ms, measured from the Misr Italia site
const COVER = { dark: 750, light: 650, stagger: 300 };
const REVEAL = { light: 800, dark: 700, stagger: 300 };
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_IN_OUT = "cubic-bezier(0.65, 0.05, 0.36, 1)";
const MAX_WAIT = 8000; // reveal anyway if the next page never arrives

/** Fired when the panels start lifting; Odometer waits for it so the numbers roll in view */
export const REVEAL_EVENT = "rdk:page-reveal";
const TRANSITION_ATTR = "data-page-transition";

const sweep = (from: number, to: number) => [{ transform: `scaleY(${from})` }, { transform: `scaleY(${to})` }];

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const dark = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const state = useRef<"idle" | "covering" | "covered" | "revealing">("idle");
  const fallback = useRef<ReturnType<typeof setTimeout>>(undefined);

  const reveal = useCallback(async () => {
    if (state.current !== "covered") return;
    state.current = "revealing";
    clearTimeout(fallback.current);
    // Let the new page paint before lifting the panels
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    document.documentElement.removeAttribute(TRANSITION_ATTR);
    window.dispatchEvent(new Event(REVEAL_EVENT));

    // The panels can be gone by now (e.g. the page crashed under them and the tree was replaced)
    if (!root.current || !dark.current || !light.current || !logo.current) {
      state.current = "idle";
      return;
    }
    const fill = "forwards" as const;
    logo.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill });
    const l = light.current.animate(sweep(1, 0), { duration: REVEAL.light, delay: 150, easing: EASE_IN_OUT, fill });
    const d = dark.current.animate(sweep(1, 0), { duration: REVEAL.dark, delay: 150 + REVEAL.stagger, easing: EASE_IN_OUT, fill });
    await Promise.all([l.finished, d.finished]).catch(() => {}); // cancelled if the panels were removed mid-way

    if (root.current) {
      root.current.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      root.current.style.visibility = "hidden";
      root.current.style.pointerEvents = "none";
    }
    state.current = "idle";
  }, []);

  const cover = useCallback(async () => {
    if (!root.current || !dark.current || !light.current || !logo.current) return;
    state.current = "covering";
    document.documentElement.setAttribute(TRANSITION_ATTR, "");
    root.current.style.visibility = "visible";
    root.current.style.pointerEvents = "auto"; // swallow clicks until the new page is shown

    const fill = "forwards" as const;
    const d = dark.current.animate(sweep(0, 1), { duration: COVER.dark, easing: EASE_OUT, fill });
    const l = light.current.animate(sweep(0, 1), { duration: COVER.light, delay: COVER.stagger, easing: EASE_OUT, fill });
    logo.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: COVER.stagger + COVER.light - 150, fill });
    await Promise.all([d.finished, l.finished]).catch(() => {});
    state.current = "covered";
  }, []);

  useEffect(() => {
    const go = async (href: string) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return router.push(href);
      if (state.current !== "idle") return;
      router.prefetch(href);
      await cover();
      router.push(href);
      fallback.current = setTimeout(reveal, MAX_WAIT);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      // Other sites, tel:/mailto:, and links within the current page (#enquire) behave as normal
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault(); // Next's <Link> skips its own navigation when the click is already handled
      go(url.pathname + url.search + url.hash);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router, cover, reveal]);

  // The new page has rendered under the panels
  useEffect(() => {
    reveal();
  }, [pathname, reveal]);

  // If this unmounts mid-transition, don't leave the fallback timer or the "transitioning" flag behind
  useEffect(
    () => () => {
      clearTimeout(fallback.current);
      document.documentElement.removeAttribute(TRANSITION_ATTR);
    },
    [],
  );

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[200]">
      <div ref={dark} className="absolute inset-0 origin-top bg-green" style={{ transform: "scaleY(0)" }} />
      <div ref={light} className="absolute inset-0 origin-top bg-cream" style={{ transform: "scaleY(0)" }} />
      <div ref={logo} className="absolute inset-0 grid place-items-center text-green opacity-0">
        <Logo className="w-44 md:w-56" />
      </div>
    </div>
  );
}
