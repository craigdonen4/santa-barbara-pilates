import type { Metadata } from "next";
import { getMdx } from "@/lib/mdx";
import { Mdx } from "@/components/Mdx";
import { Container } from "@/components/Container";
import { BookCta } from "@/components/BookCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "The team at Santa Barbara Pilates. Founded and led by Sara Donen, BASI-certified Pilates instructor.",
};

export default async function AboutPage() {
  const doc = await getMdx("sara.mdx");
  const title = (doc.data.title as string) ?? "About";

  return (
    <article>
      <header className="bg-teal pt-16 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-surface/75">
            Our Team
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-surface md:text-7xl">
            {title}
          </h1>
        </Container>
      </header>

      <Container className="pt-10 pb-16 lg:pt-12 lg:pb-24">
        <Mdx source={doc.source} />
      </Container>

      <BookCta
        quote="Sara is so knowledgeable and a joy. The facility is gorgeous."
        quoteName="Sarah J."
      />
    </article>
  );
}
