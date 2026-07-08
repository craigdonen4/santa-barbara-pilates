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
        <div className="flex items-center gap-3 md:gap-5">
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
              sizes="(min-width: 768px) 96px, 80px"
              className="h-20 w-auto md:h-24"
            />
          </Link>

          {/* Partnership card — SBP and The Base share the building.
              External link for cross-site backlinking. */}
          <a
            href="https://www.thebasesantabarbara.com"
            target="_blank"
            rel="noopener"
            aria-label="In partnership with The Base — visit their site"
            className="flex h-16 w-16 flex-col items-center justify-center gap-1.5 border border-border bg-surface p-2 md:h-20 md:w-20"
          >
            <Image
              src="/base-logo.jpeg"
              alt="The Base"
              width={1280}
              height={568}
              sizes="(min-width: 768px) 64px, 48px"
              className="w-full h-auto"
            />
            <span className="text-[8px] uppercase tracking-[0.18em] text-text-3 md:text-[9px]">
              Partner
            </span>
          </a>
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
