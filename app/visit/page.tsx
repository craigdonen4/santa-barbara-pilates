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
            src="/IMG_0547.jpeg"
            alt="A session in progress at Santa Barbara Pilates"
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
            We are in the heart of the Funk Zone, adjacent to The Base Gym,
            with a separate entrance and our own quiet room. New clients
            begin with a short studio tour before their first session.
          </p>
        </div>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Address</p>
            <address className="mt-3 font-display text-2xl not-italic leading-snug text-text">
              The Funk Zone
              <br />
              Adjacent to The Base Gym
              <br />
              Santa Barbara, California
            </address>
            <p className="mt-3 text-sm italic text-text-3">
              Exact street address provided at the time of booking.
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
            <div className="sm:col-span-2">
              <p className="eyebrow">A note on the gym</p>
              <p className="mt-2 text-base leading-relaxed text-text-2">
                We share a building with The Base Gym but operate
                independently. Our entrance, room, and apparatus are our own.
              </p>
            </div>
          </div>
        </div>

        <hr className="rule my-20" />

        <div id="book" className="grid scroll-mt-24 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Book a first session</p>
            <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
              Write to us.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-2">
              Tell us a little about your history with Pilates and what you
              are hoping to work on. We will reply within a business day with
              suggested times and an exact address.
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
