import { news, type NewsItem } from "@/content/site";

// Dates are stored as ISO strings and formatted in UTC so the server and the browser agree
export const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// About 200 words a minute, at least one
export const readTime = (item: NewsItem) => Math.max(1, Math.round(item.body.join(" ").split(/\s+/).length / 200));

export const newsHref = (item: NewsItem) => `/news/${item.slug}`;

export const sortedNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date));

// Article page layouts the client is choosing between (/news/[slug] lists them, /news/[slug]/[layout] shows one)
export const ARTICLE_LAYOUTS = [
  { id: "1", name: "Classic", note: "Title on top, details beside the text, photos at the end." },
  { id: "2", name: "Centred", note: "After SODIC: centred title, a wide photo, the text between share links and the date." },
  { id: "3", name: "Editorial", note: "Photos placed through the page: beside the title, beside the text, edge to edge and in pairs." },
] as const;
export type ArticleLayoutId = (typeof ARTICLE_LAYOUTS)[number]["id"];

// The nth gallery photo, falling back to the cover when an item has few or none
export const photoAt = (item: NewsItem, n: number) => item.gallery[n] ?? item.gallery[n % Math.max(1, item.gallery.length)] ?? item.cover;
