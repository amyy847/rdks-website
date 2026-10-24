/**
 * ALL WEBSITE CONTENT LIVES HERE.
 * When the client sends their info, update this file and swap the images in /public/images.
 * Anything marked PLACEHOLDER still needs real content from the client.
 */

/*
 * RD.K is the company; Autovia is one of its developments.
 * `company` and `contact` are RD.K's own details (head office). Each development
 * has its own `showroom` details further down.
 * Wording marked "brand guide" comes from the RD.K brand guidelines (October 2026).
 */
export const company = {
  name: "RD.K",
  fullName: "RD.K Developments",
  legalName: "RD.K Developments", // PLACEHOLDER: legal name, if different (used in footer + privacy policy)
  tagline: "An Expression of Excellence", // from the client (24 October 2026)
  intro:
    "RD.K Developments creates exceptional places to live, connect and thrive, transforming land, waterfronts and visionary concepts into enduring destinations.", // brand guide
  // From RD.K's Instagram (October 2026). Shown in Home's "About RD.K" section
  about: [
    "A development company built on a commitment to excellence, quality and precision.",
    "From residential communities to commercial and mixed-use developments, we bring together ambitious concepts, engineering expertise and thoughtful execution to create projects of lasting value.",
    "With several projects set to launch soon, we're only getting started.",
  ],
};

