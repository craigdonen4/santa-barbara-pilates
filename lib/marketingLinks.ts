// Shared helpers for the hidden, link-only marketing pages (gift
// certificates, promo flyers, duet invites). These pages are created and
// managed in the staff portal; this site only renders them for recipients.

/** Public URL for a file in the shared `marketing` storage bucket. */
export function marketingAssetUrl(storagePath: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/marketing/${storagePath}`;
}

/** Each gift certificate's designed artwork lives at a fixed bucket path. */
export function giftCertImageUrl(certId: string): string {
  return marketingAssetUrl(`gift-certs/${certId}.png`);
}

/** Link-only pages: never indexed, never in the sitemap, no site nav. */
export const HIDDEN_PAGE_ROBOTS = { index: false, follow: false } as const;
