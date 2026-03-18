import { db, Product, Order } from "../db";

export class StoreService {
  static async listProducts(): Promise<Product[]> {
    return db.getProducts();
  }

  static async createOrder(data: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const order = await db.createOrder(data);
    await db.updateStock(data.productId, -data.quantity);
    return order;
  }

  static async getInventoryStats() {
    const products = await db.getProducts();
    return {
      totalItems: products.length,
      lowStock: products.filter(p => p.stock < 10).length,
    };
  }
}
