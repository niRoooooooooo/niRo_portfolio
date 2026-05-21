import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "fullstack",
    icon: "⬡",
    iconBg: "purple",
    title: "Full-Stack Development",
    description:
      "End-to-end product engineering — from database schema to polished UI. I work with your team or independently to ship features that scale.",
    items: [
      "Next.js / React SPA & SSR apps",
      "REST & GraphQL API design",
      "Real-time features (WebSockets, SSE)",
      "Performance audits & optimization",
    ],
  },
  {
    id: "architecture",
    icon: "◈",
    iconBg: "teal",
    title: "System Architecture",
    description:
      "Designing distributed systems that survive growth. I help teams move from a single app to a resilient, observable, multi-service architecture.",
    items: [
      "Microservices & event-driven design",
      "Scalable data pipelines",
      "Infrastructure as code (Terraform)",
      "SLA / SLO definition & monitoring",
    ],
  },
  {
    id: "consulting",
    icon: "◉",
    iconBg: "coral",
    title: "Technical Consulting",
    description:
      "Short-burst engagements for teams that need a senior technical voice. Security reviews, architecture audits, or mentoring your engineers.",
    items: [
      "Security & auth audits",
      "Code & architecture review",
      "Engineering process coaching",
      "Due-diligence technical audits",
    ],
  },
];
