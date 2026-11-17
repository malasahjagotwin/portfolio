import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, message } = (payload ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    typeof email !== "string" ||
    !emailPattern.test(email.trim()) ||
    typeof message !== "string" ||
    message.trim().length === 0
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  }

  const entry = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (!response.ok) throw new Error("Webhook rejected the request");
    } catch {
      return NextResponse.json(
        { error: "Unable to deliver message" },
        { status: 502 },
      );
    }
  } else {
    console.info("New contact message received", {
      name: entry.name,
      email: entry.email,
    });
  }

  return NextResponse.json({ ok: true });
}
