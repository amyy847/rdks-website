import Link from "next/link";
import CardSlideshow from "./CardSlideshow";
import type { Development } from "@/content/site";

export default function DevelopmentCard({ dev }: { dev: Development }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm bg-white">
      <Link href={`/developments/${dev.slug}`} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <CardSlideshow
          images={dev.cardImages}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-7 md:p-10">
        <p className="flex items-center gap-2.5 type-eyebrow text-moss">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          {dev.status} · {dev.location}
        </p>
        {dev.logoDark ? (
          <h2 className="mt-6">
            <span className="sr-only">{dev.name}</span>
            {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the wordmark crisp at any width */}
            <img src={dev.logoDark} alt="" className="w-full max-w-[22rem]" />
          </h2>
        ) : (
          <h2 className="type-h2 mt-5">{dev.name}</h2>
        )}
        <p className="mt-5 max-w-[42ch] text-green/85">{dev.summary}</p>

        <div className="mt-auto flex flex-wrap gap-3 pt-10">
          <Link href={`/developments/${dev.slug}`} className="btn btn-ghost-dark">
            Learn more
            <span className="sr-only"> about {dev.name}</span>
          </Link>
          <Link href="#enquire" className="btn btn-gold">
            Enquire now
          </Link>
        </div>
      </div>
    </article>
  );
}
