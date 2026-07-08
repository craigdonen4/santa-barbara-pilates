import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PartnerForm } from "@/components/PartnerForm";

export const metadata: Metadata = {
  title: "Try a Session Together",
  description:
    "Invite a friend to try a duet, trio, or small group Pilates session at Santa Barbara Pilates. One session, no commitment.",
};

export default function PartnerPage() {
  return (
    <article>
      <header className="bg-teal pt-16 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-surface/75">
            Bring a Friend
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-surface md:text-7xl">
            Try a session together
          </h1>
        </Container>
      </header>

      <Container className="pt-10 pb-16 lg:pt-12 lg:pb-24">
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed text-text-2 md:text-lg">
            Pilates is better with company. Create an invite link, send it to
            a friend, and we&apos;ll set up a session for you both — one
            session, no membership, no commitment. Cover their spot as a
            treat, or each pay your own. When they accept, we&apos;ll reach
            out to find a time that works for both of you.
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <PartnerForm />
        </div>
      </Container>
    </article>
  );
}
