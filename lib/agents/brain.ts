import { OrchestratorAgent } from "./orchestrator";
import { CRMAgent } from "./crm";
import { StoreAgent } from "./store";
import { AnalyticsAgent } from "./analytics";
import { AgentRequest, AgentResponse, AgentType, BaseAgent } from "./types";

export class AgentBrain {
  private orchestrator = new OrchestratorAgent();
  private agents: Record<AgentType, BaseAgent> = {
    ORCHESTRATOR: this.orchestrator,
    CRM: new CRMAgent(),
    STORE: new StoreAgent(),
    ANALYTICS: new AnalyticsAgent(),
    HELPER: {
      type: 'HELPER',
      process: async (req) => ({
        agent: 'HELPER',
        intent: 'help',
        content: "I'm your Kirana-Kranti AI assistant. How can I help you today? You can ask about sales, leads, or stock!"
      })
    }
  };

  async query(input: string): Promise<AgentResponse> {
    const request: AgentRequest = { query: input };
    
    // 1. Route the intent
    const route = await this.orchestrator.process(request);
    
    // 2. Delegate to specialist
    const specialist = this.agents[route.agent] || this.agents.HELPER;
    return specialist.process(request);
  }
}

export const brain = new AgentBrain();
