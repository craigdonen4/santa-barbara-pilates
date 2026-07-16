"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { enterRaffle } from "@/app/actions/raffle";

const STATIONS = [
  {
    id: "gym",
    num: "01",
    title: "The Gym",
    blurb: "Where The Base does its heavy lifting.",
  },
  {
    id: "bathrooms",
    num: "02",
    title: "The Bathrooms",
    blurb: "Yes, really. We're proud of them.",
  },
  {
    id: "courtyard",
    num: "03",
    title: "The Courtyard",
    blurb: "Fresh air between sets.",
  },
  {
    id: "recovery",
    num: "04",
    title: "The Recovery Area",
    blurb: "Slow down. That's the point.",
  },
  {
    id: "pilates",
    num: "05",
    title: "The Pilates Studio",
    blurb: "Our quiet room. The reason you're here.",
  },
];

export function RaffleForm() {
  const [seen, setSeen] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const allSeen = seen.length === STATIONS.length;

  function toggle(id: string) {
    setSeen((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  }

  async function action(formData: FormData) {
    setError("");
    formData.set("stops", seen.join(","));
    const result = await enterRaffle(formData);
    if (result.ok) setDone(true);
    else setError(result.error);
  }

  if (done) {
    return (
      <div className="border border-border bg-surface p-10 text-center">
        <Image
          src="/sbp-mark-clear.png"
          alt=""
          width={452}
          height={1075}
          className="mx-auto h-24 w-auto"
        />
        <p className="font-display mt-6 text-3xl text-teal">
          You&apos;re in the drawing.
        </p>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-text-2">
          Thanks for taking the Grand Tour. Winners are announced before
          2&nbsp;PM — keep your phone close.
        </p>
      </div>
    );
  }

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="space-y-10"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[10000px] h-px w-px"
        aria-hidden="true"
      />

      {/* The Grand Tour checklist */}
      <fieldset>
        <div className="flex items-baseline justify-between gap-4">
          <legend className="eyebrow">The Grand Tour</legend>
          <span
            className={`font-display text-2xl ${
              allSeen ? "text-teal" : "text-text-3"
            }`}
            aria-live="polite"
          >
            {seen.length} of {STATIONS.length}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-2">
          See all five corners of the new home, tap each one off as you go.
        </p>
        <div className="mt-5 grid gap-3">
          {STATIONS.map((s) => {
            const on = seen.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggle(s.id)}
                aria-pressed={on}
                className={`flex items-center gap-5 border p-5 text-left transition-all ${
                  on
                    ? "border-teal bg-teal"
                    : "border-border bg-surface hover:border-text-3"
                }`}
              >
                <span
                  className={`font-display text-2xl ${
                    on ? "text-surface/70" : "text-accent-dark"
                  }`}
                >
                  {on ? "✓" : s.num}
                </span>
                <span className="flex-1">
                  <span
                    className={`font-display block text-xl leading-snug ${
                      on ? "text-surface" : "text-text"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`mt-0.5 block text-sm ${
                      on ? "text-surface/75" : "text-text-2"
                    }`}
                  >
                    {s.blurb}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Contact */}
      <fieldset>
        <legend className="eyebrow">Your ticket details</legend>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="eyebrow">Name</span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
            />
          </label>
          <label className="block">
            <span className="eyebrow">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
            />
          </label>
          <label className="block">
            <span className="eyebrow">Phone</span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="mt-2 block w-full border-b border-border bg-transparent px-1 py-2 font-sans text-base text-text outline-none transition-colors focus:border-accent-dark"
            />
          </label>
        </div>
      </fieldset>

      {error && <p className="text-sm text-accent-dark">{error}</p>}

      <button
        type="submit"
        disabled={!allSeen || isPending}
        className="btn btn-primary w-full disabled:opacity-50 md:w-auto"
      >
        {isPending
          ? "Entering…"
          : allSeen
            ? "Enter me in the raffle"
            : `${STATIONS.length - seen.length} more stop${
                STATIONS.length - seen.length === 1 ? "" : "s"
              } to go`}
      </button>
    </form>
  );
}
