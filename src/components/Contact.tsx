import { ArrowUpRight, Briefcase, Mail, MessageCircle } from "lucide-react";
import { links, profile } from "../data/site";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

const contactRows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", value: "sohailahmadmarwat", href: links.github, icon: GithubIcon },
  { label: "LinkedIn", value: "sohail-ahmad-109145360", href: links.linkedin, icon: LinkedinIcon },
  { label: "Fiverr", value: "sidra675", href: links.fiverr, icon: Briefcase },
  { label: "WhatsApp", value: "+92 335 0153592", href: links.whatsapp, icon: MessageCircle },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <p className="font-mono text-sm text-accent">06</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Let's Build Something Meaningful
            </h2>
            <p className="mt-5 text-lg text-muted">
              Have a project, an internship opportunity, or a question about web development or networking? Send a
              message and I'll get back to you.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 divide-y divide-line rounded-2xl border border-line bg-surface">
              {contactRows.map((row) => {
                const Icon = row.icon;
                return (
                  <li key={row.label}>
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-surface-2"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm text-muted">{row.label}</span>
                        <span className="block font-medium text-fg">{row.value}</span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
          <h3 className="text-2xl font-semibold tracking-tight text-fg">Send me a message</h3>
          <p className="mt-2 text-muted">Fill out the form and I'll respond as soon as possible.</p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
