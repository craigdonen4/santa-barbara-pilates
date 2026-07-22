"use server";

import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

type LeadResult =
  | { ok: true }
  | { ok: false; error: string };

// Allowed values — MUST match the portal (lib/leads.ts). We only ever store
// exact matches to these, deduped, so the portal's exact-match chips can't be
// tripped by unexpected input.
const INTEREST_OPTIONS = ["Private", "Duet", "Group"];
const TIME_OPTIONS = [
  "Early morning",
  "Morning",
  "Midday",
  "Afternoon",
  "Evening",
];

/** Keep only recognized options, in canonical order, no duplicates. */
function cleanList(raw: string, allowed: string[]): string {
  const picked = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => allowed.includes(s));
  return allowed.filter((o) => picked.includes(o)).join(",");
}

export async function submitLead(formData: FormData): Promise<LeadResult> {
  const first_name = String(formData.get("first_name") ?? "").trim();
  const last_name = String(formData.get("last_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const interest = cleanList(
    String(formData.get("interest") ?? ""),
    INTEREST_OPTIONS
  );
  const preferred_time = cleanList(
    String(formData.get("preferred_time") ?? ""),
    TIME_OPTIONS
  );
  const honey = String(formData.get("website") ?? "");

  if (honey) {
    return { ok: true };
  }

  if (!first_name) {
    return { ok: false, error: "Please tell us your first name." };
  }
  if (!email || !email.includes("@")) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!phone) {
    return { ok: false, error: "A phone number is required." };
  }

  // Fold the preferences into the note too, so Sara sees the full context
  // even at a glance — the structured columns still drive the portal chips.
  const context = [
    interest ? `Interested in: ${interest.split(",").join(", ")}` : "",
    preferred_time ? `Prefers: ${preferred_time.split(",").join(", ")}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const fullNotes = [notes, context].filter(Boolean).join("\n\n") || null;

  const { error } = await supabase.from("leads").insert({
    first_name,
    last_name: last_name || null,
    email,
    phone,
    notes: fullNotes,
    interest: interest || null,
    preferred_time: preferred_time || null,
    source: "website",
  });

  if (error) {
    return {
      ok: false,
      error: "We could not save your message. Please try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.LEAD_NOTIFICATION_EMAIL;

  if (apiKey && notify) {
    try {
      const resend = new Resend(apiKey);
      const displayName = [first_name, last_name].filter(Boolean).join(" ") || email;
      await resend.emails.send({
        from: "Santa Barbara Pilates <studio@santabarbarapilates.com>",
        to: notify,
        replyTo: email,
        subject: `New inquiry — ${displayName}`,
        text: [
          `Name: ${displayName}`,
          `Email: ${email}`,
          `Phone: ${phone || "(not provided)"}`,
          interest ? `Interested in: ${interest.split(",").join(", ")}` : "",
          preferred_time
            ? `Preferred time: ${preferred_time.split(",").join(", ")}`
            : "",
          "",
          "Message:",
          notes || "(no message)",
        ]
          .filter((line) => line !== "")
          .join("\n"),
      });
    } catch {
      // Lead is saved; email notification is best-effort.
    }
  }

  return { ok: true };
}
