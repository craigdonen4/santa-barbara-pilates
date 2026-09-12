"use client";

// Circular "Book Now" button beside the /mobility hero title. Opens the
// booking form (same MobilityLeadForm as the bottom section) in a modal.

import { useEffect, useState } from "react";
import { MobilityLeadForm } from "./MobilityLeadForm";

const GREEN = "#8BBE4B";

export function MobilityBook() {
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
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white text-center text-sm font-extrabold uppercase leading-tight tracking-wide text-white shadow-lg transition-transform hover:scale-105 md:h-32 md:w-32 md:text-base"
        style={{ backgroundColor: GREEN }}
      >
        Book
        <br />
        Now
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book your Mobility with Pilates session"
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#141414] px-6 py-4">
              <p className="text-sm font-extrabold uppercase tracking-wide text-[#F5F0E8]">
                Book your session
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
            <div className="px-6 py-6">
              <div className="mb-6 flex items-start justify-between gap-5">
                <p className="text-sm leading-relaxed text-[#5C5850]">
                  Leave your details and we will call or email you within one
                  business day to set up your first session.
                </p>
                <img
                  src="/mobility-tree.png"
                  alt="Standing balance work outdoors at The Base"
                  className="h-24 w-24 shrink-0 rounded-full border-4 object-cover md:h-28 md:w-28"
                  style={{ borderColor: GREEN }}
                />
              </div>
              <MobilityLeadForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
