export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-xs text-purple">// niRo.dev</span>
        <span className="font-mono text-[13px] text-[var(--text-muted)]">
          © {year} niRo
        </span>
      </div>
    </footer>
  );
}
