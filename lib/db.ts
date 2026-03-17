export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  interest: string;
  status: 'NEW' | 'IN_TALK' | 'WON' | 'LOST';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  total: number;
  createdAt: string;
}

class LocalDB {
  private leads: Lead[] = [];
  private products: Product[] = [
    { id: '1', name: 'Aloo (Potato)', price: 20, stock: 100 },
    { id: '2', name: 'Pyaaz (Onion)', price: 30, stock: 80 },
    { id: '3', name: 'Doodh (Milk)', price: 60, stock: 50 },
  ];
  private orders: Order[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedLeads = localStorage.getItem('kk_leads');
      const savedProducts = localStorage.getItem('kk_products');
      const savedOrders = localStorage.getItem('kk_orders');
      
      if (savedLeads) this.leads = JSON.parse(savedLeads);
      if (savedProducts) this.products = JSON.parse(savedProducts);
      if (savedOrders) this.orders = JSON.parse(savedOrders);
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kk_leads', JSON.stringify(this.leads));
      localStorage.setItem('kk_products', JSON.stringify(this.products));
      localStorage.setItem('kk_orders', JSON.stringify(this.orders));
    }
  }

  // Lead Methods
  addLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    this.leads.push(newLead);
    this.save();
    return newLead;
  }

  getLeads(): Lead[] {
    return this.leads;
  }

  // Product Methods
  getProducts(): Product[] {
    return this.products;
  }

  updateStock(id: string, amount: number): void {
    const product = this.products.find(p => p.id === id);
    if (product) {
      product.stock += amount;
      this.save();
    }
  }

  // Order Methods
  createOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    this.orders.push(newOrder);
    this.save();
    return newOrder;
  }

  getOrders(): Order[] {
    return this.orders;
  }
}

export const db = new LocalDB();
