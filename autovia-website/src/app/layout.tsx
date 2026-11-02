import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import RegisterInterestDialog from "@/components/RegisterInterest";
import { company } from "@/content/site";

// Absolute links for link previews: SITE_URL if set (e.g. https://rdkeg.com), else Vercel's production address
const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

// Link previews (WhatsApp, Instagram, Facebook, X) use src/app/opengraph-image.jpg, and the development's own image on its page
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.fullName} | ${company.tagline}`,
    template: `%s | ${company.fullName}`,
  },
  description: company.intro,
  openGraph: {
    siteName: company.fullName,
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (QuillBot, Grammarly…) add attributes to
    // <html> and <body> before React loads. It only silences these two tags, not the page.
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RegisterInterestDialog />
        <PageTransition />
      </body>
    </html>
  );
}
