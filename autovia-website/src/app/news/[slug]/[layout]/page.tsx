import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCentred from "@/components/article/ArticleCentred";
import ArticleClassic from "@/components/article/ArticleClassic";
import ArticleEditorial from "@/components/article/ArticleEditorial";
import { LayoutSwitch } from "@/components/article/parts";
import EnquireSection from "@/components/EnquireSection";
import { company, news } from "@/content/site";
import { ARTICLE_LAYOUTS, type ArticleLayoutId } from "@/lib/news";

type Props = { params: Promise<{ slug: string; layout: string }> };

// One page per item per layout option; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return news.flatMap((item) => ARTICLE_LAYOUTS.map((l) => ({ slug: item.slug, layout: l.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: `${item.title} | ${company.fullName}`,
      description: item.excerpt,
      images: [{ url: item.cover.image, alt: item.cover.alt }],
    },
  };
}

const LAYOUTS: Record<ArticleLayoutId, typeof ArticleClassic> = { "1": ArticleClassic, "2": ArticleCentred, "3": ArticleEditorial };

export default async function NewsLayoutPage({ params }: Props) {
  const { slug, layout } = await params;
  const item = news.find((n) => n.slug === slug);
  const Layout = LAYOUTS[layout as ArticleLayoutId];
  if (!item || !Layout) notFound();

  return (
    <>
      <LayoutSwitch item={item} current={layout as ArticleLayoutId} />
      <Layout item={item} />
      <EnquireSection />
    </>
  );
}
