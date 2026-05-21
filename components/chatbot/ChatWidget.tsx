/**
 * STUB — floating chat button + collapsible panel.
 *
 * To activate:
 *   1. Set ANTHROPIC_API_KEY (or OPENAI_API_KEY) in .env.local
 *   2. Complete /app/api/chat/route.ts
 *   3. Uncomment <ChatWidget /> in app/layout.tsx
 */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

export function ChatWidget() {
  const { isOpen, toggle, messages, isLoading, addMessage, setLoading } =
    useChatStore();

  const handleSend = async (text: string) => {
    addMessage({ role: "user", content: text });
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: text }],
        }),
      });
      const data = await res.json() as { content: string };
      addMessage({ role: "assistant", content: data.content });
    } catch {
      addMessage({ role: "assistant", content: "Sorry, something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] h-[520px] bg-surface border border-[var(--border)] rounded-sm shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="font-mono text-xs text-warm">Ask Alex&apos;s assistant</span>
              </div>
              <button
                onClick={toggle}
                className="text-[var(--text-muted)] hover:text-warm transition-colors"
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p className="font-mono text-xs text-[var(--text-muted)] text-center mt-8">
                  Ask me about availability, rates, or tech stack.
                </p>
              )}
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-elevated border border-[var(--border)] px-3 py-2 rounded-sm">
                    <span className="font-mono text-xs text-[var(--text-muted)] animate-pulse">
                      thinking...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggle}
        className="w-14 h-14 rounded-full bg-purple hover:bg-[#5a46e8] shadow-lg flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={20} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
