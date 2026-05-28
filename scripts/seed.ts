import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

// ────────────────────────────────────────────────────────────────────
// Instructors (public.staff)
// ────────────────────────────────────────────────────────────────────
type StaffSeed = {
  first_name: string;
  last_name: string;
  email: string;
  role: "owner" | "manager" | "trainer" | "front_desk";
  slug: string;
  is_public: boolean;
  website_bio: string;
  specialties: string[];
  photo_url: string | null;
};

const instructors: StaffSeed[] = [
  {
    first_name: "Sara",
    last_name: "Lindsey",
    email: "sara@santabarbarapilates.com",
    role: "owner",
    slug: "sara",
    is_public: true,
    website_bio:
      "Sara founded the studio in 2018 after a decade teaching classical Pilates in Los Angeles. She trained through BASI and continues to study with senior teachers each year. Her approach is precise, calm, and patient — every session begins with breath.",
    specialties: ["BASI Comprehensive", "Polestar Rehabilitation"],
    photo_url: null,
  },
  {
    first_name: "Margaret",
    last_name: "Ellsworth",
    email: "margaret@santabarbarapilates.com",
    role: "trainer",
    slug: "margaret",
    is_public: true,
    website_bio:
      "Margaret came to Pilates after twenty years as a ballet dancer. She teaches with the eye of someone who has spent her life watching bodies move. Her sessions tend to focus on articulation, alignment, and the small corrections that change everything.",
    specialties: ["Stott Comprehensive", "Balanced Body Reformer"],
    photo_url: null,
  },
  {
    first_name: "Iris",
    last_name: "Ahmadi",
    email: "iris@santabarbarapilates.com",
    role: "trainer",
    slug: "iris",
    is_public: true,
    website_bio:
      "Iris holds a master's in kinesiology and works extensively with clients returning from injury. She is unhurried and methodical. Many of our oldest clients first found us through Iris.",
    specialties: ["Peak Pilates", "Polestar Rehabilitation", "NASM-CES"],
    photo_url: null,
  },
];

// ────────────────────────────────────────────────────────────────────
// Class types (public.class_types)
// ────────────────────────────────────────────────────────────────────
type ClassTypeSeed = {
  name: string;
  description: string;
  session_type: "private" | "duet" | "small_group";
  duration_minutes: number;
  price_cents: number;
  sort_order: number;
  is_public: boolean;
  color: string;
};

const classTypes: ClassTypeSeed[] = [
  {
    name: "Private Session",
    description:
      "One client, one instructor, the full studio. The most direct path to good Pilates. We recommend beginning here.",
    session_type: "private",
    duration_minutes: 55,
    price_cents: 14500,
    sort_order: 1,
    is_public: true,
    color: "#9A6B42",
  },
  {
    name: "Duet",
    description:
      "Two clients with one instructor. Ideal for partners, friends, or anyone who prefers company without losing attention.",
    session_type: "duet",
    duration_minutes: 55,
    price_cents: 9500,
    sort_order: 2,
    is_public: true,
    color: "#C4956A",
  },
  {
    name: "Small Group",
    description:
      "Capped at four. A full apparatus class with the same precision as a private, distributed across a small group.",
    session_type: "small_group",
    duration_minutes: 55,
    price_cents: 6500,
    sort_order: 3,
    is_public: true,
    color: "#7A8C72",
  },
];

async function upsertStaff(s: StaffSeed) {
  // Try to find by slug first; if not present, fall back to email.
  const { data: existingBySlug } = await supabase
    .from("staff")
    .select("id")
    .eq("slug", s.slug)
    .maybeSingle();

  if (existingBySlug?.id) {
    const { error } = await supabase
      .from("staff")
      .update({
        first_name: s.first_name,
        last_name: s.last_name,
        email: s.email,
        role: s.role,
        is_public: s.is_public,
        website_bio: s.website_bio,
        specialties: s.specialties,
        photo_url: s.photo_url,
      })
      .eq("id", existingBySlug.id);
    return error;
  }

  const { data: existingByEmail } = await supabase
    .from("staff")
    .select("id")
    .eq("email", s.email)
    .maybeSingle();

  if (existingByEmail?.id) {
    const { error } = await supabase
      .from("staff")
      .update({
        first_name: s.first_name,
        last_name: s.last_name,
        role: s.role,
        slug: s.slug,
        is_public: s.is_public,
        website_bio: s.website_bio,
        specialties: s.specialties,
        photo_url: s.photo_url,
      })
      .eq("id", existingByEmail.id);
    return error;
  }

  const { error } = await supabase.from("staff").insert({
    first_name: s.first_name,
    last_name: s.last_name,
    email: s.email,
    role: s.role,
    slug: s.slug,
    is_public: s.is_public,
    website_bio: s.website_bio,
    specialties: s.specialties,
    photo_url: s.photo_url,
  });
  return error;
}

async function upsertClassType(c: ClassTypeSeed) {
  const { data: existing } = await supabase
    .from("class_types")
    .select("id")
    .eq("name", c.name)
    .maybeSingle();

  if (existing?.id) {
    const { error } = await supabase
      .from("class_types")
      .update({
        description: c.description,
        session_type: c.session_type,
        duration_minutes: c.duration_minutes,
        price_cents: c.price_cents,
        sort_order: c.sort_order,
        is_public: c.is_public,
        color: c.color,
      })
      .eq("id", existing.id);
    return error;
  }

  const { error } = await supabase.from("class_types").insert(c);
  return error;
}

async function main() {
  console.log("Seeding staff (instructors)...");
  for (const s of instructors) {
    const err = await upsertStaff(s);
    if (err) console.error("  staff", s.slug, err.message);
    else console.log("  staff", s.slug, "ok");
  }

  console.log("Seeding class_types...");
  for (const c of classTypes) {
    const err = await upsertClassType(c);
    if (err) console.error("  class_type", c.name, err.message);
    else console.log("  class_type", c.name, "ok");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
