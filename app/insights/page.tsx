"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown, Calendar, PieChart, Info, ArrowUpRight, IndianRupee, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AnalyticsService } from "@/lib/services/analytics.service";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

export default function InsightsPage() {
  const [insight, setInsight] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [profitData, setProfitData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const text = await AnalyticsService.getDailyInsight();
        const t = await AnalyticsService.getDailyTasks();
        const data: any = await AnalyticsService.getChartData();
        setInsight(text);
        setTasks(t);
        if (data) {
          setChartData(data.salesTrend || []);
          setProfitData(data.profitMap || []);
        }
        setLoading(false);
      } catch (e) {
        console.error("Insights Load Error:", e);
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Business Insights <span className="text-violet-600">(Vyapaar ki Samajh)</span></h1>
          <p className="text-slate-500 font-bold flex items-center gap-2">
            <div className="w-1.5 h-6 bg-violet-600 rounded-full" />
            AI-driven data analysis specifically for your shop.
          </p>
        </div>
        <button className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-[#0d1117] border border-slate-100 dark:border-slate-800 rounded-2xl font-black shadow-lg text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all premium-card">
          <Download className="w-4 h-4 text-violet-600" /> Download Report
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Insight Card */}
        <div className="lg:col-span-2 space-y-10">
          <div className="p-10 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-inner group-hover:rotate-12 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-violet-100 uppercase tracking-[0.2em] text-xs">AI Smart Analysis</h3>
              </div>
              <p className="text-3xl font-black leading-tight mb-10 tracking-tight">
                "{insight || "Generating your business strategy..."}"
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <div className="bg-white/10 px-6 py-4 rounded-[1.5rem] flex flex-col backdrop-blur-md border border-white/10 shadow-inner">
                  <span className="text-[10px] uppercase font-black opacity-60 mb-1 tracking-widest">Growth Trend</span>
                  <span className="text-2xl font-black flex items-center gap-2 text-emerald-300">
                    <ArrowUpRight className="w-5 h-5" /> +14.2%
                  </span>
                </div>
                <div className="bg-white/10 px-6 py-4 rounded-[1.5rem] flex flex-col backdrop-blur-md border border-white/10 shadow-inner">
                  <span className="text-[10px] uppercase font-black opacity-60 mb-1 tracking-widest">Most Demanded</span>
                  <span className="text-2xl font-black">Aloo (Potato)</span>
                </div>
              </div>
            </div>
            {/* Glossy shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50 transition-transform group-hover:translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm premium-card">
              <h4 className="font-black dark:text-white mb-10 flex items-center justify-between">
                <div>
                  <span className="block text-xl tracking-tight">Sales Trend</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1 block">Past 7 Days</span>
                </div>
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center">
                   <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
              </h4>
              <div className="h-64 w-full">
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
                    <Tooltip 
                      contentStyle={{borderRadius: '1.5rem', border: 'none', backgroundColor: '#0d1117', color: '#fff'}}
                      itemStyle={{fontWeight: 900, fontSize: '0.9rem'}}
                      labelStyle={{fontWeight: 900, fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem'}}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#7c3aed" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm premium-card">
              <h4 className="font-black dark:text-white mb-10 flex items-center justify-between">
                <div>
                  <span className="block text-xl tracking-tight">Financial Balance</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1 block">Profit Analysis</span>
                </div>
                <div className="w-10 h-10 bg-violet-50 dark:bg-violet-950/30 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-violet-500" />
                </div>
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitData}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#1e293b10" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} dy={15} />
                    <Tooltip 
                      contentStyle={{borderRadius: '1.5rem', border: 'none', backgroundColor: '#0d1117', color: '#fff'}}
                      itemStyle={{fontWeight: 900, fontSize: '0.9rem'}}
                      labelStyle={{fontWeight: 900, fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem'}}
                    />
                    <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} barSize={15} />
                    <Bar dataKey="loss" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={15} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Action Steps */}
        <div className="space-y-8">
          <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm premium-card">
            <div className="flex items-center justify-between mb-10">
              <h4 className="font-black text-2xl dark:text-white tracking-tight">Kal ki Strategy</h4>
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-ping" />
            </div>
            <div className="space-y-8">
              {tasks.length > 0 ? tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-5 p-4 hover:bg-violet-50 dark:hover:bg-violet-950/20 rounded-2xl transition-all cursor-default group border border-transparent hover:border-violet-100 dark:hover:border-violet-900/30">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-inner">
                    <span className="text-sm font-black group-hover:text-white">{idx + 1}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-snug">
                    {task}
                  </p>
                </div>
              )) : (
                <p className="p-10 text-center text-slate-400 font-black uppercase tracking-widest text-[10px]">Strategizing...</p>
              )}
            </div>
            <button className="w-full mt-10 py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl active:scale-95">
              <Calendar className="w-4 h-4 text-violet-500" />
              Set AI Notifications
            </button>
          </div>
          
          <div className="p-10 bg-violet-600 rounded-[3rem] text-white shadow-2xl shadow-violet-500/20 glossy-button overflow-hidden relative group">
            <Sparkles className="absolute top-4 right-4 w-12 h-12 opacity-10 group-hover:opacity-100 transition-opacity" />
            <h4 className="font-black text-xl mb-3 tracking-tight">Pro Tip: Optimization</h4>
            <p className="text-sm font-bold opacity-80 mb-8 leading-relaxed">Reduce Pyaaz stock by 20% to avoid spoilage based on heat warnings.</p>
            <button className="w-full py-4 bg-white text-violet-800 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-violet-50 transition-all shadow-lg active:scale-95">
              Apply Recommendation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
