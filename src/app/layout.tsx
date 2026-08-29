import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/lib/auth";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FlagStripe } from "@/components/layout/flag-stripe";

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
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <Providers session={session}>
          <FlagStripe />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
