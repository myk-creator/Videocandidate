import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Video, 
  Mic, 
  MicOff, 
  Monitor, 
  Smartphone, 
  FileText, 
  Calculator, 
  Search, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  Users, 
  Info, 
  MoreVertical, 
  Lock,
  X,
  Play,
  Rec
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface EvaluationQuestion {
  id: string;
  text: string;
  criteria: string;
  status: 'pending' | 'success' | 'fail';
}

export function PerformanceProctor() {
  const [activeTab, setActiveTab] = useState<'evaluation' | 'control'>('evaluation');
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [showEvalForm, setShowEvalForm] = useState(false);
  const [candidate, setCandidate] = useState({
    name: 'EMRE TANRISEVEN',
    id: '30754051690',
    pcStatus: 'active',
    mobileStatus: 'active',
    pcMuted: true,
    mobileMuted: false
  });

  const [questions, setQuestions] = useState<EvaluationQuestion[]>([
    { 
      id: 'A2-P1', 
      text: 'A2 Performans Sınavı', 
      criteria: 'Adayın performans kriterlerine göre değerlendirilmesi gerekmektedir.',
      status: 'pending' 
    },
    { 
      id: '1', 
      text: 'EK-1 Hedef Pazar evrağını inceleyerek hedef pazarınızı analiz ediniz.', 
      criteria: 'Kriter: Gelir ve eğitim seviyesine göre makul fiyatlı portföylerin olması gerektiğini açıklar.',
      status: 'pending' 
    }
  ]);

  const [sharedPdfs, setSharedPdfs] = useState<string[]>([]);
  const [stickyPdfs, setStickyPdfs] = useState<string[]>([]);

  const documents = [
    'A2 1 Şirket Prosedürü.pdf',
    'A2-Ek-1 Hedef Pazar.pdf',
    'A2-Ek-2 Müşteri Özellikleri.pdf'
  ];

  const toggleShare = (doc: string) => {
    if (sharedPdfs.includes(doc)) {
      setSharedPdfs(prev => prev.filter(p => p !== doc));
      setStickyPdfs(prev => prev.filter(p => p !== doc));
      toast.error(`${doc} adaydan kaldırıldı.`);
    } else {
      setSharedPdfs(prev => [...prev, doc]);
      toast.success(`${doc} adaya yansıtıldı.`);
    }
  };

  const handleStatusUpdate = (id: string, status: 'success' | 'fail') => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    toast.info(`Soru ${id} değerlendirildi.`);
  };

  return (
    <div className="flex h-screen bg-[#050508] text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[320px] border-r border-white/5 bg-[#0d0d14]/60 backdrop-blur-xl flex flex-col z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Shield className="w-5 h-5 text-purple-500" />
             </div>
             <div>
                <h1 className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">Performans <span className="text-purple-500">Gözetim</span></h1>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">SİSTEM AKTİF</p>
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 mb-6">
             <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                   <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" className="w-10 h-10 rounded-xl object-cover" alt="Candidate" />
                   <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d0d14]" />
                </div>
                <div>
                   <h3 className="text-xs font-black text-white tracking-tight uppercase italic">{candidate.name}</h3>
                   <p className="text-[10px] text-slate-500 font-mono">{candidate.id}</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between px-3 py-2 bg-black/40 rounded-xl border border-white/5">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">PC</span>
                   <Monitor className="w-3 h-3 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-black/40 rounded-xl border border-white/5">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">MOBİL</span>
                   <Smartphone className="w-3 h-3 text-emerald-500" />
                </div>
             </div>
          </div>

          <div className="flex bg-black/40 border border-white/5 rounded-2xl p-1 mb-4">
            <button 
              onClick={() => setActiveTab('evaluation')}
              className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'evaluation' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              DEĞERLENDİRME
            </button>
            <button 
              onClick={() => setActiveTab('control')}
              className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'control' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              ARAÇLAR
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'evaluation' ? (
              <motion.div 
                key="eval"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <button 
                  onClick={() => setShowEvalForm(true)}
                  className="w-full py-6 bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white rounded-[2rem] font-black text-[10px] flex flex-col items-center justify-center gap-3 shadow-2xl shadow-purple-900/20 group transition-all active:scale-95 uppercase tracking-widest"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  DEĞERLENDİRME FORMUNU AÇ
                </button>

                <div className="pt-6">
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    SINAV KAYNAKLARI
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    {documents.length} DOSYA
                  </p>
                  <div className="space-y-2">
                    {documents.map((doc, i) => {
                      const isShared = sharedPdfs.includes(doc);
                      return (
                        <div key={i} className={`group p-3 rounded-2xl border transition-all ${isShared ? 'bg-purple-600/10 border-purple-500/30' : 'bg-white/5 border-transparent hover:border-white/10'}`}>
                           <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 overflow-hidden flex-1">
                                 <FileText className={`w-4 h-4 shrink-0 ${isShared ? 'text-purple-400' : 'text-slate-600'}`} />
                                 <span className={`text-[10px] font-bold truncate ${isShared ? 'text-white' : 'text-slate-500'}`}>{doc}</span>
                              </div>
                              <button 
                                onClick={() => toggleShare(doc)}
                                className={`p-1.5 rounded-lg transition-all ${isShared ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'bg-black/40 text-slate-500 hover:text-white'}`}
                              >
                                 {isShared ? <CheckCircle className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
                              </button>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="ctrl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3"
              >
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-4">ADAY EKRAN KONTROLÜ</p>
                <div className="grid grid-cols-1 gap-3">
                   {[
                     { icon: Calculator, label: "Hesap Makinesi" },
                     { icon: Search, label: "İnternet Tarayıcı" },
                     { icon: FileText, label: "Doküman Görüntüleyici" }
                   ].map((tool, idx) => (
                     <button key={idx} className="w-full p-4 bg-white/5 border border-white/5 hover:border-purple-500/30 rounded-2xl flex items-center gap-4 transition-all group">
                        <div className="p-2.5 bg-purple-600/10 rounded-xl group-hover:bg-purple-600/20 transition-colors">
                           <tool.icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{tool.label}</span>
                     </button>
                   ))}
                </div>
                <button className="w-full p-4 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 rounded-2xl flex items-center gap-4 transition-all group mt-6">
                   <div className="p-2.5 bg-red-600/20 rounded-xl">
                      <Trash2 className="w-5 h-5 text-red-500" />
                   </div>
                   <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Aday Ekranını Temizle</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative bg-[#050508]">
        {/* Header */}
        <header className="h-16 bg-[#0d0d14]/60 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between shrink-0 z-10">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Canlı Akış Aktif</span>
              </div>
              <div className="h-4 w-px bg-white/5" />
              <div className="flex items-center gap-2">
                 <Users className="w-3.5 h-3.5 text-slate-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1 ADAY İZLENİYOR</span>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button 
                onClick={() => setRecordingStarted(!recordingStarted)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 border ${
                  recordingStarted ? 'bg-red-600/20 text-red-500 border-red-500/30' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full border-2 ${recordingStarted ? 'bg-red-500 border-red-400 animate-pulse' : 'border-slate-500'}`} />
                {recordingStarted ? 'KAYDI DURDUR' : 'EKRAN KAYDINI BAŞLAT'}
              </button>
              
              <button 
                onClick={() => setExamStarted(!examStarted)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                  examStarted ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-500'
                }`}
              >
                 <Play className={`w-3.5 h-3.5 ${examStarted ? 'fill-white' : ''}`} />
                 {examStarted ? 'SINAVI DURDUR' : 'SINAVI BAŞLAT'}
              </button>
           </div>
        </header>

        {/* Video Streams */}
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
           {/* Primary Views */}
           <div className="grid grid-cols-3 gap-6 h-1/3">
              <VideoFeed label="PC KAMERA" image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800" />
              <VideoFeed label="MOBİL (YAN AÇI)" image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800" />
              <VideoFeed label="GÖZETMEN (SİZ)" image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800" isStatic />
           </div>

           {/* Screen Share (Large) */}
           <div className="flex-1 bg-black rounded-[2.5rem] border border-white/5 overflow-hidden relative group transition-all duration-500 hover:border-purple-500/30">
              <div className="absolute inset-0 bg-slate-900/20 flex flex-col items-center justify-center">
                 <Monitor className="w-16 h-16 text-slate-800 mb-6" />
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] italic animate-pulse">Aday Ekranı Bekleniyor...</p>
              </div>
              <div className="absolute top-6 left-8 flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                 <span className="text-[9px] font-black text-white uppercase tracking-widest drop-shadow-md">MASAÜSTÜ PAYLAŞIMI</span>
              </div>
              <div className="absolute bottom-6 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                 <button className="p-3 bg-black/60 backdrop-blur-md rounded-2xl text-white hover:bg-purple-600 transition-colors border border-white/10">
                    <Settings className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>

        {/* Evaluation Modal */}
        <AnimatePresence>
           {showEvalForm && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setShowEvalForm(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  className="relative w-full max-w-5xl max-h-[85vh] bg-[#0d0d14] rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
                >
                   <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                            <FileText className="w-6 h-6 text-purple-500" />
                         </div>
                         <div>
                            <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Değerlendirme <span className="text-purple-500">Formu</span></h2>
                            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">EMRE TANRISEVEN / 2026-008</p>
                         </div>
                      </div>
                      <button onClick={() => setShowEvalForm(false)} className="p-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all">
                         <X className="w-6 h-6" />
                      </button>
                   </div>

                   <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                      {questions.map((q) => (
                        <div key={q.id} className={`p-8 rounded-[2.5rem] border transition-all ${q.status === 'success' ? 'bg-emerald-500/5 border-emerald-500/20' : q.status === 'fail' ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/5'}`}>
                           <div className="flex flex-col md:flex-row gap-8">
                              <div className="flex-1">
                                 <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">MADDE {q.id}</span>
                                    <div className="flex-1 h-px bg-white/5" />
                                 </div>
                                 <h3 className="text-base font-bold text-white mb-4 leading-relaxed">{q.text}</h3>
                                 <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
                                       <span className="text-purple-400 font-black not-italic mr-2">BAŞARI KRİTERİ:</span>
                                       {q.criteria}
                                    </p>
                                 </div>
                              </div>
                              <div className="shrink-0 flex md:flex-col gap-3 justify-center">
                                 <button 
                                   onClick={() => handleStatusUpdate(q.id, 'success')}
                                   className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${q.status === 'success' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-black/40 text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10'}`}
                                 >
                                   BAŞARILI
                                 </button>
                                 <button 
                                   onClick={() => handleStatusUpdate(q.id, 'fail')}
                                   className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${q.status === 'fail' ? 'bg-red-600 text-white shadow-xl shadow-red-500/20' : 'bg-black/40 text-slate-500 hover:text-red-500 hover:bg-red-500/10'}`}
                                 >
                                   BAŞARISIZ
                                 </button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="p-8 border-t border-white/5 bg-black/20 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                         <Info className="w-4 h-4 text-purple-500" />
                         Tüm değerlendirmeler anlık olarak sisteme işlenmektedir.
                      </div>
                      <button onClick={() => { setShowEvalForm(false); toast.success("Değerlendirme başarıyla tamamlandı."); }} className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-purple-900/40 active:scale-95">
                         SINAV DEĞERLENDİRMESİNİ BİTİR
                      </button>
                   </div>
                </motion.div>
             </div>
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

function VideoFeed({ label, image, isStatic }: { label: string; image: string; isStatic?: boolean }) {
   return (
      <div className="bg-black rounded-[2rem] border border-white/5 overflow-hidden relative group">
         <img src={image} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={label} />
         <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
               {label}
            </span>
         </div>
         <div className="absolute bottom-4 right-4">
            <div className={`w-2 h-2 rounded-full ${isStatic ? 'bg-purple-500' : 'bg-emerald-500 animate-pulse'} shadow-lg`} />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
   );
}
