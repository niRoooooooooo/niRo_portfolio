"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { slideInLeft, slideInRight, staggerContainer, fadeUp } from "@/lib/utils";
import { timeline } from "@/data/timeline";

const ACCENT_COLORS: Record<string, string> = {
  purple: "bg-purple",
  teal:   "bg-teal",
  coral:  "bg-coral",
};

export function About() {
  const { ref: leftRef,  isInView: leftInView  } = useScrollReveal();
  const { ref: rightRef, isInView: rightInView } = useScrollReveal();

  return (
    <section id="about" className="section-pad bg-base">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text */}
          <motion.div
            ref={leftRef}
            variants={staggerContainer}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel index="02" label="About" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl lg:text-5xl font-bold text-warm mb-6"
            >
              Engineering at the edge of
              {" "}<span className="text-purple">complexity</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-mono text-sm text-[var(--text-muted)] leading-relaxed mb-4"
            >
              I started writing code on a secondhand laptop in 2015 — mostly to
              automate the tedious parts of a physics degree. What began as curiosity
              became craft. Today I architect systems that need to survive growth,
              handle failure gracefully, and still feel fast to the end user.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-mono text-sm text-[var(--text-muted)] leading-relaxed mb-10"
            >
              I care deeply about the gap between code that works and code that
              lasts. I write for the engineer who reads it six months later at 2am —
              usually me.
            </motion.p>

            {/* Timeline */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {timeline.map((entry) => (
                <motion.div
                  key={`${entry.company}-${entry.period}`}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1.5 flex-shrink-0">
                    <span
                      className={`block w-2 h-2 rounded-full ${ACCENT_COLORS[entry.accent]}`}
                    />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-warm">
                      {entry.role}
                      {entry.current && (
                        <span className="ml-2 font-mono text-[9px] text-teal border border-teal/30 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                          current
                        </span>
                      )}
                    </p>
                    <p className="font-mono text-xs text-[var(--text-muted)]">
                      {entry.company} · {entry.period}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — avatar frame */}
          <motion.div
            ref={rightRef}
            variants={slideInRight}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72">
              {/* Grid texture SVG */}
              <div
                className="absolute inset-0 rounded-sm bg-elevated border border-[var(--border)]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(110,87,255,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110,87,255,0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Inner glow */}
              <div className="absolute inset-6 rounded-sm bg-gradient-to-br from-purple/10 via-transparent to-teal/10" />
              {/* Initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl font-extrabold text-warm/80">
                  AC
                </span>
              </div>
              {/* Corner brackets */}
              {[
                "top-3 left-3 border-t border-l",
                "top-3 right-3 border-t border-r",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((cls) => (
                <div
                  key={cls}
                  className={`absolute w-6 h-6 border-purple/40 ${cls}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
