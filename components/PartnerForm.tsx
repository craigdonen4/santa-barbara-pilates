"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { createInvite } from "@/app/actions/invite";

const SESSION_TYPES = [
  { value: "duet", label: "Duet", people: 2 },
  { value: "trio", label: "Trio", people: 3 },
  { value: "group", label: "Group of four or more", people: 4 },
] as const;

function ReformerRow({ count }: { count: number }) {
  return (
    <span className="flex flex-wrap justify-center gap-1.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          src="/reformer-icon-2.png"
          alt=""
          width={1159}
          height={316}
          className="h-3.5 w-auto"
        />
      ))}
    </span>
  );
}

export function PartnerForm() {
  const [sessionType, setSessionType] = useState<string>("duet");
  const [paymentMode, setPaymentMode] = useState<string>("host_pays");
  const [link, setLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  async function action(formData: FormData) {
    setError("");
    formData.set("session_type", sessionType);
    formData.set("payment_mode", paymentMode);
    const result = await createInvite(formData);
    if (result.ok) {
      setLink(`${window.location.origin}/invite/${result.token}`);
    } else {
      setError(result.error);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fall through — the link is visible and selectable either way
    }
  }

  if (link) {
    return (
      <div className="border border-border bg-surface p-10">
        <p className="font-display text-2xl text-text">Your invite is ready.</p>
        <p className="mt-3 text-base leading-relaxed text-text-2">
          Send this link to your friend. It&apos;s good for thirty days —
          we&apos;ll take care of the rest when they accept.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <code className="max-w-full overflow-x-auto border border-border bg-bg px-4 py-3 text-sm text-text">
            {link}
          </code>
          <button type="button" onClick={copy} className="btn btn-primary">
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="space-y-8"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[10000px] h-px w-px"
        aria-hidden="true"
      />

      {/* Session type */}
      <fieldset>
        <legend className="eyebrow">The session</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {SESSION_TYPES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSessionType(s.value)}
              aria-pressed={sessionType === s.value}
              className={`flex flex-col items-center gap-3 border p-5 text-center transition-colors ${
                sessionType === s.value
                  ? "border-text bg-surface"
                  : "border-border bg-transparent hover:border-text-3"
              }`}
            >
              <span className="font-display text-xl leading-snug text-text">
                {s.label}
              </span>
              <ReformerRow count={s.people} />
            </button>
          ))}
        </div>
      </fieldset>

      {/* Who pays */}
      <fieldset>
        <legend className="eyebrow">Who pays</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setPaymentMode("host_pays")}
            aria-pressed={paymentMode === "host_pays"}
            className={`border p-5 text-left transition-colors ${
              paymentMode === "host_pays"
                ? "border-text bg-surface"
                : "border-border bg-transparent hover:border-text-3"
            }`}
          >
            <span className="font-display text-xl text-text">My treat</span>
            <span className="mt-2 block text-sm leading-relaxed text-text-2">
              You cover both spots. Your friend just shows up.
            </span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMode("split")}
            aria-pressed={paymentMode === "split"}
            className={`border p-5 text-left transition-colors ${
              paymentMode === "split"
                ? "border-text bg-surface"
                : "border-border bg-transparent hover:border-text-3"
            }`}
          >
            <span className="font-display text-xl text-text">
              We each pay our own
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-text-2">
              Each of you covers your own spot.
            </span>
          </button>
        </div>
      </fieldset>

      {/* Contact */}
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Your name</span>
          <input
            name="host_name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Your email</span>
          <input
            name="host_email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
          />
        </label>
      </div>

      <label className="block">
        <span className="eyebrow">A note for your friend (optional)</span>
        <textarea
          name="message"
          rows={3}
          placeholder="Come try this with me — I think you'll love it."
          className="mt-2 block w-full border border-border bg-surface px-3 py-3 font-sans text-base leading-relaxed text-text outline-none transition-colors placeholder:text-text-3 focus:border-accent-dark"
        />
      </label>

      {error && <p className="text-sm text-accent-dark">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary disabled:opacity-60"
      >
        {isPending ? "Creating…" : "Create my invite link"}
      </button>
    </form>
  );
}
