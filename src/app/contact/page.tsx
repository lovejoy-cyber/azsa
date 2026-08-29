import { Container } from "@/components/ui/container";
import { Mail, MessageSquareText } from "lucide-react";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div>
      <div className="bg-ink-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Contact</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Get in touch</h1>
        </Container>
      </div>
      <Container className="max-w-xl py-14">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
            <Mail className="mt-0.5 h-5 w-5 text-gold-600" />
            <div>
              <p className="font-semibold text-ink">Embassy student affairs</p>
              <p className="text-sm text-ink-soft">
                For visas, documents, and official matters -- use the announcements page for
                the latest instructions, or reach the office through your registered contact
                channel.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
            <MessageSquareText className="mt-0.5 h-5 w-5 text-gold-600" />
            <div>
              <p className="font-semibold text-ink">Platform feedback</p>
              <p className="text-sm text-ink-soft">
                Spotted something broken, or have an idea for AZSA? Post it in the community
                feed under the "general" topic -- the moderation team keeps an eye on it.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
