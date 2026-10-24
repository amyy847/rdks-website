import Link from "next/link";
import Logo from "./Logo";
import { company, contact, nav } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-green text-white">
      <div className="container-site pb-10 pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="w-48 text-cream md:w-60" />
            <p className="type-eyebrow mt-8 max-w-[32ch] text-white/70">{company.tagline}</p>
          </div>

          <div className="md:col-span-2">
            <h2 className="type-eyebrow text-white/55">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="type-eyebrow text-white/55">Head office</h2>
            <address className="mt-4 space-y-2.5 not-italic">
              <p>{contact.address}</p>
              <p className="text-white/70">{contact.hours}</p>
              {contact.mapUrl && (
                <p>
                  <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-gold">
                    Get directions
                  </a>
                </p>
              )}
            </address>
          </div>

          <div className="md:col-span-2">
            <h2 className="type-eyebrow text-white/55">Talk to us</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${contact.email}`} className="break-all hover:text-gold">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-white/15 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
