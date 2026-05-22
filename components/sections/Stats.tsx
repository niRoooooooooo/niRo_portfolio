"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/utils";

const STATS = [
  { num: 48,   suffix: "+",    label: "Projects shipped", color: "text-purple" },
  { num: 30,   suffix: "+",    label: "Clients served",   color: "text-coral"  },
  { num: 8,    suffix: " yrs", label: "Experience",       color: "text-amber"  },
  { num: null, suffix: "Open", label: "To new work",      color: "text-teal"   },
];

function CountUp({
  target,
  suffix,
  color,
  isInView,
}: {
  target: number | null;
  suffix: string;
  color: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || target === null) return;
    const duration = 8000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };

    requestAnimationFrame(tick);
  }, [isInView, target]);

  if (target === null) {
    return <span className={`font-display text-3xl font-bold ${color}`}>{suffix}</span>;
  }

  return (
    <span className={`font-display text-3xl font-bold ${color}`}>
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className="border-y border-[var(--border)] bg-surface">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex flex-col items-center justify-center py-10 px-6 gap-1"
          >
            <CountUp
              target={stat.num}
              suffix={stat.suffix}
              color={stat.color}
              isInView={isInView}
            />
            <span className="font-mono text-[14px] text-[var(--text-muted)] uppercase tracking-widest text-center">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
