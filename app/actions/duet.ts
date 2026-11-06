"use server";

import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

type DuetResult = { ok: true } | { ok: false; error: string };

function recipients(): string[] {
  const configured = (process.env.LEAD_NOTIFICATION_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.includes("@"));
  return [...new Set([...configured, "sara@santabarbarapilates.com"])];
}

/** The friend commits on the duet invite page. First commit wins; it also
 *  lands on the portal's Leads board and emails the studio. */
export async function commitDuetInvite(input: {
  token: string;
  friendName: string;
  friendContact: string;
  website?: string; // honeypot
}): Promise<DuetResult> {
  if (input.website) return { ok: false, error: "Something went wrong." };
  const friendName = input.friendName.trim();
  const friendContact = input.friendContact.trim();
  if (!friendName) return { ok: false, error: "Please add your name." };
  if (!friendContact)
    return {
      ok: false,
      error: "Add an email or phone so the studio can reach you.",
    };

  const { data: updated, error } = await supabase
    .from("partner_invites")
    .update({
      friend_name: friendName,
      friend_contact: friendContact,
      status: "committed",
      committed_at: new Date().toISOString(),
    })
    .eq("token", input.token)
    .neq("status", "committed")
    .select("prospect_name, prospect_contact");
  if (error)
    return { ok: false, error: "Something went wrong. Please try again." };

  const invite = updated?.[0];
  if (invite) {
    const [first, ...rest] = friendName.split(/\s+/);
    const isEmail = friendContact.includes("@");
    await supabase.from("leads").insert({
      first_name: first,
      last_name: rest.join(" ") || null,
      email: isEmail ? friendContact : null,
      phone: isEmail ? null : friendContact,
      source: "duet-invite",
      interest: "Duet",
      status: "new",
      notes: `Committed as duet partner for ${invite.prospect_name}${
        invite.prospect_contact ? ` (${invite.prospect_contact})` : ""
      } via the shareable duet invite.`,
    });

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "Santa Barbara Pilates <studio@santabarbarapilates.com>",
          to: recipients(),
          subject: `Duet committed — ${invite.prospect_name} + ${friendName}`,
          text: [
            `${friendName} just committed as ${invite.prospect_name}'s duet partner.`,
            "",
            `Partner contact: ${friendContact}`,
            invite.prospect_contact
              ? `Prospect contact: ${invite.prospect_contact}`
              : "",
            "",
            "They are on the Leads board in the portal, marked with the duet rings.",
          ]
            .filter((line) => line !== "")
            .join("\n"),
        });
      } catch {
        // Lead is saved; email notification is best-effort.
      }
    }
  }
  return { ok: true };
}

/** Marks the invite forwarded when the prospect shares it on. */
export async function markDuetForwarded(token: string): Promise<void> {
  await supabase
    .from("partner_invites")
    .update({ status: "forwarded" })
    .eq("token", token)
    .eq("status", "sent");
}
