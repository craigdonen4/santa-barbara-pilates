import { Container } from "@/components/Container";
import { Section, Eyebrow } from "@/components/Section";

/**
 * Homepage testimonials band. Quotes are real Google reviews —
 * lightly trimmed for length, punctuation normalized.
 */
const QUOTES = [
  {
    quote:
      "I had the most amazing class with Sara. She is an incredible instructor and was really patient with me as a new student. I'm so excited to continue training with her.",
    name: "Brad F.",
  },
  {
    quote:
      "Sara really pays attention to the little details, and it makes every session feel personal and enjoyable. She's everything you look for in an instructor.",
    name: "Arthur W.",
  },
  {
    quote:
      "Best Pilates teacher in the most beautiful new studio in SB. Sara Donen is a magical teacher. Lucky to have her skillful instruction.",
    name: "Fred B.",
  },
];

function Stars() {
  return (
    <span
      aria-label="Five out of five stars"
      className="text-sm tracking-[0.2em] text-accent-dark"
    >
      ★★★★★
    </span>
  );
}

export function Testimonials() {
  return (
    <Section surface="surface-2">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>From Our Clients</Eyebrow>
          <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
            Kind words
          </h2>
        </div>

        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {QUOTES.map((q) => (
            <li key={q.name} className="flex flex-col">
              <Stars />
              <blockquote className="font-display mt-4 flex-1 text-xl italic leading-relaxed text-text">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-text-2">
                {q.name}
                <span className="text-text-3"> · Google review</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
