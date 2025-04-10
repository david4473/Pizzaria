import { streamText } from "ai";
import { deepseek } from "@ai-sdk/deepseek";

const model = deepseek("deepseek-chat");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = process.env.AI_SYSTEM_COMMAND;
    if (!systemPrompt) {
      throw new Error("AI_SYSTEM_COMMAND environment variable not set.");
    }

    const result = streamText({
      model,
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse({
      sendReasoning: true,
    });
  } catch (error) {
    console.error(`Chat Error: ${error}`);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
