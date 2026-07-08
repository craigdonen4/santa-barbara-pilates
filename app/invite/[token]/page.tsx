import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ClaimInviteForm } from "@/components/ClaimInviteForm";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "You're Invited",
  description:
    "A friend has invited you to try a Pilates session together at Santa Barbara Pilates.",
  robots: { index: false }, // personal links — keep out of search results
};

type Invite = {
  host_name: string;
  session_type: "duet" | "trio" | "group";
  payment_mode: "host_pays" | "split";
  status: "open" | "claimed" | "expired";
  message: string | null;
};

const SESSION_LABEL: Record<Invite["session_type"], string> = {
  duet: "a duet — Pilates for two",
  trio: "a trio session",
  group: "a small group session",
};

const SESSION_COUNT: Record<Invite["session_type"], number> = {
  duet: 2,
  trio: 3,
  group: 4,
};

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const { data } = await supabase.rpc("get_invite", { p_token: token });
  const invite = (data?.[0] ?? null) as Invite | null;

  if (!invite) {
    return (
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl text-teal md:text-5xl">
          Invite not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-2">
          This link doesn&apos;t match an invite. Check it was copied
          completely, or ask your friend to send a fresh one.
        </p>
        <Link href="/" className="btn btn-outline mt-8">
          Visit the studio site
        </Link>
      </Container>
    );
  }

  const firstName = invite.host_name.split(" ")[0];

  return (
    <article>
      <header className="bg-teal pt-16 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-surface/75">
            Santa Barbara Pilates
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-surface md:text-6xl">
            {firstName} invited you to try Pilates together
          </h1>
        </Container>
      </header>

      <Container className="pt-10 pb-16 lg:pt-12 lg:pb-24">
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-2" aria-hidden="true">
            {Array.from({ length: SESSION_COUNT[invite.session_type] }).map(
              (_, i) => (
                <Image
                  key={i}
                  src="/reformer-icon-2.png"
                  alt=""
                  width={1159}
                  height={316}
                  className="h-5 w-auto"
                />
              )
            )}
          </div>

          <p className="mt-6 text-base leading-relaxed text-text-2 md:text-lg">
            {invite.host_name} has invited you to{" "}
            {SESSION_LABEL[invite.session_type]} at our private studio in the
            Funk Zone.{" "}
            {invite.payment_mode === "host_pays"
              ? `${firstName} is covering your session — all you need to do is show up.`
              : "You'll each cover your own spot — we'll sort out the details when we confirm times."}
          </p>

          <p className="mt-4 text-base leading-relaxed text-text-2">
            One session, no membership, no commitment. If you love it, we can
            talk about what comes next. If not, you spent an hour moving well
            with a friend.
          </p>

          {invite.message && (
            <blockquote className="mt-8 border-l border-accent pl-5 font-display text-xl italic leading-relaxed text-text">
              &ldquo;{invite.message}&rdquo;
              <footer className="mt-2 font-sans text-sm not-italic text-text-3">
                — {firstName}
              </footer>
            </blockquote>
          )}

          <div className="mt-12">
            {invite.status === "open" ? (
              <ClaimInviteForm token={token} />
            ) : invite.status === "claimed" ? (
              <p className="text-base leading-relaxed text-text-2">
                This invite has already been accepted. If that wasn&apos;t
                you, <Link href="/visit#book" className="link-quiet underline">write to us</Link> and
                we&apos;ll sort it out.
              </p>
            ) : (
              <p className="text-base leading-relaxed text-text-2">
                This invite has expired. Ask {firstName} to send a fresh one —
                they only take a moment.
              </p>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
