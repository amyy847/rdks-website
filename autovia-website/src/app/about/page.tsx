import type { Metadata } from "next";
import Image from "next/image";
import LaunchCard from "@/components/LaunchCard";
import Odometer from "@/components/Odometer";
import { aboutPage, company, developments } from "@/content/site";

export const metadata: Metadata = {
  title: "About us",
  description: company.intro,
};

export default function AboutPage() {
  const { founder, stats } = aboutPage;

  return (
    <>
      <section className="pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="container-site">
          <p className="mb-5 flex items-center gap-3 text-[0.95rem] font-medium text-tarmac">
            <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
            About us
          </p>
          <h1 className="type-h1 max-w-[14ch]">{company.tagline}</h1>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="pb-20 md:pb-32">
        <div className="container-site grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 id="story-heading" className="type-h2">
              Our story
            </h2>
            <p className="type-lead mt-6 max-w-[40ch]">{company.intro}</p>
            <div className="mt-5 max-w-[52ch] space-y-5 text-asphalt/85">
              {aboutPage.story.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[6/7] overflow-hidden rounded-[1.75rem] md:col-span-5 md:col-start-8">
            <Image src="/images/about-intro.jpg" alt={`The ${company.name} team`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>

        {stats.length > 0 && (
          <div className="container-site mt-16 md:mt-24">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-concrete pt-8 md:grid-cols-4 md:gap-x-10 md:pt-10">
              {stats.map((s, i) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-sm text-tarmac">{s.label}</dt>
                  <dd>
                    <Odometer value={s.value} suffix={s.suffix} delay={i * 150} className="text-[2.25rem] font-bold [font-stretch:118%] md:text-[3rem]" />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      <section aria-label="Vision and mission" className="border-y border-concrete bg-white py-20 md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-2 md:gap-16">
          {[
            { label: "Our vision", text: aboutPage.vision },
            { label: "Our mission", text: aboutPage.mission },
          ].map((item) => (
            <div key={item.label}>
              <h2 className="flex items-center gap-2.5 text-sm font-medium text-tarmac">
                <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
                {item.label}
              </h2>
              <p className="type-h3 mt-5 max-w-[24ch]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {founder && (
        <section aria-label={`A message from ${founder.name}`} className="py-20 md:py-32">
          <div className="container-site grid items-center gap-12 md:grid-cols-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] md:col-span-4">
              <Image src={founder.image} alt={founder.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
            <figure className="md:col-span-7 md:col-start-6">
              <blockquote className="type-h2 max-w-[20ch]">
                <p>&ldquo;{founder.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-8">
                <span className="block font-semibold">{founder.name}</span>
                <span className="text-tarmac">{founder.role}</span>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section aria-labelledby="our-developments-heading" className={`pb-20 md:pb-32 ${founder ? "" : "pt-20 md:pt-32"}`}>
        <div className="container-site">
          <h2 id="our-developments-heading" className="type-h2 mb-10 md:mb-14">
            Our developments
          </h2>
          <div className="grid gap-6">
            {developments.map((dev) => (
              <LaunchCard key={dev.slug} dev={dev} enquireHref={`/developments/${dev.slug}#enquire`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
