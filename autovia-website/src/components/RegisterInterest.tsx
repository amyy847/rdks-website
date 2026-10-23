"use client";

import { useEffect, useRef, useState } from "react";
import { InlineThanks, useInlineThanks } from "./InlineThanks";
import PhoneField, { phoneFromForm } from "./PhoneField";
import { inlineThanks, registerInterest as copy } from "@/content/site";
import { FIELD_LIGHT_CLASS as field, submitEnquiry } from "@/lib/enquiry";

/**
 * "Register your interest": one window for the whole site (mounted in the layout), opened by
 * RegisterInterestButton from anywhere (header, mobile menu, the Developments "next launch" card).
 * Short form: name, email, country code + phone. Sends through the same endpoint
 * as the enquiry form, tagged with where it was opened from, then thanks the visitor in place.
 */

const OPEN_EVENT = "rdk:register-interest";
type Origin = { project?: string; source: string };

export function RegisterInterestButton({
  label = copy.button,
  project,
  source,
  className = "",
  onClick,
}: Origin & { label?: string; className?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        window.dispatchEvent(new CustomEvent<Origin>(OPEN_EVENT, { detail: { project, source } }));
      }}
      className={className}
    >
      {label}
    </button>
  );
}

type Status = "idle" | "sending" | "error";

export default function RegisterInterestDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [origin, setOrigin] = useState<Origin | null>(null); // null = closed
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const open = origin !== null;

  useEffect(() => {
    const onOpen = (e: Event) => setOrigin((e as CustomEvent<Origin>).detail);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const thanks = useInlineThanks();
  const close = () => setOrigin(null);

  // Back to the form for next time, once the window has closed
  useEffect(() => {
    if (!open) thanks.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only when the window closes
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // React clears currentTarget once the handler awaits
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      await submitEnquiry({
        name: data.name,
        email: data.email,
        phone: phoneFromForm(data),
        project: origin?.project,
        source: `Register interest (${origin?.source})`,
      });
      form.reset();
      setStatus("idle");
      thanks.show(String(data.name));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your details didn't go through. Try again.");
      setStatus("error");
    }
  }

  const label = "mb-2 block type-eyebrow text-moss";
  const required = (
    <span className="ml-1 text-moss" aria-hidden="true">
      *
    </span>
  );

  return (
    <dialog
      ref={dialog}
      aria-labelledby="register-heading"
      onClose={close}
      onClick={(e) => e.target === e.currentTarget && close()} // click on the backdrop
      className="dialog-rise scrollbar-line m-auto max-h-[calc(100svh-2rem)] w-[min(38rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl bg-cream p-0 text-green shadow-[0_24px_80px_rgb(10_59_37/0.35)] backdrop:bg-green/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative px-6 pb-8 pt-14 sm:px-10 sm:pb-10">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 grid size-11 place-items-center text-moss transition-colors hover:text-green"
        >
          <svg viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
          </svg>
        </button>

        <div ref={thanks.box} style={{ minHeight: thanks.minHeight }} className="flex flex-col">
          {thanks.phase === "sent" ? (
            <InlineThanks name={thanks.name} {...inlineThanks.registerInterest}>
              <button type="button" onClick={close} className="btn bg-moss text-cream hover:bg-green">
                Close
              </button>
            </InlineThanks>
          ) : (
            <div className={thanks.formClass}>
              <h2 id="register-heading" className="type-h2 text-center">
                {copy.heading}
              </h2>
              <span className="mx-auto mt-5 block h-0.5 w-12 bg-moss" aria-hidden="true" />

              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:mt-10">
                <label>
                  <span className={label}>Full name{required}</span>
                  <input name="name" required autoComplete="name" className={field} />
                </label>
                <label>
                  <span className={label}>Email{required}</span>
                  <input name="email" type="email" required autoComplete="email" className={field} />
                </label>
                <PhoneField fieldClass={field} labelClass={label} marker={required} />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn mt-3 w-full bg-moss text-cream hover:bg-green disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : copy.submit}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-center text-sm font-semibold text-moss">
                    {error}
                  </p>
                )}
                <p className="text-center text-xs text-green/60">
                  See our{" "}
                  <a href="/privacy" onClick={close} className="underline decoration-moss/50 underline-offset-4 hover:text-moss">
                    privacy policy
                  </a>{" "}
                  for how we use your details.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
