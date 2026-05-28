import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
}

export const supabase = createClient(url ?? "", anonKey ?? "", {
  auth: { persistSession: false },
});

export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || !url) {
    throw new Error("Supabase service role env vars missing.");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/** A row from public.staff, with marketing-site additions. */
export type Instructor = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: "owner" | "manager" | "trainer" | "front_desk";
  bio: string | null;
  website_bio: string | null;
  photo_url: string | null;
  specialties: string[] | null;
  is_active: boolean | null;
  is_public: boolean;
  slug: string | null;
};

export function fullName(i: Pick<Instructor, "first_name" | "last_name">) {
  return `${i.first_name} ${i.last_name}`.trim();
}

/** A row from public.class_types, with marketing-site additions. */
export type ClassType = {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  duration_minutes: number | null;
  price_cents: number | null;
  is_public: boolean;
  sort_order: number;
  session_type: "private" | "duet" | "small_group" | null;
  created_at: string;
};
