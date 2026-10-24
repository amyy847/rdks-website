import { after, NextResponse } from "next/server";
import { sendLeadEmails, type Lead } from "@/lib/email";
import { saveLeadToSheet } from "@/lib/sheet";

/**
 * Enquiry endpoint, used by the enquiry form and the Register interest window.
 * Validates the lead, answers the visitor straight away, then in the background sends the emails
 * (auto-reply + sales alert, src/lib/email.ts) and saves the lead to the Google Sheet (src/lib/sheet.ts).
 */

// Cap every field so a bot can't post a novel
const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/*
 * Anti-spam. Bots get a normal-looking "ok" so they don't adapt, but nothing is saved or emailed.
 * - "website" is a hidden field people never see (SpamTrap); bots fill it in
 * - "elapsed" is how long the form was open; under 3 seconds isn't a person typing (missing = posted without the form)
 * - at most 5 submissions per 10 minutes from one address (per server instance, so approximate, but it stops floods)
 */
const MIN_FILL_MS = 3000;
const RATE = { max: 5, windowMs: 10 * 60 * 1000 };
const recent = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear(); // keep memory bounded
  return hits.length > RATE.max;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Your enquiry didn't go through. Try again." }, { status: 400 });
  }

  const lead: Lead = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 30),
    project: clip(body.project, 120) || undefined,
    interest: clip(body.interest, 120) || undefined,
    message: clip(body.message, 2000) || undefined,
    source: clip(body.source, 120) || undefined,
    updates: typeof body.updates === "boolean" ? body.updates : undefined,
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.email || !lead.phone) {
    return NextResponse.json({ error: "Add your name, email and phone number to send your enquiry." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: "That email address doesn't look right. Check it and try again." }, { status: 400 });
  }

  const elapsed = Number(body.elapsed);
  if (clip(body.website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    console.warn("[enquiry] dropped as spam", { email: lead.email, website: !!body.website, elapsed: body.elapsed });
    return NextResponse.json({ ok: true });
  }
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) {
    return NextResponse.json({ error: "You've sent a few enquiries already. Please wait a few minutes and try again." }, { status: 429 });
  }

  console.log("[enquiry]", lead);
  after(() => Promise.all([sendLeadEmails(lead), saveLeadToSheet(lead)]));

  return NextResponse.json({ ok: true });
}
