import { StoreService } from "../services/store.service";
import { AgentRequest, AgentResponse, AgentType, BaseAgent } from "./types";
import { GeminiHelper } from "./gemini-helper";

export class StoreAgent implements BaseAgent {
  type: AgentType = 'STORE';

  async process(request: AgentRequest): Promise<AgentResponse> {
    const products = await StoreService.listProducts();
    const productContext = products.map(p => `${p.name} (ID: ${p.id}, Price: ${p.price}, Stock: ${p.stock})`).join(", ");

    const prompt = `
      User wants to manage store/inventory.
      Available Products: ${productContext}
      Query: "${request.query}"

      Respond in JSON:
      {
        "action": "check_stock" | "create_order" | "unknown",
        "data": {
          "productId": string,
          "quantity": number,
          "productName": string
        },
        "reply": "A friendly Hinglish response confirming the action"
      }
    `;

    const aiResponse = await GeminiHelper.query(prompt, "You are a Store & Inventory specialist for Kirana-Kranti AI.");
    
    if (aiResponse) {
      const parsed = GeminiHelper.parseJson(aiResponse);
      if (parsed && parsed.action === 'create_order') {
        const order = await StoreService.createOrder({
          productId: parsed.data.productId,
          quantity: parsed.data.quantity || 1,
          total: (products.find(p => p.id === parsed.data.productId)?.price || 0) * (parsed.data.quantity || 1)
        });
        return {
          agent: this.type,
          intent: "create_order",
          content: parsed.reply,
          data: order
        };
      }
      if (parsed && parsed.action === 'check_stock') {
        return {
          agent: this.type,
          intent: "check_stock",
          content: parsed.reply,
          data: products
        };
      }
    }

    return {
      agent: this.type,
      intent: "manage_store",
      content: "Aap stock check kar sakte hain ya naya order bana sakte hain. Mere paas Aloo, Pyaaz aur Doodh ka data hai.",
    };
  }
}
