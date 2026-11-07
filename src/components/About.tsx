import { Download, Layers, Lightbulb, Code2, FileText } from "lucide-react";
import { profile } from "../data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const highlights = [
  { icon: Layers, label: "Software Development" },
  { icon: Code2, label: "Programming" },
  { icon: FileText, label: "UML & System Documentation" },
  { icon: Lightbulb, label: "Problem Solving" },
];

const facts = [
  { label: "University", value: "COMSATS University Islamabad" },
  { label: "Field", value: "Computer Science" },
  { label: "Location", value: "Abbottabad, Pakistan" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="About Me" />

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-surface lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={profile.photo}
                alt="Sohail Ahmad, Computer Science student"
                loading="lazy"
                className="h-full w-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                BS Computer Science Student at COMSATS University
              </h3>
              <p className="mt-5 text-lg text-muted">
                I am a Computer Science student at COMSATS University, Pakistan, passionate about software development
                and programming.
              </p>
              <p className="mt-4 text-lg text-muted">
                I also freelance on Fiverr, specializing in UML diagrams and system documentation.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} delay={index * 0.08}>
                    <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/60">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="font-medium text-fg">{item.label}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1} className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="mt-1 font-medium text-fg">{fact.value}</dd>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <a
                href={profile.cvPath}
                download="Sohail_Ahmad_Resume.pdf"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <Download size={16} aria-hidden="true" />
                Download CV
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
