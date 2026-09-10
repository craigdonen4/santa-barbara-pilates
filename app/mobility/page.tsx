import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MobilityLeadForm } from "@/components/MobilityLeadForm";

export const metadata: Metadata = {
  title: "Mobility with Pilates",
  description:
    "A sixty-minute mobility and Pilates hybrid built for members of The Base in Santa Barbara — core and glute work, Reformer lengthening, and stretching finished with massage-gun recovery. Taught in the Pilates studio, just past the gym floor.",
};

const HOUR = [
  {
    eyebrow: "First twenty minutes",
    title: "Core, hips & glutes",
    body:
      "Focused strength work to wake the center of the body — the muscles that carry everything else.",
  },
  {
    eyebrow: "Second twenty minutes",
    title: "The Reformer",
    body:
      "Time on the Reformer to lengthen and align, opening what the day has shortened.",
  },
  {
    eyebrow: "Final twenty minutes",
    title: "Mobility & recovery",
    body:
      "Stretching and guided mobility, finished with massage-gun work so the session settles in.",
  },
];

export default function MobilityPage() {
  return (
    <article>
      <header className="bg-teal pt-16 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-surface/75">
            The Base &times; Santa Barbara Pilates
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-surface md:text-7xl">
            Mobility with Pilates
          </h1>
        </Container>
      </header>

      <Container className="pt-10 pb-16 lg:pt-12 lg:pb-24">
        <div className="prose-editorial">
          <p>
            One hour that gives you back the way you move. Mobility with
            Pilates is a hybrid session built for members of The Base — the
            length, mobility, and recovery work that hard training asks for,
            taught in the Pilates studio just past the gym floor. Sixty
            minutes, three parts, every age and every level welcome.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {HOUR.map((block) => (
            <div key={block.title} className="border border-border bg-surface p-8">
              <p className="eyebrow">{block.eyebrow}</p>
              <h2 className="font-display font-semibold mt-3 text-2xl text-text">
                {block.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-2">
                {block.body}
              </p>
            </div>
          ))}
        </div>

        <figure className="relative mt-12 overflow-hidden">
          <img
            src="/pricing-mirrors.png"
            alt="Reformers and Cadillac in the mirrored Santa Barbara Pilates studio"
            className="h-auto w-full"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0) 68%, rgba(245,240,232,0.92) 100%)",
            }}
          />
        </figure>

        <div className="prose-editorial mt-10">
          <p>
            It is the perfect addition to the training you are already doing
            — lifting keeps its edge when the hips, spine, and shoulders keep
            their range. Sessions are by appointment, in the Pilates studio
            at The Base. Ask at the front desk, call{" "}
            <a href="tel:+18055707489">(805) 570-7489</a>, or book below.
          </p>
        </div>
      </Container>

      <section id="book" className="border-t border-border bg-surface-2 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display font-semibold text-3xl leading-tight text-text md:text-4xl">
              Ready to move better?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-2">
              Leave your details and we will call or email you within one
              business day to set up your first session.
            </p>
            <div className="mt-8">
              <MobilityLeadForm />
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
