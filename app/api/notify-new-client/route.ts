// Called by the SBP Staff app when an instructor adds a new client.
// Reuses the same Resend key and sender as the lead notifications.
import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENTS = ["sara@santabarbarapilates.com"];
const FROM = "Santa Barbara Pilates <studio@santabarbarapilates.com>";

export async function POST(req: Request) {
  let body: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string | null;
    instructor?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const name = `${body.first_name ?? ""} ${body.last_name ?? ""}`.trim();
  if (!name) {
    return NextResponse.json({ error: "Missing client name" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY not configured" },
      { status: 500 }
    );
  }

  const lines = [
    `<p><strong>${name}</strong> was just added as a client from the SBP Staff app.</p>`,
    `<p>Added by: ${body.instructor ?? "unknown"}</p>`,
    body.email ? `<p>Email: ${body.email}</p>` : "",
    body.phone ? `<p>Phone: ${body.phone}</p>` : "",
    `<p>The client is already in the portal under Clients, assigned to ${body.instructor ?? "the instructor"}.</p>`,
  ].filter(Boolean);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENTS,
      subject: `New client — ${name} (added by ${body.instructor ?? "staff"})`,
      html: lines.join("\n"),
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Email send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
