"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp } from "@/lib/utils";

const HeroCanvas = dynamic(
  () => import("@/components/canvas/HeroCanvas"),
  { ssr: false }
);

export function Hero() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base"
    >
      {/* Canvas background */}
      <HeroCanvas />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-center"
        >
          {/* Availability badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] border border-[var(--border)] px-3 py-1.5 rounded-full bg-[var(--bg-surface)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold mb-4 whitespace-nowrap"
            style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            <span className="text-warm">Niloy </span>
            <span className="text-purple">Roy</span>
            <span
              className="inline-block bg-purple cursor-blink"
              style={{
                width: "0.25em",
                height: "0.25em",
                marginLeft: "0.15em",
                verticalAlign: "-0.05em",
              }}
            />
          </motion.h1>

          {/* Role */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <p className="font-mono text-lg text-[var(--text-muted)]">
              Senior Full-Stack Engineer
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm text-[var(--text-muted)] leading-relaxed mb-10 max-w-lg"
          >
            I build distributed systems and product-grade interfaces at the intersection
            of performance and craft. Eight years shipping software people actually use.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" onClick={scrollToContact}>
              Let&apos;s work together <ArrowRight size={14} />
            </Button>
            <Button
              variant="ghost"
              as="a"
              href="/alex-chen-resume.pdf"
              download
            >
              <Download size={14} /> Download résumé
            </Button>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="font-mono text-[13px] text-[var(--text-dim)] uppercase tracking-widest">
          scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--text-dim)] to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
