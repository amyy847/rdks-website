import { after, NextResponse } from "next/server";
import { sendLeadEmails, type Lead } from "@/lib/email";

/**
 * Enquiry endpoint, used by the enquiry form and the Register interest window.
 * Validates the lead, answers the visitor straight away, then sends the emails
 * (auto-reply + sales alert, src/lib/email.ts) in the background.
 * NEXT STEP: also append the lead to a Google Sheet.
 */

// Cap every field so a bot can't post a novel
const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

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

  console.log("[enquiry]", lead);
  after(() => sendLeadEmails(lead));

  return NextResponse.json({ ok: true });
}
