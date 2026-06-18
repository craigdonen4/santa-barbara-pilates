import type { Metadata } from "next";
import Image from "next/image";
import { getMdx } from "@/lib/mdx";
import { Mdx } from "@/components/Mdx";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "The Method",
  description:
    "How we teach Pilates at Santa Barbara Pilates. Contemporary, precise, unhurried.",
};

export default async function MethodPage() {
  const doc = await getMdx("method.mdx");
  const title = (doc.data.title as string) ?? "The Method";

  return (
    <article>
      {/* Hero — image with gradient fade, title overlaid (matches home page pattern) */}
      <section className="relative overflow-hidden bg-surface-2">
        <div className="absolute inset-0">
          <Image
            src="/the-method-2.png"
            alt="An instructor watching a client work on the Cadillac"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_60%]"
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
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-teal md:text-7xl">
            {title}
          </h1>
        </div>
      </section>

      <Container className="py-16 lg:py-24">
        <Mdx source={doc.source} />
      </Container>
    </article>
  );
}
