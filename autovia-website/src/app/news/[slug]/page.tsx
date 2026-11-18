import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClassic from "@/components/article/ArticleClassic";
import EnquireSection from "@/components/EnquireSection";
import { company, news } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

// One page per item; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
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

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <>
      <ArticleClassic item={item} />
      <EnquireSection />
    </>
  );
}
