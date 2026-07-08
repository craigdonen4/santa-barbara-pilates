import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-2">
      <div className="absolute inset-0">
        {/* Hero video. Static-image alternative if ever needed:
            <Image src="/homepage-sub.png" alt="" aria-hidden="true" fill
              priority sizes="100vw" className="object-cover opacity-90" /> */}
        <video
          className="h-full w-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/sbp-hero.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,240,232,0.20) 0%, rgba(245,240,232,0.55) 60%, rgba(245,240,232,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-[76rem] flex-col items-end justify-end px-6 pb-20 pt-32 text-right lg:px-10 lg:pb-28">
        <p className="eyebrow">Santa Barbara, California</p>
        {/* Logo-as-title. To reverse, swap this h1 back to:
            <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-teal md:text-7xl">
              Santa Barbara Pilates
            </h1> */}
        <h1 className="mt-4">
          <Image
            src="/sbp-logo.png"
            alt="Santa Barbara Pilates"
            width={1955}
            height={2068}
            priority
            sizes="(min-width: 768px) 288px, 208px"
            className="h-52 w-auto md:h-72"
          />
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-2 md:text-lg">
          An intimate boutique studio in the heart of the Funk Zone.
        </p>
        <div className="mt-10 flex flex-wrap justify-end gap-4">
          <Link href="/visit#book" className="btn btn-primary">
            Book a first session
          </Link>
          <Link href="/method" className="btn btn-outline">
            The Method
          </Link>
        </div>
      </div>
    </section>
  );
}
