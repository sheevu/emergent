import { GoogleGenerativeAI } from "@google/generative-ai";
import { AgentRequest, AgentResponse, AgentType, BaseAgent } from "./types";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export class OrchestratorAgent implements BaseAgent {
  type: AgentType = 'ORCHESTRATOR';

  async process(request: AgentRequest): Promise<AgentResponse> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are the Orchestrator for Kirana-Kranti AI, a business assistant for Indian MSMEs.
      Your job is to route the user's query to the correct specialist agent.

      SPECIALIST AGENTS:
      1. CRM: For managing leads, customers, contact info, follow-ups.
      2. STORE: For inventory, products, orders, sales, stock levels.
      3. ANALYTICS: For profit/loss, daily summaries, business insights, trends.
      4. HELPER: For general greetings, small talk, app help, or unidentified queries.

      USER QUERY: "${request.query}"

      Respond ONLY in JSON format:
      {
        "agent": "CRM" | "STORE" | "ANALYTICS" | "HELPER",
        "intent": "brief summary of intent",
        "confidence": 0.0 to 1.0
      }
    `;

    try {
      // Handle missing API key with a simple rule-based mock for development
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        return this.mockRoute(request.query);
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const cleanedJson = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanedJson);

      return {
        agent: parsed.agent,
        intent: parsed.intent,
        content: `Routing to ${parsed.agent} agent...`,
        data: parsed
      };
    } catch (error) {
      console.error("Orchestrator Error:", error);
      return this.mockRoute(request.query);
    }
  }

  private mockRoute(query: string): AgentResponse {
    const q = query.toLowerCase();
    let agent: AgentType = 'HELPER';
    let intent = "general inquiry";

    if (q.includes("lead") || q.includes("customer") || q.includes("phone") || q.includes("naam")) {
      agent = 'CRM';
      intent = "manage leads/customers";
    } else if (q.includes("stock") || q.includes("order") || q.includes("product") || q.includes("maal")) {
      agent = 'STORE';
      intent = "manage inventory/orders";
    } else if (q.includes("profit") || q.includes("loss") || q.includes("summary") || q.includes("faida")) {
      agent = 'ANALYTICS';
      intent = "get business insights";
    }

    return {
      agent,
      intent,
      content: `[MOCK ROUTING] Handled by ${agent} because API Key is missing.`,
    };
  }
}
