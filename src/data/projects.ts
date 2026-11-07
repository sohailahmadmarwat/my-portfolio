import { Layers, Network, Smartphone, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  icon: LucideIcon;
  image?: { src: string; alt: string };
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Inventory Control System",
    category: "Web Application",
    summary:
      "A web-based system for managing timber inventory and related operations. It was redesigned from an earlier Java console version into a fully interactive web application.",
    stack: ["React", "HTML", "CSS"],
    icon: Layers,
    image: {
      src: "/images/dadasda.png",
      alt: "Screenshot of the Inventory Control System project",
    },
    repoUrl: "https://github.com/sohailahmadmarwat/Timber-Inventory-App",
    featured: true,
  },
  {
    title: "Multi-Queue Router Simulator",
    category: "Desktop Simulation",
    summary:
      "A Java Swing router simulation that handles packets through priority-based queues, demonstrating networking and data structure concepts.",
    stack: ["Java", "Java Swing", "Data Structures"],
    icon: Terminal,
  },
  {
    title: "Networking Simulation",
    category: "Network Lab",
    summary:
      "Cisco Packet Tracer simulations for practicing network design, configuration, and connectivity testing.",
    stack: ["Cisco Packet Tracer"],
    icon: Network,
  },
  {
    title: "Skill-Swap Application",
    category: "Mobile Application",
    summary: "A mobile application focused on sharing skills between users.",
    stack: ["Flutter", "Dart"],
    icon: Smartphone,
  },
];
