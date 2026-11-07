export type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const CONTACT_ENDPOINT = "https://isnyqmubsdioluimflrf.supabase.co/functions/v1/contact-submit";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbnlxbXVic2Rpb2x1aW1mbHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyOTI1NzEsImV4cCI6MjEwNjg2ODU3MX0.hG6_IFgN48h-IN8_7T4k8tUrQ6TPZw_acS1bsiFKBGU";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length === 0) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

  if (email.length === 0) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  if (subject.length === 0) errors.subject = "Please enter a subject.";
  else if (subject.length < 3) errors.subject = "Subject must be at least 3 characters.";

  if (message.length === 0) errors.message = "Please enter a message.";
  else if (message.length < 10) errors.message = "Message must be at least 10 characters.";

  return errors;
}

export async function sendContactMessage(values: ContactValues): Promise<void> {
  let response: Response;
  try {
    response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      }),
    });
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }

  const data = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;
  if (!response.ok || !data?.success) {
    throw new Error(data?.error ?? "Something went wrong. Please try again or email me directly.");
  }
}
