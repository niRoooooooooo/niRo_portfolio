"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "./Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const accentBorderMap: Record<Project["accentColor"], string> = {
  purple: "hover:border-purple/40",
  coral:  "hover:border-coral/40",
  teal:   "hover:border-teal/40",
  amber:  "hover:border-amber/40",
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
        "group relative flex flex-col p-8 bg-surface border border-[var(--border)]",
        "transition-colors duration-300 hover:bg-elevated",
        accentBorderMap[project.accentColor]
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Number + tags row */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-[var(--text-dim)] tabular-nums">
          {project.number}
        </span>
        <div className="flex gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} color={project.accentColor}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-display text-xl font-bold text-warm mb-3 group-hover:text-white transition-colors"
        )}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-mono text-sm text-[var(--text-muted)] leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] px-2 py-0.5 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-muted)] rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-mono text-xs transition-colors",
            accentTextMap[project.accentColor]
          )}
        >
          View project
        </span>
        <ArrowUpRight
          size={14}
          className={cn(
            "transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            accentTextMap[project.accentColor]
          )}
        />
      </div>
    </motion.a>
  );
}
