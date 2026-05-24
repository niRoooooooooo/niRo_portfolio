"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { staggerContainer, fadeUp } from "@/lib/utils";

export function Testimonials() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="testimonials" className="section-pad bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="06" label="Testimonials" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-warm"
          >
            What clients{" "}
            <span className="text-amber">say</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div key={t.id} variants={fadeUp}>
              <TestimonialCard testimonial={t} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
