import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="font-mono text-sm text-accent">{index}</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </Reveal>
  );
}
