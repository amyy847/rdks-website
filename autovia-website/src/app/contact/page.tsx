import type { Metadata } from "next";
import Link from "next/link";
import EnquireSection from "@/components/EnquireSection";
import { company, contact, contactPage, developments } from "@/content/site";

export const metadata: Metadata = {
  title: contactPage.heading,
  description: contactPage.intro,
};

const linkStyle = "underline decoration-signal decoration-2 underline-offset-[6px] hover:text-tarmac";

export default function ContactPage() {
  return (
    <>
      <section className="pb-12 pt-32 md:pb-16 md:pt-44">
        <div className="container-site">
          <p className="mb-5 flex items-center gap-3 text-[0.95rem] font-medium text-tarmac">
            <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
            {company.name} head office
          </p>
          <h1 className="type-h1">{contactPage.heading}</h1>
          <p className="type-lead mt-6 max-w-[44ch] text-asphalt/85">{contactPage.intro}</p>
        </div>
      </section>

      <section aria-label="Contact details" className="pb-20 md:pb-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <dl className="grid content-start gap-8 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
            <div>
              <dt className="text-sm text-tarmac">Phone</dt>
              <dd className="mt-1 text-xl font-semibold">
                <a href={contact.phoneHref} className="hover:text-tarmac">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-tarmac">WhatsApp</dt>
              <dd className="mt-1 text-xl font-semibold">
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  Chat with us
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-tarmac">Email</dt>
              <dd className="mt-1 break-all text-xl font-semibold">
                <a href={`mailto:${contact.email}`} className="hover:text-tarmac">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-tarmac">Working hours</dt>
              <dd className="mt-1 text-lg">{contact.hours}</dd>
            </div>
            <div>
              <dt className="text-sm text-tarmac">Office</dt>
              <dd className="mt-1 text-lg">
                {contact.address}
                <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className={`mt-2 block w-fit font-semibold ${linkStyle}`}>
                  Get directions
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-tarmac">Follow us</dt>
              <dd className="mt-1">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-semibold">
                  {contact.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-tarmac">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-concrete md:col-span-7 md:aspect-auto md:min-h-[30rem]">
            <iframe
              src={contact.mapEmbedUrl}
              title={`Map showing ${company.name}'s head office`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>

        {/* The showrooms have their own address and hours, separate from the office */}
        <div className="container-site mt-16 grid gap-6 md:mt-24">
          {developments.map((dev) => (
            <div key={dev.slug} className="flex flex-col gap-8 rounded-[1.75rem] bg-white p-7 md:flex-row md:items-end md:justify-between md:p-10">
              <div>
                <p className="text-sm font-medium text-tarmac">Looking for the showroom?</p>
                <h2 className="type-h3 mt-4">{dev.name}</h2>
                <p className="mt-4 font-semibold">{dev.showroom.address}</p>
                <p className="mt-1 text-asphalt/85">{dev.showroom.hours}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a href={dev.showroom.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
                  Get directions
                </a>
                <Link href={`/developments/${dev.slug}`} className="btn btn-ghost-dark">
                  About {dev.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EnquireSection />
    </>
  );
}
