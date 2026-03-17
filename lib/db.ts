import { supabase } from './supabase';

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

class SupabaseDB {
  // Lead Methods
  async addLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Product Methods
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;
    return data || [];
  }

  async updateStock(id: string, amount: number): Promise<void> {
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('products')
      .update({ stock: product.stock + amount })
      .eq('id', id);

    if (updateError) throw updateError;
  }

  // Order Methods
  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Helper for Dashboard Stats
  async getDashboardStats() {
    const [leads, wonLeads, inventory] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'WON'),
      supabase.from('products').select('*'),
    ]);

    const lowStock = inventory.data?.filter(p => p.stock < 10).length || 0;

    return {
      totalLeads: leads.count || 0,
      wonLeads: wonLeads.count || 0,
      totalItems: inventory.data?.length || 0,
      lowStock
    };
  }
}

export const db = new SupabaseDB();
