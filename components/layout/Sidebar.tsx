"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Scan, 
  BarChart3, 
  Store, 
  Users,
  Settings, 
  MessageSquare,
  Menu,
  X,
  User,
  Share2,
  Video,
  Landmark,
  MessageSquare as ChatIcon,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Overview", icon: Home, href: "/" },
  { name: "Grahak (CRM)", icon: Users, href: "/crm" },
  { name: "Accounts (Finance)", icon: Landmark, href: "/accounts" },
  { name: "Scanner", icon: Scan, href: "/scanner" },
  { name: "My Store", icon: Store, href: "/store" },
  { name: "AI Assistant", icon: ChatIcon, href: "/chat" },
  { name: "Business Profile", icon: User, href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button 
          title="Toggle Menu"
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white dark:bg-[#0d1117] rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800"
        >
          {isOpen ? <X className="w-6 h-6 text-violet-600" /> : <Menu className="w-6 h-6 text-violet-600" />}
        </button>
      </div>

      <AnimatePresence>
        {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#0d1117] border-r border-slate-100 dark:border-slate-800 z-40 lg:static"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center gap-4 mb-12 px-2">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-violet-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-violet-500/30 -rotate-6 group">
                   <Sparkles className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Kirana <span className="text-violet-600">Kranti</span></h1>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 ml-0.5 opacity-60">Empowering MSMEs</p>
                </div>
              </div>

              <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all group ${
                        isActive 
                          ? "bg-violet-600 text-white shadow-2xl shadow-violet-500/40 hover:scale-[1.02]" 
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-violet-600 dark:hover:text-white"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-white" : ""}`} />
                      <span className="font-black text-sm tracking-tight">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-6 pt-8 border-t border-slate-50 dark:border-slate-900">
                <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all" />
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-3">Live Mandi Report</p>
                  <p className="text-sm font-black leading-tight mb-4">Aloo +2, Pyaj -1, Tel Flat</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.open('https://web.whatsapp.com', '_blank')}
                      className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 group/wa shadow-lg shadow-emerald-500/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest font-black">WhatsApp</span>
                    </button>
                    <Link 
                      href="/profile"
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                      title="Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 px-4 py-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-950 transition-all border border-transparent group-hover:border-violet-100">
                    <User className="w-5 h-5 group-hover:text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black dark:text-white group-hover:text-violet-600 transition-colors">Admin Account</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Jai Hind Store</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
