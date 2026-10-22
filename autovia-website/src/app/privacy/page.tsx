import type { Metadata } from "next";
import { privacyPage } from "@/content/site";

export const metadata: Metadata = {
  title: privacyPage.heading,
  description: privacyPage.intro,
};

export default function PrivacyPage() {
  return (
    <>
      <section className="pb-12 pt-32 md:pb-16 md:pt-44">
        <div className="container-site">
          <p className="mb-5 flex items-center gap-3 type-eyebrow text-moss">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            Last updated {privacyPage.updated}
          </p>
          <h1 className="type-h1">{privacyPage.heading}</h1>
          <p className="type-lead mt-6 max-w-[48ch] text-green/85">{privacyPage.intro}</p>
        </div>
      </section>

      <section aria-label="Policy" className="pb-20 md:pb-32">
        <div className="container-site">
          <div className="max-w-[68ch] border-t border-laurel">
            {privacyPage.sections.map((section) => (
              <div key={section.heading} className="border-b border-laurel py-8 md:py-10">
                <h2 className="type-h3">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-green/85">
                  {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                  {section.list && (
                    <ul className="list-disc space-y-1.5 pl-5 marker:text-gold">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.after?.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
