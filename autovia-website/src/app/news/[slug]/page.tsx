import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/article/parts";
import { news } from "@/content/site";
import { ARTICLE_LAYOUTS, longDate, newsHref } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };

// While the client chooses an article layout, an item's address shows the three options.
// Once she picks one, this page becomes that layout and /[layout] can go.
export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  return item ? { title: item.title, description: item.excerpt, robots: { index: false } } : {};
}

// Small sketches of each layout: blocks for photos, lines for text
const Line = ({ w = "100%" }: { w?: string }) => <span className="block h-1.5 rounded-sm bg-green/20" style={{ width: w }} />;
const Pic = ({ className = "" }: { className?: string }) => <span className={`block rounded-sm bg-moss/45 ${className}`} />;
const Text = ({ n = 4 }: { n?: number }) => (
  <span className="grid gap-1.5">
    {Array.from({ length: n }, (_, i) => (
      <Line key={i} w={i === n - 1 ? "60%" : "100%"} />
    ))}
  </span>
);

const SKETCH: Record<string, React.ReactNode> = {
  "1": (
    <span className="grid gap-4">
      <span className="grid gap-2">
        <span className="block h-3 w-3/4 rounded-sm bg-green/70" />
        <span className="block h-3 w-1/2 rounded-sm bg-green/70" />
      </span>
      <span className="grid grid-cols-[1fr_2.5fr] gap-4">
        <Text n={3} />
        <Text n={6} />
      </span>
      <span className="grid grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-1.5">
        <Pic className="row-span-2 h-full min-h-14" />
        <Pic className="h-6" />
        <Pic className="h-6" />
        <Pic className="h-6" />
        <Pic className="h-6" />
      </span>
    </span>
  ),
  "2": (
    <span className="grid gap-4">
      <span className="mx-auto grid w-3/4 justify-items-center gap-2">
        <span className="block h-3 w-full rounded-sm bg-green/70" />
        <span className="block h-3 w-2/3 rounded-sm bg-green/70" />
      </span>
      <Pic className="h-20" />
      <span className="grid grid-cols-[0.6fr_2.5fr_0.6fr] gap-3">
        <span className="grid content-start gap-1.5">
          <Line w="80%" />
          <span className="flex gap-1">
            <Pic className="size-2.5" />
            <Pic className="size-2.5" />
            <Pic className="size-2.5" />
          </span>
        </span>
        <span className="grid gap-3">
          <Text n={3} />
          <Pic className="h-12" />
          <Text n={2} />
        </span>
        <Line w="70%" />
      </span>
    </span>
  ),
  "3": (
    <span className="grid gap-4">
      <span className="grid grid-cols-[1fr_1.4fr] items-end gap-3">
        <span className="grid gap-2">
          <span className="block h-3 w-full rounded-sm bg-green/70" />
          <span className="block h-3 w-2/3 rounded-sm bg-green/70" />
        </span>
        <Pic className="h-16" />
      </span>
      <span className="grid grid-cols-[1fr_1.2fr] items-center gap-3">
        <Text n={3} />
        <Pic className="h-10" />
      </span>
      <Pic className="-mx-5 h-12 !rounded-none" />
      <span className="mx-auto block h-2.5 w-1/2 rounded-sm bg-green/50" />
      <span className="grid grid-cols-[0.7fr_0.7fr_1fr] items-start gap-2">
        <Pic className="h-12" />
        <Pic className="mt-3 h-12" />
        <Text n={3} />
      </span>
    </span>
  ),
};

export default async function NewsLayoutChooser({ params }: Props) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <section className="pb-20 pt-32 md:pb-32 md:pt-44">
      <div className="container-site">
        <Breadcrumb item={item} />
        <p className="mb-5 mt-6 flex items-center gap-3 type-eyebrow text-moss">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          {item.kind} · {longDate(item.date)}
        </p>
        <h1 className="type-h2 max-w-[28ch]">{item.title}</h1>
        <p className="type-lead mt-6 max-w-[48ch] text-green/85">Choose a layout for the article page. Each option opens the full article.</p>

        <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {ARTICLE_LAYOUTS.map((l) => (
            <li key={l.id}>
              <Link href={`${newsHref(item)}/${l.id}`} className="group flex h-full flex-col overflow-hidden rounded-sm bg-white">
                <span aria-hidden="true" className="block overflow-hidden border-b border-laurel/50 bg-cream px-5 py-6 transition-colors group-hover:bg-gold/15">
                  {SKETCH[l.id]}
                </span>
                <span className="flex flex-1 flex-col p-7">
                  <span className="type-eyebrow text-moss">Option {l.id}</span>
                  <span className="type-h3 mt-3">{l.name}</span>
                  <span className="mt-3 text-sm leading-relaxed text-green/75">{l.note}</span>
                  <span className="mt-auto flex items-center gap-2 self-start pt-8 font-semibold underline decoration-moss/40 decoration-2 underline-offset-[6px] group-hover:decoration-moss">
                    Open option {l.id}
                    <span aria-hidden="true" className="transition-transform duration-500 ease-out-quint group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
