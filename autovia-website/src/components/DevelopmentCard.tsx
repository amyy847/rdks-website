import Image from "next/image";
import Link from "next/link";
import type { Development } from "@/content/site";

export default function DevelopmentCard({ dev }: { dev: Development }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white">
      <Link
        href={`/developments/${dev.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={dev.cover}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-7 md:p-10">
        <p className="flex items-center gap-2.5 text-sm font-medium text-tarmac">
          <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
          {dev.status} · {dev.location}
        </p>
        <h2 className="type-h2 mt-5">{dev.name}</h2>
        <p className="mt-5 max-w-[42ch] text-asphalt/85">{dev.summary}</p>

        <div className="mt-auto flex flex-wrap gap-3 pt-10">
          <Link href={`/developments/${dev.slug}`} className="btn btn-ghost-dark">
            Learn more
            <span className="sr-only"> about {dev.name}</span>
          </Link>
          <Link href="#enquire" className="btn btn-signal">
            Enquire now
          </Link>
        </div>
      </div>
    </article>
  );
}
