import type { Metadata } from "next";
import Image from "next/image";
import DevelopmentCard from "@/components/DevelopmentCard";
import { RegisterInterestButton } from "@/components/RegisterInterest";
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
            <div className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-sm bg-green p-7 text-cream md:p-10">
              <Image
                src={comingSoon.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="-z-10 object-cover transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green via-green/75 to-green/25" aria-hidden="true" />
              <p className="flex items-center gap-2.5 type-eyebrow text-cream/85">
                <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
                Next launch
              </p>
              <h2 className="type-h2 mt-5">{comingSoon.title}</h2>
              <p className="mt-4 max-w-[38ch] text-cream/85">{comingSoon.text}</p>
              <RegisterInterestButton
                label="Register your interest"
                project="Next development"
                source="next launch card"
                className="btn btn-ghost-light mt-8 self-start"
              />
            </div>
          )}
        </div>
      </section>

      <EnquireSection />
    </>
  );
}
