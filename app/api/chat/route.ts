/**
 * STUB — chatbot API route.
 *
 * To activate:
 *   1. npm install @anthropic-ai/sdk   (or openai)
 *   2. Add ANTHROPIC_API_KEY to .env.local
 *   3. Uncomment the implementation below and remove the stub response
 *   4. Uncomment <ChatWidget /> in app/layout.tsx
 */
import { NextRequest, NextResponse } from "next/server";
// import Anthropic from "@anthropic-ai/sdk";
// import { CHAT_SYSTEM_PROMPT } from "@/lib/chatPersona";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    // ── STUB: replace with real LLM call ─────────────────────────────────
    void messages; // used once activated
    return NextResponse.json({
      content:
        "Hi! I'm Alex's portfolio assistant. The AI backend isn't wired up yet — " +
        "but feel free to reach out via the contact form below!",
    });
    // ─────────────────────────────────────────────────────────────────────

    /*
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: CHAT_SYSTEM_PROMPT,
      messages,
    });
    const content = response.content[0].type === "text"
      ? response.content[0].text
      : "I could not generate a response.";
    return NextResponse.json({ content });
    */
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
