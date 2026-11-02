"use client";

import { useEffect, useState } from "react";

/** "Share this article": LinkedIn, X, Facebook and copy link, for the current page's address */
export default function ShareLinks({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  const enc = encodeURIComponent;
  const links = [
    { label: "LinkedIn", short: "in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "X", short: "X", href: `https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}` },
    { label: "Facebook", short: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: nothing to do
    }
  }

  return (
    <div>
      <p className="type-eyebrow text-green/60">Share this article</p>
      <ul className="mt-4 flex items-center gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${l.label}`}
              className="grid size-10 place-items-center rounded-sm border border-green/25 text-sm font-bold transition-colors hover:border-green hover:bg-green hover:text-cream"
            >
              {l.short}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy link"
            className="grid size-10 place-items-center rounded-sm border border-green/25 transition-colors hover:border-green hover:bg-green hover:text-cream"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6.5 9.5l3-3M7 4.5l1.2-1.2a2.5 2.5 0 013.5 3.5L10.5 8M9 11.5l-1.2 1.2a2.5 2.5 0 01-3.5-3.5L5.5 8" strokeLinecap="round" />
            </svg>
          </button>
        </li>
      </ul>
      <p aria-live="polite" className="mt-2 h-5 text-xs text-moss">
        {copied ? "Link copied" : ""}
      </p>
    </div>
  );
}
