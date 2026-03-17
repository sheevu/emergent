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
  Landmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Overview", icon: Home, href: "/" },
  { name: "Grahak (CRM)", icon: Users, href: "/crm" },
  { name: "Accounts (Finance)", icon: BarChart3, href: "/accounts" },
  { name: "Scanner", icon: Scan, href: "/scanner" },
  { name: "My Store", icon: Store, href: "/store" },
  { name: "AI Assistant", icon: MessageSquare, href: "/chat" },
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
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-md"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 lg:static"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">Kirana Kranti</h1>
              </div>

              <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive 
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : ""}`} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Account</span>
                </button>
                <div className="mt-4 p-4 bg-indigo-600 rounded-2xl text-white">
                  <p className="text-xs font-medium opacity-80 uppercase tracking-wider mb-2">Daily Update</p>
                  <p className="text-sm font-bold leading-tight">Mandi Rates: Aloo +2, Pyaj -1</p>
                  <button className="mt-3 flex items-center gap-1 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all">
                    <Share2 className="w-3 h-3" /> Share Progress
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
