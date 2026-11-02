import Image from "next/image";
import type { NewsItem, Photo } from "@/content/site";
import { longDate, photoAt } from "@/lib/news";
import { Breadcrumb, MoreNews, Photos, Tags } from "./parts";

/**
 * Option 3, editorial: the photos are placed through the story rather than collected at the end.
 * Title beside a large photo, the lead in big type, text beside a photo, an edge-to-edge photo,
 * a pull quote, a pair of photos beside the closing text, then every photo in the gallery.
 */

function Pic({ photo, className, sizes, priority = false }: { photo: Photo; className: string; sizes: string; priority?: boolean }) {
  return (
    <figure className={`relative overflow-hidden rounded-sm bg-laurel/30 ${className}`}>
      <Image src={photo.image} alt={photo.alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </figure>
  );
}

export default function ArticleEditorial({ item }: { item: NewsItem }) {
  const [lead, second, ...rest] = item.body;

  return (
    <>
      {/* Title beside the cover */}
      <section className="pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="container-site grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Breadcrumb item={item} />
            <p className="mb-5 mt-6 flex items-center gap-3 type-eyebrow text-moss">
              <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
              {item.kind} · {longDate(item.date)}
            </p>
            <h1 className="type-h2">{item.title}</h1>
            {item.location && <p className="mt-5 font-medium text-moss">{item.location}</p>}
            <div className="mt-8">
              <Tags item={item} />
            </div>
          </div>
          <Pic photo={item.cover} priority className="aspect-[4/3] lg:col-span-7" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
      </section>

      <article>
        {/* The lead, big */}
        <div className="container-site pb-14 md:pb-20">
          <p className="max-w-[40ch] text-[clamp(1.375rem,2.4vw,2rem)] font-light leading-snug">{lead}</p>
        </div>

        {/* Text beside a photo */}
        {second && (
          <div className="container-site grid items-center gap-10 pb-14 md:grid-cols-12 md:pb-20">
            <p className="text-green/85 md:col-span-5">{second}</p>
            <Pic photo={photoAt(item, 5)} className="aspect-[3/2] md:col-span-6 md:col-start-7" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        )}

        {/* Edge to edge */}
        <Pic photo={photoAt(item, 2)} className="!rounded-none aspect-[16/9] md:aspect-[21/9]" sizes="100vw" />

        {/* Pull quote */}
        {item.quote && (
          <blockquote className="container-site py-16 text-center md:py-24">
            <p className="type-h1 mx-auto max-w-[18ch]">“{item.quote}”</p>
          </blockquote>
        )}

        {/* A pair of photos beside the closing text */}
        <div className={`container-site grid gap-10 pb-16 md:grid-cols-12 md:pb-24 ${item.quote ? "" : "pt-14 md:pt-20"}`}>
          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            <Pic photo={photoAt(item, 6)} className="aspect-[3/4]" sizes="(min-width: 768px) 28vw, 50vw" />
            <Pic photo={photoAt(item, 8)} className="mt-12 aspect-[3/4]" sizes="(min-width: 768px) 28vw, 50vw" />
          </div>
          <div className="space-y-5 self-center text-green/85 md:col-span-4 md:col-start-9">
            {rest.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <Photos item={item} heading="All photos" />
      <MoreNews item={item} />
    </>
  );
}
