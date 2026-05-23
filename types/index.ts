export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  accentColor: "purple" | "coral" | "teal" | "amber";
  href: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "infrastructure";
}

export interface TimelineEntry {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  accent: "purple" | "teal" | "coral";
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number; // 1–5
  initials: string;
}

export interface Service {
  id: string;
  icon: string;
  iconBg: "purple" | "coral" | "teal";
  title: string;
  description: string;
  items: string[];
}

export interface ManagementEntry {
  id: string;
  icon: "calendar" | "users" | "award" | "target";
  role: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
  accentColor: "purple" | "coral" | "teal" | "amber";
}

export interface ResearchItem {
  id: string;
  number: string;
  title: string;
  abstract: string;
  keywords: string[];
  venue: string;
  year: string;
  status: "published" | "under-review" | "in-progress";
  accentColor: "purple" | "coral" | "teal" | "amber";
  href?: string;
}

export interface Credential {
  id: string;
  name: string;
  category: string;
  image: string;
  href?: string;
  accent: "purple" | "teal" | "coral" | "amber";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  _honeypot?: string;
}
