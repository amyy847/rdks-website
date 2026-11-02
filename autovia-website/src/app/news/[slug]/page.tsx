import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquireSection from "@/components/EnquireSection";
import Gallery from "@/components/Gallery";
import NewsCard from "@/components/NewsCard";
import { company, news, newsPage } from "@/content/site";
import { longDate, readTime, sortedNews } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };

// Only the items listed in site.ts exist; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: `${item.title} | ${company.fullName}`,
      description: item.excerpt,
      images: [{ url: item.cover.image, alt: item.cover.alt }],
    },
  };
}

export default async function NewsItemPage({ params }: Props) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();
  const more = sortedNews()
    .filter((n) => n.slug !== item.slug)
    .slice(0, 3);
  const [lead, ...rest] = item.body;

  return (
    <>
      <section className="pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-green/65">
            <ol className="flex flex-wrap items-center gap-2">
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
          <p className="mb-5 flex items-center gap-3 type-eyebrow text-moss">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            {item.kind} · {longDate(item.date)}
          </p>
          <h1 className="type-h1 max-w-[22ch]">{item.title}</h1>
          {item.location && <p className="mt-5 font-medium text-moss">{item.location}</p>}
        </div>
      </section>

      <article className="pb-16 md:pb-24">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-4 lg:col-span-3">
            <dl className="grid gap-6 border-t border-laurel/60 pt-6 text-sm">
              <div>
                <dt className="type-eyebrow text-green/60">Date</dt>
                <dd className="mt-1.5 text-base">{longDate(item.date)}</dd>
              </div>
              {item.location && (
                <div>
                  <dt className="type-eyebrow text-green/60">Where</dt>
                  <dd className="mt-1.5 text-base">{item.location}</dd>
                </div>
              )}
              <div>
                <dt className="type-eyebrow text-green/60">Read</dt>
                <dd className="mt-1.5 text-base">{readTime(item)} min</dd>
              </div>
            </dl>
            <ul className="mt-8 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li key={tag} className="rounded-sm border border-green/25 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
                  {tag}
                </li>
              ))}
            </ul>
          </aside>
          <div className="max-w-[62ch] space-y-5 md:col-span-8 lg:col-span-7 lg:col-start-5">
            <p className="type-lead">{lead}</p>
            {rest.map((para, i) => (
              <p key={i} className="text-green/85">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {item.gallery.length > 0 && (
        <section aria-labelledby="photos-heading" className="pb-20 md:pb-28">
          <div className="container-site">
            <h2 id="photos-heading" className="type-h2 mb-10 md:mb-14">
              Photos
            </h2>
            <Gallery photos={item.gallery} />
          </div>
        </section>
      )}

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

      <EnquireSection />
    </>
  );
}
