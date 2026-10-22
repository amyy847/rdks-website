"use client";

import { useEffect, useRef, useState } from "react";
import { navigateWithTransition } from "./PageTransition";
import { registerInterest as copy } from "@/content/site";
import { FIELD_CLASS as field, submitEnquiry } from "@/lib/enquiry";

type Status = "idle" | "sending" | "error";

/**
 * A "Register interest" button that opens a short form in a window (name, email, phone, news opt-in).
 * Sends through the same endpoint as the enquiry form, then goes to the thank-you page.
 */
export default function RegisterInterest({ project, className = "" }: { project: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(copy.countryCodes[0].code);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const dial = copy.countryCodes.find((c) => c.code === data.country)?.dial ?? "";
    setStatus("sending");
    setError("");
    try {
      await submitEnquiry({
        name: data.name,
        email: data.email,
        phone: `${dial} ${String(data.phoneNumber).trim()}`,
        updates: data.updates === "on",
        project,
        source: "Register interest",
      });
      setOpen(false); // the window sits above everything, including the page transition
      navigateWithTransition("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your details didn't go through. Try again.");
      setStatus("error");
    }
  }

  const label = "mb-2 block type-eyebrow text-cream/85";
  const required = (
    <span className="ml-1 text-gold" aria-hidden="true">
      *
    </span>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {copy.button}
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="register-heading"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)} // click on the backdrop
        className="dialog-rise m-auto max-h-[calc(100svh-2rem)] w-[min(38rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl bg-green p-0 text-cream shadow-[0_24px_80px_rgb(0_0_0/0.35)] backdrop:bg-green/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative px-6 pb-8 pt-14 sm:px-10 sm:pb-10">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-green"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>

          <h2 id="register-heading" className="type-h2 text-center">
            {copy.heading}
          </h2>

          <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:mt-10">
            <label>
              <span className={label}>Full name{required}</span>
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label>
              <span className={label}>Email{required}</span>
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <div className="grid grid-cols-[7.5rem_1fr] items-end gap-3 sm:grid-cols-[9.5rem_1fr]">
              <label>
                <span className={label}>Country code{required}</span>
                <span className="relative block">
                  <select
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    autoComplete="tel-country-code"
                    aria-label="Country code"
                    className={`${field} appearance-none pr-9 tabular-nums`}
                  >
                    {copy.countryCodes.map((c) => (
                      <option key={c.code} value={c.code} className="text-green">
                        {c.code} {c.dial}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-cream/70">
                    <path d="M4 6l4 4 4-4z" />
                  </svg>
                </span>
              </label>
              <label>
                <span className={label}>Phone number{required}</span>
                <input
                  name="phoneNumber"
                  type="tel"
                  required
                  autoComplete="tel-national"
                  inputMode="tel"
                  placeholder={country === "EG" ? "10 0000 0000" : ""}
                  pattern="[0-9 ]{6,15}"
                  title="Enter your number without the country code, digits only"
                  className={field}
                />
              </label>
            </div>

            <label className="mt-1 flex cursor-pointer items-center gap-4">
              <span className="relative grid size-6 shrink-0 place-items-center">
                <input
                  type="checkbox"
                  name="updates"
                  className="peer size-6 cursor-pointer appearance-none rounded-md border border-white/40 transition-colors checked:border-gold checked:bg-gold hover:border-white/70"
                />
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true" className="pointer-events-none absolute size-4 text-green opacity-0 peer-checked:opacity-100">
                  <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="type-eyebrow text-cream/85">{copy.updatesLabel}</span>
            </label>

            <button type="submit" disabled={status === "sending"} className="btn btn-gold mt-3 w-full disabled:opacity-60">
              {status === "sending" ? "Sending…" : copy.submit}
            </button>
            {status === "error" && (
              <p role="alert" className="text-center text-sm font-medium text-gold">
                {error}
              </p>
            )}
            <p className="text-center text-xs text-cream/55">
              See our{" "}
              <a href="/privacy" onClick={() => setOpen(false)} className="underline underline-offset-4 hover:text-cream">
                privacy policy
              </a>{" "}
              for how we use your details.
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}
