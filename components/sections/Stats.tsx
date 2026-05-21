"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/utils";

const STATS = [
  { value: "48+",         label: "Projects shipped"  },
  { value: "30+",         label: "Clients served"    },
  { value: "8 yrs",       label: "Experience"        },
  { value: "Open",        label: "To new work",      accent: true },
];

export function Stats() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="border-y border-[var(--border)] bg-surface"
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex flex-col items-center justify-center py-10 px-6 gap-1"
          >
            <span
              className={`font-display text-3xl font-bold ${stat.accent ? "text-teal" : "text-warm"}`}
            >
              {stat.value}
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest text-center">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
