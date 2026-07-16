import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { RaffleForm } from "@/components/RaffleForm";

export const metadata: Metadata = {
  title: "Grand Opening Raffle",
  description:
    "Take the Grand Tour at the Santa Barbara Pilates grand opening and enter the raffle.",
  robots: { index: false }, // event-day page, keep out of search
};

export default function RafflePage() {
  return (
    <article>
      <header className="bg-teal pt-14 pb-10 lg:pt-16 lg:pb-12">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-surface/75">
            Grand Opening &nbsp;·&nbsp; Saturday, July 18
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-surface md:text-6xl">
            The Grand Tour raffle
          </h1>
        </Container>
      </header>

      <Container className="pt-10 pb-16 lg:pt-12 lg:pb-24">
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed text-text-2 md:text-lg">
            Welcome to the new home of Santa Barbara Pilates and The Base.
            See all five corners of the building, check them off as you go,
            and you&apos;re in the drawing. Winners announced before 2 PM.
          </p>
        </div>

        <div className="mt-10 max-w-2xl">
          <RaffleForm />
        </div>
      </Container>
    </article>
  );
}
