import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { EASE } from "../lib/motion";
import { GithubIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const Icon = project.icon;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden border-b border-line bg-surface-2 ${
          featured ? "aspect-[16/10] border-b-0 md:aspect-auto md:w-3/5 md:border-r" : "aspect-[16/10]"
        }`}
      >
        {project.image ? (
          <motion.img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-2 to-bg">
            <Icon
              size={44}
              strokeWidth={1.25}
              className="text-accent transition-transform duration-500 group-hover:scale-110"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${featured ? "md:w-2/5 md:justify-center" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-wider text-accent">{project.category}</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{project.title}</h3>
        <p className="mt-3 text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
              {tech}
            </li>
          ))}
        </ul>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-fg transition-colors duration-200 hover:text-accent"
          >
            <GithubIcon size={16} />
            View on GitHub
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          title="Projects"
          description="Selected work across web applications, networking simulations, and mobile development."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.1} className={project.featured ? "md:col-span-2" : ""}>
              <ProjectCard project={project} featured={Boolean(project.featured)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
