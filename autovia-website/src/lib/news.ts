import { news, type NewsItem } from "@/content/site";

// Dates are stored as ISO strings and formatted in UTC so the server and the browser agree
export const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// About 200 words a minute, at least one
export const readTime = (item: NewsItem) => Math.max(1, Math.round(item.body.join(" ").split(/\s+/).length / 200));

export const newsHref = (item: NewsItem) => `/news/${item.slug}`;

export const sortedNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date));
