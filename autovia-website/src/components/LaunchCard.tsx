import Link from "next/link";
import CardSlideshow from "./CardSlideshow";
import type { Development } from "@/content/site";

// enquireHref: pages without their own enquiry form point it at the development's form instead
export default function LaunchCard({ dev, enquireHref = "#enquire" }: { dev: Development; enquireHref?: string }) {
  return (
    <article className="group grid overflow-hidden rounded-sm bg-white md:grid-cols-12">
      <Link
        href={`/developments/${dev.slug}`}
        className="relative block aspect-[4/3] overflow-hidden md:col-span-7 md:aspect-auto md:min-h-[32rem]"
        tabIndex={-1}
        aria-hidden="true"
      >
        <CardSlideshow
          images={dev.cardImages}
          sizes="(min-width: 768px) 58vw, 100vw"
          className="transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-col p-7 md:col-span-5 md:p-12">
        <p className="flex items-center gap-2.5 type-eyebrow text-moss">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          {dev.status}
        </p>
        <h3 className="type-h2 mt-5">{dev.name}</h3>
        <p className="mt-2 font-medium text-moss">{dev.location}</p>
        <p className="mt-6 max-w-[42ch] text-green/85">{dev.summary}</p>

        <div className="mt-10 flex flex-wrap gap-3 md:mt-auto md:pt-10">
          <Link href={`/developments/${dev.slug}`} className="btn btn-ghost-dark">
            Learn more
            <span className="sr-only"> about {dev.name}</span>
          </Link>
          <Link href={enquireHref} className="btn btn-gold">
            Enquire now
          </Link>
        </div>
      </div>
    </article>
  );
}
