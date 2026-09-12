"use client";

import { useState, useTransition } from "react";
import { submitMobilityLead } from "@/app/actions/lead";

type Status = "idle" | "submitting" | "ok" | "error";

/**
 * Dedicated lead form for the Mobility with Pilates program (Base members).
 * Writes to the same `leads` table as the main form, with source "mobility"
 * so Sara can filter these in the portal. No interest/time chips — these
 * leads get a call or email back.
 */
export function MobilityLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  async function action(formData: FormData) {
    setStatus("submitting");
    setErrorMsg("");
    const result = await submitMobilityLead(formData);
    if (result.ok) {
      setStatus("ok");
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-border bg-surface p-10">
        <p className="font-display text-2xl text-text">Thank you.</p>
        <p className="mt-3 text-base leading-relaxed text-text-2">
          We have your details. We will call or email you within one
          business day to set up your first session.
        </p>
      </div>
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
        <Field
          label="First name"
          name="first_name"
          required
          autoComplete="given-name"
        />
        <Field label="Last name" name="last_name" autoComplete="family-name" />
      </div>
      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
      />
      <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-text">Anything we should know? (optional)</span>
        <textarea
          name="notes"
          rows={4}
          placeholder="Your training at The Base, what you'd like to work on, the best time to reach you."
          className="mt-2 block w-full border border-border bg-surface px-3 py-3 font-sans text-base leading-relaxed text-text outline-none transition-colors placeholder:text-text-3 focus:border-accent-dark"
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-accent-dark">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={isPending || status === "submitting"}
        className="btn btn-primary disabled:opacity-60"
        style={{ backgroundColor: "#8BBE4B", borderColor: "#8BBE4B" }}
      >
        {isPending || status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-text">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
      />
    </label>
  );
}
