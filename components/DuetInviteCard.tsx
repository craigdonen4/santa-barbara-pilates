"use client";

import { useState } from "react";
import {
  commitDuetInvite,
  markDuetForwarded,
} from "@/app/actions/duet";

/** The animated public duet invite. Brand-fixed colors — renders for guests,
 *  outside the portal theme. */
export function DuetInviteCard({
  token,
  prospectName,
  friendName,
  status,
}: {
  token: string;
  prospectName: string;
  friendName: string | null;
  status: "sent" | "forwarded" | "committed";
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [busy, setBusy] = useState(false);
  const [committed, setCommitted] = useState(status === "committed");
  const [shared, setShared] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Be my duet partner",
          text: `${prospectName} wants you as their reformer duet partner at Santa Barbara Pilates.`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
      void markDuetForwarded(token);
      setTimeout(() => setShared(false), 2500);
    } catch {
      // user closed the share sheet — nothing to do
    }
  }

  async function onCommit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await commitDuetInvite({
      token,
      friendName: name,
      friendContact: contact,
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setCommitted(true);
  }

  const inputClass =
    "w-full rounded-xl border border-[#0E5C6A]/25 bg-white px-3 py-2.5 text-sm text-[#2C2A25] placeholder:text-[#2C2A25]/40 focus:border-[#0E5C6A] focus:outline-none";

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#F7F3EC] px-4 py-12">
      <style>{`
        @keyframes sbpFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(14px, -18px) scale(1.08); }
        }
        @keyframes sbpFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-18px, 14px) scale(1.1); }
        }
        @keyframes sbpRise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sbpTogether {
          0% { transform: translateX(-14px); opacity: 0.4; }
          60% { transform: translateX(3px); opacity: 1; }
          100% { transform: translateX(0); }
        }
        @keyframes sbpTogether2 {
          0% { transform: translateX(14px); opacity: 0.4; }
          60% { transform: translateX(-3px); opacity: 1; }
          100% { transform: translateX(0); }
        }
        .sbp-rise { animation: sbpRise 0.7s ease-out both; }
        .sbp-rise-2 { animation: sbpRise 0.7s 0.25s ease-out both; }
        .sbp-rise-3 { animation: sbpRise 0.7s 0.5s ease-out both; }
      `}</style>

      {/* Floating brand blobs */}
      <div
        aria-hidden
        className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#0E5C6A]/10 blur-2xl"
        style={{ animation: "sbpFloat 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#CBA85C]/15 blur-2xl"
        style={{ animation: "sbpFloat2 11s ease-in-out infinite" }}
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgba(14,92,106,0.14)]">
          {/* Two rings meeting — the duet */}
          <div className="sbp-rise mx-auto flex w-fit items-center">
            <span
              className="h-14 w-14 rounded-full border-[3px] border-[#0E5C6A]"
              style={{ animation: "sbpTogether 1.2s ease-out both" }}
            />
            <span
              className="-ml-5 h-14 w-14 rounded-full border-[3px] border-[#CBA85C]"
              style={{ animation: "sbpTogether2 1.2s ease-out both" }}
            />
          </div>

          <p className="sbp-rise mt-5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#8a6d2e]">
            Santa Barbara Pilates
          </p>

          {committed ? (
            <div className="sbp-rise-2 mt-4 text-center">
              <h1 className="font-serif text-2xl leading-snug text-[#0E5C6A]">
                It is a duet.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#2C2A25]/75">
                {friendName || name
                  ? `${prospectName} and ${friendName || name} — the studio will text you both to set the first session.`
                  : "The studio will reach out to set your first session."}
              </p>
            </div>
          ) : (
            <>
              <div className="sbp-rise-2 mt-4 text-center">
                <h1 className="font-serif text-2xl leading-snug text-[#0E5C6A]">
                  {prospectName} wants a duet partner.
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-[#2C2A25]/75">
                  A duet is a semi-private reformer session for two — one
                  instructor, two reformers, half the cost of a private. All it
                  needs is a partner.
                </p>
              </div>

              <div className="sbp-rise-3 mt-6 space-y-3">
                {!showForm ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="w-full rounded-xl bg-[#0E5C6A] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a4855]"
                    >
                      I am in — count me as the partner
                    </button>
                    <button
                      type="button"
                      onClick={onShare}
                      className="w-full rounded-xl border border-[#0E5C6A]/30 bg-white py-3 text-sm font-semibold text-[#0E5C6A] transition-colors hover:bg-[#F7F3EC]"
                    >
                      {shared ? "Sent" : "Pass this to a friend"}
                    </button>
                  </>
                ) : (
                  <form onSubmit={onCommit} className="space-y-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                      required
                    />
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Phone or email"
                      className={inputClass}
                      required
                    />
                    {error && (
                      <p className="text-sm text-[#9d3c23]">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={busy}
                      className="w-full rounded-xl bg-[#0E5C6A] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a4855] disabled:opacity-60"
                    >
                      {busy ? "Sending…" : "Commit to the duet"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-full text-center text-xs text-[#2C2A25]/50 underline-offset-4 hover:underline"
                    >
                      Back
                    </button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-[#2C2A25]/50">
          santabarbarapilates.com
        </p>
      </div>
    </div>
  );
}
