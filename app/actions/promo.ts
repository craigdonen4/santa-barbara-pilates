"use server";

import { supabase } from "@/lib/supabase";

type SignupResult = { ok: true } | { ok: false; error: string };

/** Signup at the bottom of a texted promo flyer. The flyer itself is
 *  created in the staff portal; signups land back there. */
export async function submitPromoSignup(input: {
  packageId: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  website?: string; // honeypot
}): Promise<SignupResult> {
  if (input.website) return { ok: false, error: "Something went wrong." };
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  if (!name) return { ok: false, error: "Please add your name." };
  if (!email && !phone)
    return { ok: false, error: "Add an email or phone so we can reach you." };

  const { error } = await supabase.from("promo_signups").insert({
    package_id: input.packageId,
    name,
    email: email || null,
    phone: phone || null,
    note: input.note.trim() || null,
  });
  if (error)
    return { ok: false, error: "Something went wrong. Please try again." };
  return { ok: true };
}
