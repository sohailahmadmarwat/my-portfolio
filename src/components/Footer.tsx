import { ArrowUp } from "lucide-react";
import { profile } from "../data/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">BS Computer Science Student & Aspiring Software Developer</p>
          <p className="mt-4 text-sm text-muted">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SocialLinks />
          <a
            href="#home"
            aria-label="Back to top"
            title="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
