import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="mx-auto max-w-[76rem] px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="font-display text-xl text-text">
              Santa Barbara Pilates
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-2">
              A small private studio. Contemporary method, full apparatus,
              small groups.
            </p>
          </div>

          <div>
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 space-y-2 text-sm text-text-2">
              <li>
                <Link href="/method" className="link-quiet">The Method</Link>
              </li>
              <li>
                <Link href="/sara" className="link-quiet">Sara</Link>
              </li>
              <li>
                <Link href="/journal" className="link-quiet">Journal</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Practice</p>
            <ul className="mt-4 space-y-2 text-sm text-text-2">
              <li>
                <Link href="/pricing" className="link-quiet">Pricing</Link>
              </li>
              <li>
                <Link href="/visit" className="link-quiet">Visit</Link>
              </li>
              <li>
                <Link href="/visit#book" className="link-quiet">Book a session</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Find us</p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-text-2">
              123 Santa Barbara St
              <br />
              The Funk Zone, Santa Barbara
            </address>
            <p className="mt-4 text-sm text-text-2">
              <a href="mailto:hello@santabarbarapilates.com" className="link-quiet">
                hello@santabarbarapilates.com
              </a>
            </p>
          </div>
        </div>

        <hr className="rule mt-16" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-text-3 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Santa Barbara Pilates</p>
          <p className="font-display italic">
            BASI-certified. Trained across BASI, Stott, Balanced Body, Peak.
          </p>
        </div>
      </div>
    </footer>
  );
}
