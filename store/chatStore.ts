/**
 * STUB — Zustand store for the chatbot feature.
 * Wire up ChatWidget.tsx and the /api/chat route to activate.
 */
import { create } from "zustand";
import type { ChatMessage } from "@/types";

interface ChatStore {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

let idCounter = 0;

export const useChatStore = create<ChatStore>()((set) => ({
  isOpen: false,
  messages: [],
  isLoading: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),

  addMessage: (msg) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { ...msg, id: String(++idCounter), timestamp: Date.now() },
      ],
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  clearMessages: () => set({ messages: [] }),
}));
