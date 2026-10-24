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
  const { stats, images } = aboutPage;

  return (
    <>
      <section className="pb-20 pt-32 md:pb-32 md:pt-44">
        <div className="container-site grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="mb-5 flex items-center gap-3 type-eyebrow text-moss">
              <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
              About us
            </p>
            <h1 className="type-h1 max-w-[16ch]">{company.tagline}</h1>
            <p className="type-lead mt-8 max-w-[40ch]">{company.intro}</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm md:col-span-5 md:col-start-8">
            <Image src={images.building.image} alt={images.building.alt} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="pb-20 md:pb-32">
        <div className="container-site grid items-center gap-12 md:grid-cols-12">
          <div className="relative aspect-[5/3] overflow-hidden rounded-sm md:col-span-6">
            <Image src={images.masterplan.image} alt={images.masterplan.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <h2 id="story-heading" className="type-h2">
              Who we are
            </h2>
            <div className="mt-6 space-y-5 text-green/85">
              {aboutPage.story.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {stats.length > 0 && (
          <div className="container-site mt-16 md:mt-24">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-laurel pt-8 md:grid-cols-4 md:gap-x-10 md:pt-10">
              {stats.map((s, i) => (
                <div key={s.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-2 text-sm text-moss">{s.label}</dt>
                  <dd>
                    <Odometer value={s.value} prefix={s.prefix} suffix={s.suffix} delay={i * 150} className="text-[2.25rem] font-semibold md:text-[3rem]" />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      <section aria-label="Vision and mission" className="bg-green py-20 text-cream md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-2 md:gap-20">
          {[
            { label: "Our vision", text: aboutPage.vision },
            { label: "Our mission", text: aboutPage.mission },
          ].map((item) => (
            <div key={item.label}>
              <h2 className="flex items-center gap-2.5 type-eyebrow text-gold">
                <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
                {item.label}
              </h2>
              <p className="type-lead mt-6 max-w-[42ch] text-cream/90">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="values-heading" className="py-20 md:py-32">
        <div className="container-site">
          <h2 id="values-heading" className="type-h2">
            What we stand for
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {aboutPage.values.map((value, i) => (
              <li key={value} className="border-t border-green pt-5">
                <p className="type-eyebrow tabular-nums text-moss">{String(i + 1).padStart(2, "0")}</p>
                <p className="type-h3 mt-3">{value}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="our-developments-heading" className="pb-20 md:pb-32">
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
