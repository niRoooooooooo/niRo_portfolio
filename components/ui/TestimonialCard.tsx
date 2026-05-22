import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-8 bg-surface border border-[var(--border)] rounded-sm",
        "hover:border-purple/20 transition-colors duration-300",
        className
      )}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-amber text-sm">★</span>
        ))}
      </div>

      {/* Quote mark */}
      <div
        className="font-display text-6xl leading-none text-purple/20 mb-2 select-none"
        aria-hidden="true"
      >
        "
      </div>

      {/* Quote */}
      <p className="font-mono text-sm text-[var(--text-muted)] leading-relaxed italic mb-6 flex-1">
        {testimonial.quote}
      </p>

      {/* Attribution */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-purple/15 border border-purple/25 flex items-center justify-center flex-shrink-0">
          <span className="font-display text-xs font-bold text-purple">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-warm">
            {testimonial.name}
          </p>
          <p className="font-mono text-[13px] text-[var(--text-muted)]">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
