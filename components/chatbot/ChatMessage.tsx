/**
 * STUB — individual message bubble for the chatbot panel.
 * Wire up ChatWidget.tsx and useChatStore to activate.
 */
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-3 py-2 rounded-sm font-mono text-xs leading-relaxed",
          isUser
            ? "bg-purple text-white"
            : "bg-elevated border border-[var(--border)] text-[var(--text-muted)]"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
