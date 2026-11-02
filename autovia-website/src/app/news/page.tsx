import type { Metadata } from "next";
import EnquireSection from "@/components/EnquireSection";
import NewsCard from "@/components/NewsCard";
import { newsPage } from "@/content/site";
import { sortedNews } from "@/lib/news";

export const metadata: Metadata = {
  title: newsPage.heading,
  description: newsPage.intro,
};

export default function NewsPage() {
  const items = sortedNews();
  return (
    <>
      <section className="pb-12 pt-32 md:pb-16 md:pt-44">
        <div className="container-site">
          <p className="mb-5 flex items-center gap-3 type-eyebrow text-moss">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            Media
          </p>
          <h1 className="type-h1">{newsPage.heading}</h1>
          <p className="type-lead mt-6 max-w-[44ch] text-green/85">{newsPage.intro}</p>
        </div>
      </section>

      <section aria-label={newsPage.heading} className="pb-20 md:pb-32">
        <div className="container-site">
          {items.length === 1 ? (
            <NewsCard item={items[0]} wide />
          ) : (
            <ul className="grid gap-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.slug}>
                  <NewsCard item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <EnquireSection />
    </>
  );
}
