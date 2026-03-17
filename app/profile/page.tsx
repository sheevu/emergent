"use client";

import React, { useState, useEffect } from "react";
import { Save, Building2, MapPin, Globe, Phone, Tag, Zap, ArrowLeft, CheckCircle2 } from "lucide-react";
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
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-white mb-2 tracking-tight">Business Profile</h1>
          <p className="text-slate-500 font-medium">Ye details humare AI ko aapki help karne mein madad karengi.</p>
        </div>
        <AnimatePresence>
          {saved && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 font-bold rounded-xl border border-emerald-100"
            >
              <CheckCircle2 className="w-4 h-4" />
              Saved Successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2 dark:text-white">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Basic Info
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Full Name (Apna Naam)</label>
                <input 
                  type="text" name="name" value={profile.name} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Business Name (Dukaan ka Naam)</label>
                <input 
                  type="text" name="businessName" value={profile.businessName} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                  placeholder="e.g. Jai Hind General Store"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Business Type</label>
                  <select 
                    name="businessType" value={profile.businessType} onChange={handleChange}
                    title="Select Business Type"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Category</label>
                  <input 
                    type="text" name="category" value={profile.category} onChange={handleChange}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                    placeholder="e.g. Kirana"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2 dark:text-white">
              <MapPin className="w-5 h-5 text-indigo-600" />
              Contact & Location
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Location (Shaher/Area)</label>
                <input 
                  type="text" name="location" value={profile.location} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                  placeholder="e.g. Hauz Khas, Delhi"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Phone No.</label>
                  <input 
                    type="text" name="contact" value={profile.contact} onChange={handleChange}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                    placeholder="987xxxxxxx"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Website</label>
                  <input 
                    type="text" name="website" value={profile.website} onChange={handleChange}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                    placeholder="www.yourstore.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2 dark:text-white">
              <Zap className="w-5 h-5 text-indigo-600" />
              Business USP & Offers
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Top USP (Aapki dukaan kis liye sahi hai?)</label>
                <textarea 
                  name="usp" value={profile.usp} onChange={handleChange} rows={3}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none" 
                  placeholder="e.g. Best quality organic spices, Fastest home delivery in 10 mins"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Top Offers (Running Discounts)</label>
                <textarea 
                  name="offers" value={profile.offers} onChange={handleChange} rows={3}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none" 
                  placeholder="e.g. 10% off on first order, Buy 1 Get 1 on Milk"
                />
              </div>
            </div>
          </div>

          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl space-y-6">
            <h3 className="text-xl font-black">AI Transformation</h3>
            <p className="text-sm font-bold text-indigo-100 leading-relaxed">
              In details ko fill karne ke baad, aapka AI Assistant aur accurate ho jayega. 
              Woh aapko suggest karega ki kaise sales badhayein based on your category and location.
            </p>
            <button 
              type="submit"
              className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            >
              <Save className="w-5 h-5" />
              Save Details & Refresh AI
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
