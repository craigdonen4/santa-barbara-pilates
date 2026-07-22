"use client";

import { useState, useTransition } from "react";
import { submitLead } from "@/app/actions/lead";

type Status = "idle" | "submitting" | "ok" | "error";

// These MUST match the portal's option strings exactly (lib/leads.ts →
// INTEREST_OPTIONS / TIME_OPTIONS) so the portal's toggles highlight them.
const INTEREST_OPTIONS = ["Private", "Duet", "Group"] as const;
const TIME_OPTIONS = [
  "Early morning",
  "Morning",
  "Midday",
  "Afternoon",
  "Evening",
] as const;

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  // Interest is single-select (pick one primary format); times are multi.
  const [interest, setInterest] = useState<string>("");
  const [times, setTimes] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function toggleTime(value: string) {
    setTimes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function action(formData: FormData) {
    setStatus("submitting");
    setErrorMsg("");
    formData.set("interest", interest);
    formData.set("preferred_time", times.join(","));
    const result = await submitLead(formData);
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
          Your note is with us. We will reply within a business day.
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

      <Chips
        label="What are you interested in?"
        options={INTEREST_OPTIONS}
        selected={interest ? [interest] : []}
        onToggle={(v) => setInterest((prev) => (prev === v ? "" : v))}
      />

      <Chips
        label="Preferred time (optional)"
        options={TIME_OPTIONS}
        selected={times}
        onToggle={toggleTime}
      />

      <FieldArea
        label="A little about you"
        name="notes"
        placeholder="Your history with Pilates, what you would like to work on, when you might like to come in."
      />

      {status === "error" && (
        <p className="text-sm text-accent-dark">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={isPending || status === "submitting"}
        className="btn btn-primary disabled:opacity-60"
      >
        {isPending || status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

function Chips({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <span className="eyebrow">{label}</span>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const on = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              aria-pressed={on}
              className={`border px-4 py-2 text-sm transition-colors ${
                on
                  ? "border-text bg-text text-surface"
                  : "border-border bg-transparent text-text-2 hover:border-text-3"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
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
      <span className="eyebrow">{label}</span>
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

function FieldArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <textarea
        name={name}
        rows={5}
        placeholder={placeholder}
        className="mt-2 block w-full border border-border bg-surface px-3 py-3 font-sans text-base leading-relaxed text-text outline-none transition-colors placeholder:text-text-3 focus:border-accent-dark"
      />
    </label>
  );
}
