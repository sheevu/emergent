"use client";

import React, { useState, useEffect } from "react";
import { Store, Package, ShoppingBag, Plus, Search, IndianRupee, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { StoreService } from "@/lib/services/store.service";
import { Product, Order } from "@/lib/db";

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      const p = await StoreService.listProducts();
      setProducts(p);
      setLoading(false);
    }
    loadStore();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white mb-1">My Store</h1>
          <p className="text-slate-500 font-medium">Manage inventory and customer orders.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
          <Plus className="w-5 h-5" />
          Naya Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inventory List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 dark:text-white">
                <Package className="w-5 h-5 text-indigo-600" />
                Current Inventory
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Khojein..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">{p.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-opacity-10 ${
                          p.stock < 10 ? 'bg-rose-500 text-rose-600' : 'bg-emerald-500 text-emerald-600'
                        }`}>
                          {p.stock <= 0 ? "Khatam" : `${p.stock} pcs`}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold dark:text-white flex items-center gap-0.5">
                        <IndianRupee className="w-3.5 h-3.5" />{p.price}
                      </td>
                      <td className="px-6 py-4 text-indigo-600 font-bold text-sm cursor-pointer hover:underline">Edit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Store Insights Sidebar */}
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl text-white shadow-xl">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-200" />
              Store Summary
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm opacity-80">Total Items</span>
                <span className="font-bold text-xl">{products.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm opacity-80">Low Stock Alerts</span>
                <span className="font-bold text-xl text-amber-300">{products.filter(p => p.stock < 10).length}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold dark:text-white mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              Recent Orders
            </h4>
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <ShoppingBag className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm font-medium">Abhi koi orders nahi hain.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
