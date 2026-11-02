import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/content/site";
import { longDate, newsHref, readTime } from "@/lib/news";

/**
 * One news or event card, after Mountain View's "Latest News": the kind and read time above the photo,
 * then the title and the date. `wide` lays it out side by side, for when it's the only one.
 */
export default function NewsCard({ item, wide = false }: { item: NewsItem; wide?: boolean }) {
  return (
    <Link href={newsHref(item)} className={`group grid gap-x-10 ${wide ? "md:grid-cols-12 md:items-center" : ""}`}>
      <p className={`flex items-center gap-2.5 type-eyebrow text-moss ${wide ? "md:col-span-12" : ""}`}>
        <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
        {item.kind} · {readTime(item)} min read
      </p>
      <div className={`relative mt-4 aspect-[16/10] overflow-hidden rounded-sm bg-laurel/30 ${wide ? "md:col-span-7" : ""}`}>
        <Image
          src={item.cover.image}
          alt={item.cover.alt}
          fill
          sizes={wide ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.04]"
        />
      </div>
      <div className={wide ? "md:col-span-5" : ""}>
        <h3 className="type-h3 mt-5 transition-colors group-hover:text-moss">{item.title}</h3>
        {wide && <p className="mt-4 max-w-[46ch] text-green/80">{item.excerpt}</p>}
        <p className="mt-4 text-sm text-green/65">{longDate(item.date)}</p>
      </div>
    </Link>
  );
}
