# Autovia website

Next.js 15 + Tailwind CSS 4. Deploys to Vercel.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Where things live

- `src/content/site.ts`: **all text, numbers, contact details and image paths.** Anything marked `PLACEHOLDER` still needs real content from the client.
- `public/images/`: photos. Replace the placeholder files, keeping the same names (or update the paths in `site.ts`).
- `src/app/globals.css`: RD.K brand colours and type styles (the `@theme` block at the top).
- `src/components/Logo.tsx`: the RD.K logo (mark and full lockup), coloured with CSS.
- `src/components/`: Header, Hero, Footer, LaunchCard, EnquireSection, Odometer (rolling numbers), DevelopmentCard, Gallery (photo grid + full-screen viewer), Partners (logo strip on Home), RegisterInterest (site-wide window form + RegisterInterestButton).
- `src/app/api/enquire/route.ts`: the enquiry form endpoint. It validates and logs leads for now; the automatic email is the next step.

## Pages

- [x] Home (hero, current launches, about intro, enquire now)
- [x] Developments
- [x] Autovia detail
- [x] About us
- [x] Contact us
- [x] Thank you
- [x] Privacy policy
- [ ] 404
