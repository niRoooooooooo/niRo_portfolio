"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillBar } from "@/components/ui/SkillBar";
import { skills } from "@/data/skills";
import { staggerContainer, fadeUp } from "@/lib/utils";
import type { Skill } from "@/types";

const CATEGORIES: { key: Skill["category"]; label: string; color: string }[] = [
  { key: "frontend",       label: "Frontend",        color: "text-purple" },
  { key: "backend",        label: "Backend",         color: "text-teal"   },
  { key: "infrastructure", label: "Infrastructure",  color: "text-coral"  },
];

export function Skills() {
  const { ref, isInView } = useScrollReveal({ margin: "-150px" });

  return (
    <section id="skills" className="section-pad bg-base">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="04" label="Skills" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-warm"
          >
            Tools of the{" "}
            <span className="text-teal">trade</span>
          </motion.h2>
        </motion.div>

        {/* 3-column grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {CATEGORIES.map(({ key, label, color }) => (
            <div key={key}>
              <h3 className={`font-mono text-xs uppercase tracking-widest mb-6 ${color}`}>
                {label}
              </h3>
              <div className="space-y-5">
                {skills
                  .filter((s) => s.category === key)
                  .map((skill) => (
                    <SkillBar key={skill.name} skill={skill} isInView={isInView} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
