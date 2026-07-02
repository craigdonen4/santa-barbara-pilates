import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { Section, Eyebrow } from "@/components/Section";
import { Testimonials } from "@/components/Testimonials";

const WHAT_TO_EXPECT = [
  {
    title: "The equipment",
    body:
      "A full setup — Reformer, Cadillac, Wunda Chair, ladder barrel, and more. Equipment is chosen for each student.",
  },
  {
    title: "The format",
    body:
      "Privates, duets, trios, and small groups. Every session stays small enough that nothing goes unnoticed.",
  },
  {
    title: "The training",
    body:
      "Certifications from BASI, Stott, Balanced Body, and Peak — and a personal vetting process for all of our teaching staff.",
  },
  {
    title: "The method",
    body:
      "Contemporary Pilates, which is really just a way of saying the work isn't fixed. No set choreography, no identical sessions. Breath, alignment, and intention, applied differently every time.",
  },
];

const OFFERINGS = [
  {
    title: "Private sessions",
    body:
      "One-on-one Pilates instruction on the Reformer and full equipment, tailored to your body. The right place to begin.",
  },
  {
    title: "Duets",
    body:
      "Reformer Pilates for two, with one instructor. Ideal for partners and friends who want to train together.",
  },
  {
    title: "Trios & small groups",
    body:
      "Small group Pilates classes kept intimate, so your instructor sees every movement of every session.",
  },
  {
    title: "New to Pilates",
    body:
      "First visits begin with a private session and a short studio tour. No experience needed — only curiosity.",
  },
];

const FIRST_VISIT = [
  "Start with a private session. One hour, one instructor, the full space to yourself.",
  "Wear comfortable, fitted clothing. Grip socks are helpful — if you need some, we usually have a few pairs on hand.",
  "Plan to arrive ten minutes early. We'll show you around and talk through what you're hoping to get from the work.",
  "We understand things come up. You can always put your sessions on hold, move them to another day, or pass them to a friend at no extra cost.",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Our Offering — reformer Pilates in Santa Barbara */}
      <Section surface="surface">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>Our Offering</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                Pilates in the heart of Santa Barbara.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-2">
                Santa Barbara Pilates is a private Pilates studio in the Funk
                Zone, a few blocks from the beach and downtown Santa Barbara.
                We teach contemporary Pilates on the full equipment — Reformer,
                Cadillac, Wunda Chair, and ladder barrel — in private sessions,
                duets, trios, and small group classes.
              </p>
              <Link
                href="/pricing"
                className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-text link-quiet"
              >
                Sessions and pricing
                <span aria-hidden>→</span>
              </Link>
            </div>

            <ul className="md:col-span-7 grid gap-px bg-border md:grid-cols-2">
              {OFFERINGS.map((o) => (
                <li key={o.title} className="bg-surface p-8">
                  <p className="font-display text-2xl leading-snug text-text">
                    {o.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-2">
                    {o.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Our Approach */}
      <Section surface="bg">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>Our Approach</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                Precise. Personal. Never the same twice.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-2">
                No large classes, no repeated sequences — just intentional
                movement, evolving with you.
              </p>
              <Link
                href="/method"
                className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-text link-quiet"
              >
                Read more
                <span aria-hidden>→</span>
              </Link>
            </div>

            <ul className="md:col-span-7 grid gap-px bg-border md:grid-cols-2">
              {WHAT_TO_EXPECT.map((p) => (
                <li key={p.title} className="bg-bg p-8">
                  <p className="font-display text-2xl leading-snug text-text">
                    {p.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-2">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Client testimonials — real Google reviews */}
      <Testimonials />

      {/* Meet our founder */}
      <Section surface="surface">
        <Container>
          <div className="grid items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/the-method-2.png"
                  alt="Sara Donen teaching at Santa Barbara Pilates"
                  fill
                  sizes="(min-width: 768px) 32rem, 100vw"
                  className="object-cover object-[78%_30%]"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(253,250,245,0) 0%, rgba(253,250,245,0) 70%, rgba(253,250,245,0.9) 100%)",
                  }}
                />
              </div>
            </div>

            <div className="md:col-span-7">
              <Eyebrow>Meet Our Founder</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                Sara Donen
              </h2>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-text-3">
                Founder &amp; Lead Instructor
              </p>
              <div className="prose-editorial mt-6">
                <p>
                  Sara has been teaching Pilates in Santa Barbara for sixteen
                  years. Originally from Texas, she came to California after
                  high school and never left. Which feels right, given how much
                  of her work is about finding where you belong in your own
                  body.
                </p>
                <p>
                  As a dancer and yogi, Sara has spent her life moving, and has
                  a genuine curiosity about what the mind-body connection
                  actually means in practice, not just in theory. That
                  background shows up in how she teaches. Sessions aren&apos;t
                  just physical. They&apos;re attentive to you as a whole
                  person.
                </p>
                <p>
                  She lives in Santa Barbara with her husband and daughter. She
                  understands what it means to need a place to slow down and
                  reconnect with yourself.
                </p>
                <p>Santa Barbara Pilates is that place.</p>
              </div>
              <Link
                href="/sara"
                className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-text link-quiet"
              >
                More about Sara
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Your first visit */}
      <Section surface="bg">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Your First Visit</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                A few things to know before you arrive.
              </h2>
            </div>
            <ol className="md:col-span-8 space-y-6">
              {FIRST_VISIT.map((line, i) => (
                <li key={i} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-display text-2xl text-accent-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-text-2 pt-1">
                    {line}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Visit */}
      <Section surface="sage-light" className="py-24">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>Visit</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                Find us in the Funk Zone
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-2">
                Adjacent to The Base Gym, with our own separate entrance —
                quiet, private, and easy to find. Free parking for clients.
              </p>
              <address className="mt-4 text-base not-italic text-text">
                123 Santa Barbara St, Santa Barbara, CA
              </address>
              <p className="mt-8 font-display text-2xl text-text">
                Ready to begin?
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/visit#book" className="btn btn-primary">
                  Book your first session
                </Link>
                <Link href="/visit" className="btn btn-outline">
                  Plan your visit
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/IMG_6517.jpeg"
                alt="Inside the studio — Reformers, Cadillacs, and a ladder barrel"
                fill
                sizes="(min-width: 768px) 36rem, 100vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(232,237,229,0) 0%, rgba(232,237,229,0) 55%, rgba(232,237,229,0.95) 100%)",
                }}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
