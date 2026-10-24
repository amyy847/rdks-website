import type { Lead } from "./email";

/**
 * Saves each lead as a row in the client's Google Sheet, through a small Apps Script web app
 * (the script and setup steps are in docs/leads-google-sheet.md). Settings, as environment variables:
 *
 *   SHEET_WEBHOOK_URL   the web app URL from Apps Script (Deploy > Web app). Without it, nothing is saved
 *   SHEET_SECRET        shared password, also set in the script's properties, so nobody else can add rows
 *
 * Never throws: a failure is logged so the visitor still sees their thank-you.
 */
export async function saveLeadToSheet(lead: Lead) {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn("[sheet] SHEET_WEBHOOK_URL is not set; lead not saved to the sheet");
    return;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // Apps Script reads the raw body
      body: JSON.stringify({ secret: process.env.SHEET_SECRET ?? "", lead }),
      redirect: "follow",
    });
    const text = await res.text();
    if (!res.ok || !text.includes('"ok":true')) console.error("[sheet] failed", res.status, text.slice(0, 200));
    else console.log("[sheet] lead saved");
  } catch (err) {
    console.error("[sheet] failed", err);
  }
}
