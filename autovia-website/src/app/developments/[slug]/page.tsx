import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquireSection from "@/components/EnquireSection";
import Gallery from "@/components/Gallery";
import Odometer from "@/components/Odometer";
import { contact, developments } from "@/content/site";

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
      <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-asphalt text-white">
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
          <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/45 to-asphalt/10" />
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
          <h1 className="type-display">{dev.name}</h1>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 text-[0.95rem] font-medium text-white/85">
                <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
                {dev.status} in {dev.location}
              </p>
              <p className="type-lead mt-4 max-w-[38ch] text-white/85">{dev.summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="#enquire" className="btn btn-signal">
                Enquire now
              </Link>
              <Link href="#visit" className="btn btn-ghost-light">
                Visit the showroom
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
                    suffix={s.suffix}
                    delay={500 + i * 150}
                    className="text-[2.25rem] font-bold [font-stretch:118%] md:text-[3rem]"
                  />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="showroom-heading" className="py-20 md:py-32">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12">
            <h2 id="showroom-heading" className="type-h2 md:col-span-5">
              The showroom
            </h2>
            <div className="space-y-5 md:col-span-6 md:col-start-7">
              {dev.description.map((para, i) => (
                <p key={i} className={i === 0 ? "type-lead" : "text-asphalt/85"}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          <h3 className="type-h3 mt-16 md:mt-24">What we sell</h3>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {dev.sells.map((item) => (
              <li key={item.title} className="rounded-[1.75rem] bg-white p-7 md:p-10">
                <p className="flex items-center gap-2.5 text-sm font-medium text-tarmac">
                  <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
                  {item.label}
                </p>
                <h4 className="type-h3 mt-5">{item.title}</h4>
                <p className="mt-3 max-w-[42ch] text-asphalt/85">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="brands-heading" className="border-y border-concrete bg-white py-20 md:py-28">
        <div className="container-site">
          <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h2 id="brands-heading" className="type-h2">
              Brands on the floor
            </h2>
            <p className="text-tarmac">Compare them side by side, in one visit.</p>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-concrete bg-concrete sm:grid-cols-3 lg:grid-cols-6">
            {dev.brands.map((brand) => (
              <li key={brand} className="grid h-24 place-items-center bg-white px-4 text-center text-lg font-bold [font-stretch:118%] md:h-32">
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="gallery-heading" className="py-20 md:py-32">
        <div className="container-site">
          <h2 id="gallery-heading" className="type-h2 mb-10 md:mb-14">
            Gallery
          </h2>
          <Gallery photos={dev.gallery} />
        </div>
      </section>

      {dev.services.length > 0 && (
        <section aria-labelledby="services-heading" className="pb-20 md:pb-32">
          <div className="container-site">
            <h2 id="services-heading" className="type-h2 max-w-[16ch]">
              More than a showroom
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
              {dev.services.map((service, i) => (
                <li key={service.title} className="border-t border-asphalt pt-6">
                  <p className="text-sm font-medium tabular-nums text-tarmac">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-xl font-bold leading-tight [font-stretch:112%]">{service.title}</h3>
                  <p className="mt-3 text-asphalt/85">{service.text}</p>
                </li>
              ))}
            </ul>
            <Link href="#enquire" className="btn btn-signal mt-12">
              Ask about any of these
            </Link>
          </div>
        </section>
      )}

      <section id="visit" aria-labelledby="visit-heading" className="scroll-mt-20 border-t border-concrete bg-white py-20 md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="visit-heading" className="type-h2">
              Visit {dev.name}
            </h2>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-sm text-tarmac">Address</dt>
                <dd className="mt-1 text-lg font-semibold">{contact.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-tarmac">Opening hours</dt>
                <dd className="mt-1 text-lg">{contact.hours}</dd>
              </div>
              <div>
                <dt className="text-sm text-tarmac">Call or message</dt>
                <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-lg">
                  <a href={contact.phoneHref} className="font-semibold hover:text-tarmac">
                    {contact.phone}
                  </a>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-signal decoration-2 underline-offset-[6px] hover:text-tarmac"
                  >
                    WhatsApp
                  </a>
                </dd>
              </div>
            </dl>
            <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-signal mt-10">
              Get directions
            </a>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-concrete md:col-span-7 md:aspect-auto md:min-h-[26rem]">
            <iframe
              src={contact.mapEmbedUrl}
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
