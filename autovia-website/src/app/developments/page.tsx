import type { Metadata } from "next";
import DevelopmentCard from "@/components/DevelopmentCard";
import LaunchCard from "@/components/LaunchCard";
import LandPortfolio from "@/components/LandPortfolio";
import EnquireSection from "@/components/EnquireSection";
import { developments, developmentsPage, landPortfolio } from "@/content/site";

export const metadata: Metadata = {
  title: developmentsPage.heading,
  description: developmentsPage.intro,
};

export default function DevelopmentsPage() {
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

      <section aria-label="Current launches" className="pb-20 md:pb-32">
        {/* One launch gets the wide card; with more, a two-column grid */}
        {developments.length === 1 ? (
          <div className="container-site">
            <LaunchCard dev={developments[0]} />
          </div>
        ) : (
          <div className="container-site grid gap-6 md:grid-cols-2">
            {developments.map((dev) => (
              <DevelopmentCard key={dev.slug} dev={dev} />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="land-heading" className="pb-20 md:pb-32">
        <div className="container-site">
          <p className="mb-5 flex items-center gap-3 type-eyebrow text-moss">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            Upcoming
          </p>
          <h2 id="land-heading" className="type-h2 mb-10 md:mb-14">
            {landPortfolio.heading}
          </h2>
          <LandPortfolio />
        </div>
      </section>

      <EnquireSection />
    </>
  );
}
