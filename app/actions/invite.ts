"use server";

import { supabase } from "@/lib/supabase";

export type CreateInviteResult =
  | { ok: true; token: string }
  | { ok: false; error: string };

export async function createInvite(
  formData: FormData
): Promise<CreateInviteResult> {
  const host_name = String(formData.get("host_name") ?? "").trim();
  const host_email = String(formData.get("host_email") ?? "").trim();
  const session_type = String(formData.get("session_type") ?? "duet");
  const payment_mode = String(formData.get("payment_mode") ?? "host_pays");
  const message = String(formData.get("message") ?? "").trim();
  const honey = String(formData.get("website") ?? "");

  if (honey) return { ok: false, error: "Something went wrong." };
  if (!host_name) return { ok: false, error: "Please tell us your name." };
  if (!host_email.includes("@"))
    return { ok: false, error: "A valid email is required." };
  if (!["duet", "trio", "group"].includes(session_type))
    return { ok: false, error: "Pick a session type." };
  if (!["host_pays", "split"].includes(payment_mode))
    return { ok: false, error: "Pick who pays." };

  const { data, error } = await supabase.rpc("create_invite", {
    p_host_name: host_name,
    p_host_email: host_email,
    p_session_type: session_type,
    p_payment_mode: payment_mode,
    p_message: message || null,
  });

  if (error || !data) {
    return {
      ok: false,
      error: "We couldn't create your invite. Please try again.",
    };
  }
  return { ok: true, token: data as string };
}

export type ClaimInviteResult =
  | { ok: true; status: "ok" | "claimed" | "expired" }
  | { ok: false; error: string };

export async function claimInvite(
  formData: FormData
): Promise<ClaimInviteResult> {
  const token = String(formData.get("token") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const honey = String(formData.get("website") ?? "");

  if (honey) return { ok: false, error: "Something went wrong." };
  if (!token) return { ok: false, error: "Missing invite token." };
  if (!name) return { ok: false, error: "Please tell us your name." };
  if (!email.includes("@"))
    return { ok: false, error: "A valid email is required." };

  const { data, error } = await supabase.rpc("claim_invite", {
    p_token: token,
    p_name: name,
    p_email: email,
    p_phone: phone || null,
  });

  if (error || !data) {
    return {
      ok: false,
      error: "We couldn't confirm your spot. Please try again.",
    };
  }
  return { ok: true, status: data as "ok" | "claimed" | "expired" };
}
