"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { company, nav } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  // Pages that open with a full-bleed photo: Home and each development
  const overHero = pathname === "/" || /^\/developments\/[^/]+$/.test(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = !overHero || scrolled;
  const light = !solid && !open; // white text over the hero photo

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-out-quint ${
        solid && !open ? "bg-cream/95 shadow-[0_1px_0_var(--color-laurel)] backdrop-blur" : ""
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label={`${company.fullName}, home`}
          className={`relative z-10 transition-colors duration-500 ${light || open ? "text-cream" : "text-green"}`}
        >
          <Logo variant="mark" className="h-7 w-auto md:h-8" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-2 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500 ${
                  light ? "text-white" : "text-green"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-gold transition-transform duration-400 ease-in-out-drive ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/#enquire" className="btn btn-gold hidden !h-11 !px-6 sm:inline-flex">
            Enquire now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative z-10 grid size-11 place-items-center rounded-full lg:hidden ${
              light || open ? "text-white" : "text-green"
            }`}
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-400 ease-in-out-drive ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-400 ease-in-out-drive ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-green transition-[opacity,visibility] duration-500 ease-out-quint lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-site flex h-full flex-col justify-center gap-2 pb-16">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`type-h2 py-2 text-white transition-[transform,opacity] duration-700 ease-out-quint ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#enquire" onClick={() => setOpen(false)} className="btn btn-gold mt-8 self-start">
            Enquire now
          </Link>
        </nav>
      </div>
    </header>
  );
}
