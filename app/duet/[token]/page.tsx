import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { DuetInviteCard } from "@/components/DuetInviteCard";
import { HIDDEN_PAGE_ROBOTS } from "@/lib/marketingLinks";

export const dynamic = "force-dynamic";

type Invite = {
  token: string;
  prospect_name: string;
  friend_name: string | null;
  status: "sent" | "forwarded" | "committed";
};

async function fetchInvite(token: string): Promise<Invite | null> {
  const { data } = await supabase
    .from("partner_invites")
    .select("token, prospect_name, friend_name, status")
    .eq("token", token)
    .single();
  return (data as Invite) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const inv = await fetchInvite(token);
  const title = "Be my duet partner — Santa Barbara Pilates";
  const description = inv
    ? `${inv.prospect_name} wants you as their reformer duet partner. Two reformers, one instructor.`
    : "A semi-private reformer session for two.";
  return {
    title: { absolute: title },
    description,
    robots: HIDDEN_PAGE_ROBOTS,
    openGraph: { title, description, siteName: "Santa Barbara Pilates" },
  };
}

/** Animated duet invite — reachable only by its link. The prospect passes
 *  it to a friend; the friend commits right here. */
export default async function DuetInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const inv = await fetchInvite(token);
  if (!inv) notFound();

  return (
    <DuetInviteCard
      token={inv.token}
      prospectName={inv.prospect_name}
      friendName={inv.friend_name}
      status={inv.status}
    />
  );
}
