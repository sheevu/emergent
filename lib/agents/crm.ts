import { CRMService } from "../services/crm.service";
import { AgentRequest, AgentResponse, AgentType, BaseAgent } from "./types";
import { GeminiHelper } from "./gemini-helper";

export class CRMAgent implements BaseAgent {
  type: AgentType = 'CRM';

  async process(request: AgentRequest): Promise<AgentResponse> {
    const profile = request.businessProfile;
    const profileContext = profile ? `
      Business Context:
      - Name: ${profile.businessName}
      - Type: ${profile.businessType}
      - Location: ${profile.location}
      - USP: ${profile.usp}
    ` : "";

    const prompt = `
      You are a CRM specialist for Kirana-Kranti AI.
      ${profileContext}
      
      User wants to manage leads/customers.
      Query: "${request.query}"

      If they want to ADD a lead, extract:
      - name (naam)
      - phone (no)
      - city (shaher)
      - interest (kis cheez mein hai)

      Available Statuses: NEW, IN_TALK, WON, LOST. Default is NEW.

      Respond in JSON:
      {
        "action": "add_lead" | "list_leads" | "unknown",
        "data": {
          "name": string,
          "phone": string,
          "city": string,
          "interest": string,
          "status": string
        },
        "reply": "A friendly Hinglish response confirming the action"
      }
    `;

    const aiResponse = await GeminiHelper.query(prompt, "You are a CRM specialist for Kirana-Kranti AI.");
    
    if (aiResponse) {
      const parsed = GeminiHelper.parseJson(aiResponse);
      if (parsed && parsed.action === 'add_lead') {
        const newLead = await CRMService.createLead({
          name: parsed.data.name || "Unknown",
          phone: parsed.data.phone || "0000000000",
          city: parsed.data.city || "Unknown",
          interest: parsed.data.interest || "General",
          status: (parsed.data.status as any) || 'NEW'
        });
        return {
          agent: this.type,
          intent: "add_lead",
          content: parsed.reply,
          data: newLead
        };
      }
      if (parsed && parsed.action === 'list_leads') {
        const stats = await CRMService.getDashboardStats();
        return {
          agent: this.type,
          intent: "list_leads",
          content: parsed.reply || `Aapke paas abhi ${stats.totalLeads} leads hain.`,
          data: stats
        };
      }
    }

    // Fallback if AI fails or no API key
    const stats = await CRMService.getDashboardStats();
    return {
      agent: this.type,
      intent: "manage_leads",
      content: `Ji, aapke paas abhi total ${stats.totalLeads} leads hain. Kya main koi naya lead add karun?`,
      data: stats
    };
  }
}
