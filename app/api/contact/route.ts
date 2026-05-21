import { NextRequest, NextResponse } from "next/server";
import type { ContactFormData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactFormData;

    // Honeypot check
    if (body._honeypot) {
      return NextResponse.json({ ok: true }); // silently discard bots
    }

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ── Email delivery ────────────────────────────────────────────────────
    // Option A: Resend SDK  (npm install resend)
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: "portfolio@alex.dev",
    //     to: "hello@alex.dev",
    //     subject: `[Portfolio] ${body.subject}`,
    //     text: `From: ${body.name} <${body.email}>\n\n${body.message}`,
    //   });

    // For now: log to server console (works for local dev)
    console.log("[Contact form]", {
      name:    body.name,
      email:   body.email,
      subject: body.subject,
      message: body.message.slice(0, 120),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
