"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { slideInRight, staggerContainer, fadeUp } from "@/lib/utils";
import { timeline } from "@/data/timeline";
import { certifications, badges } from "@/data/credentials";
import type { Credential } from "@/types";

const ACCENT_COLORS: Record<string, string> = {
  purple: "bg-purple",
  teal:   "bg-teal",
  coral:  "bg-coral",
};

const ACCENT_HEX: Record<string, string> = {
  purple: "from-[var(--purple)]/25 to-[var(--purple)]/5",
  teal:   "from-[var(--teal)]/25   to-[var(--teal)]/5",
  coral:  "from-[var(--coral)]/25  to-[var(--coral)]/5",
  amber:  "from-amber-500/25       to-amber-600/5",
};

// Rounded hex path computed for 64×64 px
const HEX_PATH = "path('M 27.53,2.24 Q 32,0 36.47,2.24 L 59.53,13.76 Q 64,16 64,21 L 64,43 Q 64,48 59.53,50.24 L 36.47,61.76 Q 32,64 27.53,61.76 L 4.47,50.24 Q 0,48 0,43 L 0,21 Q 0,16 4.47,13.76 Z')";

function HexItemInner({ cred }: { cred: Credential }) {
  return (
    <>
      {cred.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cred.image}
          alt={cred.name}
          className="w-16 h-16 object-contain flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        />
      ) : (
        <div
          className="relative w-16 h-16 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ clipPath: HEX_PATH }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${ACCENT_HEX[cred.accent]}`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[9px] font-bold text-warm/60 text-center leading-tight px-1">
              {cred.category.slice(0, 4).toUpperCase()}
            </span>
          </div>
        </div>
      )}
      <span className="font-mono text-[10px] text-teal border border-teal/30 px-1.5 py-0.5 rounded-sm uppercase tracking-wider group-hover:text-teal/70 transition-colors text-center">
        {cred.category}
      </span>
    </>
  );
}

function HexItem({ cred, onImageOpen }: { cred: Credential; onImageOpen: (url: string) => void }) {
  if (cred.href) {
    return (
      <a href={cred.href} target="_blank" rel="noopener noreferrer" title={cred.name} className="flex flex-col items-center gap-2 group">
        <HexItemInner cred={cred} />
      </a>
    );
  }
  if (cred.image) {
    return (
      <button onClick={() => onImageOpen(cred.image)} title={cred.name} className="flex flex-col items-center gap-2 group cursor-pointer">
        <HexItemInner cred={cred} />
      </button>
    );
  }
  return (
    <div title={cred.name} className="flex flex-col items-center gap-2">
      <HexItemInner cred={cred} />
    </div>
  );
}

function ImageModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-9 right-0 font-mono text-xs text-[var(--text-muted)] hover:text-warm transition-colors px-2 py-1 border border-[var(--border)] rounded-sm bg-elevated"
        >
          ✕ close
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="Certificate" className="w-full h-auto rounded-sm shadow-2xl" />
      </div>
    </div>
  );
}

export function About() {
  const { ref: leftRef,  isInView: leftInView  } = useScrollReveal();
  const { ref: rightRef, isInView: rightInView } = useScrollReveal();
  const { ref: credRef,  isInView: credInView  } = useScrollReveal();

  const [showAllCerts,  setShowAllCerts]  = useState(false);
  const [showAllBadges, setShowAllBadges] = useState(false);
  const [imgModal, setImgModal] = useState<string | null>(null);

  const visibleCerts  = showAllCerts  ? certifications : certifications.slice(0, 5);
  const visibleBadges = showAllBadges ? badges         : badges.slice(0, 5);

  return (
    <section id="about" className="section-pad bg-base">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Main two-column grid ── */}
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
                    <span className={`block w-2 h-2 rounded-full ${ACCENT_COLORS[entry.accent]}`} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-warm">
                      {entry.role}
                      {entry.current && (
                        <span className="ml-2 font-mono text-[11px] text-teal border border-teal/30 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
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
              <div
                className="absolute inset-0 rounded-sm bg-elevated border border-[var(--border)]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(110,87,255,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110,87,255,0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute inset-6 rounded-sm bg-gradient-to-br from-purple/10 via-transparent to-teal/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl font-extrabold text-warm/80">AC</span>
              </div>
              {[
                "top-3 left-3 border-t border-l",
                "top-3 right-3 border-t border-r",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((cls) => (
                <div key={cls} className={`absolute w-6 h-6 border-purple/40 ${cls}`} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Certifications & Badges ── */}
        <motion.div
          ref={credRef}
          variants={staggerContainer}
          initial="hidden"
          animate={credInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-[var(--border)] pt-12"
        >
          {/* Certifications */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowAllCerts((p) => !p)}
                className="font-display text-sm font-semibold text-warm hover:text-purple transition-colors flex items-center gap-2"
              >
                Certifications
                <span className="font-mono text-[10px] text-[var(--text-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded-sm">
                  {showAllCerts ? "show less" : `+${certifications.length - 5} more`}
                </span>
              </button>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                {certifications.length} total
              </span>
            </div>
            <div className="flex flex-wrap gap-5">
              {visibleCerts.map((cred) => (
                <HexItem key={cred.id} cred={cred} onImageOpen={setImgModal} />
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowAllBadges((p) => !p)}
                className="font-display text-sm font-semibold text-warm hover:text-purple transition-colors flex items-center gap-2"
              >
                Badges
                <span className="font-mono text-[10px] text-[var(--text-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded-sm">
                  {showAllBadges ? "show less" : `+${badges.length - 5} more`}
                </span>
              </button>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                {badges.length} total
              </span>
            </div>
            <div className="flex flex-wrap gap-5">
              {visibleBadges.map((cred) => (
                <HexItem key={cred.id} cred={cred} onImageOpen={setImgModal} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {imgModal && <ImageModal url={imgModal} onClose={() => setImgModal(null)} />}
    </section>
  );
}
