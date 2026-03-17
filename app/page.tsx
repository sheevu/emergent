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
      color: "from-blue-600 to-indigo-700",
      hindi: "Grahak aur Sales manage karein"
    },
    { 
      title: "Accounts Dashboard", 
      desc: "Profit, Loss & Charts", 
      icon: Wallet, 
      href: "/accounts", 
      color: "from-emerald-600 to-teal-700",
      hindi: "Hisaab-kitaab aur Munafa dekhein"
    }
  ];

  return (
    <div className="space-y-10 pb-32">
      {/* Welcome Header */}
      <div className="relative p-10 bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            AI Business Assistant
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight">
            Namaste, <span className="text-indigo-400">Jai Hind Store!</span>
          </h1>
          <p className="text-slate-400 font-bold max-w-xl text-lg leading-relaxed">
            Aaj aapka vyapaar kaisa chal raha hai? Market trends ke hisaab se "Kal ki Tyaari" taiyaar hai.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {dashboards.map((db) => (
          <Link href={db.href} key={db.title}>
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`p-1 bg-gradient-to-br ${db.color} rounded-[2.5rem] shadow-xl group cursor-pointer`}
            >
              <div className="bg-white dark:bg-slate-900 rounded-[2.3rem] p-8 h-full space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${db.color} flex items-center justify-center text-white shadow-lg`}>
                    <db.icon className="w-7 h-7" />
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-black dark:text-white mb-1 tracking-tight">{db.title}</h3>
                  <p className="text-sm font-bold text-slate-500 mb-2">{db.desc}</p>
                  <p className="text-xs font-bold text-indigo-600 italic">"{db.hindi}"</p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Kal ki Tyaari Section */}
      <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight">Kal ki Tyaari</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Generated Daily Strategy</p>
            </div>
          </div>
          <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100 uppercase">Live Dashboard Insight</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
              <p className="text-lg font-bold dark:text-slate-200 italic leading-relaxed">
                "{aiInsight}"
              </p>
            </div>
            <Link href="/accounts" className="inline-flex items-center gap-2 text-indigo-600 font-black text-sm hover:underline">
              View Detailed Analytics <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Daily Action Items</h4>
            {aiTasks.map((task, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all group border border-transparent hover:border-slate-100">
                <div className="mt-1">
                  <div className="w-6 h-6 rounded-lg border-2 border-slate-200 group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-all flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 scale-0 group-hover:scale-100 transition-transform" />
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">{task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {[
          { label: "Scan Diary", icon: Scan, href: "/scanner" },
          { label: "AI Help", icon: MessageSquare, href: "/chat" },
          { label: "Profile", icon: Users, href: "/profile" },
          { label: "Accounts", icon: LayoutDashboard, href: "/accounts" },
        ].map((btn) => (
          <Link href={btn.href} key={btn.label} className="px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-3 group">
            <btn.icon className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black dark:text-white uppercase tracking-wider">{btn.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
