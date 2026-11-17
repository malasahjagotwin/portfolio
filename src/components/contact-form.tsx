"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ContactFormProps = {
  strings: Dictionary["contact"];
};

type Status = "idle" | "loading" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ strings }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "");

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = strings.required;
    if (!email) nextErrors.email = strings.required;
    else if (!emailPattern.test(email)) nextErrors.email = strings.invalidEmail;
    if (!message) nextErrors.message = strings.required;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — off-screen and hidden from assistive tech. See api/contact/route.ts */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {strings.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={strings.namePlaceholder}
            className={fieldClass}
          />
          {errors.name ? (
            <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {strings.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={strings.emailPlaceholder}
            className={fieldClass}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {strings.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={strings.messagePlaceholder}
          className={`${fieldClass} resize-y`}
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {status === "loading" ? strings.sending : strings.submit}
        </button>

        {status === "success" ? (
          <p className="text-sm text-emerald-500">{strings.success}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-500">{strings.error}</p>
        ) : null}
      </div>
    </form>
  );
}
