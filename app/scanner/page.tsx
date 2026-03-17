"use client";

import React, { useState } from "react";
import { Camera, Upload, CheckCircle2, ArrowLeft, Loader2, IndianRupee } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ScannerService } from "@/lib/services/scanner.service";

export default function ScannerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        processImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await ScannerService.analyzeHandwrittenDiary(base64);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-white mb-2">Diary Scanner</h1>
          <p className="text-slate-500">Scan your handwritten notebook for daily sales and purchases.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div 
            className={`relative group border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all
              ${preview ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 bg-white dark:bg-slate-900'}
            `}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded-2xl mb-4" />
            ) : (
              <>
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold dark:text-white mb-1">Dairu ki Photo Lein</h3>
                <p className="text-sm text-slate-500 mb-6">Upload a clear photo of your handwritten records</p>
              </>
            )}

            <label className="cursor-pointer px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {preview ? "Change Photo" : "Upload Image"}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold dark:text-white mb-4">Manual Entry</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <input type="text" placeholder="Item Name" className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm" />
                <input type="number" placeholder="Amt" className="w-24 p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm" />
              </div>
              <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-sm hover:bg-slate-200 transition-all">
                Add Row
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"
              >
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-lg font-bold dark:text-white">Analyzing Digitally...</h3>
                <p className="text-slate-500 text-center mt-2">Hum aapke data ko AI se samajh rahe hain.</p>
              </motion.div>
            ) : result ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl border border-emerald-100 dark:border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="text-emerald-600 w-6 h-6" />
                    <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400">Scan Complete!</h3>
                  </div>
                  <p className="text-emerald-800 dark:text-emerald-300 font-medium">"{result.summary}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-sm text-slate-500 font-semibold mb-1">Total Sale</p>
                    <h4 className="text-2xl font-bold dark:text-white flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" /> {result.totalSales}
                    </h4>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-sm text-slate-500 font-semibold mb-1">Total Purchase</p>
                    <h4 className="text-2xl font-bold dark:text-white flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" /> {result.totalPurchases}
                    </h4>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold dark:text-white mb-4">Extracted Items</h4>
                  <div className="space-y-3">
                    {result.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <div>
                          <p className="font-bold dark:text-white">{item.name}</p>
                          <p className={`text-xs font-bold uppercase ${item.type === 'sale' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {item.type}
                          </p>
                        </div>
                        <p className="font-bold dark:text-white">₹{item.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-700 transition-all">
                  Save to Business Ledger
                </button>
              </motion.div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
                <Camera className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-center font-medium">Koi scan results nahi hain. Photo upload karein.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
