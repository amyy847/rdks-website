import Image from "next/image";
import type { NewsItem } from "@/content/site";
import { longDate, photoAt } from "@/lib/news";
import { Breadcrumb, MoreNews, Photos } from "./parts";
import ShareLinks from "./ShareLinks";

/**
 * Option 2, after SODIC's article page: breadcrumb and title centred, one wide photo,
 * then three columns (share links, the text, the date) with a photo set into the text.
 */
export default function ArticleCentred({ item }: { item: NewsItem }) {
  const inline = item.gallery.length > 1 ? photoAt(item, 1) : null;
  const before = item.body.slice(0, 2);
  const after = item.body.slice(2);

  return (
    <>
      <section className="pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="container-site text-center">
          <Breadcrumb item={item} center />
          <h1 className="type-h1 mx-auto mt-8 max-w-[24ch]">{item.title}</h1>
        </div>
      </section>

      <div className="container-site">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-laurel/30 md:aspect-[2/1]">
          <Image src={item.cover.image} alt={item.cover.alt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        </div>
      </div>

      <article className="py-14 md:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <aside className="order-last lg:order-first lg:col-span-2">
            <ShareLinks title={item.title} />
          </aside>

          <div className="space-y-5 text-green/85 lg:col-span-7 lg:col-start-4">
            {before.map((para, i) => (
              <p key={i} className={i === 0 ? "type-lead text-green" : undefined}>
                {para}
              </p>
            ))}
            {inline && (
              <figure className="!my-12">
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-laurel/30">
                  <Image src={inline.image} alt={inline.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-sm text-green/60">{inline.alt}</figcaption>
              </figure>
            )}
            {after.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <dl className="grid content-start gap-6 text-sm lg:col-span-2 lg:col-start-11">
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
          </dl>
        </div>
      </article>

      <Photos item={item} />
      <MoreNews item={item} />
    </>
  );
}