export const contact = {
  email: "contact@rdkeg.com", // from the Autovia branding book
  address: "RD.K Building, North of Katameya Tunnel, Ring Road", // from the client (24 October 2026)
  // Pin from the client: 29.993092, 31.408130
  mapUrl: "https://www.google.com/maps/dir/?api=1&destination=29.993092,31.408130",
  mapEmbedUrl: "https://www.google.com/maps?q=29.993092,31.408130&z=16&output=embed",
  hours: "Sunday to Thursday, 9 am to 5 pm", // PLACEHOLDER: office working hours
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/rd.kdevelopments/" },
    // Add others when the client sends them, e.g. { label: "Facebook", href: "https://facebook.com/..." }
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Developments", href: "/developments" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export type Stat = { value: number; prefix?: string; suffix?: string; label: string };

export type Photo = { image: string; alt: string };

export type Development = {
  slug: string;
  name: string;
  logo?: string; // the development's own logo, shown in its hero (white artwork, transparent background)
  tagline: string;
  location: string;
  status: string;
  summary: string;
  cover: string;
  cardImages: string[]; // 3–4 photos the development card cycles through every 3 seconds (Home, About, Developments)
  stats: Stat[];
  site: { address: string; hours: string; mapUrl: string; mapEmbedUrl: string; note: string };
  // Detail page (/developments/[slug])
  description: string[]; // one string per paragraph
  spaces: { title: string; text: string }[]; // what the development is made of
  masterplan: (Photo & { text: string }) | null;
  brands: string[]; // tenant brands; an empty list hides the section
  gallery: Photo[];
  features: { title: string; text: string }[]; // an empty list hides the section
  // Drive times shown under the illustrated map (Autovia only for now). An empty list hides the strip
  distances?: { place: string; time: string }[];
};

/*
 * Autovia wording marked "book" comes from the Autovia Branding Book (October 2026).
 * Photos are the renders from that book.
 */
export const developments: Development[] = [
  {
    slug: "autovia",
    name: "Autovia",
    logo: "/images/autovia/autovia-wordmark.png", // "AUTOVIA" without "by RD.K" (client's choice for the header)
    tagline: "Built to be seen", // book
    location: "Ring Road, New Cairo", // book
    status: "Now launching", // PLACEHOLDER: confirm (open, launching, under construction?)
    summary: "A landmark automotive, retail and office destination on Cairo's Ring Road.", // book, shortened
    cover: "/images/autovia/b05-gb-2.jpg",
    cardImages: [
      "/images/autovia/b05-gb-2.jpg",
      "/images/autovia/autovia-sign.jpg",
      "/images/autovia/b01-1.jpg",
      "/images/autovia/b04-eim-1.jpg",
    ],
    stats: [
      // From the client (23 October 2026)
      { value: 13000, suffix: " m²", label: "Development area" },
      { value: 6, label: "Car brands under one roof" },
    ],
    site: {
      address: "Ring Road, New Cairo, near South 90th Street", // book. PLACEHOLDER: exact address
      hours: "Sunday to Thursday, 9 am to 5 pm", // PLACEHOLDER: sales office or site visit hours
      // 30°00'31.7"N 31°23'57.7"E, from Amy. Directions link opens the Maps app with the route on phones
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=30.008806,31.399361",
      mapEmbedUrl: "https://www.google.com/maps?q=30.008806,31.399361&z=16&output=embed",
      note:
        "Situated on the Ring Road with direct and effortless access, Autovia stands at the gateway to New Cairo's most important destinations, near South 90th Street, Waterway 5A, Park Street and The Drive.", // book
    },
    description: [
      // book: About us
      "Autovia is a distinct commercial destination on the Ring Road, blending automotive showrooms and service centres with modern commercial and administrative spaces.",
      "Its strong architectural identity makes it a landmark for businesses seeking visibility, accessibility and prestige: a specialised automotive, retail and office hub where function meets design, on one of Cairo's most vital arteries.",
    ],
    spaces: [
      // Based on the book's "automotive showrooms, service centres, commercial and administrative spaces". Wording ours; confirm
      { title: "Automotive showrooms", text: "Glass-fronted showrooms with prime frontage, built to put your brand in front of Ring Road traffic." },
      { title: "Service centres", text: "Service and after-sales space beside the showrooms, with easy access for your customers." },
      { title: "Retail", text: "Retail units that share the steady flow of visitors the automotive hub brings." },
      { title: "Offices", text: "Modern administrative space for businesses that want a visible, accessible address." },
    ],
    masterplan: {
      image: "/images/autovia/masterplan.jpg", // slide 5 of the Autovia branding book
      alt: "Master plan of Autovia: five buildings (B01 to B05) between the Ring Road and the service road, with entrances from both",
      text: "An internal circulation road gives each standalone building prime frontage and independent access, turning them into individual landmarks within one destination. Directly connected to the Ring Road, the project ensures seamless access and maximum visibility.", // book
    },
    brands: [], // PLACEHOLDER: tenant brands once signed (names now, logos later). Empty hides the section
    gallery: [
      // Renders from the client (October 2026). The first 5 show on the page; the rest open in the viewer
      { image: "/images/autovia/b01-1.jpg", alt: "Autovia's curved glass corner showroom" },
      { image: "/images/autovia/g-3.jpg", alt: "Autovia's showrooms lined with palms along the road" },
      { image: "/images/autovia/autovia-sign.jpg", alt: "The Autovia sign on the building's dark façade" },
      { image: "/images/autovia/b05-gb-2.jpg", alt: "A Deepal showroom behind a row of palms" },
      { image: "/images/autovia/b02-gac-1.jpg", alt: "The GAC, Jameel Motors and AION showroom" },
      { image: "/images/autovia/g-1.jpg", alt: "Aerial view of Autovia beside the Ring Road" },
      { image: "/images/autovia/b01-2.jpg", alt: "Aerial view of the curved showroom and the road front" },
      { image: "/images/autovia/b01-3.jpg", alt: "The full row of showrooms from the road" },
      { image: "/images/autovia/b02-gac-2.jpg", alt: "The GAC showroom and its service entrance" },
      { image: "/images/autovia/b03-1.jpg", alt: "A corner showroom with a blue brand fascia" },
      { image: "/images/autovia/b03-2.jpg", alt: "A showroom with blue brand panels and parking" },
      { image: "/images/autovia/b04-eim-1.jpg", alt: "A showroom with a red brand panel behind palms" },
      { image: "/images/autovia/b04-eim-2.jpg", alt: "The service building with red brand panels" },
      { image: "/images/autovia/b05-gb-1.jpg", alt: "The Deepal service centre and parking" },
      { image: "/images/autovia/b05-gb-5.jpg", alt: "A standalone showroom and its car park" },
      { image: "/images/autovia/g-2.jpg", alt: "Aerial view of Autovia's buildings and car parks" },
      { image: "/images/autovia/g-8.jpg", alt: "Showroom frontages along the road" },
    ],
    distances: [
      // From the client (24 October 2026). Add Park Street, South 90th Street etc. when she sends their times
      { place: "Aian Business Park", time: "2 mins" },
      { place: "Park Street East", time: "4 mins" },
      { place: "The Drive", time: "5 mins" },
      { place: "5A by Waterway", time: "7 mins" },
    ],
    features: [
      // book: master plan, architecture and identity
      { title: "Direct Ring Road access", text: "Connected directly to the Ring Road, for seamless access and maximum visibility." },
      { title: "Every building, a landmark", text: "Bold façades and distinctive forms, instantly recognisable from the Ring Road." },
      { title: "Prime frontage for every tenant", text: "An internal road gives each standalone building its own frontage and independent access." },
      { title: "Room for your brand", text: "Each building gives tenants the flexibility to express their own brand, in harmony with the whole." },
    ],
  },
];

export const developmentsPage = {
  heading: "Developments",
  intro: "Landmark destinations, built to last. Autovia, on Cairo's Ring Road, is our first launch.",
  // The tile beside the launches. Set to null to hide it.
  comingSoon: {
    image: "/images/next-launch-crane.jpg", // Pexels (eartharchive), mood photo only: not an RD.K site
    title: "More on the way",
    text: "With several projects set to launch soon, we're only getting started. Leave your details and we'll tell you first.",
  } as { image: string; title: string; text: string } | null,
};

export const aboutPage = {
  // brand guide: brand essence and brand personality
  story: [
    "RD.K creates environments where people build their lives, memories, businesses and futures. We develop commercial spaces, residential communities, villas, luxury apartments, mixed-use projects, hospitality assets and marine residential experiences.",
    "We believe exceptional development goes beyond vision. Through engineering expertise, precision execution, premium construction and refined finishes, every concept becomes an enduring destination, built to last.",
  ],
  // brand guide
  vision:
    "To become one of the region's most trusted creators of exceptional living environments on land and water, shaping communities, residences, waterfront destinations and landmark developments that inspire generations.",
  mission:
    "To deliver world-class developments that combine engineering excellence, thoughtful design, timeless architecture and long-term value, creating exceptional places to live, work, invest and belong.",
  values: [
    "Innovation",
    "Distinctive quality",
    "Tailored solutions",
    "Creative leadership",
    "Excellence in execution",
    "Multidisciplinary expertise",
  ], // brand guide: core values
  images: {
    intro: { image: "/images/about-intro.jpg", alt: "The reception at RD.K Developments" },
    building: { image: "/images/about-building.jpg", alt: "An RD.K building at golden hour" },
    masterplan: { image: "/images/about-masterplan.jpg", alt: "Reviewing a masterplan" },
  },
  // Optional numbers about the company (e.g. years of experience). An empty list hides the row
  stats: [] as Stat[],
};

export const contactPage = {
  heading: "Contact us",
  intro: "Email us, send an enquiry or drop by the office. We reply to every enquiry within one working day.", // PLACEHOLDER
};

export const hero = {
  slides: [
    // From the RD.K brand guidelines. Add more entries to turn it back into a slideshow
    { image: "/images/rdk-hero-1.jpg", alt: "Reviewing an RD.K masterplan" },
  ],
  subline: "Exceptional places to live, work and invest, built to last.", // brand guide, shortened
};

export const enquiry = {
  heading: "Enquire now",
  image: "/images/enquire-showroom.jpg", // Pexels (free to use, no credit required)
  text: "Leave your details and our sales team will get back to you within one working day.",
  // PLACEHOLDER: confirm the units on offer, and whether they're for sale, rent or both
  updatesLabel: "Keep me updated on news and offers",
  interests: ["A showroom", "A service centre", "A retail unit", "Office space", "Something else"],
};

export type PolicySection = { heading: string; paragraphs?: string[]; list?: string[]; after?: string[] };

/*
 * Standard privacy policy, written to match how this site actually works.
 * PLACEHOLDER: the client should approve it (and ideally have a lawyer review it) before launch.
 * Update it if anything changes: analytics, new form fields, new service providers.
 */
export const privacyPage = {
  heading: "Privacy policy",
  updated: "23 October 2026",
  intro:
    "This policy explains what personal information RD.K Developments collects through this website, why we collect it, and how we look after it.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "This website is run by RD.K Developments, a real estate developer based in New Cairo, Egypt. We are responsible for the personal information you share with us here. You can reach us at contact@rdkeg.com.",
      ],
    },
    {
      heading: "What we collect",
      paragraphs: ["When you send an enquiry, we collect:"],
      list: [
        "your full name",
        "your email address",
        "your phone number",
        "what you're interested in, and any message you choose to add",
        "which development you enquired about, and when",
        "whether you asked to receive news and offers",
      ],
    },
    {
      heading: "Why we use it",
      paragraphs: ["We use your details only to deal with your enquiry. That means we use them to:"],
      list: [
        "send you the details you asked for",
        "have our sales team call or email you about your enquiry",
        "keep a record of enquiries so we can follow up properly",
      ],
    },
    {
      heading: "What we don't do",
      paragraphs: [
        "We don't sell your information. We only send you news, offers and launch updates if you registered your interest, or ticked \"Keep me updated on news and offers\" when you sent an enquiry, and you can ask us to stop at any time.",
      ],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "We share your details only with the companies that help us run this website and handle enquiries, and only as far as they need to do that job:",
      ],
      list: [
        "Vercel, which hosts this website",
        "Resend, which sends our emails",
        "Google, whose Google Sheets service we use to keep a list of enquiries",
      ],
    },
    {
      heading: "Where it's stored",
      paragraphs: [
        "These companies may store information on servers outside Egypt. We choose providers that protect personal information to recognised international standards.",
      ],
    },
    {
      heading: "How long we keep it",
      // PLACEHOLDER: confirm the retention period with the client
      paragraphs: [
        "We keep enquiry details for up to two years after we were last in touch with you, then delete them. You can ask us to delete them sooner at any time.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: ["You can ask us at any time to:"],
      list: [
        "tell you what personal information we hold about you",
        "correct anything that's wrong",
        "delete your information",
        "stop contacting you",
      ],
      after: [
        "Email contact@rdkeg.com and we'll reply within 30 days. We handle personal information in line with Egyptian law, including the Personal Data Protection Law (Law No. 151 of 2020).",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This website doesn't use cookies of its own, and doesn't use advertising or tracking tools. Some pages show a map from Google Maps, and Google may set its own cookies when the map loads. Google's privacy policy explains how it uses them.",
      ],
    },
    {
      heading: "Keeping it safe",
      paragraphs: [
        "Information you send through this website is encrypted on its way to us, and only the people who need it to handle your enquiry can see it.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If we change how we handle personal information, we'll update this page and the date at the top.",
      ],
    },
  ] as PolicySection[],
};

