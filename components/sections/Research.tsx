"use client";

import { motion } from "framer-motion";
import { FlaskConical, BookOpen, FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { research } from "@/data/research";
import { staggerContainer, fadeUp, cn } from "@/lib/utils";
import type { ResearchItem } from "@/types";

const ACCENT_HOVER: Record<ResearchItem["accentColor"], string> = {
  purple: "group-hover/link:text-purple",
  coral:  "group-hover/link:text-coral",
  teal:   "group-hover/link:text-teal",
  amber:  "group-hover/link:text-amber",
};


const STATUS_CONFIG: Record<
  ResearchItem["status"],
  { label: string; className: string; Icon: React.ElementType }
> = {
  published:      { label: "Published",    className: "text-teal border-teal/30 bg-teal/5",     Icon: BookOpen },
  "under-review": { label: "Under Review", className: "text-amber border-amber/30 bg-amber/5",  Icon: FileText },
  "in-progress":  { label: "In Progress",  className: "text-purple border-purple/30 bg-purple/5", Icon: FlaskConical },
};

export function Research() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="research" className="section-pad bg-base">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="04" label="Research & Publications" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-warm max-w-2xl"
          >
            Things I&apos;ve{" "}
            <span className="text-amber">explored</span>
          </motion.h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {research.map((paper) => {
            const { label, className, Icon } = STATUS_CONFIG[paper.status];

            return (
              <motion.div
                key={paper.id}
                variants={fadeUp}
                className="group relative flex flex-col p-7 bg-surface border border-[var(--border)] hover:bg-elevated hover:border-amber/20 transition-colors duration-300 rounded-sm"
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm border",
                      className
                    )}
                  >
                    <Icon size={9} />
                    {label}
                  </span>
                </div>

                {/* Title — always clickable */}
                <a
                  href={paper.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mb-4"
                >
                  <h3 className={cn("font-display text-base font-bold text-warm leading-loose tracking-wider transition-colors", ACCENT_HOVER[paper.accentColor])}>
                    {paper.title}
                  </h3>
                </a>

                {/* Abstract — clamped to 3 lines */}
                <p
                  className="font-mono text-xs text-[var(--text-muted)] leading-relaxed mb-4 flex-1"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {paper.abstract}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5">
                  {paper.keywords.map((kw) => (
                    <Tag key={kw} color={paper.accentColor} className="text-[10px] px-1.5 py-0">
                      {kw}
                    </Tag>
                  ))}
                </div>

                {/* Bottom amber line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
