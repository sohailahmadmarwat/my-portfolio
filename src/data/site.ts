import { Briefcase, Mail, MessageCircle } from "lucide-react";
import type { ComponentType } from "react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";

export const profile = {
  name: "Sohail Ahmad",
  email: "sohaila65654@gmail.com",
  cvPath: "/Sohail_Ahmad_Resume.pdf",
  roles: [
    "Computer Science Student",
    "Computer Networking & Network Engineering",
    "Web Development",
  ],
  intro:
    "Computer Science student focused on software development, programming, and building practical applications. I also freelance in UML diagrams and system documentation.",
  photo: "/images/trte.jpeg",
};

export const links = {
  github: "https://github.com/sohailahmadmarwat",
  linkedin: "https://www.linkedin.com/in/sohail-ahmad-109145360",
  fiverr: "https://www.fiverr.com/sidra675",
  whatsapp: "https://wa.me/923350153592",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  external: boolean;
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: links.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", href: links.linkedin, icon: LinkedinIcon, external: true },
  { label: "Fiverr", href: links.fiverr, icon: Briefcase, external: true },
  { label: "WhatsApp", href: links.whatsapp, icon: MessageCircle, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false },
];
