import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, GraduationCap, Headphones } from "lucide-react";

export type EducationEntry = {
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  logo: { src: string; alt: string };
  badge?: string;
  cgpa?: string;
};

export const education: EducationEntry[] = [
  {
    period: "2024 – Present",
    degree: "BS Computer Science",
    institution: "COMSATS University Islamabad, Abbottabad Campus",
    location: "Abbottabad, Pakistan",
    description:
      "Currently pursuing a Bachelor's degree in Computer Science with an interest in software development, programming, web technologies, and modern computing.",
    logo: { src: "/images/COMSATS-logo.png", alt: "COMSATS University Islamabad logo" },
    badge: "Current",
    cgpa: "3.70",
  },
  {
    period: "2023",
    degree: "FSc / Intermediate",
    institution: "Army Burn Hall College for Boys, Abbottabad",
    location: "Abbottabad, Pakistan",
    description: "Completed FSc / Intermediate education.",
    logo: { src: "/images/ABHC.jpg", alt: "Army Burn Hall College for Boys logo" },
  },
  {
    period: "2021",
    degree: "Matriculation",
    institution: "F.G Public School Piffers",
    location: "Abbottabad, Pakistan",
    description: "Completed Matriculation education.",
    logo: { src: "/images/FG.png", alt: "F.G Public School Piffers logo" },
  },
];

export type ExperienceEntry = {
  title: string;
  organization?: string;
  description: string;
  icon: LucideIcon;
};

export const experience: ExperienceEntry[] = [
  {
    title: "Freelance Web Development, Networking & Technical Services",
    organization: "Fiverr",
    description:
      "Completed client orders by delivering work according to requirements, including web development, networking-related, and other technical projects. Communicated with clients to understand requirements, clarify deliverables, and handle revisions.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Senior Call Center Agent",
    description:
      "Followed established procedures and communication standards while resolving customer queries and service-related issues, applying problem-solving and interpersonal skills.",
    icon: Headphones,
  },
  {
    title: "Teacher / Academic Instructor, Grades 1–12",
    description:
      "Taught students from Grade 1 to Grade 12, explained concepts in clear language suited to each learning level, and developed communication, patience, and organization skills.",
    icon: GraduationCap,
  },
];
