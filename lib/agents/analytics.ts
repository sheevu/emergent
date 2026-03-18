import { AnalyticsService } from "../services/analytics.service";
import { AgentRequest, AgentResponse, AgentType, BaseAgent } from "./types";

export class AnalyticsAgent implements BaseAgent {
  type: AgentType = 'ANALYTICS';

  async process(request: AgentRequest): Promise<AgentResponse> {
    const insight = await AnalyticsService.getDailyInsight();
    const profile = request.businessProfile;
    
    let content = insight;
    if (profile) {
      const prefix = `Namaste ${profile.name}! Aapke ${profile.businessName || 'vyapaar'} (${profile.location || 'humare area'}) ke liye ye rahi aaj ki report: `;
      content = prefix + insight;
    }

    return {
      agent: this.type,
      intent: "get_insights",
      content,
      data: { insight, profile }
    };
  }
}
