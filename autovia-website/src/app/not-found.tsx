import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { developments } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  const autovia = developments[0];

  return (
    <section className="pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="container-site grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="mb-5 flex items-center gap-3 type-eyebrow text-moss">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            Error 404
          </p>
          <h1 className="type-h1">Page not found</h1>
          <p className="type-lead mt-6 max-w-[40ch] text-green/85">
            The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on the road.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-gold">
              Back to home
            </Link>
            <Link href={`/developments/${autovia.slug}`} className="btn btn-ghost-dark">
              Explore {autovia.name}
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-5 md:col-start-8">
          <Image src={autovia.cover} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-green/20" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
