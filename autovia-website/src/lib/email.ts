import { Resend } from "resend";
import { company, emails } from "@/content/site";

/**
 * Automated emails, sent through Resend. All settings are environment variables
 * (.env.local on this computer, Project > Settings > Environment Variables in Vercel):
 *
 *   RESEND_API_KEY   required; without it no email is sent (the form still works)
 *   EMAIL_FROM       optional; defaults to "RD.K Developments <contact@rdkeg.com>", which only works once rdkeg.com
 *                    is verified in Resend. For testing before that, set it to "RD.K Developments <onboarding@resend.dev>"
 *                    (Resend's test sender, which can only email the Resend account's own address)
 *   EMAIL_REPLY_TO   optional; customers' replies go to the From address (contact@rdkeg.com) unless this is set
 *   LEADS_TO         who gets the new-lead alert, comma separated (optional; no alert without it)
 *   SITE_URL         public address of the site, for the logo in emails (defaults to the Vercel address)
 */

export type Lead = {
  name: string;
  email: string;
  phone: string;
  project?: string;
  interest?: string;
  message?: string;
  source?: string;
  updates?: boolean;
  receivedAt: string;
};

const SITE_URL = (process.env.SITE_URL || "https://rdk-website.vercel.app").replace(/\/$/, "");
// contact@rdkeg.com sends the emails and receives customers' replies (client's choice, 24 October 2026).
// Needs rdkeg.com verified in Resend; EMAIL_FROM can override it (e.g. Resend's test sender while testing)
const FROM = process.env.EMAIL_FROM || `${company.fullName} <contact@rdkeg.com>`;
const C = { green: "#0A3B25", moss: "#2A6151", cream: "#FCF7F0", laurel: "#B2B7AA" };

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Branded shell shared by both emails: cream background, white card, RD.K logo */
function layout(inner: string, preheader: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${C.cream};">
<div style="display:none;max-height:0;overflow:hidden;">${escape(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;">
<tr><td style="padding:36px 36px 0;"><img src="${SITE_URL}/images/email/rdk-logo.png" width="140" alt="${escape(company.fullName)}" style="display:block;border:0;"></td></tr>
<tr><td style="padding:28px 36px 36px;font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${C.green};">${inner}</td></tr>
</table>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${C.moss};margin:20px 0 0;">${escape(company.fullName)} · ${escape(company.tagline)}</p>
</td></tr></table></body></html>`;
}

export function autoReply(lead: Lead) {
  const first = lead.name.trim().split(/\s+/)[0];
  const { paragraphs, signOff } = emails.autoReply;
  const html = layout(
    `<p style="margin:0 0 16px;">Dear ${escape(first)},</p>` +
      paragraphs.map((p) => `<p style="margin:0 0 16px;">${escape(p)}</p>`).join("") +
      `<p style="margin:24px 0 0;">Kind regards,<br><strong>${escape(signOff)}</strong></p>`,
    paragraphs[0],
  );
  const text = [`Dear ${first},`, ...paragraphs, `Kind regards,\n${signOff}`].join("\n\n");
  return { html, text };
}

export function leadAlert(lead: Lead) {
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Project", lead.project],
    ["Interested in", lead.interest],
    ["Message", lead.message],
    ["Wants news and offers", lead.updates === undefined ? undefined : lead.updates ? "Yes" : "No"],
    ["Form", lead.source],
    ["Received", new Date(lead.receivedAt).toLocaleString("en-GB", { timeZone: "Africa/Cairo", dateStyle: "medium", timeStyle: "short" }) + " (Cairo)"],
  ];
  const filled = rows.filter((r): r is [string, string] => Boolean(r[1]));
  const html = layout(
    `<p style="margin:0 0 20px;font-size:17px;"><strong>New lead: ${escape(lead.name)}</strong></p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">` +
      filled
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;border-top:1px solid ${C.laurel};color:${C.moss};white-space:nowrap;vertical-align:top;">${escape(k)}</td><td style="padding:8px 0;border-top:1px solid ${C.laurel};">${escape(v).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("") +
      `</table><p style="margin:24px 0 0;font-size:13px;color:${C.moss};">Reply to this email to answer ${escape(lead.name.split(/\s+/)[0])} directly.</p>`,
    `${lead.name} · ${lead.phone}`,
  );
  const text = filled.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

/** Sends the auto-reply and the sales alert. Never throws: failures are logged so the visitor still gets a reply on screen. */
export async function sendLeadEmails(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY is not set; no emails sent");
    return;
  }
  const resend = new Resend(key);
  const replyTo = process.env.EMAIL_REPLY_TO || undefined;
  const team = (process.env.LEADS_TO || "").split(",").map((s) => s.trim()).filter(Boolean);

  const jobs: Promise<unknown>[] = [];
  const reply = autoReply(lead);
  jobs.push(resend.emails.send({ from: FROM, to: lead.email, replyTo, subject: emails.autoReply.subject, ...reply }));
  if (team.length) {
    const alert = leadAlert(lead);
    const subject = `${emails.leadAlert.subject}: ${lead.name}${lead.source ? ` (${lead.source})` : ""}`;
    jobs.push(resend.emails.send({ from: FROM, to: team, replyTo: lead.email, subject, ...alert }));
  }

  const results = await Promise.allSettled(jobs);
  results.forEach((r, i) => {
    const which = i === 0 ? "auto-reply" : "lead alert";
    if (r.status === "rejected") console.error(`[email] ${which} failed`, r.reason);
    else if ((r.value as { error?: unknown }).error) console.error(`[email] ${which} failed`, (r.value as { error: unknown }).error);
    else console.log(`[email] ${which} sent`, (r.value as { data?: { id?: string } }).data?.id);
  });
}
