"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  UserPlus, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  Search,
  MoreVertical,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { CRMService } from "@/lib/services/crm.service";
import { Lead } from "@/lib/db";

export default function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({ totalLeads: 0, wonLeads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const allLeads = await CRMService.listLeads();
      const s = await CRMService.getDashboardStats();
      setLeads(allLeads);
      setStats(s);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-1">Grahak Dashboard (CRM)</h1>
          <p className="text-slate-500 font-bold">Manage your customers and new leads here.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Naya Grahak Add Karein
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Kul Grahak", value: stats.totalLeads, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Safal Leads", value: stats.wonLeads, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Kaam", value: stats.totalLeads - stats.wonLeads, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Target (Monthly)", value: "50", icon: Filter, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-black text-xl dark:text-white">Grahak ki List (Lead List)</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" placeholder="Grahak ka naam dhundein..." 
              className="pl-11 pr-6 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold w-full md:w-80 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-left">
                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Grahak Naam</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone / City</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Interest</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center text-slate-400 font-bold">Data load ho raha hai...</td></tr>
              ) : leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black">
                        {lead.name[0]}
                      </div>
                      <span className="font-bold dark:text-white text-sm">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold dark:text-slate-300">{lead.phone}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{lead.city}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      lead.status === 'WON' ? 'bg-emerald-100 text-emerald-700' :
                      lead.status === 'LOST' ? 'bg-rose-100 text-rose-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{lead.interest}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      title="Call Customer"
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <PhoneCall className="w-5 h-5 text-indigo-600" />
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
