"use client";

import { useEffect, useState } from "react";

/**
 * Invisible anti-spam fields for the enquiry forms: a "website" box people never see (bots fill it in)
 * and the time the form appeared, so submissions sent in under a few seconds can be ignored.
 * Checked in src/app/api/enquire/route.ts.
 */
export default function SpamTrap() {
  const [shownAt, setShownAt] = useState("");
  useEffect(() => setShownAt(String(Date.now())), []);

  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="shownAt" value={shownAt} />
    </>
  );
}
