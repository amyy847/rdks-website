/** Shared by the enquiry section and the Register interest window. */

/** sessionStorage key the thank-you page reads to greet the visitor by first name */
export const ENQUIRY_NAME_KEY = "rdk:enquiry-name";

/** Form field on a light background (enquiry card, Register interest window) */
export const FIELD_LIGHT_CLASS =
  "w-full rounded-xl border border-moss/25 bg-white px-4 py-3.5 text-green placeholder:text-green/35 transition-colors duration-300 hover:border-moss/50 focus:border-moss focus:outline-none";

/** Sends an enquiry to /api/enquire. Throws an Error with a message to show the visitor if it fails. */
export async function submitEnquiry(data: Record<string, unknown>) {
  const res = await fetch("/api/enquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Your enquiry didn't go through. Check your details and try again.");
  try {
    sessionStorage.setItem(ENQUIRY_NAME_KEY, String(data.name).trim().split(/\s+/)[0]);
  } catch {
    // Private mode or blocked storage: the thank-you page falls back to a generic greeting
  }
}
