import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/method", label: "The Method" },
  { href: "/sara", label: "About" },
  // { href: "/instructors", label: "Instructors" }, // re-enable when team is ready
  { href: "/pricing", label: "Pricing" },
  { href: "/visit", label: "Visit" },
  // { href: "/journal", label: "Journal" }, // re-enable when we have journal entries
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-28 max-w-[76rem] items-center justify-between px-6 lg:px-10">
        {/* Partnership card — The Base and SBP under one roof, one rectangle.
            Base logo links out (backlink); SBP logo links home. */}
        <div
          className="flex items-center gap-3 border border-text px-3 py-2 md:gap-4 md:px-4"
          style={{
            background:
              "linear-gradient(135deg, #FFFFFF 0%, var(--color-surface) 45%, var(--color-bg) 100%)",
          }}
        >
          <a
            href="https://www.thebasesantabarbara.com"
            target="_blank"
            rel="noopener"
            aria-label="The Base Santa Barbara — visit their site"
            className="block"
          >
            <Image
              src="/base-logo.jpeg"
              alt="The Base"
              width={1280}
              height={568}
              sizes="(min-width: 768px) 96px, 72px"
              className="h-8 w-auto md:h-10"
            />
          </a>
          <Link
            href="/"
            aria-label="Santa Barbara Pilates — home"
            className="block"
          >
            <Image
              src="/sbp-logo.png"
              alt="Santa Barbara Pilates"
              width={1955}
              height={2068}
              priority
              sizes="(min-width: 768px) 80px, 64px"
              className="h-16 w-auto md:h-20"
            />
          </Link>
        </div>

        {/* Nav links grouped on the right, next to Book */}
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.78rem] uppercase tracking-[0.16em] text-text-2 transition-colors hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/visit#book"
            className="btn btn-outline hidden md:inline-flex"
          >
            Book
          </Link>
        </div>
      </div>
    </header>
  );
}
