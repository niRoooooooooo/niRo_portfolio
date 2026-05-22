"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "./Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const accentLeftMap: Record<Project["accentColor"], string> = {
  purple: "border-l-purple",
  coral:  "border-l-coral",
  teal:   "border-l-teal",
  amber:  "border-l-amber",
};

const accentTextMap: Record<Project["accentColor"], string> = {
  purple: "text-purple",
  coral:  "text-coral",
  teal:   "text-teal",
  amber:  "text-amber",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col p-6 bg-elevated border border-[var(--border)] border-l-2",
        "rounded-sm transition-colors duration-300 hover:bg-base",
        accentLeftMap[project.accentColor]
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Number + tags row */}
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-[var(--text-dim)] tabular-nums">
          {project.number}
        </span>
        <div className="flex gap-2 flex-wrap justify-end">
          {project.tags.map((tag) => (
            <Tag key={tag} color={project.accentColor} className="text-[10px] px-1.5 py-0">
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-base font-bold text-warm mb-1 leading-snug group-hover:text-white transition-colors">
        {project.title}
      </h3>

      {/* Tech as colored subtitle */}
      <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-4", accentTextMap[project.accentColor])}>
        {project.tech.join(" · ")}
      </p>

      {/* Description */}
      <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      {/* Link */}
      <div className="flex items-center gap-1.5">
        <span className={cn("font-mono text-xs transition-colors", accentTextMap[project.accentColor])}>
          View project
        </span>
        <ArrowUpRight
          size={13}
          className={cn(
            "transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            accentTextMap[project.accentColor]
          )}
        />
      </div>
    </motion.a>
  );
}
