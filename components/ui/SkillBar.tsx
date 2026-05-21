"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types";

interface SkillBarProps {
  skill: Skill;
  isInView: boolean;
  className?: string;
}

const categoryColor: Record<Skill["category"], string> = {
  frontend:       "bg-purple",
  backend:        "bg-teal",
  infrastructure: "bg-coral",
};

export function SkillBar({ skill, isInView, className }: SkillBarProps) {
  return (
    <div className={cn("group", className)}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-warm transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-xs text-[var(--text-dim)] tabular-nums">
          {skill.level}%
        </span>
      </div>
      <div className="h-px bg-[var(--bg-elevated)] relative overflow-hidden rounded-full">
        <motion.div
          className={cn("absolute inset-y-0 left-0 h-full rounded-full", categoryColor[skill.category])}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}
