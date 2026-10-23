"use client";

import { useState } from "react";
import { countryCodes } from "@/content/site";

/**
 * Country code + phone number, shared by the enquiry form and the Register interest window.
 * Posts "country" (e.g. EG) and "phoneNumber"; combine them with phoneFromForm().
 */
export default function PhoneField({ fieldClass, labelClass, marker }: { fieldClass: string; labelClass: string; marker?: React.ReactNode }) {
  const [country, setCountry] = useState(countryCodes[0].code);

  return (
    <div className="grid grid-cols-[7.5rem_1fr] items-end gap-3 sm:grid-cols-[9.5rem_1fr]">
      <label>
        <span className={labelClass}>Country code{marker}</span>
        <span className="relative block">
          <select
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            autoComplete="tel-country-code"
            aria-label="Country code"
            className={`${fieldClass} appearance-none pr-9 tabular-nums`}
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} {c.dial}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-moss">
            <path d="M4 6l4 4 4-4z" />
          </svg>
        </span>
      </label>
      <label>
        <span className={labelClass}>Phone number{marker}</span>
        <input
          name="phoneNumber"
          type="tel"
          required
          autoComplete="tel-national"
          inputMode="tel"
          placeholder={country === "EG" ? "10 0000 0000" : ""}
          pattern="[0-9 ]{6,15}"
          title="Enter your number without the country code, digits only"
          className={fieldClass}
        />
      </label>
    </div>
  );
}

/** "+20 10 1234 5678" from the form's country and phoneNumber */
export function phoneFromForm(data: Record<string, FormDataEntryValue>) {
  const dial = countryCodes.find((c) => c.code === data.country)?.dial ?? "";
  return `${dial} ${String(data.phoneNumber ?? "").trim()}`.trim();
}
