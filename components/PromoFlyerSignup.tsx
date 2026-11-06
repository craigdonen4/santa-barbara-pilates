"use client";

import { useState } from "react";
import { submitPromoSignup } from "@/app/actions/promo";

/** Signup form at the bottom of a texted promo flyer. */
export function PromoFlyerSignup({
  packageId,
  ctaText,
}: {
  packageId: string;
  ctaText: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [honey, setHoney] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await submitPromoSignup({
      packageId,
      name,
      email,
      phone,
      note,
      website: honey,
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="py-2 text-center">
        <p className="font-serif text-xl text-[#0E5C6A]">You are in.</p>
        <p className="mt-1 text-sm text-[#2C2A25]/70">
          The studio will reach out shortly to set you up.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[#0E5C6A]/25 bg-white px-3 py-2.5 text-sm text-[#2C2A25] placeholder:text-[#2C2A25]/40 focus:border-[#0E5C6A] focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6d2e]">
        Reserve your spot
      </p>
      {/* Honeypot — real people never see or fill this. */}
      <input
        type="text"
        name="website"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className={inputClass}
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          type="tel"
          className={inputClass}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className={inputClass}
        />
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Anything we should know (optional)"
        rows={2}
        className={inputClass}
      />
      {error && <p className="text-sm text-[#9d3c23]">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-[#0E5C6A] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a4855] disabled:opacity-60"
      >
        {busy ? "Sending…" : ctaText}
      </button>
    </form>
  );
}
