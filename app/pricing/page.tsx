import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { supabase, type ClassType } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Private, duet, trio, and small group Pilates sessions at Santa Barbara Pilates.",
};

export const revalidate = 300;

const SESSION_LABEL: Record<NonNullable<ClassType["session_type"]>, string> = {
  private: "Private",
  duet: "Duet",
  small_group: "Small group",
};

function formatPrice(cents: number | null) {
  if (cents == null) return "On request";
  return `$${(cents / 100).toFixed(0)}`;
}

export default async function PricingPage() {
  const { data } = await supabase
    .from("class_types")
    .select(
      "id, name, description, color, duration_minutes, price_cents, is_public, sort_order, session_type, created_at"
    )
    .eq("is_public", true)
    .order("sort_order", { ascending: true });

  const sessions = (data ?? []) as ClassType[];

  return (
    <article>
      {/* Hero — image with gradient fade, title overlaid */}
      <section className="relative overflow-hidden bg-surface-2">
        <div className="absolute inset-0">
          <Image
            src="/pricing-studio.jpeg"
            alt="The studio — reformers and Cadillacs"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_45%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,240,232,0.20) 0%, rgba(245,240,232,0.55) 60%, rgba(245,240,232,0.95) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-[76rem] flex-col justify-end px-6 pb-16 pt-28 lg:px-10 lg:pb-20">
          <p className="eyebrow">Sessions</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-teal md:text-7xl">
            Pricing
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-2 md:text-lg">
            Sessions are fifty minutes, each with close, individual attention.
            Most clients begin one-on-one and, if desired, move into a duet,
            trio, or small group as the work becomes familiar.
          </p>
        </div>
      </section>

      <Container className="py-16 lg:py-24">
        {sessions.length === 0 && (
          <p className="text-sm text-text-3">
            Pricing is being updated. Please check back shortly.
          </p>
        )}

        <ul className="divide-y divide-border border-y border-border">
          {sessions.map((c) => (
            <li key={c.id} className="grid grid-cols-12 gap-6 py-10">
              <div className="col-span-12 md:col-span-3">
                {c.session_type && (
                  <p className="eyebrow">
                    {SESSION_LABEL[c.session_type]}
                  </p>
                )}
                <h2 className="font-display font-semibold mt-2 text-3xl leading-tight text-text">
                  {c.name}
                </h2>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-base leading-relaxed text-text-2">
                  {c.description}
                </p>
                {c.duration_minutes && (
                  <p className="mt-3 text-sm text-text-3">
                    {c.duration_minutes} minutes
                  </p>
                )}
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right">
                <p className="font-display text-3xl text-text">
                  {formatPrice(c.price_cents)}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-3">
                  {c.session_type === "private" ? "per session" : "per person"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
