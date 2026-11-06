import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { GiftReveal } from "@/components/GiftReveal";
import { giftCertImageUrl, HIDDEN_PAGE_ROBOTS } from "@/lib/marketingLinks";

// Link-only page: fetch fresh so edits in the portal show immediately.
export const dynamic = "force-dynamic";

type Cert = {
  id: string;
  title: string;
  description: string;
  value: number;
  terms: string;
  active: boolean;
};

async function fetchCert(id: string): Promise<Cert | null> {
  const { data } = await supabase
    .from("gift_certificates")
    .select("id, title, description, value, terms, active")
    .eq("id", id)
    .single();
  if (!data || !data.active) return null;
  return data as Cert;
}

/** The link preview IS the certificate: iMessage shows the artwork as a
 *  large rich card instead of a site name. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cert = await fetchCert(id);
  if (!cert)
    return { title: "Santa Barbara Pilates", robots: HIDDEN_PAGE_ROBOTS };
  const title = "A Gift for You — Santa Barbara Pilates";
  const description = `${cert.title} · $${Number(cert.value).toFixed(
    0
  )}. Redeemable by appointment in the Funk Zone, Santa Barbara.`;
  const image = giftCertImageUrl(cert.id);
  return {
    title: { absolute: title },
    description,
    robots: HIDDEN_PAGE_ROBOTS,
    openGraph: {
      title,
      description,
      siteName: "Santa Barbara Pilates",
      images: [{ url: image, width: 2100, height: 1500 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function GiftCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = await fetchCert(id);
  if (!cert) notFound();

  const artUrl = giftCertImageUrl(cert.id);
  let hasArt = false;
  try {
    const head = await fetch(artUrl, { method: "HEAD", cache: "force-cache" });
    hasArt = head.ok;
  } catch {
    hasArt = false;
  }

  return (
    <GiftReveal
      title={cert.title}
      description={cert.description}
      value={Number(cert.value)}
      terms={cert.terms}
      artUrl={hasArt ? artUrl : null}
    />
  );
}
