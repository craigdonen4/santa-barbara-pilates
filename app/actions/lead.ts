"use server";

import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

type LeadResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitLead(formData: FormData): Promise<LeadResult> {
  const first_name = String(formData.get("first_name") ?? "").trim();
  const last_name = String(formData.get("last_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
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

  const { error } = await supabase.from("leads").insert({
    first_name,
    last_name: last_name || null,
    email,
    phone: phone || null,
    notes: notes || null,
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
          "",
          "Message:",
          notes || "(no message)",
        ].join("\n"),
      });
    } catch {
      // Lead is saved; email notification is best-effort.
    }
  }

  return { ok: true };
}
