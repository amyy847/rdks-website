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
  tagline: "An expression of excellence and integrity", // brand guide
  intro:
    "RD.K Developments creates exceptional places to live, connect and thrive, transforming land, waterfronts and visionary concepts into enduring destinations.", // brand guide
  byline: "An RD.K development", // shown above each development's name
};

export const contact = {
  phone: "+20 100 000 0000", // PLACEHOLDER
  phoneHref: "tel:+201000000000",
  whatsapp: "201000000000", // PLACEHOLDER: international format, digits only
  email: "contact@rdkeg.com", // from the Autovia branding book
  address: "Head office address, New Cairo, Egypt", // PLACEHOLDER: RD.K's office (not Autovia)
  mapUrl: "https://maps.google.com", // PLACEHOLDER: Google Maps share link for the office
  // PLACEHOLDER: in Google Maps, Share > Embed a map, and paste the src="..." link here
  mapEmbedUrl: "https://www.google.com/maps?q=New+Cairo,+Egypt&output=embed",
  hours: "Sunday to Thursday, 9 am to 5 pm", // PLACEHOLDER: office working hours
  socials: [
    { label: "Instagram", href: "https://instagram.com" }, // PLACEHOLDER
    { label: "Facebook", href: "https://facebook.com" }, // PLACEHOLDER
    { label: "TikTok", href: "https://tiktok.com" }, // PLACEHOLDER
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Developments", href: "/developments" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export type Stat = { value: number; suffix?: string; label: string };

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
  stats: Stat[];
  site: { address: string; hours: string; mapUrl: string; mapEmbedUrl: string; note: string };
  // Detail page (/developments/[slug])
  description: string[]; // one string per paragraph
  spaces: { title: string; text: string }[]; // what the development is made of
  masterplan: (Photo & { text: string }) | null;
  brands: string[]; // tenant brands; an empty list hides the section
  gallery: Photo[];
  features: { title: string; text: string }[]; // an empty list hides the section
};

/*
 * Autovia wording marked "book" comes from the Autovia Branding Book (October 2026).
 * Photos are the renders from that book.
 */
export const developments: Development[] = [
  {
    slug: "autovia",
    name: "Autovia",
    logo: "/images/autovia-logo.png",
    tagline: "Built to be seen", // book
    location: "Ring Road, New Cairo", // book
    status: "Now launching", // PLACEHOLDER: confirm (open, launching, under construction?)
    summary: "A landmark automotive, retail and office destination on Cairo's Ring Road.", // book, shortened
    cover: "/images/autovia-cover.jpg",
    stats: [
      { value: 5, label: "Standalone buildings" }, // book master plan (B01 to B05). Confirm
      { value: 4, label: "Types of space" }, // showrooms, service centres, retail, offices (book)
      { value: 12000, suffix: " m²", label: "Total area" }, // PLACEHOLDER: real land or built-up area
    ],
    site: {
      address: "Ring Road, New Cairo, near South 90th Street", // book. PLACEHOLDER: exact address
      hours: "Sunday to Thursday, 9 am to 5 pm", // PLACEHOLDER: sales office or site visit hours
      mapUrl: "https://maps.google.com", // PLACEHOLDER: Google Maps share link for the site
      mapEmbedUrl: "https://www.google.com/maps?q=5A+by+The+Waterway,+New+Cairo&output=embed", // PLACEHOLDER: exact pin
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
      image: "/images/autovia-masterplan.jpg",
      alt: "Aerial view of Autovia's buildings along the Ring Road",
      text: "An internal circulation road gives each standalone building prime frontage and independent access, turning them into individual landmarks within one destination. Directly connected to the Ring Road, the project ensures seamless access and maximum visibility.", // book
    },
    brands: [], // PLACEHOLDER: tenant brands once signed (names now, logos later). Empty hides the section
    gallery: [
      { image: "/images/autovia-gallery-1.jpg", alt: "The Autovia sign on the building's dark façade" },
      { image: "/images/autovia-gallery-2.jpg", alt: "A curved glass showroom on the corner of the site" },
      { image: "/images/autovia-gallery-3.jpg", alt: "Cars on display behind full-height glazing" },
      { image: "/images/autovia-gallery-4.jpg", alt: "A showroom carrying a tenant's red brand panel" },
      { image: "/images/autovia-gallery-5.jpg", alt: "A showroom carrying a tenant's blue brand panels" },
      { image: "/images/autovia-gallery-6.jpg", alt: "Autovia's buildings lined with palms along the road" },
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
    title: "More on the way",
    text: "Leave your details and we'll tell you first when our next development launches.",
  } as { title: string; text: string } | null,
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
  // PLACEHOLDER: optional numbers about the company. An empty list hides the row.
  stats: [
    { value: 15, suffix: "+", label: "Years of team experience" },
    { value: 40, label: "People on the team" },
    { value: 1, label: "Development open" },
  ] as Stat[],
  // PLACEHOLDER: optional founder or team message. Set to null to hide it.
  founder: {
    quote: "We'd rather build one place people love than ten they put up with.",
    name: "Founder name",
    role: "Founder and CEO",
    image: "/images/about-founder.jpg",
  } as { quote: string; name: string; role: string; image: string } | null,
};

export const contactPage = {
  heading: "Contact us",
  intro: "Call, message or drop by the office. We reply to every enquiry within one working day.", // PLACEHOLDER
};

export const hero = {
  slides: [
    // Renders from the Autovia branding book
    { image: "/images/hero-1.jpg", alt: "A curved glass showroom at Autovia" },
    { image: "/images/hero-2.jpg", alt: "Cars on display in an Autovia showroom" },
    { image: "/images/hero-3.jpg", alt: "Autovia's buildings and palms along the Ring Road" },
  ],
  headline: "Autovia",
  subline: "Built to be seen. A landmark automotive, retail and office destination on Cairo's Ring Road.", // book
};

export const enquiry = {
  heading: "Enquire now",
  text: "Leave your details and we'll email you Autovia's brochure straight away. Our sales team will call you within one working day.",
  // PLACEHOLDER: confirm the units on offer, and whether they're for sale, rent or both
  interests: ["A showroom", "A service centre", "A retail unit", "Office space", "Something else"],
};
