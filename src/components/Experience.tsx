import { experience } from "../data/timeline";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          title="Experience"
          description="Freelance client work, customer service, and teaching experience."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {experience.map((entry, index) => {
            const Icon = entry.icon;
            return (
              <Reveal key={entry.title} delay={index * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-accent">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{entry.title}</h3>
                  {entry.organization && <p className="mt-1 text-sm font-medium text-accent">{entry.organization}</p>}
                  <p className="mt-4 text-muted">{entry.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
