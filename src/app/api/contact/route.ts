import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const limits = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

const rateLimit = { windowMs: 60_000, max: 5 } as const;

/*
 * Per-instance, in-memory only: it resets on redeploy and doesn't span
 * instances. Enough to stop casual form hammering, not a determined attacker.
 */
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const cutoff = now - rateLimit.windowMs;
  const recent = (hits.get(key) ?? []).filter((at) => at > cutoff);

  if (recent.length >= rateLimit.max) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 10_000) hits.clear();
  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function bad(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return bad("Unsupported media type", 415);
  }

  if (isRateLimited(clientKey(request))) {
    return bad("Too many messages. Please try again in a minute.", 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return bad("Invalid JSON body", 400);
  }

  const { name, email, message, botcheck } = (payload ?? {}) as Record<string, unknown>;

  /*
   * Honeypot: an off-screen checkbox no human sees or ticks, and that no
   * autofill profile will ever check. Report success so the bot doesn't learn
   * it was filtered, but drop the message.
   */
  if (botcheck === true) {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return bad("Name is required", 422);
  }
  if (typeof email !== "string" || !emailPattern.test(email.trim())) {
    return bad("A valid email is required", 422);
  }
  if (typeof message !== "string" || message.trim().length === 0) {
    return bad("Message is required", 422);
  }
  if (
    name.length > limits.name ||
    email.length > limits.email ||
    message.length > limits.message
  ) {
    return bad(
      `Name must be under ${limits.name}, email under ${limits.email} and message under ${limits.message} characters`,
      422,
    );
  }

  const entry = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    /*
     * Never report success we can't deliver. In development the message is
     * logged so the form stays testable; in production this is a config error.
     */
    if (process.env.NODE_ENV === "production") {
      console.error(
        "CONTACT_WEBHOOK_URL is not set — refusing to drop a contact message silently.",
      );
      return bad("Message delivery is not configured", 503);
    }
    console.info("Contact message (development, not delivered)", {
      name: entry.name,
      email: entry.email,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("Contact webhook delivery failed", error);
    return bad("Unable to deliver message", 502);
  }

  return NextResponse.json({ ok: true });
}
