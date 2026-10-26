"use client";

import { useState, type FormEvent } from "react";

// Shared with nabeelaman.com's form; the "OhmSavvy" subject prefix keeps the two
// sites' messages separable in the inbox.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzepwayl";

type Status = "idle" | "submitting" | "success" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Please write at least a sentence (10+ characters).";
  return errors;
}

const fieldClass =
  "w-full rounded-lg border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40";

export function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [gotcha, setGotcha] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          _subject: `OhmSavvy contact: ${values.name}`,
          _replyto: values.email,
          _gotcha: gotcha,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="mt-8 rounded-2xl border border-border bg-signal-bg p-6 text-sm leading-6">
        Thanks, your message is on its way. We read everything and reply to most messages within a few working days.
      </p>
    );
  }

  const fields: { id: Field; label: string; type?: string; placeholder: string }[] = [
    { id: "name", label: "Name", placeholder: "Your name" },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
      {fields.map((f) => (
        <div key={f.id}>
          <label htmlFor={f.id} className="mb-1.5 block text-sm font-medium">
            {f.label}
          </label>
          <input
            id={f.id}
            type={f.type ?? "text"}
            autoComplete={f.id}
            value={values[f.id]}
            onChange={(e) => update(f.id, e.target.value)}
            aria-invalid={!!errors[f.id]}
            aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
            className={`${fieldClass} ${errors[f.id] ? "border-red-500/60" : "border-border focus:border-accent"}`}
            placeholder={f.placeholder}
          />
          {errors[f.id] && (
            <p id={`${f.id}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors[f.id]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y ${errors.message ? "border-red-500/60" : "border-border focus:border-accent"}`}
          placeholder="A correction, a product you'd like us to cover, or a question about a review…"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people, filled in by bots; Formspree drops submissions where it's set. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        value={gotcha}
        onChange={(e) => setGotcha(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          Something went wrong sending your message. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
