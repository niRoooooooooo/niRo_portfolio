import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-surface">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-xs text-purple">// alex.dev</span>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] hover:text-warm transition-colors"
          >
            <GithubIcon width={16} height={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] hover:text-warm transition-colors"
          >
            <LinkedinIcon width={16} height={16} />
          </a>
          <a
            href="mailto:hello@alex.dev"
            aria-label="Email"
            className="text-[var(--text-muted)] hover:text-warm transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>

        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          © {year} Alex Chen
        </span>
      </div>
    </footer>
  );
}
