# Project context (read first)

Website for Amy's client, a startup developer called **RDK**. This is RDK's company website; **Autovia, a car sales showroom**, is one of RDK's developments (currently the only one): people buy cars there, not property. Don't present Autovia as the company. Company details (`company`, `contact` = head office) are kept separate from each development's `showroom` details in `site.ts`. Style and transitions are inspired by misritaliaproperties.com, but the scope is much smaller.

**Deadline: live on Sunday 25 October 2026.** Client content is due Friday 23 October, 12:00 pm. English only for launch; Arabic comes later.

## Pages for Sunday
- [x] Home: hero, current launches, about intro, Enquire Now, footer
- [x] Developments (current launches): a card grid, Autovia only for now
- [x] Development detail: `/developments/autovia`, covering the showroom description, what they sell (new/used), brands, gallery, location and hours, and an enquiry form. Optional extras the client may pick: featured cars, financing, trade-in, test drive booking, after-sales, warranty, offers, reviews, video
- [x] About us: story, vision and mission, optional numbers and founder message, RDK's developments
- [x] Contact us: form, phone, WhatsApp, email, office address, map, hours, socials, plus a card per showroom
- [ ] Thank you: shown after an enquiry
- [ ] Privacy policy
- [ ] 404

## Enquire Now (next big piece)
The visitor enters name, email, phone and interest, then:
1. gets an automatic email with Autovia's details or brochure
2. the sales team gets a lead notification
3. the lead is saved to a Google Sheet

Send email with Nodemailer through the client's own email account (Gmail or Google Workspace SMTP with an app password), with credentials in env vars. `src/app/api/enquire/route.ts` currently only validates and logs. After a successful submit, redirect to `/thank-you`.

## Stack and conventions
- Next.js 15 (App Router) + Tailwind CSS 4 + TypeScript. Deploy on Vercel.
- **All content lives in `src/content/site.ts`.** `PLACEHOLDER` marks anything still waiting on the client. Images are in `public/images/` and are currently labelled grey placeholders.
- Design tokens are in the `@theme` block of `src/app/globals.css`: asphalt `#202428`, tarmac `#5b6168`, concrete `#e3e5e7`, chalk `#f7f8f8`, and one accent, signal amber `#f2a900` (swap for brand colours later).
- Type: Archivo Variable (from `@fontsource-variable`, not Google Fonts). The expanded width (`font-stretch: 125%`) is the brand signature; use the `.type-display`, `.type-h2`, `.type-h3` and `.type-lead` classes.
- Motion: the hero has a slow push-in crossfade, and the stats roll like an odometer (`Odometer.tsx`). That is the one signature animation, plus the page transition (`PageTransition.tsx`, copied from Misr Italia at Amy's request: a dark then a light panel sweep down from the top, then lift back up to reveal the new page; timings are constants at the top of the file). Keep everything else calm: avoid adding fade-ups to every section, and respect reduced motion.
- Buttons: `.btn` plus `.btn-signal`, `.btn-ghost-light` or `.btn-ghost-dark`. Layout container: `.container-site`.
- Must work well on phones; most visitors come from Instagram and WhatsApp.

## Client docs (in Amy's Claude account)
- Sitemap and client checklist: https://claude.ai/artifact/66eq2JZTF551U7H8GqtYqV
- Quotation (EGP 6,300, including the 50% rush fee): https://claude.ai/artifact/Do7b1hKAJ23WqVf9hRq2u9
