import React, { useState, useEffect } from 'react';
import { 
  Shield, Timer, Video, Mic, Calculator, Globe, 
  FileText, User, ChevronRight, Activity, Zap, 
  Lock, MessageCircle, AlertCircle, Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ActivePdf {
  id: string;
  title: string;
  isSticky: boolean;
  pageCount: number;
  currentPage: number;
  type: 'manual' | 'automatic';
}

export const PerformanceCandidateView: React.FC = () => {
  const [activePdfs, setActivePdfs] = useState<ActivePdf[]>([]);
  const [activeTool, setActiveTool] = useState<'none' | 'calculator' | 'browser'>('none');
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Sınav oturumu hazırlık aşamasında. Değerlendirici onayı bekleniyor.', type: 'info' }
  ]);

  // Security Protocols
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+V, Ctrl+U (View Source), Ctrl+S
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's')) {
        e.preventDefault();
        setMessages(prev => [...prev, { id: Date.now(), text: 'UYARI: Kısayol kullanımı engellendi!', type: 'info' }]);
        return false;
      }
      
      // Disable F keys except F5
      if (e.key.startsWith('F') && e.key !== 'F5') {
        e.preventDefault();
        return false;
      }

      // Disable PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        alert('Ekran görüntüsü alma yetkiniz bulunmamaktadır.');
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Simulation: Proctor "pushes" multiple tools and PDFs to candidate
  useEffect(() => {
    const timers = [
      // Recording Starts
      setTimeout(() => {
        setRecordingStarted(true);
        setMessages(prev => [...prev, { id: 1.2, text: 'OTURUM KAYDI BAŞLATILDI.', type: 'info' }]);
      }, 2000),

      // Exam Starts by Proctor
      setTimeout(() => {
        setExamStarted(true);
        setMessages(prev => [...prev, { id: 1.5, text: 'DEĞERLENDİRİCİ SINAVI BAŞLATTI.', type: 'success' }]);
      }, 5000),

      // First PDF
      setTimeout(() => {
        setActivePdfs([{ 
          id: 'pdf1', 
          title: 'A2-Ek-1 Hedef Pazar Analizi', 
          isSticky: true, 
          pageCount: 4, 
          currentPage: 1,
          type: 'automatic'
        }]);
        setMessages(prev => [...prev, { id: 2, text: 'Değerlendirici "Hedef Pazar Analizi" dokümanını SABİTLEDİ.', type: 'success' }]);
      }, 5000),
      
      // Second PDF side-by-side
      setTimeout(() => {
        setActivePdfs(prev => [...prev, { 
          id: 'pdf2', 
          title: 'B3-Referans Veri Seti', 
          isSticky: false, 
          pageCount: 2, 
          currentPage: 1,
          type: 'manual'
        }]);
        setMessages(prev => [...prev, { id: 3, text: 'Yan çalışma dokümanı paylaşıldı.', type: 'info' }]);
      }, 10000),

      // Calculator access
      setTimeout(() => {
        setActiveTool('calculator');
        setMessages(prev => [...prev, { id: 4, text: 'Hesap makinesi erişimi açıldı.', type: 'info' }]);
      }, 15000)
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="min-h-screen bg-[#05060f] text-slate-200 font-sans flex flex-col overflow-hidden select-none">
      {/* Top Header */}
      <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">MYK <span className="text-indigo-400">Performans Sınavı</span></h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Aday Oturumu</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-full px-4 py-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${examStarted ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {examStarted ? 'OTURUM AKTİF' : 'ONAY BEKLENİYOR'}
              </span>
           </div>
           <div className="h-8 w-px bg-slate-800" />
           <div className={`flex items-center gap-3 text-xl font-black tabular-nums italic ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              <Timer className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-500' : 'text-indigo-500'}`} />
              {formatTime(timeLeft)}
           </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left: Shared Workspace Area */}
        <div className="flex-1 flex flex-col gap-4 relative">
          <div className="flex-1 bg-slate-950 rounded-[32px] border border-slate-800 overflow-hidden relative shadow-2xl flex">
            {!examStarted ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950/50 backdrop-blur-sm z-50">
                 <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                    <Activity className="w-10 h-10 text-amber-500 animate-spin-slow" />
                 </div>
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">Sınav Başlatılmadı</h2>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">DEĞERLENDİRİCİ ONAYI BEKLENİYOR...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {activePdfs.length === 0 && activeTool === 'none' ? (
                  <motion.div 
                    key="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center text-center p-12"
                  >
                    <div className="w-24 h-24 bg-indigo-600/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                       <Lock className="w-10 h-10 text-indigo-500/40" />
                    </div>
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">Sistem Hazırlanıyor</h2>
                    <p className="text-slate-500 max-w-md leading-relaxed font-medium">
                      Değerlendirici ekranınıza bir doküman veya araç yansıttığında burada görüntülenecektir. Lütfen kameradan ayrılmayınız.
                    </p>
                  </motion.div>
                ) : (
                  <div className="w-full h-full flex divide-x divide-slate-800">
                    {activePdfs.map((pdf, index) => (
                      <motion.div 
                        key={pdf.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 flex flex-col bg-slate-900 overflow-hidden relative"
                      >
                         {/* PDF Header */}
                         <div className="h-10 border-b border-slate-800 bg-slate-950/50 px-4 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2 overflow-hidden">
                               <FileText className={`w-3.5 h-3.5 shrink-0 ${pdf.isSticky ? 'text-amber-400' : 'text-indigo-400'}`} />
                               <span className={`text-[9px] font-black uppercase tracking-widest truncate ${pdf.isSticky ? 'text-white' : 'text-slate-200'}`}>{pdf.title}</span>
                               {pdf.isSticky && (
                                 <div className="px-1.5 py-0.5 bg-amber-500 text-black text-[7px] font-black rounded-md uppercase tracking-tighter flex items-center gap-1 shrink-0 ml-2 animate-pulse">
                                   <Lock className="w-2 h-2" /> SABİT / DEĞİŞTİRİLEMEZ
                                 </div>
                               )}
                            </div>
                            <div className="flex items-center gap-3">
                               <span className="text-[8px] font-bold text-slate-500 uppercase">Sayfa {pdf.currentPage} / {pdf.pageCount}</span>
                               {!pdf.isSticky && (
                                 <div className="flex gap-1">
                                    <button className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-400"><ChevronRight className="w-3 h-3 rotate-180" /></button>
                                    <button className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-400"><ChevronRight className="w-3 h-3" /></button>
                                 </div>
                               )}
                            </div>
                         </div>
                         
                         {/* PDF Content Area */}
                         <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-slate-800/20">
                            <div className="mx-auto bg-white aspect-[1/1.414] shadow-xl p-8 text-slate-900 rounded-sm origin-top transform scale-95 transition-transform hover:scale-100">
                               <div className="h-4 w-24 bg-slate-200 mb-6 rounded" />
                               <div className="space-y-3 font-serif">
                                  <div className="h-3 w-full bg-slate-100 rounded" />
                                  <div className="h-3 w-[90%] bg-slate-100 rounded" />
                                  <div className="h-3 w-[95%] bg-slate-100 rounded" />
                               </div>
                               
                               <div className="mt-10 p-4 border border-slate-200 rounded-lg bg-slate-50">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">REFERANS VERİ #{pdf.id}</p>
                                  <div className="h-32 bg-slate-100 rounded flex items-center justify-center text-slate-300">
                                     [PDF GÖRSEL/TABLO ALANI]
                                  </div>
                               </div>

                               <div className="mt-8 space-y-2">
                                  <div className="h-2 w-full bg-slate-50 rounded" />
                                  <div className="h-2 w-full bg-slate-50 rounded" />
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            )}

            {/* Float Tool Status */}
            {examStarted && (
              <div className="absolute top-4 right-4 pointer-events-none z-20">
                  <div className="px-3 py-1.5 bg-indigo-600/90 backdrop-blur-md text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 border border-white/10">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    EŞLEŞMİŞ ÇALIŞMA ALANI
                  </div>
              </div>
            )}
          </div>

          {/* Messages / Notifications */}
          <div className="h-20 flex gap-4 shrink-0">
             <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-[24px] p-4 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-2">
                   {messages.map(msg => (
                     <div key={msg.id} className="flex items-start gap-3 text-[10px] animate-in fade-in slide-in-from-left-2">
                        <div className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${msg.type === 'success' ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                        <span className={`${msg.type === 'success' ? 'text-emerald-400' : 'text-slate-400'} font-bold leading-relaxed`}>
                          {msg.text}
                        </span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="w-40 bg-indigo-600 rounded-[24px] p-4 flex flex-col justify-between shadow-xl shadow-indigo-600/20">
                <p className="text-[9px] text-white/60 font-black uppercase tracking-widest">Durum</p>
                <div className="flex items-center justify-between">
                   <div className="p-1.5 bg-white/20 rounded-lg">
                      <Video className="w-4 h-4 text-white" />
                   </div>
                   <div className="p-1.5 bg-white/20 rounded-lg">
                      <Mic className="w-4 h-4 text-white" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Proctor & Self View */}
        <aside className="w-[300px] flex flex-col gap-4">
          {/* Proctor Feed */}
          <div className="h-[200px] bg-slate-900/40 border border-slate-800 rounded-[32px] overflow-hidden flex flex-col shrink-0">
             <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <User className="w-3 h-3 text-indigo-400" />
                   <span className="text-[9px] font-black text-white uppercase tracking-widest">DEĞERLENDİRİCİ</span>
                </div>
                <div className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[7px] font-black rounded border border-emerald-500/20 tracking-tighter">CANLI</div>
             </div>
             <div className="flex-1 relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3">
                   <h3 className="text-sm font-black text-white italic tracking-tight">Selin Kaya</h3>
                </div>
             </div>
          </div>

          {/* Self Preview Grid */}
          <div className="flex-1 flex flex-col gap-4 min-h-0">
             <div className="flex-1 bg-slate-950 rounded-[24px] border border-slate-800 overflow-hidden relative group">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1697632155248-d659e2ba672c?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-slate-950/80 rounded-md text-[7px] font-black text-white uppercase border border-white/5 tracking-widest">PC KAMERA</div>
                {recordingStarted && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-1.5 py-0.5 bg-red-600/20 border border-red-500/30 rounded text-[6px] font-black text-white animate-pulse uppercase">
                    KAYIT
                  </div>
                )}
             </div>
             <div className="flex-1 bg-slate-950 rounded-[24px] border border-slate-800 overflow-hidden relative group">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-slate-950/80 rounded-md text-[7px] font-black text-white uppercase border border-white/5 tracking-widest">MOBİL (ÇEVRE)</div>
                {recordingStarted && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-1.5 py-0.5 bg-red-600/20 border border-red-500/30 rounded text-[6px] font-black text-white animate-pulse uppercase">
                    KAYIT
                  </div>
                )}
             </div>
          </div>
          
          {/* User Info Card */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-[24px]">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-black text-indigo-400">ET</div>
                <div>
                   <p className="text-[10px] font-black text-white italic leading-none">Emre Tanrıseven</p>
                   <p className="text-[8px] text-slate-500 font-bold mt-1 uppercase tracking-widest">Aday ID: 307540</p>
                </div>
             </div>
          </div>

          {/* Floating Calculator Mock (if active) */}
          <AnimatePresence>
            {activeTool === 'calculator' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-8 right-[320px] w-64 bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-2xl p-6 z-[60]"
              >
                 <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">HESAP MAKİNESİ</span>
                 </div>
                 <div className="bg-slate-950 p-4 rounded-xl text-right mb-4">
                    <span className="text-2xl font-black text-white tabular-nums">1.245.00</span>
                 </div>
                 <div className="grid grid-cols-4 gap-2">
                    {[7,8,9,'/',4,5,6,'*',1,2,3,'-','C',0,'=','+'].map(btn => (
                      <div key={btn} className="h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xs font-bold text-slate-300 hover:bg-slate-700 cursor-pointer transition-colors">
                        {btn}
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.2);
          border-radius: 10px;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};
