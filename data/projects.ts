import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "distq",
    number: "01",
    title: "DistQ — Distributed Task Queue",
    description:
      "High-throughput task queue built on top of Redis Streams. Supports at-least-once delivery, worker pools, priority queues, and dead-letter queues. Handles 100k+ tasks/sec on modest hardware.",
    tags: ["Open Source", "Systems"],
    tech: ["Go", "Redis", "gRPC", "Prometheus"],
    accentColor: "purple",
    href: "https://github.com",
    featured: true,
  },
  {
    id: "codereview",
    number: "02",
    title: "ReviewBot — AI Code Review",
    description:
      "GitHub App that runs automated code reviews on every PR using Claude. Detects security issues, logic bugs, and style inconsistencies. Used by 200+ teams in production.",
    tags: ["SaaS", "AI"],
    tech: ["Python", "FastAPI", "Claude API", "PostgreSQL"],
    accentColor: "coral",
    href: "https://github.com",
    featured: true,
  },
  {
    id: "prism",
    number: "03",
    title: "Prism — Design System",
    description:
      "Accessible React component library with 60+ primitives. Ships headless variants, a Figma token plugin, and full TypeScript types. Zero runtime dependencies.",
    tags: ["OSS Library", "UI/UX"],
    tech: ["TypeScript", "React", "Radix UI", "Storybook"],
    accentColor: "teal",
    href: "https://github.com",
  },
  {
    id: "flux",
    number: "04",
    title: "Flux — Real-time Analytics",
    description:
      "End-to-end analytics platform with sub-second query latency. Ingests 10M+ events/day via Kafka, surfaces insights through an interactive D3 dashboard.",
    tags: ["Data", "Full-Stack"],
    tech: ["Next.js", "ClickHouse", "Kafka", "D3.js"],
    accentColor: "amber",
    href: "https://github.com",
  },
];
