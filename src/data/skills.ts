import { Code2, Database, Globe, Network, Smartphone, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { title: "Programming", icon: Code2, items: ["Java", "C / C++", "Python", "JavaScript"] },
  { title: "Web Development", icon: Globe, items: ["HTML", "CSS", "React"] },
  { title: "Mobile Development", icon: Smartphone, items: ["Flutter", "Dart"] },
  {
    title: "Computer Networking",
    icon: Network,
    items: [
      "Routing and Switching",
      "IP Addressing and Subnetting",
      "TCP/IP, DNS, DHCP",
      "Cisco Packet Tracer",
      "Wireshark",
      "Network Troubleshooting",
      "Network Security Fundamentals",
    ],
  },
  { title: "Databases", icon: Database, items: ["SQL", "MySQL", "PostgreSQL"] },
  { title: "Development Tools", icon: Wrench, items: ["Git", "GitHub", "VS Code"] },
];
