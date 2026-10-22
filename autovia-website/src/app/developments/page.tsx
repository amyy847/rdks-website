import type { Metadata } from "next";
import Link from "next/link";
import DevelopmentCard from "@/components/DevelopmentCard";
import EnquireSection from "@/components/EnquireSection";
import { developments, developmentsPage } from "@/content/site";

export const metadata: Metadata = {
  title: developmentsPage.heading,
  description: developmentsPage.intro,
};

export default function DevelopmentsPage() {
  const { comingSoon } = developmentsPage;

  return (
    <>
      <section className="pb-12 pt-32 md:pb-16 md:pt-44">
        <div className="container-site">
          <p className="mb-5 flex items-center gap-3 type-eyebrow text-moss">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            Current launches
          </p>
          <h1 className="type-h1">{developmentsPage.heading}</h1>
          <p className="type-lead mt-6 max-w-[44ch] text-green/85">{developmentsPage.intro}</p>
        </div>
      </section>

      <section aria-label="All developments" className="pb-20 md:pb-32">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {developments.map((dev) => (
            <DevelopmentCard key={dev.slug} dev={dev} />
          ))}

          {comingSoon && (
            <div className="flex flex-col justify-end rounded-sm border border-laurel p-7 md:min-h-[24rem] md:p-10">
              <p className="type-eyebrow text-moss">Next launch</p>
              <h2 className="type-h3 mt-4">{comingSoon.title}</h2>
              <p className="mt-4 max-w-[38ch] text-green/85">{comingSoon.text}</p>
              <Link href="#enquire" className="btn btn-ghost-dark mt-8 self-start">
                Register your interest
              </Link>
            </div>
          )}
        </div>
      </section>

      <EnquireSection />
    </>
  );
}
