import { AnalyticsService } from "../services/analytics.service";
import { AgentRequest, AgentResponse, AgentType, BaseAgent } from "./types";

export class AnalyticsAgent implements BaseAgent {
  type: AgentType = 'ANALYTICS';

  async process(request: AgentRequest): Promise<AgentResponse> {
    const insight = await AnalyticsService.getDailyInsight();
    return {
      agent: this.type,
      intent: "get_insights",
      content: insight,
      data: { insight }
    };
  }
}
