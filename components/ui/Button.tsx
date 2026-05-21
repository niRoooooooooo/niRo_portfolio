import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "inline-flex items-center justify-center gap-2 font-mono text-sm tracking-wide transition-all duration-200 cursor-pointer select-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-purple text-white px-6 py-3 rounded-sm hover:bg-[#5a46e8] active:scale-[0.97]",
  outline:
    "border border-purple text-purple px-6 py-3 rounded-sm hover:bg-purple hover:text-white active:scale-[0.97]",
  ghost:
    "text-[var(--text-muted)] px-4 py-2 rounded-sm hover:text-warm hover:bg-[var(--bg-elevated)] active:scale-[0.97]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "a") {
    const { as: _a, variant: _v, size: _s, ...anchorProps } = rest as ButtonAsAnchor & { as: "a"; variant: ButtonVariant; size: ButtonSize };
    return <a className={classes} {...anchorProps} />;
  }

  const { as: _a, variant: _v, size: _s, ...buttonProps } = rest as ButtonAsButton & { as?: "button"; variant: ButtonVariant; size: ButtonSize };
  return <button className={classes} {...buttonProps} />;
}
