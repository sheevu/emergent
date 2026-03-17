export type AgentType = 'ORCHESTRATOR' | 'CRM' | 'STORE' | 'ANALYTICS' | 'HELPER';

export interface AgentRequest {
  query: string;
  context?: any;
  history?: any[];
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
