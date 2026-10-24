import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="container-site flex flex-col items-center text-center">
        <p className="mb-5 flex items-center gap-3 type-eyebrow text-moss">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          Error 404
        </p>
        <h1 className="type-h1">Page not found</h1>
        <p className="type-lead mt-6 max-w-[40ch] text-green/85">
          The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on the road.
        </p>
        <Link href="/" className="btn btn-gold mt-10">
          Back to home
        </Link>
      </div>
    </section>
  );
}
