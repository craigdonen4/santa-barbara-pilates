import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-2">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/hero-placeholder.mp4" type="video/mp4" />
          <source src="/hero-placeholder.mp4" type="video/quicktime" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,240,232,0.20) 0%, rgba(245,240,232,0.55) 60%, rgba(245,240,232,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-[76rem] flex-col justify-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
        <p className="eyebrow">Santa Barbara, California</p>
        <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-teal md:text-7xl">
          Santa Barbara Pilates
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-2 md:text-lg">
          An intimate boutique studio in the heart of the Funk Zone.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
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
