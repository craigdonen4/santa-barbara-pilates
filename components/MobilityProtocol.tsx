"use client";

// "See the full session" button + modal on /mobility. Shows the client
// version of the session protocol — exercise names, flow, and reps, without
// the internal card's spring settings, coaching notes, or sign-off lines.

import { useEffect, useState } from "react";

const GREEN = "#8BBE4B";

const BLOCKS: {
  tag: string;
  title: string;
  groups: { label: string; items: string[] }[];
}[] = [
  {
    tag: "Block 1 · 20 min",
    title: "Core, Hips & Glutes",
    groups: [
      {
        label: "Circuit 1 — Hips · 2 rounds",
        items: [
          "Banded lateral walks — 10 steps each way",
          "Side-lying clams — 12/side",
          "Banded leg raises → clam pulses — 10/side",
          "Bird dogs — 8/side, slow",
        ],
      },
      {
        label: "Circuit 2 — Core & Posterior · 2 rounds",
        items: [
          "Mountain climbers — 20, controlled",
          "Front plank → shoulder taps — 30 sec + 10",
          "Back extension reachers → Y-T flys — 8 + 8",
          "Kneeling thoracic twists — 8/side",
        ],
      },
    ],
  },
  {
    tag: "Block 2 · 20 min",
    title: "The Reformer",
    groups: [
      {
        label: "A fixed sequence on the apparatus",
        items: [
          "Footwork series — toes, arches, heels, tendon stretch",
          "Elephant — hamstrings & calves",
          "Feet in straps — frogs, leg circles, openings",
          "Kneeling arms in straps — chest expansion, hug-a-tree",
          "Mermaid with rotation",
          "Eve's lunge — deep hip-flexor lengthener",
        ],
      },
    ],
  },
  {
    tag: "Block 3 · 20 min",
    title: "Mobility, Yoga & Recovery",
    groups: [
      {
        label: "Standing flow",
        items: [
          "Psoas stance · single-leg stance · wide stance",
          "Downdog → updog — slow cycles",
          "Runner's lunge with reach",
        ],
      },
      {
        label: "Floor + band",
        items: [
          "Banded hamstring stretch → thoracic twist",
          "Pigeon or figure-4",
        ],
      },
      {
        label: "Shoulders & finish",
        items: [
          "Banded rotator cuff work",
          "Thera Gun on the lat while reaching overhead",
          "Trainer-assisted stretching",
          "Thera Gun sweep — glutes, hamstrings, lats",
        ],
      },
    ],
  },
];

export function MobilityProtocol() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-block rounded-md px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: GREEN }}
      >
        See the full session
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobility with Pilates — the full session"
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#141414] px-6 py-4">
              <p className="text-sm font-extrabold uppercase tracking-wide text-[#F5F0E8]">
                The full session — 60 minutes
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-2xl leading-none text-[#F5F0E8]/80 hover:text-white"
              >
                &times;
              </button>
            </div>

            <div className="space-y-8 px-6 py-6">
              {BLOCKS.map((block) => (
                <div key={block.tag}>
                  <span
                    className="inline-block rounded px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    {block.tag}
                  </span>
                  <h3 className="mt-2 text-xl font-extrabold text-[#141414]">
                    {block.title}
                  </h3>
                  {block.groups.map((g) => (
                    <div key={g.label} className="mt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#9A9488]">
                        {g.label}
                      </p>
                      <ul className="mt-1.5 space-y-1.5">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[15px] leading-snug text-[#2C2A25]"
                          >
                            <span
                              className="mt-0.5 flex h-4.5 w-4.5 h-[18px] w-[18px] shrink-0 items-center justify-center rounded text-[10px] font-bold text-white"
                              style={{ backgroundColor: GREEN }}
                              aria-hidden="true"
                            >
                              &#10003;
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}

              <p className="border-t border-[#E2DDD6] pt-4 text-sm leading-relaxed text-[#5C5850]">
                Program designed by Santa Barbara Pilates and delivered as a
                fixed sequence by trainers certified on the protocol. Every
                session ends with hands-on stretching and Thera Gun recovery.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
