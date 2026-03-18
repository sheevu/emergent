import { db } from "../db";

export class AnalyticsService {
  static async getDailyInsight(): Promise<string> {
    const orders = await db.getOrders();
    const leads = await db.getLeads();
    
    if (orders.length === 0 && leads.length === 0) {
      return "Dukaan pe abhi koi activity nahi hui hai. Aaj naye leads aur orders banane pe dhyan dein!";
    }

    return `Aaj abhi tak ${orders.length} orders aur ${leads.length} naye leads mile hain. Business badh raha hai!`;
  }

  static async getDailyTasks(): Promise<string[]> {
    const products = await db.getProducts();
    const lowStock = products.filter(p => p.stock < 10);
    const leads = await db.getLeads();
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
    return {
      salesTrend: [
        { name: "01 Mar", sales: 4000 },
        { name: "02 Mar", sales: 3000 },
        { name: "03 Mar", sales: 2000 },
        { name: "04 Mar", sales: 2780 },
        { name: "05 Mar", sales: 1890 },
        { name: "06 Mar", sales: 2390 },
        { name: "07 Mar", sales: 3490 },
        { name: "08 Mar", sales: 4100 },
        { name: "09 Mar", sales: 2800 },
        { name: "10 Mar", sales: 3200 },
        { name: "11 Mar", sales: 1900 },
        { name: "12 Mar", sales: 4500 },
        { name: "13 Mar", sales: 3800 },
        { name: "14 Mar", sales: 5100 },
      ],
      profitMap: [
        { day: "01 Mar", profit: 2400, loss: 400 },
        { day: "02 Mar", profit: 1398, loss: 200 },
        { day: "03 Mar", profit: 9800, loss: 1200 },
        { day: "04 Mar", profit: 3908, loss: 500 },
        { day: "05 Mar", profit: 4800, loss: 300 },
        { day: "06 Mar", profit: 3800, loss: 700 },
        { day: "07 Mar", profit: 4300, loss: 800 },
        { day: "08 Mar", profit: 4500, loss: 600 },
        { day: "09 Mar", profit: 2900, loss: 400 },
        { day: "10 Mar", profit: 3300, loss: 450 },
        { day: "11 Mar", profit: 2100, loss: 300 },
        { day: "12 Mar", profit: 4700, loss: 900 },
        { day: "13 Mar", profit: 4000, loss: 500 },
        { day: "14 Mar", profit: 5300, loss: 1100 },
      ]
    };
  }
}
