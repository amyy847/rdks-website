"use client";

import Image from "next/image";
import { useState } from "react";
import { navigateWithTransition } from "./PageTransition";
import { contact, developments, enquiry } from "@/content/site";
import { FIELD_LIGHT_CLASS as field, submitEnquiry } from "@/lib/enquiry";

type Status = "idle" | "sending" | "error";

export default function EnquireSection({ project = developments[0].name }: { project?: string }) {
  const dev = developments.find((d) => d.name === project) ?? developments[0];
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      await submitEnquiry({ ...data, updates: data.updates === "on", source: "Enquiry form" });
      navigateWithTransition("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your enquiry didn't go through. Try again.");
      setStatus("error");
    }
  }

  const photo = dev.gallery[0] ?? { image: dev.cover, alt: "" };
  const label = "mb-2 block text-sm font-medium text-green/80";

  return (
    // A card that overlaps the footer, after Misr Italia: the lower part of the section is footer green
    <section id="enquire" className="relative scroll-mt-24">
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-green" aria-hidden="true" />
      <div className="container-site relative">
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-30px_rgb(10_59_37/0.45)] md:grid-cols-12">
          <div className="relative aspect-[16/10] md:col-span-5 md:aspect-auto">
            <Image src={photo.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>

          <div className="p-7 sm:p-10 md:col-span-7 md:p-14">
            <h2 className="type-h2">{enquiry.heading}</h2>
            <p className="mt-4 max-w-[48ch] text-green/80">{enquiry.text}</p>
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-b border-laurel/60 pb-6 text-sm">
              <div>
                <dt className="text-green/65">Rather talk now?</dt>
                <dd className="mt-0.5 text-base font-semibold">
                  <a href={contact.phoneHref} className="hover:text-moss">
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-green/65">{dev.name} visiting hours</dt>
                <dd className="mt-0.5 text-base">{dev.site.hours}</dd>
              </div>
            </dl>

            <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <input type="hidden" name="project" value={project} />
              <label className="sm:col-span-2">
                <span className={label}>Full name</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label>
                <span className={label}>Email</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label>
                <span className={label}>Phone</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="01X XXXX XXXX"
                  pattern="[+0-9 ]{8,16}"
                  title="Enter a phone number, digits only"
                  className={field}
                />
              </label>
              <label className="sm:col-span-2">
                <span className={label}>What are you interested in?</span>
                <span className="relative block">
                  <select name="interest" required defaultValue="" className={`${field} appearance-none pr-12`}>
                    <option value="" disabled>
                      Choose one
                    </option>
                    {enquiry.interests.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-moss">
                    <path d="M4 6l4 4 4-4z" />
                  </svg>
                </span>
              </label>
              <label className="sm:col-span-2">
                <span className={label}>
                  Message <span className="text-green/60">(optional)</span>
                </span>
                <textarea name="message" rows={3} className={`${field} resize-none`} />
              </label>
              <label className="flex cursor-pointer items-center gap-4 sm:col-span-2">
                <span className="relative grid size-6 shrink-0 place-items-center">
                  <input
                    type="checkbox"
                    name="updates"
                    className="peer size-6 cursor-pointer appearance-none rounded-md border border-moss/40 bg-white transition-colors checked:border-moss checked:bg-moss hover:border-moss"
                  />
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true" className="pointer-events-none absolute size-4 text-cream opacity-0 peer-checked:opacity-100">
                    <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="type-eyebrow text-green/80">{enquiry.updatesLabel}</span>
              </label>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[40ch] text-sm text-green/65">
                  We&apos;ll only use your details to reply to this enquiry, and to send you news if you tick the box. See our{" "}
                  <a href="/privacy" className="underline decoration-moss/50 underline-offset-4 hover:text-moss">
                    privacy policy
                  </a>
                  .
                </p>
                <button type="submit" disabled={status === "sending"} className="btn shrink-0 bg-moss text-cream hover:bg-green disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
              </div>
              {status === "error" && (
                <p role="alert" className="text-sm font-semibold text-moss sm:col-span-2">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
