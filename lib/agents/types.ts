export type AgentType = 'ORCHESTRATOR' | 'CRM' | 'STORE' | 'ANALYTICS' | 'HELPER';

export interface AgentRequest {
  query: string;
  context?: any;
  history?: any[];
  businessProfile?: {
    name: string;
    location: string;
    businessType: string;
    businessName: string;
    category: string;
    usp: string;
    offers: string;
    website: string;
    contact: string;
  };
}

export interface AgentResponse {
  agent: AgentType;
  intent: string;
  content: string;
  data?: any;
  suggestedActions?: string[];
}

export interface BaseAgent {
  type: AgentType;
  process(request: AgentRequest): Promise<AgentResponse>;
}
