# TODO — security work deferred until after marketing-site launch

This file tracks security-sensitive work that was intentionally deferred so the
marketing site could ship first. **Every item below must be complete before the
portal (`sbp-portal-v1.html`) is exposed to the public internet under
`santabarbarapilates.com` or any production hostname.**

Last updated: 2026-05-27.

---

## 1. Full RLS rollout on the remaining 24 tables

**State today.** Migration `001_marketing_site.sql` enabled Row Level Security
on only `staff`, `class_types`, and `leads`. The other 24 tables in the SBP
project (`zcyqhmsggjlqlhoygyll`) remain with RLS **disabled**:

```
app_settings · checkin_log · class_schedule · client_notes · front_desk_staff
group_session_log · member_notes · members · visitors · announcements · classes
contact_requests · front_desk_invoices · front_desk_schedule · new_client_queue
payments · session_log · sessions · staff_schedules · trainer_invoices
trainer_leave · trainer_messages · trainer_submissions · bookings
```

**Risk.** Anyone with the anon publishable key (`sb_publishable_…`) — which is
shipped in every browser that loads either the marketing site or the portal —
can `select`, `insert`, `update`, and `delete` any row in any of these tables.
That includes members, payments, client notes, and trainer invoices.

**Why deferred.** The portal currently relies on this for read access. Until
the portal has an auth session (item 2), enabling RLS without policies would
break it.

**Must complete before portal launches publicly.**

---

## 2. Portal auth migration (login + manager PIN) from `index187.html`

**State today.** `sbp-portal-v1.html` talks to Supabase with the anon key and
no user session. Manager PIN is checked client-side against
`app_settings.value where key = 'manager_pin'` (line ~1837 of the portal),
which is readable by anyone with the anon key today, and will silently fail
once RLS is enabled on `app_settings`.

**Work to do.** Port the login flow and manager-PIN check from
`~/Downloads/index187.html` into `sbp-portal-v1.html`:

1. Wire `supabase.auth.signInWithPassword` / `signInWithOtp` (whichever
   index187 uses) into the portal entry point.
2. Replace the unauthenticated `_db = supabase` with a client that carries the
   logged-in session, so portal reads run as `authenticated` (matching the
   `staff authenticated read all` / `class_types authenticated read all`
   policies in migration 001).
3. Move the manager-PIN check server-side, or store the PIN hash in a row that
   is only readable to authenticated staff.
4. Add RLS policies for every portal table — patterned on the marketing-site
   policies — that grant access to the `authenticated` role.

**Must complete before portal launches publicly.**

---

## 3. Stripe webhook signature verification on `stripe-handler`

**State today.** The Supabase Edge Function `stripe-handler` in the SBP project
accepts any JSON body with a `type` field as a Stripe webhook event. It has
**no signature verification** and is deployed with `verify_jwt: false`,
meaning no Supabase auth header is required either.

**Risk.** Anyone who knows the function URL can `POST` a forged
`checkout.session.completed` body containing an arbitrary `member_id` in the
metadata, and the function will flip
`members.membership_status` to `'active'` and write a
`stripe_customer_id` — a free membership for anyone who calls the endpoint
with the right payload.

**Work to do.**

1. Add `STRIPE_WEBHOOK_SECRET` to the function's secrets in Supabase.
2. Read the raw request body (not `req.json()`), get the `Stripe-Signature`
   header, and verify with the Stripe SDK's `constructEvent` before acting on
   any event.
3. Reject non-webhook requests on the webhook path. Separate the action-RPC
   endpoint from the webhook endpoint, or branch on the presence of the
   `Stripe-Signature` header.
4. Leave `verify_jwt: false` only on the webhook path; require JWT for the
   action-RPC calls so the portal must be authenticated to invoke them.

**Must complete before portal launches publicly.**

---

## 4. Missing `smart-service` edge function — decide deploy or delete

**State today.** `sbp-portal-v1.html` references
`https://zcyqhmsggjlqlhoygyll.supabase.co/functions/v1/smart-service` in two
places (visitor pass charge flow at L3046; DocuSeal e-signature dispatch via
`DOCUSEAL_FN` at L5234). The function is **not deployed** in the SBP project —
only `stripe-handler` is. Both code paths currently 404.

**Work to do — pick one.**

- **Deploy it.** Locate the source (likely in an earlier portal repo or
  alongside the original DocuSeal integration) and deploy via
  `deploy_edge_function`. Add `DOCUSEAL_API_TOKEN` and any visitor-pass secrets.
- **Delete the references.** If neither code path is in use, remove the
  visitor-pass inline `fetch` and the `signSend` helper from the portal.

**Must complete before portal launches publicly.**

---

## 5. `APP_URL` in `stripe-handler` hardcoded to Netlify staging host

**State today.** Line 2 of `stripe-handler/index.ts` reads:

```ts
const APP_URL = 'https://sbpilatesmanagmentpro.netlify.app';
```

Every Stripe Checkout `success_url` and `cancel_url` returns users to that
host. The Stripe Billing Portal's `return_url` falls back to the same constant.

**Risk.** After DNS cutover, users who finish a checkout from
`santabarbarapilates.com` will be bounced to the old Netlify hostname.

**Work to do.** Replace the constant with an env var
(`Deno.env.get('APP_URL')`), set it to the production hostname in Supabase
function secrets, and redeploy.

**Must complete before portal launches publicly.**

---

## Other notes — not blocking, but worth tracking

- **`payments` table has Stripe columns but is never written.**
  `stripe_payment_intent_id`, `stripe_invoice_id`, `stripe_subscription_id`
  exist on `public.payments` but neither the portal nor `stripe-handler`
  inserts rows. No internal ledger of charges; reporting reads back from
  Stripe live. Decide: wire the webhook to write a `payments` row per
  successful charge, or drop the unused columns.

- **The legacy anon JWT key is enabled alongside the modern publishable key.**
  Sara has both `anon` (legacy JWT) and `sb_publishable_…` (modern) enabled on
  the SBP project. The marketing site `.env.local` currently uses the legacy
  JWT. Migrate to the publishable key when convenient, and disable the legacy
  one to reduce surface area.

- **Two portal files exist on disk.** `~/Downloads/sbp-portal-v1.html` (May 27,
  current, ~684 KB) and `~/Downloads/sbp-portal-26.html` (Apr 5, pre-Stripe,
  ~98 KB). Confirm which is canonical, archive the other, and put the live
  copy under version control before any further edits.
