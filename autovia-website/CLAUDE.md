# Project context (read first)

Website for Amy's client, a startup developer called **RD.K** (RD.K Developments). This is RD.K's company website; **Autovia** is one of RD.K's developments (currently the only one): a commercial destination on Cairo's Ring Road, New Cairo, made of standalone buildings for automotive showrooms, service centres, retail and offices. Its audience is businesses looking for space, not car buyers (see the Autovia Branding Book, October 2026; its renders are the site's Autovia photos and its logo is `public/images/autovia-logo.png`). Don't present Autovia as the company. Company details (`company`, `contact` = head office) are kept separate from each development's `showroom` details in `site.ts`. Style and transitions are inspired by misritaliaproperties.com, but the scope is much smaller.

**Deadline: live on Sunday 25 October 2026.** Client content is due Friday 23 October, 12:00 pm. English only for launch; Arabic comes later.

## Pages for Sunday
- [x] Home: hero, current launches, about intro, partners strip above Enquire Now (GAC, GB Corp, ElTarek; after Misr Italia's "Our Partners": green panel sweeps up on hover with a description), footer
- [x] Developments (current launches): a card grid, Autovia only for now
- [x] Development detail: `/developments/autovia`, covering the showroom description, what they sell (new/used), brands, gallery, location and hours, and an enquiry form. Optional extras the client may pick: featured cars, financing, trade-in, test drive booking, after-sales, warranty, offers, reviews, video
- [x] About us: story, vision and mission, optional numbers and founder message, RDK's developments
- [x] Contact us: form, phone, WhatsApp, email, office address, map, hours, socials, plus a card per showroom
- [x] Thank you: shown after an enquiry (greets by first name from sessionStorage; noindex)
- [x] Privacy policy (standard text in site.ts, needs client approval; update it if analytics or new providers are added)
- [ ] 404

## Enquire Now (next big piece)
The visitor enters name, email, phone and interest, then:
1. gets an automatic email with Autovia's details or brochure
2. the sales team gets a lead notification
3. the lead is saved to a Google Sheet

Email: RD.K's domain is rdkeg.com (contact@rdkeg.com). DNS is at GoDaddy and mail is Microsoft 365 bought through GoDaddy (MX: ppe-hosted.com), so the Gmail app-password plan doesn't apply. Plan: send with a transactional service (Resend) from the rdkeg.com domain, verified with DNS records added in GoDaddy; leads to a Google Sheet through an Apps Script web app. Secrets in Vercel env vars. `src/app/api/enquire/route.ts` currently only validates and logs. After a successful submit the form goes to `/thank-you` (done, via `navigateWithTransition`). The header's **Register interest** button (desktop and mobile menu) and the Developments page's next-launch card open one site-wide window form (`RegisterInterest.tsx`, mounted in the layout, cream with moss accents: name, email, country code + phone, news opt-in). The heroes keep **Enquire now** (scrolls to the enquiry section). Both forms send through `src/lib/enquiry.ts` with a `source` field so leads can be told apart.

## Stack and conventions
- Next.js 15 (App Router) + Tailwind CSS 4 + TypeScript. Deploy on Vercel.
- Deployed to Vercel project `rdk-website` (Amy's account): https://rdk-website.vercel.app. Redeploy from `autovia-website/` with `npx vercel deploy --prod`. Vercel refuses Next.js versions with known vulnerabilities, so keep `next` on the latest 15.5.x patch.
- **All content lives in `src/content/site.ts`.** `PLACEHOLDER` marks anything still waiting on the client. Images are in `public/images/`; the labelled grey ones are placeholders.
- **Brand (from the client's RD.K brand guidelines PDF, October 2026):** the company is written "RD.K" / "RD.K Developments". Tokens in the `@theme` block of `src/app/globals.css`: green `#0A3B25` (Deep Bluish Green), moss `#2A6151` (Moderate Green), laurel `#B2B7AA` (Laurel Green), cream `#FCF7F0` (Light Cream), and one accent, gold `#D8C2A4` (Tuscan Gold). `gold-deep` is a hover shade we derived. Use only these.
- Type: Montserrat Variable (from `@fontsource-variable`, not Google Fonts). Titles are tracked uppercase, as in the guide; use `.type-display`, `.type-h1`, `.type-h2`, `.type-h3`, `.type-lead` and `.type-eyebrow`.
- Logo: `Logo.tsx`, traced from the client's PNG, fills with currentColor. `variant="mark"` (RD.K alone) in the header, `"full"` (with DEVELOPMENTS) in the footer and page transition. The guide asks for clear space of half the K's height around it. Favicons are `src/app/icon.png` and `apple-icon.png`.
- Photography style per the guide: golden hour, architectural geometry, understated luxury. The About photos are renders taken from the brand guide; Autovia's photos are still placeholders.
- Motion: the hero has a slow push-in crossfade, and the stats roll like an odometer (`Odometer.tsx`). That is the one signature animation, plus the page transition (`PageTransition.tsx`, copied from Misr Italia at Amy's request: a dark then a light panel sweep down from the top, then lift back up to reveal the new page; timings are constants at the top of the file). Keep everything else calm: avoid adding fade-ups to every section, and respect reduced motion.
- Buttons: `.btn` plus `.btn-gold`, `.btn-ghost-light` or `.btn-ghost-dark`. Layout container: `.container-site`.
- Must work well on phones; most visitors come from Instagram and WhatsApp.

## Client docs (in Amy's Claude account)
- Sitemap and client checklist: https://claude.ai/artifact/66eq2JZTF551U7H8GqtYqV
- Quotation (EGP 6,300, including the 50% rush fee): https://claude.ai/artifact/Do7b1hKAJ23WqVf9hRq2u9
