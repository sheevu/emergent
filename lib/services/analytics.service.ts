import { db } from "../db";

export class AnalyticsService {
  static async getDailyInsight(): Promise<string> {
    const orders = db.getOrders();
    const leads = db.getLeads();
    
    if (orders.length === 0 && leads.length === 0) {
      return "Dukaan pe abhi koi activity nahi hui hai. Aaj naye leads aur orders banane pe dhyan dein!";
    }

    return `Aaj abhi tak ${orders.length} orders aur ${leads.length} naye leads mile hain. Business badh raha hai!`;
  }

  static async getDailyTasks(): Promise<string[]> {
    const products = db.getProducts();
    const lowStock = products.filter(p => p.stock < 10);
    const leads = db.getLeads();
    const newLeads = leads.filter(l => l.status === 'NEW');

    const tasks: string[] = [];
    
    if (lowStock.length > 0) {
      tasks.push(`Restock ${lowStock[0].name} (Stock low: ${lowStock[0].stock})`);
    }
    
    if (newLeads.length > 0) {
      tasks.push(`Follow up with ${newLeads[0].name} (${newLeads[0].phone})`);
    }

    // Default tasks if nothing urgent
    if (tasks.length < 3) {
      tasks.push("WhatsApp catalog update karein");
      tasks.push("Store ki safai aur display check karein");
      tasks.push("Kal ke liye change (khulla) ka intezam karein");
    }

    return tasks.slice(0, 5);
  }

  static async getChartData() {
    return [
      { name: "Mon", sales: 4000, profit: 2400 },
      { name: "Tue", sales: 3000, profit: 1398 },
      { name: "Wed", sales: 2000, profit: 9800 },
      { name: "Thu", sales: 2780, profit: 3908 },
      { name: "Fri", sales: 1890, profit: 4800 },
      { name: "Sat", sales: 2390, profit: 3800 },
      { name: "Sun", sales: 3490, profit: 4300 },
    ];
  }
}
