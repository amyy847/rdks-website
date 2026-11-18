import type { NewsItem } from "@/content/site";
import { longDate, readTime } from "@/lib/news";
import { Breadcrumb, MoreNews, Photos, Tags } from "./parts";

/** The article page: title on top, details beside the text, photos at the end */
export default function ArticleClassic({ item }: { item: NewsItem }) {
  const [lead, ...rest] = item.body;
  return (
    <>
      <section className="pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="container-site">
          <Breadcrumb item={item} />
          <p className="mb-5 mt-6 flex items-center gap-3 type-eyebrow text-moss">
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
            <div className="mt-8">
              <Tags item={item} />
            </div>
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

      <Photos item={item} />
      <MoreNews item={item} />
    </>
  );
}
