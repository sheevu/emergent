"use client";

import React, { useState } from "react";
import { Camera, Upload, CheckCircle2, ArrowLeft, Loader2, IndianRupee, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ScannerService } from "@/lib/services/scanner.service";

export default function ScannerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Camera access permission chahiye (Need permission).");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setPreview(dataUrl);
      setIsCameraOpen(false);
      
      // Stop stream
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      
      processImage(dataUrl);
    }
  };

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
    <div className="max-w-6xl mx-auto space-y-10 pb-32">
      <Link href="/" className="inline-flex items-center gap-3 text-slate-400 hover:text-violet-500 transition-all font-bold group">
        <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black dark:text-white mb-2 tracking-tight line-height-[1.1]">Diary & Bill Scanner</h1>
          <p className="text-slate-500 font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
            AI extracts data from your photos instantly.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Upload Section */}
        <div className="space-y-10">
          <div 
            className={`relative group border-2 border-dashed rounded-[3rem] p-12 flex flex-col items-center justify-center text-center transition-all overflow-hidden
              ${preview || isCameraOpen ? 'border-violet-500 bg-violet-50/5' : 'border-slate-200 dark:border-slate-800 hover:border-violet-400 bg-white dark:bg-[#0d1117]'}
            `}
          >
            {isCameraOpen ? (
              <div className="w-full space-y-6">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-[2rem] shadow-2xl border-4 border-white/10" />
                <button 
                  title="Capture Document"
                  onClick={capturePhoto}
                  className="w-full py-5 bg-violet-600 text-white font-black rounded-3xl hover:bg-violet-700 active:scale-95 transition-all text-xs uppercase tracking-[0.2em] glossy-button"
                >
                  Capture Document
                </button>
              </div>
            ) : preview ? (
              <div className="relative w-full group">
                <img src={preview} alt="Preview" className="w-full max-h-80 object-contain rounded-[2rem] mb-6 shadow-2xl" />
                <button 
                  title="Remove Image"
                  onClick={() => { setPreview(null); setResult(null); }}
                  className="absolute top-4 right-4 p-3 bg-black/50 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowLeft className="w-4 h-4 rotate-90" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 bg-violet-50 dark:bg-violet-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:rotate-3">
                  <Camera className="w-12 h-12 text-violet-600" />
                </div>
                <h3 className="text-2xl font-black dark:text-white mb-3 tracking-tight">Photo Upload Karein</h3>
                <p className="text-sm font-bold text-slate-500 mb-10 max-w-[240px]">Dairi ya Bill ki saaf photo click karein.</p>
              </>
            )}

            {!isCameraOpen && (
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <button 
                  onClick={startCamera}
                  className="flex-1 px-8 py-5 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-[2rem] shadow-2xl shadow-violet-500/30 transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.15em] glossy-button"
                >
                  <Camera className="w-5 h-5" />
                  Live Camera
                </button>
                <div className="flex-1 relative">
                  <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  <label 
                    htmlFor="file-upload"
                    className="w-full h-full px-8 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-black rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.15em] cursor-pointer shadow-sm"
                  >
                    <Upload className="w-5 h-5 text-violet-500" />
                    Gallery
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="p-10 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none space-y-8 premium-card">
            <h3 className="text-2xl font-black dark:text-white flex items-center gap-4">
              <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full" />
              <span className="text-slate-900 dark:text-white">Manual Entry</span>
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-8">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block ml-2">Item Name</label>
                  <input type="text" placeholder="Doodh, Chawal, etc." className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.8rem] text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner" />
                </div>
                <div className="col-span-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block ml-2">Amount</label>
                  <input type="number" placeholder="₹" className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-none rounded-[1.8rem] text-sm font-black text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner" />
                </div>
              </div>
              <button 
                title="Add Custom Row"
                className="w-full py-6 bg-slate-900 dark:bg-slate-800 text-white font-black rounded-[1.8rem] text-[10px] uppercase tracking-[0.25em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl active:shadow-none"
              >
                + Add Custom Row
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-10">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 premium-card"
              >
                <div className="relative mb-8">
                   <Loader2 className="w-16 h-16 text-violet-600 animate-spin" />
                   <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-pulse" />
                </div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">AI Analysing...</h3>
                <p className="text-slate-500 font-bold text-center mt-3 max-w-[240px]">Digital Assistant aapke handwritten data ko samajh raha hai.</p>
              </motion.div>
            ) : result ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="p-8 bg-emerald-50 dark:bg-emerald-500/5 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-emerald-950 dark:text-emerald-400 tracking-tight">Scan Successful!</h3>
                  </div>
                  <p className="text-emerald-800 dark:text-emerald-300 font-bold text-lg leading-relaxed">"{result.summary}"</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 bg-white dark:bg-[#0d1117] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 premium-card">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Total Sale</p>
                    <h4 className="text-3xl font-black dark:text-white flex items-center gap-2">
                      <div className="p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg"><IndianRupee className="w-5 h-5 text-emerald-600" /></div>
                      {result.totalSales}
                    </h4>
                  </div>
                  <div className="p-8 bg-white dark:bg-[#0d1117] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 premium-card">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Total Purchase</p>
                    <h4 className="text-3xl font-black dark:text-white flex items-center gap-2">
                       <div className="p-1 bg-rose-100 dark:bg-rose-900/30 rounded-lg"><IndianRupee className="w-5 h-5 text-rose-600" /></div>
                       {result.totalPurchases}
                    </h4>
                  </div>
                </div>

                <div className="p-8 bg-white dark:bg-[#0d1117] rounded-[3rem] border border-slate-100 dark:border-slate-800 premium-card">
                  <h4 className="font-black text-xl dark:text-white mb-6 tracking-tight flex items-center gap-3">
                    <div className="w-1 h-5 bg-violet-500 rounded-full" />
                    Extracted Items
                  </h4>
                  <div className="space-y-4">
                    {result.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl group hover:bg-violet-50 dark:hover:bg-violet-950/20 transition-all border border-transparent hover:border-violet-100 dark:hover:border-violet-900/30">
                        <div className="flex items-center gap-4">
                           <div className={`w-3 h-3 rounded-full ${item.type === 'sale' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                           <div>
                            <p className="font-black dark:text-white text-base block mb-0.5">{item.name}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Type: {item.type}</p>
                           </div>
                        </div>
                        <p className="font-black dark:text-white text-lg tracking-tight">₹{item.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-6 bg-violet-600 text-white font-black rounded-3xl shadow-[0_20px_40px_-10px_rgba(124,58,237,0.4)] hover:bg-violet-700 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-[0.2em] glossy-button">
                  Save to Business Ledger
                </button>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-slate-50/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 group hover:border-violet-300 transition-all">
                <div className="relative mb-8">
                  <Camera className="w-20 h-20 opacity-20 group-hover:opacity-100 transition-all group-hover:scale-110 group-hover:rotate-6" />
                  <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-violet-500 opacity-0 group-hover:opacity-50 group-hover:animate-pulse" />
                </div>
                <p className="text-center font-black uppercase tracking-widest text-[10px] max-w-[200px] leading-relaxed">Koi scan results nahi hain. Kripya Photo click ya upload karein.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
