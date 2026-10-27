# Project context (read first)

Website for Amy's client, a startup developer called **RD.K** (RD.K Developments). This is RD.K's company website; **Autovia** is one of RD.K's developments (currently the only one): a commercial destination on Cairo's Ring Road, New Cairo, made of standalone buildings for automotive showrooms, service centres, retail and offices. Its audience is businesses looking for space, not car buyers (see the Autovia Branding Book, October 2026; its renders are the site's Autovia photos and its logo is `public/images/autovia-logo.png`). Don't present Autovia as the company. Company details (`company`, `contact` = head office) are kept separate from each development's `showroom` details in `site.ts`. Style and transitions are inspired by misritaliaproperties.com, but the scope is much smaller.

**Deadline: live on Sunday 25 October 2026.** Client content is due Friday 23 October, 12:00 pm. English only for launch; Arabic comes later.

## Pages for Sunday
- [x] Home: hero, current launches, about intro, partners strip, then Enquire Now (GAC, GB Corp, ElTarek; after Misr Italia's "Our Partners": green panel sweeps up on hover with a description), footer
- [x] Developments (current launches): a card grid, Autovia only for now
- [x] Development detail: `/developments/autovia`, covering the showroom description, what they sell (new/used), brands, gallery, location and hours, and an enquiry form. Optional extras the client may pick: featured cars, financing, trade-in, test drive booking, after-sales, warranty, offers, reviews, video
- [x] About us: story, vision and mission, optional numbers and founder message, RDK's developments
- Enquire Now is a white card (photo + form) that overlaps the top of the footer, after Misr Italia's development pages; same on every page that has it.
- [x] Contact us: form, email, office address, map, hours, socials, plus a card per showroom
- [x] Thank you: replaced by an in-place message after sending (no separate page, client's choice)
- [x] Privacy policy (standard text in site.ts, needs client approval; update it if analytics or new providers are added)
- [ ] 404

## Enquire Now (next big piece)
The visitor enters name, email, phone and interest, then:
1. gets an automatic email with Autovia's details or brochure
2. the sales team gets a lead notification
3. the lead is saved to a Google Sheet

Email: RD.K's domain is rdkeg.com (contact@rdkeg.com). DNS is at GoDaddy and mail is Microsoft 365 bought through GoDaddy (MX: ppe-hosted.com), so the Gmail app-password plan doesn't apply. Emails are built: `src/lib/email.ts` sends the client's auto-reply (copy in `site.ts` > `emails`) and a sales lead alert through Resend, in the background after the form answers (`after()` in `src/app/api/enquire/route.ts`). Settings are env vars (RESEND_API_KEY, EMAIL_FROM, EMAIL_REPLY_TO, LEADS_TO, SITE_URL), documented at the top of `email.ts`. rdkeg.com is being verified in Resend (CNAME records added in GoDaddy by the client's IT); until then only Resend's test sender works. Still to do: leads to a Google Sheet through an Apps Script web app. After a successful submit the thank-you fades in where the form was. The header's **Register interest** button (desktop and mobile menu) and the Developments page's next-launch card open one site-wide window form (`RegisterInterest.tsx`, mounted in the layout, cream with moss accents: name, email, country code + phone). The "Keep me updated on news and offers" opt-in is on the Enquire now form only. The heroes keep **Enquire now** (scrolls to the enquiry section). Both forms send through `src/lib/enquiry.ts` with a `source` field so leads can be told apart.

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
- Must work well on phones; most visitors come from Instagram. RD.K has no WhatsApp and doesn't publish a phone number, so don't add WhatsApp links or buttons; Instagram is the only social for now.

## Decided with the client (24 October 2026)
- Home hero is RD.K's (logo, slogan, brand-guide photos); Autovia's numbers live on the Autovia page only.
- No /thank-you page: after sending, Enquire now and Register interest swap the form for a thank-you that fades in (`InlineThanks.tsx`, copy in `site.ts` > `inlineThanks`).
- Partners strip is on the Autovia page (after "Why Autovia"), not Home. No founder section and no company numbers on About.
- Autovia gallery: 17 renders from the client in `public/images/autovia/` (one version of each scene, with the real tenant brands; the client also has placeholder-logo versions). Only the first 5 show; the last tile opens the viewer.
- Both forms share `PhoneField.tsx` (country code + number) and post one `phone` like "+20 10 1234 5678".
- Leads: emailed to contact@rdkeg.com (`LEADS_TO`) and saved to a Google Sheet via Apps Script (`src/lib/sheet.ts`; setup in `docs/leads-google-sheet.md`; needs `SHEET_WEBHOOK_URL` + `SHEET_SECRET`).

- Spam protection on both forms: hidden `website` field + form-open time (`SpamTrap.tsx`) and a per-address rate limit, checked in `src/app/api/enquire/route.ts`. Bots get a fake `ok`. Tests that POST straight to the API must send `"elapsed": 5000` or they're dropped.
- Two auto-replies: Enquire now gets `emails.autoReply` (client's text), Register interest gets `emails.registerReply` (site.ts).
- Link previews: `src/app/opengraph-image.jpg` (RD.K) and `src/app/developments/[slug]/opengraph-image.jpg` (Autovia), 1200x630, rendered from the brand font. `metadataBase` uses `SITE_URL`, else Vercel's production domain. rdkeg.com is already added to the Vercel project (so Vercel calls it the production domain), but its DNS still points at GoDaddy, so `SITE_URL` is set to https://rdk-website.vercel.app in Vercel. **Once rdkeg.com points to Vercel (A @ 216.198.79.1, CNAME www 58b0c8cb3b55e79b.vercel-dns-017.com), change `SITE_URL` to https://rdkeg.com and redeploy.**
- Land portfolio (client brief, 27 October 2026): "Future developments" on Home (under Current launches) and Developments (replacing the old "More on the way" tile). Two options are shown one under the other for the client to choose: **A** `LandPortfolio.tsx`, a "Coming soon" card on grainy paper (type after a Pinterest reference, ink street sketch `land-teaser-street.svg` drawn with rough.js) that opens onto three plot cards with line drawings (`PlotArt.tsx`) until the client sends aerial photos; **B** `LandMap.tsx`, an illustrated Greater Cairo map with the plots pinned, a list and number cards (after her map references). Remove the one she doesn't pick. Plot areas other than 9,000 m² and the map positions (except Autovia) are mock. Keep plot details private (no prices, layouts or specs); "Enquire for details" scrolls to Enquire now with the plot preselected. Copy is in `site.ts` > `landPortfolio`, and the plot names are also listed in `enquiry.interests`.
- Local `.env.local` has `SHEET_WEBHOOK_URL` commented out so local testing never writes to the client's live Sheet.

## Client docs (in Amy's Claude account)
- Sitemap and client checklist: https://claude.ai/artifact/66eq2JZTF551U7H8GqtYqV
- Quotation (EGP 6,300, including the 50% rush fee): https://claude.ai/artifact/Do7b1hKAJ23WqVf9hRq2u9
