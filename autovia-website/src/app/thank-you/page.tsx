import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Greeting from "./Greeting";
import { contact, developments, thankYouPage } from "@/content/site";

export const metadata: Metadata = {
  title: thankYouPage.heading,
  robots: { index: false }, // only reached after sending an enquiry
};

export default function ThankYouPage() {
  const autovia = developments[0];

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-green pb-16 pt-32 text-white md:pb-24">
      <div className="absolute inset-0 -z-10">
        <Image src={autovia.cover} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green via-green/75 to-green/50" />
      </div>

      <div className="container-site">
        <p className="mb-5 flex items-center gap-3 type-eyebrow text-white/85">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          Enquiry received
        </p>
        <h1 className="type-h1 max-w-[18ch]">
          <Greeting heading={thankYouPage.heading} />
        </h1>
        <p className="type-lead mt-6 max-w-[44ch] text-white/85">{thankYouPage.text}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/developments/${autovia.slug}`} className="btn btn-gold">
            Explore {autovia.name}
          </Link>
          <Link href="/" className="btn btn-ghost-light">
            Back to home
          </Link>
        </div>

        <p className="mt-12 border-t border-white/20 pt-6 text-white/75">
          {thankYouPage.whatsappText}{" "}
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline decoration-gold decoration-2 underline-offset-[6px] hover:text-gold"
          >
            Open WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
