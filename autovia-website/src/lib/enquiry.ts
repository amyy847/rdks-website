/** Shared by the enquiry section and the Register interest window. */

/** Form field on a light background (enquiry card, Register interest window) */
export const FIELD_LIGHT_CLASS =
  "w-full rounded-xl border border-moss/25 bg-white px-4 py-3.5 text-green placeholder:text-green/35 transition-colors duration-300 hover:border-moss/50 focus:border-moss focus:outline-none";

/** Sends an enquiry to /api/enquire. Throws an Error with a message to show the visitor if it fails. */
export async function submitEnquiry(data: Record<string, unknown>) {
  // Anti-spam (see SpamTrap): send how long the form was open instead of the raw timestamp
  const { shownAt, ...rest } = data;
  const elapsed = shownAt ? Date.now() - Number(shownAt) : undefined;
  const res = await fetch("/api/enquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...rest, elapsed }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Your enquiry didn't go through. Check your details and try again.");
}
