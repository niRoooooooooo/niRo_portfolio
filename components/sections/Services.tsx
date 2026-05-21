"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/services";
import { staggerContainer, fadeUp } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

const iconBgMap: Record<Service["iconBg"], string> = {
  purple: "bg-purple/10 text-purple",
  teal:   "bg-teal/10 text-teal",
  coral:  "bg-coral/10 text-coral",
};

export function Services() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="services" className="section-pad bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeUp} ref={ref}>
            <SectionLabel index="05" label="Services" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-warm"
          >
            How I can{" "}
            <span className="text-purple">help</span>
          </motion.h2>
        </motion.div>

        {/* 3-column flush grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "1px", background: "var(--border)" }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col p-8 bg-surface hover:bg-elevated transition-colors duration-300"
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-sm flex items-center justify-center text-xl mb-6",
                  iconBgMap[service.iconBg]
                )}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-bold text-warm mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-mono text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tagged list */}
              <ul className="space-y-2 mt-auto">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]"
                  >
                    <span className="text-[var(--text-dim)]">// </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
