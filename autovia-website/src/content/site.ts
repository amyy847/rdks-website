/**
 * ALL WEBSITE CONTENT LIVES HERE.
 * When the client sends their info, update this file and swap the images in /public/images.
 * Anything marked PLACEHOLDER still needs real content from the client.
 */

export const company = {
  name: "RDK", // PLACEHOLDER: company name
  legalName: "RDK Developments", // PLACEHOLDER: legal name (used in footer + privacy policy)
  tagline: "Developments built around the way people live and drive.", // PLACEHOLDER
  intro:
    "We're a young development company building places people actually want to spend time in. Autovia, our first launch, brings car buying under one roof.", // PLACEHOLDER
};

export const contact = {
  phone: "+20 100 000 0000", // PLACEHOLDER
  phoneHref: "tel:+201000000000",
  whatsapp: "201000000000", // PLACEHOLDER: international format, digits only
  email: "info@example.com", // PLACEHOLDER
  address: "Showroom address, New Cairo, Egypt", // PLACEHOLDER
  mapUrl: "https://maps.google.com", // PLACEHOLDER: Google Maps share link
  hours: "Saturday to Thursday, 10 am to 10 pm", // PLACEHOLDER
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

export type Development = {
  slug: string;
  name: string;
  location: string;
  status: string;
  summary: string;
  cover: string;
  stats: Stat[];
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
  },
];

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
