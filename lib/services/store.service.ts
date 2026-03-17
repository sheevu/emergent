import { db, Product, Order } from "../db";

export class StoreService {
  static async listProducts(): Promise<Product[]> {
    return db.getProducts();
  }

  static async createOrder(data: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    console.log("StoreService: Creating Order", data);
    const order = db.createOrder(data);
    db.updateStock(data.productId, -data.quantity);
    return order;
  }

  static async getInventoryStats() {
    const products = db.getProducts();
    return {
      totalItems: products.length,
      lowStock: products.filter(p => p.stock < 10).length,
    };
  }
}
