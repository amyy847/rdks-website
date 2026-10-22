"use client";

import { useState } from "react";
import { contact, developments, enquiry } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-white/40 transition-colors duration-300 hover:border-white/40 focus:border-signal focus:outline-none";

export default function EnquireSection({ project = developments[0].name }: { project?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Your enquiry didn't go through. Check your details and try again.");
      setName(String(data.name).split(" ")[0]);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your enquiry didn't go through. Try again.");
      setStatus("error");
    }
  }

  return (
    <section id="enquire" className="scroll-mt-20 bg-asphalt py-20 text-white md:py-32">
      <div className="container-site grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="type-h2">{enquiry.heading}</h2>
          <p className="type-lead mt-6 max-w-[38ch] text-white/75">{enquiry.text}</p>
          <dl className="mt-12 space-y-5">
            <div>
              <dt className="text-sm text-white/50">Rather talk now?</dt>
              <dd className="mt-1 text-xl font-semibold">
                <a href={contact.phoneHref} className="hover:text-signal">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/50">Showroom hours</dt>
              <dd className="mt-1">{contact.hours}</dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {status === "sent" ? (
            <div role="status" className="rounded-[1.75rem] border border-white/15 p-8 md:p-12">
              <p className="type-h3">Thanks{name ? `, ${name}` : ""}. Your enquiry is in.</p>
              <p className="mt-4 text-white/75">
                Check your inbox for Autovia&apos;s details. Our sales team will call you within one working day.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost-light mt-8">
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
              <input type="hidden" name="project" value={project} />
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-white/80">Full name</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium text-white/80">Email</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium text-white/80">Phone</span>
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
                <span className="mb-2 block text-sm font-medium text-white/80">What are you interested in?</span>
                <span className="relative block">
                  <select name="interest" required defaultValue="" className={`${field} appearance-none pr-12`}>
                    <option value="" disabled className="text-asphalt">
                      Choose one
                    </option>
                    {enquiry.interests.map((i) => (
                      <option key={i} value={i} className="text-asphalt">
                        {i}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/70">
                    <path d="M4 6l4 4 4-4z" />
                  </svg>
                </span>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-white/80">
                  Message <span className="text-white/45">(optional)</span>
                </span>
                <textarea name="message" rows={3} className={`${field} resize-none`} />
              </label>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[40ch] text-sm text-white/50">
                  We&apos;ll only use your details to reply to this enquiry. See our{" "}
                  <a href="/privacy" className="underline underline-offset-4 hover:text-white">
                    privacy policy
                  </a>
                  .
                </p>
                <button type="submit" disabled={status === "sending"} className="btn btn-signal shrink-0 disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
              </div>
              {status === "error" && (
                <p role="alert" className="text-sm font-medium text-signal sm:col-span-2">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
