import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { profile } from "../data/site";
import { sendContactMessage, validateContact } from "../lib/contact";
import type { ContactErrors, ContactValues } from "../lib/contact";

const EMPTY_VALUES: ContactValues = { name: "", email: "", subject: "", message: "" };
const FALLBACK_ERROR = "Something went wrong. Please try again or email me directly.";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-fg placeholder:text-muted/70 outline-none transition-colors duration-200 focus:border-accent focus:ring-2 focus:ring-accent/25 aria-[invalid=true]:border-error";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} className="mt-1.5 min-h-5 text-sm text-error">
        {error}
      </p>
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState(FALLBACK_ERROR);

  function updateField(field: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      await sendContactMessage(values);
      setValues(EMPTY_VALUES);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : FALLBACK_ERROR);
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-busy={sending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            placeholder="John Doe"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby="name-error"
            className={inputClass}
          />
        </Field>
        <Field id="email" label="Your email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="john@example.com"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="email-error"
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={150}
          placeholder="What is this about?"
          value={values.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby="subject-error"
          className={inputClass}
        />
      </Field>

      <Field id="message" label="Your message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={3000}
          placeholder="Tell me about your project or opportunity..."
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby="message-error"
          className={`${inputClass} resize-y`}
        />
      </Field>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-accent-fg transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={16} aria-hidden="true" />
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="flex items-start gap-2 rounded-xl border border-success/40 bg-success/10 p-4 text-sm text-success">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            Thanks, your message has been sent. I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-2 rounded-xl border border-error/40 bg-error/10 p-4 text-sm text-error">
            <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              {errorMessage} You can also reach me at{" "}
              <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-4">
                {profile.email}
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
