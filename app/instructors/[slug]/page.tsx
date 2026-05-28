import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { supabase, fullName, type Instructor } from "@/lib/supabase";

export const revalidate = 300;

type Params = { slug: string };

const ROLE_LABEL: Record<Instructor["role"], string> = {
  owner: "Founder",
  manager: "Lead Instructor",
  trainer: "Instructor",
  front_desk: "Front Desk",
};

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from("staff")
    .select("first_name, last_name, website_bio")
    .eq("slug", slug)
    .eq("is_public", true)
    .maybeSingle();

  if (!data) return { title: "Instructor" };
  return {
    title: fullName(data as Pick<Instructor, "first_name" | "last_name">),
    description: data.website_bio?.slice(0, 160) ?? undefined,
  };
}

export default async function InstructorPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const { data } = await supabase
    .from("staff")
    .select(
      "id, first_name, last_name, email, phone, role, bio, website_bio, photo_url, specialties, is_active, is_public, slug"
    )
    .eq("slug", slug)
    .eq("is_public", true)
    .maybeSingle();

  if (!data) notFound();

  const i = data as Instructor;
  const name = fullName(i);
  const firstName = i.first_name;

  return (
    <article>
      <header className="border-b border-border bg-surface py-20 lg:py-28">
        <Container>
          <Link
            href="/instructors"
            className="text-xs uppercase tracking-[0.18em] text-text-3 link-quiet"
          >
            ← All instructors
          </Link>
          <div className="mt-8 grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">{ROLE_LABEL[i.role] ?? "Instructor"}</p>
              <h1 className="font-display mt-3 text-5xl leading-[1.05] text-teal md:text-7xl">
                {name}
              </h1>
              {i.specialties && i.specialties.length > 0 ? (
                <p className="mt-6 text-xs uppercase tracking-[0.14em] text-text-3">
                  {i.specialties.join(" · ")}
                </p>
              ) : null}
            </div>
            <div className="md:col-span-5">
              <div className="aspect-[3/4] w-full overflow-hidden border border-border bg-surface-2">
                {i.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={i.photo_url}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-20 lg:py-28">
        <div className="prose-editorial">
          {(i.website_bio ?? i.bio ?? "")
            .split(/\n{2,}/)
            .filter((p) => p.trim().length > 0)
            .map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <p className="eyebrow">Book with {firstName}</p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-text-2">
            Sessions are scheduled directly by the studio. Write to us and we
            will place you on {firstName}&apos;s book.
          </p>
          <Link href="/visit#book" className="btn btn-primary mt-6">
            Request a session
          </Link>
        </div>
      </Container>
    </article>
  );
}
