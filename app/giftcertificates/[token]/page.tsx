import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { GiftReveal } from "@/components/GiftReveal";
import { giftCertImageUrl, HIDDEN_PAGE_ROBOTS } from "@/lib/marketingLinks";

export const dynamic = "force-dynamic";

type Issued = {
  id: string;
  token: string;
  recipient_name: string;
  from_name: string | null;
  status: "sent" | "viewed" | "redeemed" | "void";
  viewed_at: string | null;
  certificate_id: string;
  gift_certificates: {
    id: string;
    title: string;
    description: string;
    value: number;
    terms: string;
    active: boolean;
  } | null;
};

async function fetchIssued(token: string): Promise<Issued | null> {
  const { data } = await supabase
    .from("gift_issues")
    .select(
      "id, token, recipient_name, from_name, status, viewed_at, certificate_id, gift_certificates (id, title, description, value, terms, active)"
    )
    .eq("token", token)
    .single();
  const issue = data as unknown as Issued | null;
  if (!issue || issue.status === "void" || !issue.gift_certificates?.active)
    return null;
  return issue;
}

/** The link preview IS the certificate, addressed to the recipient. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const issue = await fetchIssued(token);
  if (!issue || !issue.gift_certificates)
    return { title: "Santa Barbara Pilates", robots: HIDDEN_PAGE_ROBOTS };
  const cert = issue.gift_certificates;
  const first = issue.recipient_name.split(/\s+/)[0];
  const title = `A Gift for ${first} — Santa Barbara Pilates`;
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

/** An issued gift certificate — personal link, tracked in the portal. */
export default async function IssuedGiftPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const issue = await fetchIssued(token);
  if (!issue || !issue.gift_certificates) notFound();
  const cert = issue.gift_certificates;

  // First open marks it viewed, so the portal shows it was opened.
  if (issue.status === "sent") {
    await supabase
      .from("gift_issues")
      .update({ status: "viewed", viewed_at: new Date().toISOString() })
      .eq("token", token)
      .eq("status", "sent");
  }

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
      recipientName={issue.recipient_name.split(/\s+/)[0]}
    />
  );
}
