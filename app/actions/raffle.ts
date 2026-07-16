"use server";

import { supabase } from "@/lib/supabase";

const STATIONS = ["gym", "bathrooms", "courtyard", "recovery", "pilates"];

export type RaffleResult = { ok: true } | { ok: false; error: string };

export async function enterRaffle(formData: FormData): Promise<RaffleResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const stops = String(formData.get("stops") ?? "");
  const honey = String(formData.get("website") ?? "");

  if (honey) return { ok: true };
  if (!name) return { ok: false, error: "Please tell us your name." };
  if (!email.includes("@"))
    return { ok: false, error: "A valid email is required." };
  if (!phone)
    return { ok: false, error: "We need your phone to reach the winner." };

  const seen = stops.split(",").filter(Boolean);
  const allSeen = STATIONS.every((s) => seen.includes(s));
  if (!allSeen)
    return { ok: false, error: "Visit all five stops first — then come back." };

  const first = name.split(" ")[0];
  const last = name.slice(first.length).trim() || null;

  const { error } = await supabase.from("leads").insert({
    first_name: first,
    last_name: last,
    email,
    phone,
    source: "raffle",
    notes:
      "Grand-opening raffle entry — completed the Grand Tour (gym, bathrooms, courtyard, recovery, pilates).",
  });

  if (error) {
    return {
      ok: false,
      error: "We couldn't save your entry. Please try again.",
    };
  }
  return { ok: true };
}
