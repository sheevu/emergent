"use client";

import React from "react";
import { Landmark, ShieldCheck, FileText, BadgeCheck, ExternalLink, IndianRupee } from "lucide-react";

export default function GovtSupportPage() {
  const schemes = [
    {
      title: "PM SVANidhi",
      desc: "Working capital loan for street vendors.",
      amt: "₹10,000",
      tag: "Active"
    },
    {
      title: "MSME Registration (Udyam)",
      desc: "Register your business for govt benefits.",
      amt: "Free",
      tag: "Recommended"
    },
    {
      title: "Pradhan Mantri Mudra Yojana",
      desc: "Loans for small business units.",
      amt: "Up to ₹10 Lakh",
      tag: "Popular"
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
          <Landmark className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white mb-1">Govt Support</h1>
          <p className="text-slate-500 font-medium">MSME schemes and subsidies for your dukaan.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {schemes.map((s, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold dark:text-white">{s.title}</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md">
                  {s.tag}
                </span>
              </div>
              <p className="text-slate-500 text-sm">{s.desc}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Benefit</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{s.amt}</p>
              </div>
              <button aria-label="Learn More" className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-slate-100 transition-colors">
                <ExternalLink className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 shadow-2xl">
        <div className="flex items-center gap-6">
          <BadgeCheck className="w-12 h-12 text-emerald-400" />
          <div>
            <h2 className="text-xl font-bold">Udyam Verification</h2>
            <p className="opacity-70 mt-1">Get your digital MSME certificate in minutes.</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-slate-900 font-black rounded-2xl shadow-xl hover:scale-105 transition-transform">
          Register Now
        </button>
      </div>
    </div>
  );
}
