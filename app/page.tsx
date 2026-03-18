"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Wallet, 
  Scan, 
  MessageSquare, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";

import { AnalyticsService } from "@/lib/services/analytics.service";

export default function HomeOverview() {
  const [aiInsight, setAiInsight] = useState("Data load ho raha hai...");
  const [aiTasks, setAiTasks] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const insight = await AnalyticsService.getDailyInsight();
        const tasks = await AnalyticsService.getDailyTasks();
        setAiInsight(insight);
        setAiTasks(tasks);
      } catch (err) {
        console.error("Home Data Load Error:", err);
      }
    }
    loadData();
  }, []);

  const dashboards = [
    { 
      title: "Grahak Dashboard", 
      desc: "Leads, Customers & CRM", 
      icon: Users, 
      href: "/crm", 
      color: "from-violet-600 to-indigo-700",
      hindi: "Grahak aur Sales (CRM) manage karein"
    },
    { 
      title: "Accounts Dashboard", 
      desc: "Profit, Loss & Charts", 
      icon: Wallet, 
      href: "/accounts", 
      color: "from-pink-600 to-rose-700",
      hindi: "Hisaab-kitaab (Finance) aur Munafa"
    }
  ];

  return (
    <div className="space-y-12 pb-32">
      {/* Welcome Header */}
      <div className="relative p-12 bg-[#0d1117] dark:bg-slate-950 rounded-[4rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(124,58,237,0.3)] border border-slate-900">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-[10px] font-black uppercase tracking-[0.2em] glass-pill">
            <Sparkles className="w-4 h-4 text-violet-400" />
            AI Empowerment for Indian MSMEs
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-tight">
            Namaste, <span className="text-violet-500">Jai Hind Store!</span>
          </h1>
          <p className="text-slate-400 font-bold max-w-2xl text-xl leading-relaxed">
            Ready to scale your business? Your AI companion has analyzed today's trends. 
            <span className="block mt-2 text-violet-300/60 font-medium italic">✨ "Kal ki Tyaari" is ready for review.</span>
          </p>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {dashboards.map((db) => (
          <Link href={db.href} key={db.title}>
            <motion.div 
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.97 }}
              className={`p-1 bg-gradient-to-br ${db.color} rounded-[3rem] shadow-2xl group cursor-pointer transition-all active:shadow-none`}
            >
              <div className="bg-white dark:bg-[#0d1117] rounded-[2.9rem] p-10 h-full space-y-8">
                <div className="flex items-center justify-between">
                  <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${db.color} flex items-center justify-center text-white shadow-xl`}>
                    <db.icon className="w-8 h-8" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-all">
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-violet-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black dark:text-white mb-2 tracking-tight">{db.title}</h3>
                  <p className="text-sm font-bold text-slate-400 mb-3">{db.desc}</p>
                  <div className="inline-block px-4 py-1.5 bg-slate-50 dark:bg-slate-900 rounded-xl">
                    <p className="text-xs font-black text-violet-600 uppercase tracking-widest leading-none mt-1">{db.hindi}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Kal ki Tyaari Section */}
      <div className="p-12 bg-white dark:bg-[#0d1117] rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden premium-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-violet-50 dark:bg-violet-900/20 rounded-[2rem] flex items-center justify-center shadow-inner">
              <Calendar className="w-8 h-8 text-violet-600" />
            </div>
            <div>
              <h3 className="text-3xl font-black dark:text-white tracking-tight">Kal ki Tyaari</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 ml-0.5">Automated Intelligence Insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest leading-none">Market Insights Live</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative group">
              <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-amber-400 opacity-20 group-hover:opacity-100 transition-opacity rotate-12" />
              <p className="text-xl font-bold dark:text-slate-200 italic leading-relaxed text-slate-700">
                "{aiInsight}"
              </p>
            </div>
            <Link href="/insights" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg active:scale-95 hover:translate-x-2">
              Deep Dive Analytics <ChevronRight className="w-4 h-4 text-violet-400" />
            </Link>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] px-4 border-l-4 border-violet-500">AI Daily Checklist</h4>
            <div className="space-y-3">
              {aiTasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-5 p-6 bg-white dark:bg-slate-900 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 rounded-[2rem] transition-all group border border-slate-50 dark:border-slate-800 cursor-default shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-violet-600 transition-all font-black text-slate-400 group-hover:text-white">
                    {idx + 1}
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 tracking-tight leading-tight">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer - Floating Style */}
      <div className="flex flex-wrap items-center justify-center gap-5 pt-8">
        {[
          { label: "Scanner", icon: Scan, href: "/scanner", bg: "bg-white", text: "text-violet-600" },
          { label: "Chat AI", icon: MessageSquare, href: "/chat", bg: "bg-violet-600", text: "text-white" },
          { label: "WhatsApp", icon: MessageSquare, href: "https://web.whatsapp.com", bg: "bg-emerald-500", text: "text-white", isExternal: true },
          { label: "Accounts", icon: LayoutDashboard, href: "/accounts", bg: "bg-white", text: "text-indigo-600" },
          { label: "Grahak", icon: Users, href: "/crm", bg: "bg-white", text: "text-indigo-600" },
        ].map((btn) => (
          <Link 
            key={btn.label}
            href={btn.href} 
            target={btn.isExternal ? "_blank" : undefined}
            className={`px-8 py-5 ${btn.bg} dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all flex items-center gap-3 group active:scale-95`}
          >
            <btn.icon className={`w-5 h-5 ${btn.text} group-hover:scale-125 transition-transform`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${btn.text === 'text-white' ? 'text-white' : 'dark:text-white'}`}>{btn.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
