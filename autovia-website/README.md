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
- `src/app/globals.css`: brand colours and type styles (the `@theme` block at the top).
- `src/components/`: Header, Hero, Footer, LaunchCard, EnquireSection, Odometer (rolling numbers), WhatsAppButton.
- `src/app/api/enquire/route.ts`: the enquiry form endpoint. It validates and logs leads for now; the automatic email is the next step.

## Pages

- [x] Home (hero, current launches, about intro, enquire now)
- [ ] Developments
- [ ] Autovia detail
- [ ] About us
- [ ] Contact us
- [ ] Thank you
- [ ] Privacy policy
- [ ] 404
