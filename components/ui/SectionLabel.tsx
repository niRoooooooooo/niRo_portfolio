import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-4", className)}>
      <span className="font-mono text-xs text-purple tracking-widest">
        // {index}
      </span>
      <div className="h-px w-8 bg-[var(--border)]" />
      <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
