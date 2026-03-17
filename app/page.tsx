"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  MessageSquare, 
  Calendar,
  CheckCircle2,
  Scan,
  Users,
  Package,
  Clock,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { CRMService } from "@/lib/services/crm.service";
import { StoreService } from "@/lib/services/store.service";
import { AnalyticsService } from "@/lib/services/analytics.service";
import { brain } from "@/lib/agents/brain";
import { Lead } from "@/lib/db";

export default function Dashboard() {
  const [crmStats, setCrmStats] = useState({ totalLeads: 0, wonLeads: 0 });
  const [storeStats, setStoreStats] = useState({ totalItems: 0, lowStock: 0 });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [aiInsight, setAiInsight] = useState("Data load ho raha hai...");
  const [aiTasks, setAiTasks] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    async function loadData() {
      const crm = await CRMService.getDashboardStats();
      const store = await StoreService.getInventoryStats();
      const insight = await AnalyticsService.getDailyInsight();
      const tasks = await AnalyticsService.getDailyTasks();
      const leads = await CRMService.listLeads();
      
      setCrmStats(crm);
      setStoreStats(store);
      setAiInsight(insight);
      setAiTasks(tasks);
      setRecentLeads(leads.slice(-3).reverse());
    }
    loadData();
  }, []);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;
    
    setIsTyping(true);
    setChatResponse("Soch raha hoon...");
    
    try {
      const response = await brain.query(chatInput);
      setChatResponse(response.content);
      
      // Refresh all data
      const crm = await CRMService.getDashboardStats();
      const store = await StoreService.getInventoryStats();
      const leads = await CRMService.listLeads();
      setCrmStats(crm);
      setStoreStats(store);
      setRecentLeads(leads.slice(-3).reverse());
    } catch (err) {
      setChatResponse("Kshama karein, kuch error aa gaya.");
    } finally {
      setIsTyping(false);
      setChatInput("");
    }
  };

  const dashboardStats = [
    { label: "Total Leads", value: crmStats.totalLeads.toString(), sub: "Naye Grahak", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10", icon: Users },
    { label: "Won Leads", value: crmStats.wonLeads.toString(), sub: "Converted", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10", icon: CheckCircle2 },
    { label: "Inventory", value: storeStats.totalItems.toString(), sub: "Maal in Stock", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-500/10", icon: Package },
    { label: "Low Stock", value: storeStats.lowStock.toString(), sub: "Kam Maal", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-500/10", icon: TrendingDown },
  ];

  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            Namaste, <span className="gradient-text">Jai Hind Store!</span>
          </h1>
          <p className="text-slate-500 font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} • Bharat
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex -space-x-3 p-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black uppercase text-slate-400">Team Status</p>
            <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 4 Active
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {dashboardStats.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label}
            className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-black dark:text-white">{stat.value}</h3>
              <span className="text-[10px] font-bold text-slate-400">{stat.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* AI Insights Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl tracking-tight">AI Vyapaar Insight</h4>
                    <p className="text-[10px] font-bold uppercase opacity-60">Real-time Analysis</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold backdrop-blur-md border border-white/10">
                  Updated Just Now
                </div>
              </div>
              <p className="text-2xl font-bold leading-tight mb-10 group-hover:translate-x-1 transition-transform">
                "{aiInsight}"
              </p>
              <div className="flex items-center gap-4">
                <button className="px-8 py-4 bg-white text-indigo-700 font-black rounded-2xl text-sm shadow-2xl hover:bg-slate-50 active:scale-95 transition-all">
                  Apply Today's Plan
                </button>
                <button className="px-6 py-4 bg-indigo-500/30 text-white font-bold rounded-2xl text-sm backdrop-blur-md hover:bg-indigo-500/40 transition-all">
                  Details
                </button>
              </div>
            </div>
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px] pointer-events-none" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Leads */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-black text-lg dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  Naye Leads
                </h4>
                <Link href="/store" className="text-xs font-bold text-indigo-600 hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {recentLeads.length > 0 ? recentLeads.map((lead, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] group cursor-pointer hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-black">
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm dark:text-white">{lead.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{lead.interest}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                )) : (
                  <p className="text-center py-8 text-slate-400 text-sm font-medium">Koi naya lead nahi hai.</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-black text-lg dark:text-white mb-6">Quick Tools</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "New Lead", icon: Users, color: "bg-emerald-500", href: "/chat" },
                  { label: "Scan Bill", icon: Scan, color: "bg-amber-500", href: "/scanner" },
                  { label: "Inventory", icon: Package, color: "bg-indigo-500", href: "/store" },
                  { label: "Govt Help", icon: MessageSquare, color: "bg-rose-500", href: "/govt" },
                ].map((tool) => (
                  <Link href={tool.href} key={tool.label} className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all group flex flex-col items-center text-center gap-2">
                    <div className={`w-10 h-10 ${tool.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-${tool.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold dark:text-slate-300">{tool.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Tasks & Chat */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-black text-lg dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Kal ki Taiyari
              </h4>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">AI Auto</span>
            </div>
            <div className="space-y-4">
              {aiTasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer group">
                  <div className="mt-1">
                    <div className="w-6 h-6 rounded-lg border-2 border-slate-200 group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-all flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">{task}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl text-xs hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
              Mark All Done (Sab Khatam)
            </button>
          </div>

          {/* Quick Chat Section */}
          <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-black text-xl text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                Quick AI Chat
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-6 tracking-widest">Hinglish Support Active</p>
              
              <form onSubmit={handleChat} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 text-white placeholder-slate-500 text-sm font-medium outline-none transition-all"
                  />
                  {isTyping && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                      <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>
                <button type="submit" disabled={isTyping} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl text-xs hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-500/20">
                  {isTyping ? "Thinking..." : "Send Command"}
                </button>
              </form>
              
              <AnimatePresence>
                {chatResponse && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 bg-white/10 rounded-2xl text-xs text-indigo-100 font-medium leading-relaxed border border-white/5"
                  >
                    {chatResponse}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Link href="/scanner" className="fixed bottom-8 right-8 w-20 h-20 bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all z-50 group">
        <Scan className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </Link>
    </div>
  );
}
