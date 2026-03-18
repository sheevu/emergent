"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  UserPlus, 
  PhoneCall, 
  MessageCircle,
  CheckCircle2, 
  Clock, 
  Search,
  MoreVertical,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { CRMService } from "@/lib/services/crm.service";
import { Lead } from "@/lib/db";
import { openWhatsApp } from "@/lib/utils/whatsapp";

export default function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({ totalLeads: 0, wonLeads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const allLeads = await CRMService.listLeads();
        const s = await CRMService.getDashboardStats();
        setLeads(allLeads);
        setStats(s);
        setLoading(false);
      } catch (e) {
        console.error("CRM Load Error:", e);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-10 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Grahak Dashboard (CRM)</h1>
          <p className="text-slate-500 font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            Manage your customers and scale your sales with AI.
          </p>
        </div>
        <button className="px-8 py-4 bg-violet-600 text-white font-black rounded-2xl shadow-xl shadow-violet-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 glossy-button text-sm uppercase tracking-widest">
          <UserPlus className="w-5 h-5" />
          Naya Grahak Add Karein
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Kul Grahak", value: stats.totalLeads, icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Safal Leads", value: stats.wonLeads, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Kaam", value: stats.totalLeads - stats.wonLeads, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Monthly Target", value: "50+", icon: Filter, color: "text-pink-600", bg: "bg-pink-50" },
        ].map((stat) => (
          <div key={stat.label} className="p-8 bg-white dark:bg-[#0d1117] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm premium-card">
            <div className={`w-12 h-12 ${stat.bg} dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black dark:text-white leading-none">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden premium-card">
        <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="font-black text-2xl dark:text-white tracking-tight flex items-center gap-3">
             <div className="w-2 h-8 bg-violet-600 rounded-full" />
             Grahak ki List (Leads)
          </h3>
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
            <input 
              type="text" placeholder="Grahak ka naam dhundein..." 
              className="pl-14 pr-8 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold w-full outline-none focus:ring-4 focus:ring-violet-500/10 transition-all shadow-inner"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-left border-b border-slate-50 dark:border-slate-800">
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Name & ID</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Contact & City</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status Bar</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Interest Type</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Connect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={5} className="p-32 text-center text-slate-400 font-black uppercase tracking-widest text-xs">Data Synchronizing...</td></tr>
              ) : leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-violet-50/30 dark:hover:bg-violet-950/10 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                        {lead.name[0]}
                      </div>
                      <div>
                        <span className="font-black dark:text-white text-base block leading-none mb-1">{lead.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {lead.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-black dark:text-slate-200 tracking-tight leading-none mb-1">{lead.phone}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{lead.city}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      lead.status === 'WON' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      lead.status === 'LOST' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      'bg-violet-50 text-violet-600 border-violet-100'
                    }`}>
                      {lead.status === 'WON' ? '✅ Successful' : lead.status === 'LOST' ? '❌ Lost' : '⏳ ' + lead.status}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 tracking-tight">{lead.interest}</span>
                  </td>
                  <td className="px-10 py-8 text-right space-x-3">
                    <button 
                      title="WhatsApp Customer"
                      onClick={() => openWhatsApp(lead.phone, `Namaste ${lead.name}, Kirana-Kranti AI se sampark karne ke liye dhanyavad.`)}
                      className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-90"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button 
                      title="Call Customer"
                      className="p-3 bg-slate-50 dark:bg-slate-800 text-violet-600 rounded-xl hover:bg-violet-600 hover:text-white transition-all shadow-sm active:scale-90"
                    >
                      <PhoneCall className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
