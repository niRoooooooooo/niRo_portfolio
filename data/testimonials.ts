import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Alex rewrote our entire data pipeline in Go over six weeks. Query latency dropped from 4s to 80ms — the kind of result that makes you wonder why you didn't hire him sooner.",
    name: "Priya Mehta",
    role: "CTO",
    company: "Orbis Analytics",
    rating: 5,
    initials: "PM",
  },
  {
    id: "t2",
    quote:
      "Rarely do you find someone who can design an elegant system architecture AND ship pixel-perfect UI. Alex bridged that gap effortlessly for our Series A product launch.",
    name: "James Okafor",
    role: "VP of Engineering",
    company: "Lumen Health",
    rating: 5,
    initials: "JO",
  },
  {
    id: "t3",
    quote:
      "We hired Alex for a two-week consulting sprint on our auth infrastructure. He identified three critical vulnerabilities, fixed them, and left us with documentation that our team still references daily.",
    name: "Sarah Lin",
    role: "Founder & CEO",
    company: "Capsule Finance",
    rating: 5,
    initials: "SL",
  },
];
