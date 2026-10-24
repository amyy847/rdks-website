import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import LaunchCard from "@/components/LaunchCard";
import EnquireSection from "@/components/EnquireSection";
import { aboutPage, company, developments } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="launches-heading" className="py-20 md:py-32">
        <div className="container-site">
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 id="launches-heading" className="type-h2">
              Current launches
            </h2>
            <Link href="/developments" className="shrink-0 font-semibold underline decoration-moss decoration-2 underline-offset-[6px] hover:text-moss">
              All developments
            </Link>
          </div>
          <div className="grid gap-6">
            {developments.map((dev) => (
              <LaunchCard key={dev.slug} dev={dev} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="pb-20 md:pb-32">
        <div className="container-site grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 id="about-heading" className="type-h2">
              About {company.name}
            </h2>
            <div className="mt-6 max-w-[44ch] space-y-4 text-green/85">
              {company.about.map((para, i) => (
                <p key={i} className={i === 0 ? "type-lead text-green" : undefined}>
                  {para}
                </p>
              ))}
            </div>
            <Link href="/about" className="btn btn-ghost-dark mt-10">
              Read our story
            </Link>
          </div>
          <div className="relative aspect-[6/7] overflow-hidden rounded-sm md:col-span-5 md:col-start-8">
            <Image src={aboutPage.images.intro.image} alt={aboutPage.images.intro.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <EnquireSection />
    </>
  );
}
