/**
 * STUB — input bar for the chatbot panel.
 */
"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t border-[var(--border)]">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask me anything..."
        disabled={disabled}
        className={cn(
          "flex-1 bg-elevated border border-[var(--border)] rounded-sm px-3 py-2",
          "font-mono text-xs text-warm placeholder-[var(--text-dim)]",
          "focus:outline-none focus:border-purple/50 transition-colors"
        )}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="w-8 h-8 flex items-center justify-center bg-purple hover:bg-[#5a46e8] disabled:opacity-40 rounded-sm transition-colors"
        aria-label="Send"
      >
        <Send size={12} className="text-white" />
      </button>
    </form>
  );
}