export type Partner = {
  name: string;
  logo: string; // the partner's original logo, for the white tile (transparent PNG or SVG in /public/images/partners/)
  logoOnGreen: string; // one-colour cream version, for the green hover panel
  description: string; // one or two short lines, slides up on hover or tap
};

// Home page, above Enquire now: after Misr Italia's "Our Partners" strip
export const partners = {
  heading: "Our partners",
  list: [
    // Descriptions from public company profiles; PLACEHOLDER: the client should approve the wording
    {
      name: "GAC",
      logo: "/images/partners/gac.svg",
      logoOnGreen: "/images/partners/gac-light.png",
      description: "GAC Motor is the car brand of GAC Group, one of China's largest automakers, in Egypt since 2023.",
    },
    {
      name: "GB Corp (Ghabbour)",
      logo: "/images/partners/gb-corp.svg",
      logoOnGreen: "/images/partners/gb-corp-light.png",
      description: "GB Corp, the Ghabbour group, is one of Egypt's leading automotive companies, with brands including Hyundai, Chery and Haval.",
    },
    {
      name: "ElTarek",
      logo: "/images/partners/el-tarek.png",
      logoOnGreen: "/images/partners/el-tarek-light.png",
      description: "ElTarek Group, based in Alexandria, is one of Egypt's largest automotive distributors, representing more than 20 brands.",
    },
  ] as Partner[],
};

