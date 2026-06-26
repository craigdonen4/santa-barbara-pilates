import type { Metadata } from "next";
import Image from "next/image";
import { getMdx } from "@/lib/mdx";
import { Mdx } from "@/components/Mdx";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Sara",
  description: "Founder of Santa Barbara Pilates. BASI-certified.",
};

export default async function SaraPage() {
  const doc = await getMdx("sara.mdx");
  const title = (doc.data.title as string) ?? "Sara";

  return (
    <article>
      <header className="border-b border-border bg-surface pt-16 pb-8 lg:pt-20 lg:pb-12">
        <Container>
          <div className="grid items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">Founder</p>
              <h1 className="font-display mt-4 text-5xl leading-[1.05] text-teal md:text-7xl">
                {title}
              </h1>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/sara-closeup.png"
                  alt="Sara, founder of Santa Barbara Pilates"
                  width={1108}
                  height={1823}
                  priority
                  sizes="(min-width: 768px) 22rem, 80vw"
                  className="absolute bottom-0 left-1/2 h-[85%] w-auto -translate-x-1/2"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(253,250,245,0) 0%, rgba(253,250,245,0) 65%, rgba(253,250,245,0.95) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </header>
      <Container className="pt-10 pb-16 lg:pt-12 lg:pb-24">
        <Mdx source={doc.source} />
      </Container>
    </article>
  );
}
