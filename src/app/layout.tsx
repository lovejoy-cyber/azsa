import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/lib/auth";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FlagStripe } from "@/components/layout/flag-stripe";
import { BackToTop } from "@/components/layout/back-to-top";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: {
    default: "AZSA — Zimbabwean Students in Algeria",
    template: "%s · AZSA",
  },
  description:
    "AZSA is the community platform for Zimbabwean students living and studying in Algeria — news, events, resources, and a place to find each other.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="flex min-h-full flex-col bg-black text-white selection:bg-gold-500 selection:text-black">
        <Providers session={session}>
          <SmoothScroll />
          <FlagStripe />
          <Navbar />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
