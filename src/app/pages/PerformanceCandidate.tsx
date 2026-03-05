import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Video, 
  Monitor, 
  Smartphone, 
  Mic, 
  FileText, 
  Calculator, 
  Search, 
  Clock, 
  AlertTriangle, 
  Info,
  ChevronRight,
  ChevronLeft,
  X,
  Activity,
  User,
  LayoutSplit
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function PerformanceCandidate() {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [examStarted, setExamStarted] = useState(false);
  const [activePdf, setActivePdf] = useState<string | null>(null);
  const [showTool, setShowTool] = useState<'calc' | 'browser' | null>(null);

  const sharedDocuments = [
    { id: '1', title: 'PERFORMANS KRİTERLERİ (A2).pdf' },
    { id: '2', title: 'ŞİRKET PROSEDÜRLERİ.pdf' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-[#030213] text-slate-300 flex flex-col overflow-hidden select-none font-sans">
      {/* Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0d0d14]/80 backdrop-blur-xl z-20">
         <div className="flex items-center gap-5">
            <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center border border-purple-500/20">
               <ShieldCheck className="text-purple-500 w-6 h-6" />
            </div>
            <div>
               <h1 className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">Runway <span className="text-purple-500">Performans</span></h1>
               <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mt-1">Uygulama Modu: Aktif</p>
            </div>
         </div>

         <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 bg-white/5 px-6 py-2.5 rounded-[2rem] border border-white/10 shadow-2xl">
               <Clock className="w-4 h-4 text-purple-500" />
               <span className="text-sm font-mono font-black text-white tracking-widest tabular-nums">{formatTime(timeLeft)}</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <p className="text-xs font-black text-white italic uppercase leading-none tracking-tighter">Ahmet Yılmaz</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">NO: 2026-004</p>
               </div>
               <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" className="w-full h-full object-cover grayscale-[0.3]" alt="Self" />
               </div>
            </div>
         </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
         {/* Split view: Left (Performance Task) | Right (Shared Doc) */}
         <div className="flex-1 flex flex-col bg-[#050508]/40 border-r border-white/5 relative">
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
               <div className="max-w-4xl mx-auto space-y-12">
                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest">PERFORMANS ADIMI 1 / 4</span>
                        <div className="flex-1 h-px bg-white/5" />
                     </div>
                     <h2 className="text-3xl font-black text-white leading-tight italic uppercase tracking-tighter">
                        MÜŞTERİ PORTFÖYÜNÜ ANALİZ EDEREK PAZARLAMA STRATEJİSİ OLUŞTURUN
                     </h2>
                     <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[3rem] space-y-4">
                        <p className="text-slate-400 font-medium leading-relaxed italic">
                           "Aşağıdaki kriterleri dikkate alarak müşterinize en uygun portföyü seçin ve seçim nedenlerinizi gözetmene sözlü olarak aktarırken ekranınızdaki hesap makinesini kullanarak maliyet analizini yapın."
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {["Gelir ve eğitim seviyesi analizi", "Lokasyon bazlı fiyatlandırma", "Rakip portföy karşılaştırması", "Acil durum soğutma valfi analizi"].map((item, idx) => (
                             <li key={idx} className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shadow-lg" />
                                {item}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  {/* Shared Documents Notification Area */}
                  <div className="space-y-4">
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                        GÖZETMEN TARAFINDAN PAYLAŞILAN DOSYALAR
                        <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                     </p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sharedDocuments.map(doc => (
                           <button 
                             key={doc.id}
                             onClick={() => setActivePdf(doc.id)}
                             className={`p-6 rounded-[2.5rem] border transition-all flex items-center justify-between group ${activePdf === doc.id ? 'bg-purple-600/10 border-purple-500/40 shadow-xl' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                           >
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                    <FileText className="w-5 h-5 text-purple-500" />
                                 </div>
                                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{doc.title}</span>
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-transform ${activePdf === doc.id ? 'translate-x-1 text-purple-400' : 'text-slate-700'}`} />
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <footer className="h-24 border-t border-white/5 px-12 flex items-center justify-between bg-[#0d0d14]/60 backdrop-blur-xl">
               <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Gözetmen Tarafından İzleniyorsunuz</span>
               </div>
               <div className="flex gap-4">
                  <button 
                    onClick={() => setShowTool(showTool === 'calc' ? null : 'calc')}
                    className={`p-4 rounded-2xl transition-all border ${showTool === 'calc' ? 'bg-purple-600 border-purple-500 text-white shadow-xl shadow-purple-900/40' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                  >
                     <Calculator className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setShowTool(showTool === 'browser' ? null : 'browser')}
                    className={`p-4 rounded-2xl transition-all border ${showTool === 'browser' ? 'bg-purple-600 border-purple-500 text-white shadow-xl shadow-purple-900/40' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                  >
                     <Search className="w-5 h-5" />
                  </button>
                  <button className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-purple-900/40 transition-all active:scale-95">
                     PERFORMANSI TAMAMLA
                  </button>
               </div>
            </footer>
         </div>

         {/* Floating Tools (Calculator/Browser) */}
         <AnimatePresence>
            {showTool && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="fixed bottom-32 left-12 w-80 bg-[#0d0d14]/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden z-50"
               >
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest italic flex items-center gap-3">
                        {showTool === 'calc' ? <Calculator className="w-4 h-4 text-purple-500" /> : <Search className="w-4 h-4 text-purple-500" />}
                        {showTool === 'calc' ? 'HESAP MAKİNESİ' : 'TARAYICI'}
                     </span>
                     <button onClick={() => setShowTool(null)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                        <X className="w-4 h-4 text-slate-500" />
                     </button>
                  </div>
                  <div className="p-8 h-96 flex items-center justify-center">
                     <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10">
                           {showTool === 'calc' ? <Calculator className="w-8 h-8 text-slate-600" /> : <Search className="w-8 h-8 text-slate-600" />}
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Uygulama Hazırlanıyor...</p>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Right: PDF Viewer (Always visible if PDF is active) */}
         <AnimatePresence>
            {activePdf && (
               <motion.div 
                 initial={{ x: '100%' }}
                 animate={{ x: 0 }}
                 exit={{ x: '100%' }}
                 transition={{ type: 'spring', damping: 30, stiffness: 150 }}
                 className="w-[35%] bg-[#08080c] border-l border-white/5 flex flex-col relative z-30 shadow-[-20px_0_100px_rgba(0,0,0,0.8)]"
               >
                  <div className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#0d0d14]/60 backdrop-blur-xl">
                     <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Belge Görüntüleyici</span>
                     </div>
                     <button onClick={() => setActivePdf(null)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                        <X className="w-5 h-5 text-slate-500" />
                     </button>
                  </div>
                  <div className="flex-1 bg-black/40 p-10 overflow-y-auto custom-scrollbar flex flex-col items-center">
                     <div className="w-full max-w-lg aspect-[1/1.414] bg-white shadow-2xl rounded-sm p-12 text-slate-900">
                        <div className="h-12 w-full border-b-4 border-slate-900 flex items-center mb-8">
                           <h3 className="text-sm font-black uppercase italic tracking-tighter">PERFORMANS DOKÜMANI</h3>
                        </div>
                        <div className="space-y-6 font-serif">
                           <div className="h-4 w-1/4 bg-slate-100 rounded" />
                           <p className="text-slate-800 text-sm leading-relaxed">Aşağıdaki tabloda belirtilen maliyetlerin analiz edilerek en uygun portföyün seçilmesi gerekmektedir.</p>
                           <div className="grid grid-cols-2 gap-4 my-8">
                              <div className="h-24 bg-slate-50 border-2 border-slate-100 flex items-center justify-center font-bold text-slate-300 text-[10px]">TABLO 1.A</div>
                              <div className="h-24 bg-slate-50 border-2 border-slate-100 flex items-center justify-center font-bold text-slate-300 text-[10px]">TABLO 1.B</div>
                           </div>
                           <p className="text-slate-400 text-[11px] italic mt-12 pt-8 border-t-2 border-slate-100">"Bu belge Runway Akademi tarafından güvenlik amaçlı fligranlanmıştır."</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Self-Cam Previews (Floating) */}
         <div className="absolute bottom-32 right-12 flex flex-col gap-5 pointer-events-none z-40">
            <div className="w-56 h-36 rounded-[2.5rem] bg-black/60 backdrop-blur-3xl border border-white/10 overflow-hidden relative shadow-2xl transition-all duration-500">
               <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600" className="w-full h-full object-cover grayscale-[0.6] opacity-60" alt="Self" />
               <div className="absolute top-4 left-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest drop-shadow-md">PC KAMERA</span>
               </div>
            </div>
            <div className="w-56 h-36 rounded-[2.5rem] bg-black/60 backdrop-blur-3xl border border-white/10 overflow-hidden relative shadow-2xl">
               <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600" className="w-full h-full object-cover grayscale-[0.6] opacity-60" alt="Phone" />
               <div className="absolute top-4 left-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest drop-shadow-md">YAN AÇI</span>
               </div>
               <div className="absolute bottom-4 right-6">
                  <Mic className="w-3.5 h-3.5 text-emerald-500" />
               </div>
            </div>
         </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
}
