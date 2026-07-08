"use client";

import { useState, useTransition } from "react";
import { claimInvite } from "@/app/actions/invite";

export function ClaimInviteForm({ token }: { token: string }) {
  const [done, setDone] = useState<null | "ok" | "claimed" | "expired">(null);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  async function action(formData: FormData) {
    setError("");
    formData.set("token", token);
    const result = await claimInvite(formData);
    if (result.ok) {
      setDone(result.status);
    } else {
      setError(result.error);
    }
  }

  if (done === "ok") {
    return (
      <div className="border border-border bg-surface p-10">
        <p className="font-display text-2xl text-text">You&apos;re in.</p>
        <p className="mt-3 text-base leading-relaxed text-text-2">
          We&apos;ll reach out within one business day to set a time that
          works for you both. All you need to bring is yourself.
        </p>
      </div>
    );
  }

  if (done === "claimed") {
    return (
      <p className="text-base leading-relaxed text-text-2">
        This invite has already been accepted. If that wasn&apos;t you, write
        to us through the booking page and we&apos;ll sort it out.
      </p>
    );
  }

  if (done === "expired") {
    return (
      <p className="text-base leading-relaxed text-text-2">
        This invite has expired. Ask your friend to send a fresh one — they
        only take a moment.
      </p>
    );
  }

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="space-y-6"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[10000px] h-px w-px"
        aria-hidden="true"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Your name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Your email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
          />
        </label>
      </div>
      <label className="block md:max-w-[50%]">
        <span className="eyebrow">Phone</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
        />
      </label>

      {error && <p className="text-sm text-accent-dark">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary disabled:opacity-60"
      >
        {isPending ? "Confirming…" : "Count me in"}
      </button>
    </form>
  );
}
