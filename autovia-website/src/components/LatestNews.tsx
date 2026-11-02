import Link from "next/link";
import NewsCard from "./NewsCard";
import { newsPage, type NewsItem } from "@/content/site";

/** "Latest news" after Mountain View: heading and a link to the full list, then the three newest as cards */
export default function LatestNews({ items }: { items: NewsItem[] }) {
  const latest = items.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section aria-labelledby="latest-news-heading" className="py-20 md:py-32">
      <div className="container-site">
        {/* Same heading row as "Current launches" */}
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h2 id="latest-news-heading" className="type-h2">
            {newsPage.latestHeading}
          </h2>
          <Link href="/news" className="shrink-0 font-semibold underline decoration-moss decoration-2 underline-offset-[6px] hover:text-moss">
            {newsPage.allLabel}
          </Link>
        </div>
        {latest.length === 1 ? (
          <NewsCard item={latest[0]} wide />
        ) : (
          <ul className="grid gap-12 md:grid-cols-3 md:gap-6">
            {latest.map((item) => (
              <li key={item.slug}>
                <NewsCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
