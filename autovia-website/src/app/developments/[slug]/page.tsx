import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AutoviaMap from "@/components/AutoviaMap";
import EnquireSection from "@/components/EnquireSection";
import Gallery from "@/components/Gallery";
import Odometer from "@/components/Odometer";
import { company, contact, developments } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

// Only the developments listed in site.ts exist; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return developments.map((dev) => ({ slug: dev.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dev = developments.find((d) => d.slug === slug);
  if (!dev) return {};
  return {
    title: dev.name,
    description: dev.summary,
    openGraph: { images: [dev.cover] },
  };
}

export default async function DevelopmentPage({ params }: Props) {
  const { slug } = await params;
  const dev = developments.find((d) => d.slug === slug);
  if (!dev) notFound();

  return (
    <>
      <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-green text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={dev.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ animation: "push-in 8000ms var(--ease-out-quint) both" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green via-green/45 to-green/50" />
        </div>

        <div className="container-site pt-32 md:pt-40">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/developments" className="hover:text-white">
                  Developments
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {dev.name}
              </li>
            </ol>
          </nav>
          <h1>
            {dev.logo ? (
              <>
                <span className="sr-only">{dev.name}</span>
                {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the wordmark crisp at any width */}
                <img src={dev.logo} alt="" className="w-[min(88vw,46rem)]" />
              </>
            ) : (
              <span className="type-display">{dev.name}</span>
            )}
          </h1>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 type-eyebrow text-white/85">
                <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
                {company.byline} · {dev.status} · {dev.location}
              </p>
              <p className="type-h3 mt-5">{dev.tagline}</p>
              <p className="type-lead mt-2 max-w-[38ch] text-white/85">{dev.summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="#enquire" className="btn btn-gold">
                Enquire now
              </Link>
              <Link href="#visit" className="btn btn-ghost-light">
                Location
              </Link>
            </div>
          </div>
        </div>

        <div className="container-site mt-12 md:mt-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/20 py-7 md:grid-cols-4 md:gap-x-10 md:py-9">
            {dev.stats.map((s, i) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm text-white/70">{s.label}</dt>
                <dd>
                  <Odometer
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    delay={500 + i * 150}
                    className="text-[2.25rem] font-semibold md:text-[3rem]"
                  />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="py-20 md:py-32">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12">
            <h2 id="about-heading" className="type-h2 md:col-span-5">
              About {dev.name}
            </h2>
            <div className="space-y-5 md:col-span-6 md:col-start-7">
              {dev.description.map((para, i) => (
                <p key={i} className={i === 0 ? "type-lead" : "text-green/85"}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          <h3 className="type-h3 mt-16 md:mt-24">What&apos;s inside</h3>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dev.spaces.map((space) => (
              <li key={space.title} className="rounded-sm bg-white p-7">
                <span className="block size-2 rounded-full bg-gold" aria-hidden="true" />
                <h4 className="type-h3 mt-5">{space.title}</h4>
                <p className="mt-3 text-green/85">{space.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {dev.masterplan && (
        <section aria-labelledby="masterplan-heading" className="bg-green py-20 text-cream md:py-28">
          <div className="container-site">
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <h2 id="masterplan-heading" className="type-h2 md:col-span-5">
                Master plan
              </h2>
              <p className="type-lead text-cream/85 md:col-span-6 md:col-start-7">{dev.masterplan.text}</p>
            </div>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[2/1] md:mt-14 md:aspect-[42/10]">
              <Image src={dev.masterplan.image} alt={dev.masterplan.alt} fill sizes="100vw" className="object-cover" />
            </div>
          </div>
        </section>
      )}

      {dev.brands.length > 0 && (
        <section aria-labelledby="brands-heading" className="border-b border-laurel bg-white py-20 md:py-28">
          <div className="container-site">
            <h2 id="brands-heading" className="type-h2 mb-10 md:mb-14">
              Brands at {dev.name}
            </h2>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-laurel bg-laurel sm:grid-cols-3 lg:grid-cols-6">
              {dev.brands.map((brand) => (
                <li key={brand} className="grid h-24 place-items-center bg-white px-4 text-center text-sm font-semibold uppercase tracking-[0.14em] md:h-32">
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="gallery-heading" className="py-20 md:py-32">
        <div className="container-site">
          <h2 id="gallery-heading" className="type-h2 mb-10 md:mb-14">
            Gallery
          </h2>
          <Gallery photos={dev.gallery} />
        </div>
      </section>

      {dev.features.length > 0 && (
        <section aria-labelledby="features-heading" className="pb-20 md:pb-32">
          <div className="container-site">
            <h2 id="features-heading" className="type-h2 max-w-[16ch]">
              Why {dev.name}
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
              {dev.features.map((feature, i) => (
                <li key={feature.title} className="border-t border-green pt-6">
                  <p className="type-eyebrow tabular-nums text-moss">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="type-h3 mt-4">{feature.title}</h3>
                  <p className="mt-3 text-green/85">{feature.text}</p>
                </li>
              ))}
            </ul>
            <Link href="#enquire" className="btn btn-gold mt-12">
              Ask about space at {dev.name}
            </Link>
          </div>
        </section>
      )}

      {dev.slug === "autovia" && (
        <section aria-labelledby="map-heading" className="pb-20 md:pb-32">
          <div className="container-site">
            <h2 id="map-heading" className="type-h2 mb-10 md:mb-14">
              Location map
            </h2>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[3/2] lg:aspect-[15/8]">
              <AutoviaMap />
            </div>
            {dev.distances && dev.distances.length > 0 && (
              <ul className="relative z-10 mx-4 -mt-9 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl bg-white px-6 py-6 shadow-[0_20px_50px_-25px_rgb(10_59_37/0.5)] sm:mx-10 md:flex md:justify-around md:rounded-full md:px-12">
                {dev.distances.map((d) => (
                  <li key={d.place} className="text-center md:whitespace-nowrap md:text-left">
                    <span className="block font-semibold md:inline">{d.time}</span>
                    <span className="hidden text-green/70 md:inline"> · </span>
                    <span className="block text-sm text-green/70 md:inline md:text-base">{d.place}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section id="visit" aria-labelledby="visit-heading" className="scroll-mt-20 border-t border-laurel py-20 md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="visit-heading" className="type-h2">
              Location
            </h2>
            <p className="mt-6 max-w-[48ch] text-green/85">{dev.site.note}</p>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-sm text-moss">Address</dt>
                <dd className="mt-1 text-lg font-semibold">{dev.site.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-moss">Visiting hours</dt>
                <dd className="mt-1 text-lg">{dev.site.hours}</dd>
              </div>
              <div>
                <dt className="text-sm text-moss">Call or message</dt>
                <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-lg">
                  <a href={contact.phoneHref} className="font-semibold hover:text-moss">
                    {contact.phone}
                  </a>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-moss decoration-2 underline-offset-[6px] hover:text-moss"
                  >
                    WhatsApp
                  </a>
                </dd>
              </div>
            </dl>
            <a href={dev.site.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-10">
              Get directions
            </a>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-laurel md:col-span-7 md:aspect-auto md:min-h-[26rem]">
            <iframe
              src={dev.site.mapEmbedUrl}
              title={`Map showing ${dev.name}'s location`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>
      </section>

      <EnquireSection project={dev.name} />
    </>
  );
}
