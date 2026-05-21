"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { staggerContainer, fadeUp } from "@/lib/utils";

export function Projects() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="projects" className="section-pad bg-surface">
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

        {/* 2×2 Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "1px", background: "var(--border)" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
