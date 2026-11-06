"use client";

/** Animated public gift certificate page. Brand-fixed colors — renders for
 *  gift recipients, outside the portal theme. The certificate rises in with
 *  a gold shimmer sweep; a ribbon line of copy leads it. */
export function GiftReveal({
  title,
  description,
  value,
  terms,
  artUrl,
  recipientName,
}: {
  title: string;
  description: string;
  value: number;
  terms: string;
  artUrl: string | null;
  /** Issued certificates carry the recipient's name on the reveal. */
  recipientName?: string | null;
}) {
  return (
    <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#F7F3EC] px-4 py-12">
      <style>{`
        @keyframes giftRise {
          from { opacity: 0; transform: translateY(26px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes giftFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes giftShimmer {
          0% { transform: translateX(-130%) skewX(-18deg); }
          100% { transform: translateX(230%) skewX(-18deg); }
        }
        @keyframes giftFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12px, -16px) scale(1.07); }
        }
        @keyframes giftFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-16px, 12px) scale(1.09); }
        }
        @keyframes giftTwinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1); }
        }
        .gift-eyebrow { animation: giftFade 0.8s 0.15s ease-out both; }
        .gift-card { animation: giftRise 0.9s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .gift-foot { animation: giftFade 0.8s 1.1s ease-out both; }
      `}</style>

      {/* Floating brand blobs */}
      <div
        aria-hidden
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#0E5C6A]/10 blur-2xl"
        style={{ animation: "giftFloat 10s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-[#CBA85C]/15 blur-2xl"
        style={{ animation: "giftFloat2 12s ease-in-out infinite" }}
      />
      {/* Gold twinkles */}
      {[
        ["12%", "18%", "0s"],
        ["85%", "24%", "1.2s"],
        ["8%", "78%", "2.1s"],
        ["90%", "70%", "0.7s"],
      ].map(([left, top, delay]) => (
        <span
          key={`${left}-${top}`}
          aria-hidden
          className="absolute h-1.5 w-1.5 rounded-full bg-[#CBA85C]"
          style={{
            left,
            top,
            animation: `giftTwinkle 3.6s ${delay} ease-in-out infinite`,
          }}
        />
      ))}

      <div className="relative w-full max-w-2xl">
        <p className="gift-eyebrow text-center text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6d2e]">
          {recipientName
            ? `A gift for ${recipientName}`
            : "You have received a gift"}
        </p>

        <div className="gift-card relative mt-5">
          {artUrl ? (
            <div className="relative overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(14,92,106,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artUrl}
                alt={`${title} gift certificate from Santa Barbara Pilates`}
                className="w-full"
              />
              {/* One gold shimmer sweep across the certificate */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                style={{ animation: "giftShimmer 1.6s 1.3s ease-in-out both" }}
              />
            </div>
          ) : (
            <div className="relative rounded-3xl border-2 border-[#0E5C6A]/60 bg-white p-8 shadow-[0_8px_30px_rgba(14,92,106,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sbp-feather.png"
                alt=""
                className="absolute right-7 top-6 h-16 w-auto"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6d2e]">
                Gift certificate
              </p>
              <h1 className="mt-3 font-serif text-3xl text-[#0E5C6A]">{title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-[#2C2A25]/80">
                {description}
              </p>
              <p className="mt-6 font-serif text-4xl text-[#2C2A25]">
                ${value.toFixed(0)}
              </p>
              <div className="mt-6 border-t border-dashed border-[#0E5C6A]/30 pt-4">
                <p className="text-xs text-[#2C2A25]/60">{terms}</p>
              </div>
            </div>
          )}
        </div>

        <div className="gift-foot mx-auto mt-6 max-w-md rounded-xl bg-white p-4 text-center shadow-sm">
          <p className="text-sm text-[#2C2A25]">
            To redeem, call or text the studio at (805) 635-8337
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0E5C6A]">
            Santa Barbara Pilates · santabarbarapilates.com
          </p>
        </div>
      </div>
    </div>
  );
}