// The "Register interest" window, opened from the header and the Developments "next launch" card
export const registerInterest = {
  button: "Register interest",
  heading: "Register your interest",
  submit: "Submit",
};

// Automated emails (sent through Resend; settings in .env.local and Vercel, see src/lib/email.ts)
export const emails = {
  autoReply: {
    subject: "Thank you for contacting RD.K Developments",
    // From the client, word for word. The greeting ("Dear Sara,") and the sign-off are added around it
    paragraphs: [
      "Thank you for reaching out to RD.K Developments.",
      "We’ve received your inquiry. A member of our team will be in touch shortly to discuss your project in further detail.",
      "We look forward to connecting with you.",
    ],
    signOff: "RD.K Developments",
  },
  // Sent instead of autoReply when someone registers their interest
  registerReply: {
    subject: "You're on the RD.K Developments list",
    paragraphs: [
      "Thank you for registering your interest with RD.K Developments.",
      "You're now on our list, so you'll be the first to hear about our new projects, launches and updates.",
      "Our newest development is Autovia: a landmark destination for car showrooms, service centres, retail and offices on Cairo's Ring Road.",
      "We look forward to sharing what's next with you.",
    ],
    signOff: "RD.K Developments",
  },
  leadAlert: {
    subject: "New lead from the website", // the visitor's name and the form are added after it
  },
};

// Thank-you that fades in where the form was, after sending (Enquire now and Register interest)
export const inlineThanks = {
  enquiry: {
    line: "Our team will be in touch shortly to discuss your enquiry in further detail.",
    note: "A confirmation is on its way to your inbox. We look forward to connecting with you.",
  },
  registerInterest: {
    line: "You're on our list. You'll be the first to hear about our new projects and launches.",
    note: "Our newest is Autovia: a landmark destination for car showrooms, service centres, retail and offices on Cairo's Ring Road.",
  },
};

// Phone country codes for both forms. First entry is the default. Most visitors are in Egypt, then the Gulf
export const countryCodes = [
  { code: "EG", dial: "+20" },
  { code: "SA", dial: "+966" },
  { code: "AE", dial: "+971" },
  { code: "KW", dial: "+965" },
  { code: "QA", dial: "+974" },
  { code: "BH", dial: "+973" },
  { code: "OM", dial: "+968" },
  { code: "JO", dial: "+962" },
  { code: "LB", dial: "+961" },
  { code: "LY", dial: "+218" },
  { code: "SD", dial: "+249" },
  { code: "GB", dial: "+44" },
  { code: "US", dial: "+1" },
  { code: "CA", dial: "+1" },
  { code: "DE", dial: "+49" },
  { code: "FR", dial: "+33" },
  { code: "IT", dial: "+39" },
];

