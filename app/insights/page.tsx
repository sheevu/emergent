"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown, Calendar, PieChart, Info, ArrowUpRight, IndianRupee, Download } from "lucide-react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      const text = await AnalyticsService.getDailyInsight();
      const t = await AnalyticsService.getDailyTasks();
      const data = await AnalyticsService.getChartData();
      setInsight(text);
      setTasks(t);
      setChartData(data);
      setLoading(false);
    }
    loadAnalytics();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white mb-1">Business Insights <span className="text-indigo-500">(Vyapaar ki Samajh)</span></h1>
          <p className="text-slate-500 font-medium">Data-driven analysis specifically for your shop.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold shadow-sm text-sm">
          <Download className="w-4 h-4" /> Download Report
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Insight Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-indigo-100">AI Deep Dive</h3>
              </div>
              <p className="text-2xl font-bold leading-relaxed mb-8">
                "{insight}"
              </p>
              <div className="flex items-center gap-6">
                <div className="bg-white/10 px-4 py-3 rounded-2xl flex flex-col backdrop-blur-sm border border-white/5">
                  <span className="text-xs uppercase font-bold opacity-60 mb-1">Weekly Growth</span>
                  <span className="text-xl font-bold flex items-center gap-1 text-emerald-300">
                    <ArrowUpRight className="w-4 h-4" /> +14.2%
                  </span>
                </div>
                <div className="bg-white/10 px-4 py-3 rounded-2xl flex flex-col backdrop-blur-sm border border-white/5">
                  <span className="text-xs uppercase font-bold opacity-60 mb-1">Top Item</span>
                  <span className="text-xl font-bold">Aloo (Potato)</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold dark:text-white mb-6 flex items-center justify-between">
                <div>
                  <span className="block">Sales Trend</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pichle Saath Din</span>
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </h4>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold dark:text-white mb-6 flex items-center justify-between">
                <div>
                  <span className="block">Profit vs Loss</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Daily Analysis</span>
                </div>
                <BarChart3 className="w-4 h-4 text-indigo-500" />
              </h4>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="profit" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Action Steps */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-bold text-lg dark:text-white">Next Day Strategy</h4>
              <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase px-2 py-1 rounded-md">Smart Suggestion</span>
            </div>
            <div className="space-y-6">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-4 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all cursor-default group">
                  <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <span className="text-xs font-bold text-indigo-600 group-hover:text-white">{idx + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-tight">
                    {task}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95">
              <Calendar className="w-4 h-4" />
              Set AI Reminders
            </button>
          </div>
          
          <div className="p-6 bg-emerald-600 rounded-3xl text-white shadow-xl shadow-emerald-500/20">
            <h4 className="font-bold mb-2">Pro Optimization</h4>
            <p className="text-sm opacity-90 mb-6">Reduce Pyaaz stock by 20% to avoid spoilage based on heat warnings.</p>
            <button className="w-full py-3 bg-white text-emerald-700 font-bold rounded-xl text-xs hover:bg-emerald-50 transition-all">
              Apply Suggestion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
