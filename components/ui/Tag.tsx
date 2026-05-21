import { cn } from "@/lib/utils";

type TagColor = "purple" | "coral" | "teal" | "amber" | "default";

interface TagProps {
  children: React.ReactNode;
  color?: TagColor;
  className?: string;
}

const colorMap: Record<TagColor, string> = {
  purple: "bg-purple/10 text-purple border-purple/20",
  coral:  "bg-coral/10 text-coral border-coral/20",
  teal:   "bg-teal/10 text-teal border-teal/20",
  amber:  "bg-amber/10 text-amber border-amber/20",
  default:"bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border)]",
};

export function Tag({ children, color = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm border",
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
}
