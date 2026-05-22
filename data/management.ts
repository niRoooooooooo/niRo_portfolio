import type { ManagementEntry } from "@/types";

export const management: ManagementEntry[] = [
  {
    id: "techfest",
    icon: "calendar",
    role: "Tech Fest Coordinator",
    organization: "CSE Department, BRACU",
    period: "2022 – 2023",
    description:
      "Led end-to-end planning of the annual departmental tech fest with 600+ attendees. Coordinated 8 sub-committees, managed a ৳80,000 budget, and oversaw 12 competitive events including hackathon, project showcase, and tech quiz.",
    skills: ["Event Planning", "Budget Management", "Team Leadership", "Logistics"],
    accentColor: "coral",
  },
  {
    id: "capstone-lead",
    icon: "users",
    role: "Project Manager — Capstone",
    organization: "BRACU / CSE Department",
    period: "2023 – 2024",
    description:
      "Managed a 4-person team building a real-time collaborative learning platform. Defined sprint goals, ran daily standups, coordinated with faculty supervisors, and delivered the full scope on schedule with zero critical post-submission bugs.",
    skills: ["Agile", "Sprint Planning", "Stakeholder Comm.", "Risk Management"],
    accentColor: "purple",
  },
  {
    id: "cs-club",
    icon: "award",
    role: "Vice President — CS Club",
    organization: "BRACU Computer Club",
    period: "2021 – 2022",
    description:
      "Organised weekly workshops, guest speaker sessions, and inter-university programming contests. Grew active membership from 60 to 140 students in a single academic year by launching a beginner mentorship track.",
    skills: ["Community Building", "Workshop Design", "Sponsorship", "Scheduling"],
    accentColor: "teal",
  },
];
