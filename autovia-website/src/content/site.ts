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
  email: "info@example.com", // PLACEHOLDER
  address: "Head office address, New Cairo, Egypt", // PLACEHOLDER: RDK's office (not the showroom)
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
  location: string;
  status: string;
  summary: string;
  cover: string;
  stats: Stat[];
  showroom: { address: string; hours: string; mapUrl: string; mapEmbedUrl: string };
  // Detail page (/developments/[slug])
  description: string[]; // one string per paragraph
  sells: { label: string; title: string; text: string }[];
  brands: string[];
  gallery: Photo[];
  services: { title: string; text: string }[]; // optional extras; an empty list hides the section
};

export const developments: Development[] = [
  {
    slug: "autovia",
    name: "Autovia",
    location: "New Cairo", // PLACEHOLDER
    status: "Now open", // PLACEHOLDER
    summary:
      "A car showroom where you can compare brands, book a test drive and sort financing in one visit.", // PLACEHOLDER
    cover: "/images/autovia-cover.jpg",
    stats: [
      // PLACEHOLDER: 3–4 key numbers from the client
      { value: 12, label: "Brands on the floor" },
      { value: 80, suffix: "+", label: "Cars on display" },
      { value: 2400, suffix: " m²", label: "Showroom space" },
      { value: 5, suffix: " yrs", label: "Warranty available" },
    ],
    showroom: {
      address: "Autovia showroom address, New Cairo, Egypt", // PLACEHOLDER
      hours: "Saturday to Thursday, 10 am to 10 pm", // PLACEHOLDER
      mapUrl: "https://maps.google.com", // PLACEHOLDER: Google Maps share link for the showroom
      mapEmbedUrl: "https://www.google.com/maps?q=New+Cairo,+Egypt&output=embed", // PLACEHOLDER
    },
    description: [
      // PLACEHOLDER: 2–3 short paragraphs from the client
      "Autovia puts the brands you're weighing up on one floor, so you can sit in each car, compare them properly and decide without driving across the city.",
      "Our team isn't tied to a single brand. They'll walk you through the options, set up a test drive and help you sort out paperwork, financing and delivery in the same visit.",
    ],
    sells: [
      // PLACEHOLDER: confirm whether Autovia sells new, used or both
      { label: "New", title: "New cars", text: "This year's models from every brand on the floor, with full manufacturer warranty." },
      { label: "Used", title: "Inspected used cars", text: "Pre-owned cars that pass our inspection, with a clear history and an optional warranty." },
    ],
    // PLACEHOLDER: the client's real brand list (swap names for logo images later if they send them)
    brands: [
      "Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6",
      "Brand 7", "Brand 8", "Brand 9", "Brand 10", "Brand 11", "Brand 12",
    ],
    gallery: [
      // PLACEHOLDER images: 6 works best for the grid (landscape 1600×1000 or portrait 1000×1250)
      { image: "/images/autovia-gallery-1.jpg", alt: "The main showroom floor at Autovia" },
      { image: "/images/autovia-gallery-2.jpg", alt: "A car on display under the showroom lights" },
      { image: "/images/autovia-gallery-3.jpg", alt: "The customer lounge" },
      { image: "/images/autovia-gallery-4.jpg", alt: "Close-up of a car interior" },
      { image: "/images/autovia-gallery-5.jpg", alt: "Cars lined up by brand" },
      { image: "/images/autovia-gallery-6.jpg", alt: "Autovia's entrance at night" },
    ],
    services: [
      // PLACEHOLDER: delete any the client doesn't offer. Other options they may pick:
      // featured cars, special offers, reviews, video tour
      { title: "Financing", text: "Compare instalment plans from partner banks and get pre-approved before you choose your car." },
      { title: "Trade-in", text: "Bring your current car for a valuation and put it towards your next one." },
      { title: "Test drives", text: "Book a test drive of any car on the floor, at a time that suits you." },
      { title: "After-sales and warranty", text: "Servicing, spare parts and extended warranty plans, arranged through Autovia." },
    ],
  },
];

export const developmentsPage = {
  heading: "Developments",
  intro: "Places built around the way people live and drive. Autovia is our first launch.", // PLACEHOLDER
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
    { image: "/images/hero-1.jpg", alt: "Autovia showroom floor" }, // PLACEHOLDER images
    { image: "/images/hero-2.jpg", alt: "Cars lined up inside Autovia" },
    { image: "/images/hero-3.jpg", alt: "Autovia at night" },
  ],
  headline: "Autovia",
  subline: "Every brand you're considering, side by side, in one showroom.", // PLACEHOLDER
};

export const enquiry = {
  heading: "Enquire now",
  text: "Leave your details and we'll email you Autovia's brochure straight away. Our sales team will call you within one working day.",
  interests: ["Buying a new car", "Buying a used car", "Financing", "Trade-in", "Something else"], // PLACEHOLDER: depends on what Autovia offers
};
