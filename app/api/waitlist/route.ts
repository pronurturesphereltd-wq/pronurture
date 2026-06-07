/**
 * app/api/waitlist/route.ts — Waitlist form submission API route
 *
 * Route: POST /api/waitlist
 *
 * Why this exists:
 *   The waitlist form previously called Make.com directly from the browser,
 *   which required `mode: 'no-cors'` and returned an opaque response — meaning
 *   we could never confirm whether the submission actually succeeded. By routing
 *   through this server-side handler, we:
 *     1. Avoid CORS entirely (server-to-server fetch has no browser origin policy)
 *     2. Validate the payload before it leaves our infrastructure
 *     3. Return a real JSON response the client can read and act on
 *
 * Request body (JSON):
 *   { name, email, userType }                     — full waitlist form
 *   { ..., profession }   when userType === "Healthcare Professional"
 *   { ..., facilityType } when userType === "Healthcare Facility / Employer"
 *   { email, source }     — quick-capture forms (e.g. employers/professionals CTA)
 *                           name is optional; source tags the origin for CRM segmentation
 *
 * Responses:
 *   200  { success: true }
 *   400  { success: false, error: "..." }   — validation failure
 *   500  { success: false, error: "..." }   — Make.com / server error
 */

import { NextResponse } from "next/server";

/** Make.com webhook — receives the JSON payload and routes it to CRM + welcome email */
const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/km9hduqfg83mft3u8j9k3e2qqnr92f00";

export async function POST(request: Request) {
  try {
    /** ── Parse request body ────────────────────────────────────────────── */
    let body: Record<string, string>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, userType, profession, facilityType, source } = body;

    /** ── Server-side validation ────────────────────────────────────────── */
    // name is optional — quick-capture forms (employer/professionals CTA) only collect email
    if (name !== undefined && name !== null && !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name cannot be blank." },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /** ── Build the forwarding payload ──────────────────────────────────── */
    const payload: Record<string, string> = {
      email: email.trim(),
      userType: userType || "Other",
      /**
       * Only include optional fields when they carry a real value.
       * This keeps the Make.com payload clean — downstream automation can
       * reliably check for field presence rather than empty strings.
       */
      ...(name         ? { name: name.trim() } : {}),
      ...(profession   ? { profession }         : {}),
      ...(facilityType ? { facilityType }       : {}),
      ...(source       ? { source }             : {}),
    };

    /** ── Forward to Make.com webhook (server-side, no CORS) ────────────── */
    const makeResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!makeResponse.ok) {
      console.error(
        `[waitlist] Make.com webhook returned ${makeResponse.status}`
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "We could not save your registration right now. Please try again in a moment.",
        },
        { status: 500 }
      );
    }

    /** ── Success ───────────────────────────────────────────────────────── */
    return NextResponse.json({ success: true });
  } catch (error) {
    /** Catch-all: network failure reaching Make.com, or unexpected throw */
    console.error("[waitlist] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please check your connection and try again.",
      },
      { status: 500 }
    );
  }
}
