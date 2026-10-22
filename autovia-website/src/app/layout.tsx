import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import RegisterInterestDialog from "@/components/RegisterInterest";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: {
    default: `${company.fullName} | ${company.tagline}`,
    template: `%s | ${company.fullName}`,
  },
  description: company.intro,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (QuillBot, Grammarly…) add attributes to
    // <html> and <body> before React loads. It only silences these two tags, not the page.
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <RegisterInterestDialog />
        <PageTransition />
      </body>
    </html>
  );
}
