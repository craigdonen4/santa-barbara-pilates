import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { BookCta } from "@/components/BookCta";

export const metadata: Metadata = {
  title: "Yoga",
  description:
    "Private and small group yoga at Santa Barbara Pilates, in the Funk Zone. Taught by Nuria.",
};

export default function YogaPage() {
  return (
    <article>
      <header className="bg-teal pt-16 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-surface/75">
            Private &amp; Small Group
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-surface md:text-7xl">
            Yoga
          </h1>
        </Container>
      </header>

      <Container className="pt-10 pb-16 lg:pt-12 lg:pb-24">
        <div className="prose-editorial">
          <p>
            Breath, stillness, and strength — taught the way we teach
            everything here. Private sessions and small groups in a quiet
            room in the heart of the Funk Zone, with a practice built around
            you. Whether you&apos;re new to the mat or decades in, the work
            meets you where you are.
          </p>

          <h2>Meet Nuria</h2>

          <figure className="relative float-right mb-4 ml-6 w-56 overflow-hidden md:ml-8 md:w-72">
            <img
              src="/nuria-yoga.jpeg"
              alt="Nuria, yoga instructor at Santa Barbara Pilates"
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

          <p>
            Nuria Reed has taught yoga for more than ten thousand hours, with
            ten pilgrimages to India to study at the source of the teachings.
            What she teaches is the spiritual heart of yoga — moksha,
            liberation.
          </p>
          <p>
            Her asana technique draws on Ashtanga&apos;s fire and
            Iyengar&apos;s precision, and her philosophy is rooted in the
            non-dual teachings of Tantra. Across her career she has worked to
            carry the awakening power of yoga from the cave of the ascetic to
            the hearth of the householder. Her signature meditation and
            pranayama program, Urban Sadhana, is the culmination of that work,
            taught to more than a hundred students.
          </p>
          <p>
            When she isn&apos;t teaching or leading trainings and retreats,
            Nuria coaches people into their embodied power and bold pleasure.
          </p>
        </div>
      </Container>

      <BookCta
        heading="Ready to practice?"
        body="Tell us what you're looking for and we'll reply within one business day with suggested times."
      />
    </article>
  );
}
