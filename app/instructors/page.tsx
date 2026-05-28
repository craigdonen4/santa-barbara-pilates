import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { supabase, fullName, type Instructor } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Instructors",
  description:
    "Instructors at Santa Barbara Pilates. Each personally vetted by Sara.",
};

export const revalidate = 300;

const ROLE_LABEL: Record<Instructor["role"], string> = {
  owner: "Founder",
  manager: "Lead Instructor",
  trainer: "Instructor",
  front_desk: "Front Desk",
};

export default async function InstructorsPage() {
  const { data, error } = await supabase
    .from("staff")
    .select(
      "id, first_name, last_name, email, phone, role, bio, website_bio, photo_url, specialties, is_active, is_public, slug"
    )
    .eq("is_public", true);

  const instructors = (data ?? []) as Instructor[];

  return (
    <article>
      <header className="border-b border-border bg-surface py-20 lg:py-28">
        <Container>
          <p className="eyebrow">The team</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-teal md:text-7xl">
            Instructors
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-2 md:text-lg">
            Founded by Sara, with instructors she has personally vetted. Each
            one holds a comprehensive certification and trains alongside her
            before teaching a session.
          </p>
        </Container>
      </header>

      <Container className="py-20 lg:py-28">
        {error && (
          <p className="text-sm text-text-3">
            Instructors are temporarily unavailable. Please check back shortly.
          </p>
        )}

        {!error && instructors.length === 0 && (
          <p className="text-sm text-text-3">
            Profiles are being prepared. Please check back shortly.
          </p>
        )}

        <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((i) => (
            <li key={i.id}>
              <Link
                href={i.slug ? `/instructors/${i.slug}` : "/instructors"}
                className="group block"
              >
                <div className="aspect-[3/4] w-full overflow-hidden border border-border bg-surface-2">
                  {i.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={i.photo_url}
                      alt={fullName(i)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : null}
                </div>
                <div className="mt-5">
                  <h2 className="font-display font-semibold text-2xl leading-snug text-text">
                    {fullName(i)}
                  </h2>
                  <p className="mt-1 text-sm text-text-2">
                    {ROLE_LABEL[i.role] ?? "Instructor"}
                  </p>
                  {i.specialties && i.specialties.length > 0 ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-3">
                      {i.specialties.join(" · ")}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
