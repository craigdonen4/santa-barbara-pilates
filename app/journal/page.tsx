import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { listMdx } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the studio.",
};

export default async function JournalPage() {
  const posts = await listMdx("journal");

  return (
    <article>
      <header className="border-b border-border bg-surface py-20 lg:py-28">
        <Container>
          <p className="eyebrow">From the studio</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-teal md:text-7xl">
            Journal
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-2 md:text-lg">
            Short essays and observations from Sara and our instructors. We
            write here rarely, and only when there is something worth saying.
          </p>
        </Container>
      </header>

      <Container className="py-20 lg:py-28">
        {posts.length === 0 ? (
          <div className="border border-border bg-surface p-12 text-center">
            <p className="font-display text-2xl text-text">
              The journal is being prepared.
            </p>
            <p className="mt-3 text-sm text-text-2">
              First entries will appear soon. In the meantime, read{" "}
              <Link href="/method" className="link-quiet underline">
                the method
              </Link>{" "}
              or{" "}
              <Link href="/sara" className="link-quiet underline">
                Sara&apos;s letter
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {posts.map((p) => (
              <li key={p.slug} className="py-10">
                <Link href={`/journal/${p.slug}`} className="block group">
                  <p className="eyebrow">
                    {(p.data.date as string) ?? ""}
                  </p>
                  <h2 className="font-display font-semibold mt-2 text-3xl leading-tight text-text">
                    {(p.data.title as string) ?? p.slug}
                  </h2>
                  {p.data.description ? (
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-2">
                      {p.data.description as string}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </article>
  );
}
