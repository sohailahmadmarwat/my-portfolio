import { skillGroups } from "../data/skills";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-line bg-surface/50 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          title="Skills"
          description="The languages, frameworks, and tools I work with across software development and networking."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={(index % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-line bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-accent">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-fg">{group.title}</h3>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors duration-200 group-hover:border-line group-hover:text-fg"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
