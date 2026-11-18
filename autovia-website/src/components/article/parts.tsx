import Link from "next/link";
import Gallery from "../Gallery";
import NewsCard from "../NewsCard";
import { newsPage, type NewsItem } from "@/content/site";
import { sortedNews } from "@/lib/news";

/** Pieces of the article page */

export function Breadcrumb({ item, center = false }: { item: NewsItem; center?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-green/65">
      <ol className={`flex flex-wrap items-center gap-2 ${center ? "justify-center" : ""}`}>
        <li>
          <Link href="/news" className="hover:text-moss">
            {newsPage.heading}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-green">
          {item.kind}
        </li>
      </ol>
    </nav>
  );
}

export function Tags({ item }: { item: NewsItem }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {item.tags.map((tag) => (
        <li key={tag} className="rounded-sm border border-green/25 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function Photos({ item, heading = "Photos" }: { item: NewsItem; heading?: string }) {
  if (item.gallery.length === 0) return null;
  return (
    <section aria-labelledby="photos-heading" className="pb-20 md:pb-28">
      <div className="container-site">
        <h2 id="photos-heading" className="type-h2 mb-10 md:mb-14">
          {heading}
        </h2>
        <Gallery photos={item.gallery} />
      </div>
    </section>
  );
}

// "More news & events" and the link back to the list
export function MoreNews({ item }: { item: NewsItem }) {
  const more = sortedNews()
    .filter((n) => n.slug !== item.slug)
    .slice(0, 3);
  return (
    <>
      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="pb-20 md:pb-28">
          <div className="container-site">
            <h2 id="more-heading" className="type-h2 mb-10 md:mb-14">
              More news &amp; events
            </h2>
            <ul className="grid gap-12 md:grid-cols-3 md:gap-6">
              {more.map((n) => (
                <li key={n.slug}>
                  <NewsCard item={n} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <div className="container-site pb-16 md:pb-20">
        <Link href="/news" className="font-semibold underline decoration-moss decoration-2 underline-offset-[6px] hover:text-moss">
          ← {newsPage.allLabel}
        </Link>
      </div>
    </>
  );
}
