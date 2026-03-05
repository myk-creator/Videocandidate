import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, 
  ShieldCheck, 
  FileText, 
  Maximize2, 
  Minimize2, 
  AlertCircle,
  Clock,
  Send,
  User,
  ChevronRight,
  ChevronLeft,
  Video,
  Smartphone,
  Monitor,
  Activity,
  Mic,
  LayoutSplit
} from "lucide-react";
import { toast } from "sonner";
import { usePDFs } from "../context/PDFContext";

export default function CandidatePanel() {
  const { pushedPDFs } = usePDFs();
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [currentExamPage, setCurrentExamPage] = useState(1);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (pushedPDFs.length > 0 && !activeTab) {
      setActiveTab(pushedPDFs[0].id);
      toast.info("Gözetmen bir kaynak paylaştı", {
        description: "Ekran düzeni otomatik olarak split-view'a geçti.",
        duration: 5000
      });
    }
  }, [pushedPDFs]);

  // Security: Prevent context menu, copy, and F12
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'p' || e.key === 'u')) ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        toast.error("Güvenlik ihlali: Bu işlem engellendi!", {
          description: "Tüm işlemleriniz kaydedilmektedir.",
          icon: <AlertCircle className="text-red-500 w-4 h-4" />
        });
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isSplitView = pushedPDFs.length > 0;

  return (
    <div className="h-screen bg-[#030213] flex flex-col overflow-hidden select-none text-slate-300">
      {/* Top Navigation / Status Bar */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0d0d14]/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
            <ShieldCheck className="text-purple-500 w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">Runway <span className="text-purple-500">Proctor</span></h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">GÜVENLİ SINAV MODU AKTİF</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-mono font-bold text-white tracking-widest">{formatTime(timeLeft)}</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-white leading-none">Ahmet Yılmaz</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">ADAY NO: 2026-004</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" alt="Self" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Exam Panel (Main Content) */}
        <div 
          className={`flex-1 flex flex-col transition-all duration-700 ease-in-out border-r border-white/5 bg-[#050508]/40 ${
            isSplitView ? 'max-w-[65%]' : 'max-w-full'
          }`}
        >
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg text-[10px] font-black uppercase tracking-widest">SORU 4 / 20</span>
                <h2 className="text-2xl font-black text-white leading-relaxed italic uppercase tracking-tight">
                  Aşağıdaki teknik çizim üzerinde belirtilen "A" noktası, sistemin hangi kritik bileşenini temsil etmektedir?
                </h2>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Lütfen gözetmen tarafından paylaşılan kaynak belgeleri inceleyerek cevaplayınız. Tüm işlemleriniz gerçek zamanlı olarak kaydedilmektedir.
                </p>
              </div>

              {/* Mock Question Content */}
              <div className="space-y-4">
                {[
                  "Ana Güç Dağıtım Ünitesi (PDU)",
                  "Acil Durum Soğutma Valfi",
                  "Hidrolik Basınç Sensörü",
                  "Yedek Kontrol Ünitesi (BCU)"
                ].map((option, idx) => {
                  const label = ["A", "B", "C", "D"][idx];
                  return (
                    <button 
                      key={idx}
                      className="w-full text-left p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black text-slate-500 group-hover:bg-purple-600 group-hover:text-white transition-all border border-white/5">
                            {label}
                         </div>
                         <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{option}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-white/10 group-hover:border-purple-500 group-hover:bg-purple-500/20 transition-all flex items-center justify-center">
                         <div className="w-2.5 h-2.5 rounded-full bg-purple-500 scale-0 group-active:scale-100 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <footer className="h-24 border-t border-white/5 px-8 flex items-center justify-between bg-[#0d0d14]/50 backdrop-blur-md">
            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" /> Önceki Soru
            </button>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} className={`w-8 h-1.5 rounded-full transition-all ${i === 4 ? 'bg-purple-600 shadow-lg shadow-purple-900/40' : i < 4 ? 'bg-emerald-500/40' : 'bg-white/5'}`} />
              ))}
            </div>
            <button className="flex items-center gap-3 bg-purple-600 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/20 active:scale-95">
              Sonraki Soru <ChevronRight className="w-4 h-4" />
            </button>
          </footer>
        </div>

        {/* Split-View PDF Panel */}
        <AnimatePresence>
          {isSplitView && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 150 }}
              className="w-[35%] bg-[#08080c] border-l border-white/5 flex flex-col relative z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="h-14 border-b border-white/5 px-6 flex items-center justify-between bg-[#0d0d14]/60 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                     <FileText className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">Kaynaklar</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{pushedPDFs.length} Belge</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                {/* PDF Tabs */}
                <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto scrollbar-none">
                  {pushedPDFs.map(pdf => (
                    <button
                      key={pdf.id}
                      onClick={() => setActiveTab(pdf.id)}
                      className={`px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] border-r border-white/5 transition-all flex items-center gap-3 shrink-0 ${
                        activeTab === pdf.id 
                          ? "bg-purple-600/10 text-white border-b-2 border-b-purple-600" 
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${activeTab === pdf.id ? 'bg-purple-500' : 'bg-slate-700'}`} />
                      {pdf.title}
                    </button>
                  ))}
                </div>

                {/* PDF Content Area */}
                <div className="flex-1 bg-black/20 p-8 overflow-y-auto custom-scrollbar flex flex-col items-center">
                  <div className="w-full max-w-lg aspect-[1/1.414] bg-white shadow-2xl rounded-[4px] p-12 text-slate-900 origin-top transform scale-95 transition-transform hover:scale-100">
                    <h3 className="text-lg font-black italic uppercase tracking-tighter mb-8 border-b-2 border-slate-900 pb-4">
                      {pushedPDFs.find(p => p.id === activeTab)?.title || 'Belge Yükleniyor...'}
                    </h3>
                    <div className="space-y-6 font-serif text-sm leading-relaxed">
                      <div className="h-4 w-1/3 bg-slate-100 rounded" />
                      <p className="text-slate-500 italic">"Bu alan gözetmen tarafından paylaşılan statik içerikleri ve teknik dokümantasyon verilerini içerir."</p>
                      <div className="grid grid-cols-2 gap-4 my-8">
                         <div className="h-20 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-300">TABLO A.1</div>
                         <div className="h-20 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-300">TABLO A.2</div>
                      </div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                      <div className="mt-12 pt-8 border-t border-slate-100 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                         Sayfa 01 / 04 - Runway Akademi Proctoring
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Footer / Stats */}
              <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[9px] font-black text-purple-400 uppercase tracking-widest">
                   <Activity className="w-3.5 h-3.5" />
                   Gözetmen Tarafından Senkronize
                </div>
                <div className="flex gap-2">
                   <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Self-Proctoring Previews (The "3 screens" the candidate sees about themselves) */}
        <div className="absolute bottom-32 right-8 flex flex-col gap-4 pointer-events-none z-30">
           <div className="w-48 h-32 rounded-[2rem] bg-black/60 backdrop-blur-md border border-white/10 overflow-hidden relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale-[0.5] opacity-60" />
              <div className="absolute top-3 left-4 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">PC KAMERA</span>
              </div>
           </div>
           <div className="w-48 h-32 rounded-[2rem] bg-black/60 backdrop-blur-md border border-white/10 overflow-hidden relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale-[0.5] opacity-60" />
              <div className="absolute top-3 left-4 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">MOBİL</span>
              </div>
           </div>
           <div className="w-48 h-32 rounded-[2rem] bg-black/60 backdrop-blur-md border border-white/10 p-3 overflow-hidden relative shadow-2xl">
              <div className="w-full h-full bg-purple-600/10 rounded-2xl border border-purple-500/20 flex flex-col items-center justify-center gap-2">
                 <Monitor className="w-5 h-5 text-purple-500/50" />
                 <span className="text-[7px] font-black text-purple-400 uppercase tracking-[0.2em]">EKRAN KAYDI</span>
              </div>
              <div className="absolute bottom-3 right-4">
                 <Mic className="w-3 h-3 text-emerald-500" />
              </div>
           </div>
        </div>

        {/* Security Overlay (Copy/Screenshot attempt) */}
        <AnimatePresence>
          {isLocked && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center"
             >
                <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center border border-red-500/30 mb-8 animate-pulse">
                   <Lock className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">OTURUM DURAKLATILDI</h1>
                <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                   Gözetmen tarafından sınavınız güvenlik gerekçesiyle durdurulmuştur. Lütfen hareket etmeyiniz ve talimatları bekleyiniz.
                </p>
                <div className="mt-12 px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                   GÜVENLİK İHLALİ TESPİT EDİLDİ
                </div>
             </motion.div>
          )}
        </AnimatePresence>
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
