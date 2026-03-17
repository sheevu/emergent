"use client";

import React from "react";
import { PlayCircle, BookOpen, Video, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TutorialPage() {
  const tutorials = [
    { title: "App Kaise Use Karein?", duration: "2:30", icon: PlayCircle },
    { title: "Inventory Setup Guide", duration: "5:00", icon: Video },
    { title: "Scanner Tips for Best Results", duration: "1:45", icon: BookOpen },
    { title: "Understanding Insights", duration: "3:20", icon: HelpCircle },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-white mb-2">Tutorials & Help</h1>
        <p className="text-slate-500 font-medium">Learn how to grow your business with Kirana-Kranti AI.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tutorials.map((t, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <t.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold dark:text-white">{t.title}</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{t.duration} • Hindi Video</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-indigo-600 rounded-3xl text-white">
        <h2 className="text-xl font-bold mb-4">Support Chahiye?</h2>
        <p className="mb-6 opacity-90">Hum aapki madad ke liye hamesha taiyar hain. WhatsApp pe contact karein.</p>
        <button className="px-8 py-3 bg-white text-indigo-700 font-bold rounded-xl shadow-lg">
          Chat on WhatsApp
        </button>
      </div>
    </div>
  );
}
