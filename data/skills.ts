import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Tailwind CSS", level: 88, category: "frontend" },
  { name: "Framer Motion", level: 80, category: "frontend" },
  { name: "WebGL / Canvas", level: 72, category: "frontend" },

  // Backend
  { name: "Go", level: 88, category: "backend" },
  { name: "Python / FastAPI", level: 85, category: "backend" },
  { name: "Node.js / Bun", level: 82, category: "backend" },
  { name: "PostgreSQL", level: 80, category: "backend" },
  { name: "Redis", level: 78, category: "backend" },

  // Infrastructure
  { name: "Docker / K8s", level: 80, category: "infrastructure" },
  { name: "AWS", level: 75, category: "infrastructure" },
  { name: "Terraform", level: 70, category: "infrastructure" },
  { name: "Grafana / Prom.", level: 72, category: "infrastructure" },
  { name: "CI / CD Pipelines", level: 85, category: "infrastructure" },
];
