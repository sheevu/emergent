"use client";

import React, { useState, useEffect } from "react";
import { Save, Building2, MapPin, Globe, Phone, Tag, Zap, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    businessType: "",
    businessName: "Jai Hind Store",
    category: "",
    usp: "",
    offers: "",
    website: "",
    contact: ""
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("kk_business_profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("kk_business_profile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-32">
      <Link href="/" className="inline-flex items-center gap-3 text-slate-500 hover:text-violet-600 transition-all font-bold group">
        <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Business Profile</h1>
          <p className="text-slate-500 font-bold flex items-center gap-2">
            <div className="w-1.5 h-6 bg-violet-600 rounded-full" />
            Ye details humare AI ko aapki help karne mein madad karengi.
          </p>
        </div>
        <AnimatePresence>
          {saved && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3 px-6 py-3 bg-emerald-50 text-emerald-600 font-black rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-500/10 text-xs uppercase tracking-widest"
            >
              <CheckCircle2 className="w-5 h-5" />
              Saved Successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8 premium-card">
            <h3 className="text-xl font-black flex items-center gap-4 dark:text-white tracking-tight">
              <div className="w-10 h-10 bg-violet-50 dark:bg-violet-950/30 rounded-xl flex items-center justify-center">
                 <Building2 className="w-5 h-5 text-violet-600" />
              </div>
              Basic Info
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Full Name (Apna Naam)</label>
                <input 
                  type="text" name="name" value={profile.name} onChange={handleChange}
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none shadow-inner" 
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Business Name (Dukaan ka Naam)</label>
                <input 
                  type="text" name="businessName" value={profile.businessName} onChange={handleChange}
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none shadow-inner" 
                  placeholder="e.g. Jai Hind General Store"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Business Type</label>
                  <select 
                    name="businessType" value={profile.businessType} onChange={handleChange}
                    title="Select Business Type"
                    className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none appearance-none cursor-pointer shadow-inner"
                  >
                    <option value="">Select Type</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Category</label>
                  <input 
                    type="text" name="category" value={profile.category} onChange={handleChange}
                    className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none shadow-inner" 
                    placeholder="e.g. Kirana"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8 premium-card">
            <h3 className="text-xl font-black flex items-center gap-4 dark:text-white tracking-tight">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              Contact & Location
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Location (Shaher/Area)</label>
                <input 
                  type="text" name="location" value={profile.location} onChange={handleChange}
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none shadow-inner" 
                  placeholder="e.g. Hauz Khas, Delhi"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Phone No.</label>
                  <input 
                    type="text" name="contact" value={profile.contact} onChange={handleChange}
                    className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none shadow-inner" 
                    placeholder="987xxxxxxx"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Website</label>
                  <input 
                    type="text" name="website" value={profile.website} onChange={handleChange}
                    className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none shadow-inner" 
                    placeholder="www.yourstore.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8 premium-card">
            <h3 className="text-xl font-black flex items-center gap-4 dark:text-white tracking-tight">
              <div className="w-10 h-10 bg-amber-50 dark:bg-amber-950/30 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              Business USP & Offers
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Top USP (Aapki dukaan kis liye sahi hai?)</label>
                <textarea 
                  name="usp" value={profile.usp} onChange={handleChange} rows={4}
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none resize-none shadow-inner" 
                  placeholder="e.g. Best quality organic spices, Fastest home delivery in 10 mins"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Top Offers (Running Discounts)</label>
                <textarea 
                  name="offers" value={profile.offers} onChange={handleChange} rows={4}
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.5rem] text-sm font-bold dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none resize-none shadow-inner" 
                  placeholder="e.g. 10% off on first order, Buy 1 Get 1 on Milk"
                />
              </div>
            </div>
          </div>

          <div className="p-10 bg-gradient-to-br from-violet-600 to-indigo-800 rounded-[3rem] text-white shadow-2xl space-y-8 glossy-button relative overflow-hidden group">
            <Sparkles className="absolute top-4 right-4 w-12 h-12 opacity-10 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black tracking-tight mb-4">AI Transformation</h3>
              <p className="text-base font-bold text-violet-100 leading-relaxed mb-8">
                In details ko fill karne ke baad, aapka AI Assistant aur accurate ho jayega. 
                Woh aapko suggest karega ki kaise sales badhayein based on your category and location.
              </p>
              <button 
                type="submit"
                className="w-full py-5 bg-white text-violet-700 font-black rounded-2xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl uppercase tracking-widest text-[10px]"
              >
                <Save className="w-5 h-5" />
                Save Details & Sync AI
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
