import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PromoFlyerSignup } from "@/components/PromoFlyerSignup";
import { HIDDEN_PAGE_ROBOTS } from "@/lib/marketingLinks";

export const dynamic = "force-dynamic";

type Promo = {
  id: string;
  title: string;
  headline: string;
  description: string;
  price: number | null;
  cta_text: string;
  active: boolean;
};

async function fetchPromo(id: string): Promise<Promo | null> {
  const { data } = await supabase
    .from("promo_packages")
    .select("id, title, headline, description, price, cta_text, active")
    .eq("id", id)
    .single();
  if (!data || !data.active) return null;
  return data as Promo;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pkg = await fetchPromo(id);
  const title = pkg
    ? `${pkg.title} — Santa Barbara Pilates`
    : "Santa Barbara Pilates";
  const description =
    pkg?.headline || "Contemporary Pilates in the Funk Zone, Santa Barbara.";
  return {
    title: { absolute: title },
    description,
    robots: HIDDEN_PAGE_ROBOTS,
    openGraph: { title, description, siteName: "Santa Barbara Pilates" },
  };
}

/** Texted promo flyer with a signup form — reachable only by its link. */
export default async function PromoFlyerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await fetchPromo(id);
  if (!pkg) notFound();

  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-[#F7F3EC] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(14,92,106,0.12)]">
          <div className="bg-[#0E5C6A] px-8 py-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Santa Barbara Pilates
            </p>
            <h1 className="mt-2 font-serif text-3xl text-white">{pkg.title}</h1>
          </div>
          <div className="px-8 py-6">
            {pkg.headline && (
              <p className="text-center font-serif text-lg text-[#0E5C6A]">
                {pkg.headline}
              </p>
            )}
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[#2C2A25]/80">
              {pkg.description}
            </p>
            {pkg.price != null && (
              <p className="mt-6 text-center font-serif text-4xl text-[#2C2A25]">
                ${Number(pkg.price).toFixed(0)}
              </p>
            )}
          </div>
          <div className="border-t border-dashed border-[#0E5C6A]/25 bg-[#F7F3EC]/60 px-8 py-6">
            <PromoFlyerSignup packageId={pkg.id} ctaText={pkg.cta_text} />
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-[#2C2A25]/50">
          santabarbarapilates.com
        </p>
      </div>
    </div>
  );
}
