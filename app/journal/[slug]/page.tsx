import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Mdx } from "@/components/Mdx";
import { getMdx, listMdx } from "@/lib/mdx";

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = await listMdx("journal");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc = await getMdx(`journal/${slug}.mdx`);
    return {
      title: (doc.data.title as string) ?? slug,
      description: (doc.data.description as string) ?? undefined,
    };
  } catch {
    return { title: "Journal entry" };
  }
}

export default async function JournalEntryPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  let doc;
  try {
    doc = await getMdx(`journal/${slug}.mdx`);
  } catch {
    notFound();
  }
  if (!doc) notFound();

  return (
    <article>
      <header className="border-b border-border bg-surface py-20 lg:py-28">
        <Container>
          <p className="eyebrow">{(doc.data.date as string) ?? "Journal"}</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-teal md:text-6xl">
            {(doc.data.title as string) ?? slug}
          </h1>
        </Container>
      </header>
      <Container className="py-20 lg:py-28">
        <Mdx source={doc.source} />
      </Container>
    </article>
  );
}
