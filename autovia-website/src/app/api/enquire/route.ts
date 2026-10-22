import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 * NEXT STEP: send the automatic email to the visitor + notify the sales team
 * (Nodemailer through the client's email account) and append the lead to a Google Sheet.
 * For now it validates the data and logs it, so the form can be tested end to end.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Your enquiry didn't go through. Try again." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Add your name, email and phone number to send your enquiry." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right. Check it and try again." }, { status: 400 });
  }

  console.log("[enquiry]", { ...body, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
