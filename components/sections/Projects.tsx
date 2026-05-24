"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Award, Target } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Tag } from "@/components/ui/Tag";
import { projects } from "@/data/projects";
import { management } from "@/data/management";
import { staggerContainer, fadeUp, cn } from "@/lib/utils";
import type { ManagementEntry } from "@/types";

const ICON_MAP: Record<ManagementEntry["icon"], React.ElementType> = {
  calendar: Calendar,
  users: Users,
  award: Award,
  target: Target,
};

const ACCENT_LEFT: Record<ManagementEntry["accentColor"], string> = {
  purple: "border-l-purple",
  coral:  "border-l-coral",
  teal:   "border-l-teal",
  amber:  "border-l-amber",
};

const ACCENT_ICON: Record<ManagementEntry["accentColor"], string> = {
  purple: "text-purple bg-purple/10",
  coral:  "text-coral bg-coral/10",
  teal:   "text-teal bg-teal/10",
  amber:  "text-amber bg-amber/10",
};

export function Projects() {
  const { ref, isInView } = useScrollReveal();
  const { ref: mgmtRef, isInView: mgmtInView } = useScrollReveal();

  return (
    <section id="projects" className="section-pad bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="03" label="Selected work" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-warm max-w-xl"
          >
            Things I&apos;ve{" "}
            <span className="text-coral">built</span>
          </motion.h2>
        </motion.div>

        {/* 4-column horizontal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* ── Management subsection ─────────────────────────────── */}
        <div className="mt-20">
          {/* Divider + sub-label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <span className="font-mono text-xs text-purple tracking-widest uppercase">
              // leadership &amp; management
            </span>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <motion.div
            ref={mgmtRef}
            variants={staggerContainer}
            initial="hidden"
            animate={mgmtInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {management.map((entry) => {
              const Icon = ICON_MAP[entry.icon];
              return (
                <motion.div
                  key={entry.id}
                  variants={fadeUp}
                  className={cn(
                    "relative flex flex-col p-6 bg-elevated border border-[var(--border)] border-l-2",
                    "rounded-sm transition-colors duration-300 hover:bg-base",
                    ACCENT_LEFT[entry.accentColor]
                  )}
                >
                  {/* Icon + period */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("p-2 rounded-sm", ACCENT_ICON[entry.accentColor])}>
                      <Icon size={16} />
                    </div>
                    <span className="font-mono text-[11px] text-[var(--text-dim)] tabular-nums">
                      {entry.period}
                    </span>
                  </div>

                  {/* Role */}
                  <h3 className="font-display text-base font-bold text-warm mb-1 leading-snug">
                    {entry.role}
                  </h3>

                  {/* Org */}
                  <p className="font-mono text-[11px] text-[var(--text-dim)] mb-4 uppercase tracking-wider">
                    {entry.organization}
                  </p>

                  {/* Description */}
                  <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed mb-5 flex-1">
                    {entry.description}
                  </p>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {entry.skills.map((s) => (
                      <Tag key={s} color={entry.accentColor} className="text-[10px] px-1.5 py-0">
                        {s}
                      </Tag>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
