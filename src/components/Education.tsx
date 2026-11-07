import { education } from "../data/timeline";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 border-y border-line bg-surface/50 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" title="Education" description="The academic path that shaped my foundation in computing." />

        <ol className="relative ml-2 border-l border-line">
          {education.map((entry, index) => (
            <li key={entry.degree} className="relative pb-12 pl-10 last:pb-0">
              <span
                className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-bg ${
                  entry.badge ? "bg-accent" : "bg-muted"
                }`}
                aria-hidden="true"
              />
              <Reveal delay={index * 0.08}>
                <div className="rounded-2xl border border-line bg-bg p-6 transition-colors duration-300 hover:border-accent/60 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <time className="font-mono text-sm text-accent">{entry.period}</time>
                    {entry.badge && (
                      <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-xs font-medium text-accent">
                        {entry.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-start gap-5">
                    <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
                      <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-fg">{entry.degree}</h3>
                      <p className="mt-1 text-muted">{entry.institution}</p>
                      <p className="text-sm text-muted">{entry.location}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-muted">{entry.description}</p>
                  {entry.cgpa && (
                    <p className="mt-5 inline-flex items-baseline gap-2 rounded-xl bg-surface-2 px-4 py-2 text-sm text-muted">
                      Current CGPA <span className="font-mono text-lg font-medium text-fg">{entry.cgpa}</span>
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
