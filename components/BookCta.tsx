import Link from "next/link";
import { Container } from "@/components/Container";

/**
 * Bottom-of-page call to action. Every content page ends with this.
 * Optionally shows a client quote (a real Google review) above the heading.
 * A second "Existing clients" button can be added once online booking
 * for current clients exists.
 */
export function BookCta({
  heading = "Ready to begin?",
  body = "Your first visit starts with a private session and a short tour of the studio.",
  quote,
  quoteName,
}: {
  heading?: string;
  body?: string;
  quote?: string;
  quoteName?: string;
}) {
  return (
    <section className="border-t border-border bg-surface-2 py-16 lg:py-20">
      <Container className="text-center">
        {quote && (
          <figure className="mx-auto mb-12 max-w-2xl">
            <span
              aria-label="Five out of five stars"
              className="text-sm tracking-[0.2em] text-accent-dark"
            >
              ★★★★★
            </span>
            <blockquote className="font-display mt-3 text-2xl italic leading-relaxed text-text">
              &ldquo;{quote}&rdquo;
            </blockquote>
            {quoteName && (
              <figcaption className="mt-3 text-sm text-text-2">
                {quoteName}
                <span className="text-text-3"> · Google review</span>
              </figcaption>
            )}
          </figure>
        )}
        <h2 className="font-display font-semibold text-3xl leading-tight text-text md:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-2">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/visit#book" className="btn btn-primary">
            Book your first session
          </Link>
        </div>
      </Container>
    </section>
  );
}
