"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  ShoppingCart
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { StoreService } from "@/lib/services/store.service";
import { AnalyticsService } from "@/lib/services/analytics.service";

export default function AccountsDashboard() {
  const [storeStats, setStoreStats] = useState({ totalItems: 0, lowStock: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [profitData, setProfitData] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const store = await StoreService.getInventoryStats();
        const charts: any = await AnalyticsService.getChartData();
        setStoreStats(store);
        
        if (charts) {
           setChartData(charts.salesTrend || []);
           setProfitData(charts.profitMap || []);
        }
      } catch (err) {
        console.error("Accounts Data Load Error:", err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-10 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Business Accounts Dashboard</h1>
          <p className="text-slate-500 font-bold flex items-center gap-2">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             AI-Powered Financial Insights & Profit Tracking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-6 py-3 bg-white dark:bg-[#0d1117] rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-sm premium-card">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            Live Database Sync
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Today's Sale", value: "₹12,450", trend: "+12%", up: true, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Monthly Profit", value: "₹85,000", trend: "+5%", up: true, icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Bills", value: "₹3,200", trend: "-2%", up: false, icon: TrendingDown, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((stat) => (
          <div key={stat.label} className="p-8 bg-white dark:bg-[#0d1117] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover:shadow-2xl hover:scale-[1.02] transition-all premium-card">
            <div className="flex items-center justify-between mb-8">
              <div className={`w-14 h-14 ${stat.bg} dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1 text-[10px] font-black ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black dark:text-white tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm premium-card">
          <div className="flex items-center justify-between mb-10">
            <h4 className="font-black text-2xl dark:text-white flex items-center gap-4 tracking-tight">
              <div className="w-2 h-8 bg-violet-600 rounded-full" />
              Sales Trend (7 Days)
            </h4>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl">Weekly View</div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#1e293b10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} />
                <Tooltip 
                  cursor={{ stroke: '#7c3aed', strokeWidth: 1, strokeDasharray: '5 5' }}
                  contentStyle={{ 
                    borderRadius: '1.5rem', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#0d1117',
                    padding: '1.5rem'
                  }}
                  itemStyle={{ fontWeight: 900, fontSize: '0.9rem', color: '#fff' }}
                  labelStyle={{ fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: '#64748b' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#7c3aed" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm premium-card">
          <div className="flex items-center justify-between mb-10">
            <h4 className="font-black text-2xl dark:text-white flex items-center gap-4 tracking-tight">
               <div className="w-2 h-8 bg-emerald-600 rounded-full" />
               Profit vs Inventory Loss
            </h4>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl">Inventory Impact</div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#1e293b10" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} dy={15} />
                <Tooltip 
                   cursor={{ fill: '#7c3aed10' }}
                   contentStyle={{ 
                     borderRadius: '1.5rem', 
                     border: 'none',
                     backgroundColor: '#0d1117',
                     padding: '1.5rem'
                   }}
                   itemStyle={{ fontWeight: 900, fontSize: '0.9rem' }}
                   labelStyle={{ fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: '#64748b' }}
                />
                <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} name="Net Profit" barSize={25} />
                <Bar dataKey="loss" fill="#f43f5e" radius={[8, 8, 0, 0]} name="Waste/Loss" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
