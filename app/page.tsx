import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { Section, Eyebrow } from "@/components/Section";

const METHOD_POINTS = [
  {
    title: "Full apparatus",
    body:
      "Reformers, Cadillacs, the Wunda Chair, ladder barrels. The whole language of Pilates, available in every session.",
  },
  {
    title: "Small groups",
    body:
      "Privates, duets, trios, and small groups. Every format is kept small enough that your instructor can see all of you, all of the time.",
  },
  {
    title: "Trained across schools",
    body:
      "Our instructors hold certifications from BASI, Stott, Balanced Body, and Peak. Sara personally vets every teacher.",
  },
  {
    title: "Contemporary, calm",
    body:
      "We teach the contemporary method without spectacle. Breath, alignment, control. Repetition that earns its quiet.",
  },
];

const OFFERINGS = [
  {
    title: "Private sessions",
    body:
      "One-on-one Pilates instruction on the Reformer and full apparatus, tailored to your body. The right place to begin.",
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

const FOUNDERS_LIST = [
  "Begin with a private. One hour, one instructor, full studio.",
  "Wear something simple. Grip socks if you have them.",
  "Arrive ten minutes early on your first visit. We will walk you through the space.",
  "Sessions can be paused, rescheduled, or transferred without penalty.",
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
                Reformer Pilates in the heart of Santa Barbara.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-2">
                Santa Barbara Pilates is a private Pilates studio in the Funk
                Zone, a few blocks from the beach and downtown Santa Barbara.
                We teach contemporary Pilates on the full apparatus — Reformer,
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

      {/* Method snapshot */}
      <Section surface="bg">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>The Method</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                Pilates, kept close to the source.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-2">
                We teach a careful, contemporary practice. No choreography to
                memorise — just the apparatus, your breath, and an instructor
                watching closely.
              </p>
              <Link
                href="/method"
                className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-text link-quiet"
              >
                Read the method
                <span aria-hidden>→</span>
              </Link>
            </div>

            <ul className="md:col-span-7 grid gap-px bg-border md:grid-cols-2">
              {METHOD_POINTS.map((p) => (
                <li
                  key={p.title}
                  className="bg-bg p-8"
                >
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

      {/* Sara intro */}
      <Section surface="surface">
        <Container>
          <div className="grid items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/sara-closeup.png"
                  alt="Sara, founder of Santa Barbara Pilates"
                  width={1108}
                  height={1823}
                  sizes="(min-width: 768px) 22rem, 80vw"
                  className="absolute bottom-0 left-1/2 h-[85%] w-auto -translate-x-1/2"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(253,250,245,0) 0%, rgba(253,250,245,0) 65%, rgba(253,250,245,0.95) 100%)",
                  }}
                />
              </div>
            </div>

            <div className="md:col-span-7">
              <Eyebrow>Founder</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                Sara opened the studio in 2026.
              </h2>
              <div className="prose-editorial mt-6">
                <p>
                  She has taught Pilates in Santa Barbara for sixteen years.
                  The studio is her own — small, quiet, and arranged the way
                  she wants to teach.
                </p>
                <p>
                  Sara is BASI-certified and continues to study with senior
                  teachers each year. She teaches privates herself, and
                  personally trains every instructor who joins the studio.
                </p>
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

      {/* Founders' list */}
      <Section surface="bg">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>If you are new</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                A short list for first visits.
              </h2>
            </div>
            <ol className="md:col-span-8 space-y-6">
              {FOUNDERS_LIST.map((line, i) => (
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

      {/* Visit teaser */}
      <Section surface="sage-light" className="py-24">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>Visit</Eyebrow>
              <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
                Adjacent to The Base Gym.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-2">
                We are a separate studio, accessed through our own entrance.
                Quiet, private, and easy to find. Parking is free for clients.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/visit" className="btn btn-primary">
                  Plan your visit
                </Link>
                <Link href="/pricing" className="btn btn-outline">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/IMG_6517.jpeg"
                alt="Inside the studio — reformers, Cadillacs, and a ladder barrel"
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
