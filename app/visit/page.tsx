import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Plan your visit to Santa Barbara Pilates. Address, parking, and how to book a first session.",
};

export default function VisitPage() {
  return (
    <article>
      {/* Hero — image with gradient fade, title overlaid (matches /method) */}
      <section className="relative overflow-hidden bg-surface-2">
        <div className="absolute inset-0">
          <Image
            src="/visit-studio.jpeg"
            alt="The studio interior — a ladder barrel by the window, with the Funk Zone outside"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_55%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,240,232,0.20) 0%, rgba(245,240,232,0.55) 60%, rgba(245,240,232,0.95) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-[76rem] flex-col justify-end px-6 pb-16 pt-28 lg:px-10 lg:pb-20">
          <p className="eyebrow">The studio</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-teal md:text-7xl">
            Visit us
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-2 md:text-lg">
            We are in the heart of the Funk Zone, sharing our home with
            The Base gym. Enter through The Base at 122 Gray Ave — the staff
            will walk you through the gym to the studio. New clients begin
            with a short tour before their first session.
          </p>
        </div>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Entrance &amp; tours</p>
            <address className="mt-3 font-display text-2xl not-italic leading-snug text-text">
              122 Gray Ave
              <br />
              at The Base
            </address>
            <p className="mt-3 text-sm leading-relaxed text-text-2">
              Want a quick tour? Come to our main entrance at The Base —
              our friendly staff will take you to the studio.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-text-3">
              Studio address: 123 Santa Barbara St, Santa Barbara, CA.
              The street gate stays locked — please enter on Gray Ave.
            </p>
            <p className="mt-4 text-base text-text-2">
              <a href="tel:+18056358337" className="link-quiet">
                (805) 635-8337
              </a>
            </p>
          </div>

          <div className="md:col-span-7 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Parking</p>
              <p className="mt-2 text-base leading-relaxed text-text-2">
                Free parking is available in the lot behind the building.
                Reserved spaces for clients are marked.
              </p>
            </div>
            <div>
              <p className="eyebrow">Hours</p>
              <p className="mt-2 text-base leading-relaxed text-text-2">
                Monday through Saturday, by appointment.
              </p>
            </div>
            <div>
              <p className="eyebrow">Cancellations</p>
              <p className="mt-2 text-base leading-relaxed text-text-2">
                Cancellations made at least twenty-four hours in advance are
                free of charge.
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="eyebrow">A note on the gym</p>
              <p className="mt-2 text-base leading-relaxed text-text-2">
                We share our home with The Base gym and enter through
                their front door at 122 Gray Ave. The studio itself is our
                own — a quiet, private room with our own equipment.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <p className="eyebrow">Find us</p>
          <div className="mt-4 relative aspect-[16/9] w-full overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps?q=122+Gray+Ave,+Santa+Barbara,+CA&output=embed"
              title="Entrance to Santa Barbara Pilates — 122 Gray Ave at The Base"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
          </div>
        </div>

        <hr className="rule my-20" />

        <div id="book" className="grid scroll-mt-24 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
              Ready to book your first session?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-2">
              Tell us a little about your history with Pilates and what
              you&apos;re hoping to work on. We&apos;ll reply within one
              business day with suggested times.
            </p>
          </div>
          <div className="md:col-span-7">
            <LeadForm />
          </div>
        </div>
      </Container>
    </article>
  );
}
