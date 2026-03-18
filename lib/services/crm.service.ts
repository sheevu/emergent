import { db, Lead } from "../db";

export class CRMService {
  static async createLead(data: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    console.log("CRMService: Creating Lead", data);
    return db.addLead(data);
  }

  static async listLeads(): Promise<Lead[]> {
    return db.getLeads();
  }

  static async getDashboardStats() {
    const leads = await db.getLeads();
    return {
      totalLeads: leads.length,
      wonLeads: leads.filter(l => l.status === 'WON').length,
    };
  }
}
