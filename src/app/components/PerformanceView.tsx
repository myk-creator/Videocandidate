import React, { useState, useEffect } from 'react';
import { 
  Shield, Video, Mic, MicOff, Monitor, Smartphone, Laptop, 
  FileText, Calculator, Search, Trash2, Power, 
  ChevronRight, X, CheckCircle, AlertTriangle, 
  Settings, Users, Info, MessageCircle, MoreVertical, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";

interface EvaluationQuestion {
  id: string;
  text: string;
  criteria: string;
  status: 'pending' | 'success' | 'fail';
}

export const PerformanceView: React.FC = () => {
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
      text: 'EK-1 Hedef Pazar evrağını inceleyerek hedef pazarınızı analiz ediniz ve bu hedef pazara ulaşmak için kullanacağınız pazarlama yöntemleriniz nelerdir? Açıklayınız.', 
      criteria: 'Kriter: Gelir ve eğitim seviyesine göre makul fiyatlı portföylerin olması gerektiğini konum olarak da kırsalda veya merkezde ise de eski bina olmasını açıklar. Konum olarak da kırsalda veya merkezde ise de eski bina olmasını açıklar.',
      status: 'pending' 
    },
    { 
      id: '2', 
      text: 'By1 Sorusu İçinde', 
      criteria: 'Kriter: Esnaf görüşmeleri, broşür, afiş, branda, sarı sayfalar, internet portalları. (EN AZ 3 TANE)',
      status: 'pending' 
    },
    { 
      id: '3', 
      text: 'Ek -2\'deki bilgilere göre müşterinize hangi konutu önerirsiniz? Sebepleriyle Açıklayınız.', 
      criteria: 'Kriter: Daire No:3 seçer ve açıklamasını yapar.',
      status: 'pending' 
    }
  ]);

  const [sharedPdfs, setSharedPdfs] = useState<string[]>([]);
  const [stickyPdfs, setStickyPdfs] = useState<string[]>([]);

  const documents = [
    'A2 1 Şirket Prosedürü.pdf',
    'A2-Ek-1 Hedef Pazar.pdf',
    'A2-Ek-2 Müşteri Özellikleri.pdf',
    'A2-Ek-3 Portföy Listesi.pdf',
    'A2-Ek-4 Personel ve Portföy.pdf',
    'A2-Ek-5 Eğitim Listesi.pdf',
    'A1 Soru Ek-6 Portföy Alım.pdf',
  ];

  const toggleShare = (doc: string) => {
    if (sharedPdfs.includes(doc)) {
      setSharedPdfs(prev => prev.filter(p => p !== doc));
      setStickyPdfs(prev => prev.filter(p => p !== doc));
      toast.error(`${doc} adayın ekranından kaldırıldı.`);
    } else {
      setSharedPdfs(prev => [...prev, doc]);
      toast.success(`${doc} adaya yansıtıldı.`);
    }
  };

  const toggleSticky = (doc: string) => {
    if (stickyPdfs.includes(doc)) {
      setStickyPdfs(prev => prev.filter(p => p !== doc));
      toast.info(`${doc} sabitlemesi kaldırıldı.`);
    } else {
      if (!sharedPdfs.includes(doc)) {
        setSharedPdfs(prev => [...prev, doc]);
      }
      setStickyPdfs(prev => [...prev, doc]);
      toast.success(`${doc} adayın ekranına SABİTLENDİ.`);
    }
  };

  const handleStatusUpdate = (id: string, status: 'success' | 'fail') => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    toast.info(`Soru ${id} değerlendirildi.`);
  };

  return (
    <div className="flex h-screen bg-[#05060f] text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[300px] border-r border-slate-800 bg-[#080a14] flex flex-col z-20">
        <div className="p-6">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">SEÇİLİ ADAY (GÖRÜNTÜLENEN)</p>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 mb-6">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                 ET
               </div>
               <div>
                 <h3 className="text-sm font-bold text-white tracking-tight">{candidate.name}</h3>
                 <p className="text-[10px] text-slate-500">{candidate.id}</p>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-2">
               <div className="flex items-center justify-between px-3 py-2 bg-slate-950/50 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400">PC</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               </div>
               <div className="flex items-center justify-between px-3 py-2 bg-slate-950/50 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400">MOBIL</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               </div>
             </div>
          </div>

          <div className="flex bg-slate-950/50 border border-slate-800 rounded-xl p-1 mb-4">
            <button 
              onClick={() => setActiveTab('evaluation')}
              className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'evaluation' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              DEĞERLENDİRME
            </button>
            <button 
              onClick={() => setActiveTab('control')}
              className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'control' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              KONTROL & ADAYLAR
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'evaluation' ? (
              <motion.div 
                key="eval"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <button 
                  onClick={() => setShowEvalForm(true)}
                  className="w-full py-6 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 group transition-all active:scale-95"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  DEĞERLENDİRME FORMUNU AÇ
                </button>
                <p className="text-[9px] text-slate-500 text-center px-4 leading-relaxed">
                  * Form açılmıyorsa tarayıcınızın pop-up engelleyicisini kontrol edin.
                </p>

                <div className="pt-6">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    SINAV EKLERİ / DOKÜMANLAR
                    <span className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">{documents.length}</span>
                  </p>
                  <div className="space-y-1">
                    {documents.map((doc, i) => {
                      const isShared = sharedPdfs.includes(doc);
                      const isSticky = stickyPdfs.includes(doc);
                      
                      return (
                        <div key={i} className={`group p-2 rounded-xl border transition-all ${isShared ? 'bg-indigo-600/5 border-indigo-500/30' : 'hover:bg-slate-800/50 border-transparent'}`}>
                           <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 overflow-hidden flex-1">
                                 <FileText className={`w-3.5 h-3.5 shrink-0 ${isShared ? 'text-indigo-400' : 'text-slate-500'}`} />
                                 <span className={`text-[10px] font-bold truncate ${isShared ? 'text-white' : 'text-slate-400'}`}>{doc}</span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                 <button 
                                   onClick={() => toggleSticky(doc)}
                                   className={`p-1.5 rounded-lg transition-all ${isSticky ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}
                                   title="Adayın Ekranına Sabitle"
                                 >
                                    <Lock className="w-3 h-3" />
                                 </button>
                                 <button 
                                   onClick={() => toggleShare(doc)}
                                   className={`p-1.5 rounded-lg transition-all ${isShared ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}
                                   title="Adaya Göster / Gizle"
                                 >
                                    {isShared ? <CheckCircle className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                                 </button>
                              </div>
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3"
              >
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">UZAKTAN KONTROL</p>
                <button className="w-full p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl flex items-center gap-4 transition-all group">
                   <div className="p-2.5 bg-indigo-600/10 rounded-xl group-hover:bg-indigo-600/20 transition-colors">
                      <Monitor className="w-5 h-5 text-indigo-400" />
                   </div>
                   <span className="text-xs font-bold text-slate-300">PDF Göster</span>
                </button>
                <button className="w-full p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl flex items-center gap-4 transition-all group">
                   <div className="p-2.5 bg-indigo-600/10 rounded-xl group-hover:bg-indigo-600/20 transition-colors">
                      <Calculator className="w-5 h-5 text-indigo-400" />
                   </div>
                   <span className="text-xs font-bold text-slate-300">Hesap Makinesi</span>
                </button>
                <button className="w-full p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl flex items-center gap-4 transition-all group">
                   <div className="p-2.5 bg-indigo-600/10 rounded-xl group-hover:bg-indigo-600/20 transition-colors">
                      <Search className="w-5 h-5 text-indigo-400" />
                   </div>
                   <span className="text-xs font-bold text-slate-300">Tarayıcı</span>
                </button>
                <button className="w-full p-4 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 rounded-2xl flex items-center gap-4 transition-all group mt-6">
                   <div className="p-2.5 bg-red-600/20 rounded-xl">
                      <Trash2 className="w-5 h-5 text-red-500" />
                   </div>
                   <span className="text-xs font-bold text-red-500 uppercase tracking-tighter">Ekranı Temizle (Kapat)</span>
                </button>

                <div className="pt-8">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">DİĞER ADAYLAR</p>
                  <div className="p-4 bg-indigo-600 rounded-2xl border border-indigo-400/30 shadow-lg shadow-indigo-600/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[11px] font-black text-white uppercase tracking-tighter italic">EMRE TANRISEVEN</h4>
                      <span className="text-[9px] px-1.5 py-0.5 bg-black/20 rounded text-white/80">3.4 / 100</span>
                    </div>
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 bg-white text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest">Sınava Al</button>
                       <button className="flex-1 py-2 bg-black/20 text-white/60 rounded-lg text-[9px] font-black uppercase tracking-widest">Katılmadı</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-14 bg-slate-900/40 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              <h1 className="text-xs font-black text-white uppercase tracking-tighter italic">MYK <span className="text-indigo-400">Performans Sınavı</span></h1>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Test Sınav Emre</span>
          </div>

          <div className="flex items-center gap-6">
            {!recordingStarted ? (
              <button 
                onClick={() => {
                  setRecordingStarted(true);
                  toast.success("Kayıt Başlatıldı");
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                KAYDI BAŞLAT
              </button>
            ) : (
              <button 
                onClick={() => {
                  if (examStarted) {
                    setExamStarted(false);
                    setRecordingStarted(false);
                    toast.error("Sınav ve Kayıt Durduruldu");
                  } else {
                    setExamStarted(true);
                    toast.success("Sınav Başlatıldı");
                  }
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${examStarted ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'} shadow-lg`}
              >
                <Video className="w-3 h-3" />
                {examStarted ? 'DURDUR' : 'SINAVI BAŞLAT'}
              </button>
            )}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
               <div className="text-right">
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">DEĞERLENDİRİCİ</p>
                  <p className="text-[10px] font-black text-white italic">Emre Tanrıseven</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                  <Users className="w-4 h-4" />
               </div>
            </div>
          </div>
        </header>

        {/* Video Area */}
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden bg-[#05060f]">
          {/* Top Video Grid */}
          <div className="grid grid-cols-3 gap-4 h-[30%] shrink-0">
            <VideoCard 
              label="Aday PC Kamera" 
              muted={candidate.pcMuted} 
              onToggleMute={() => setCandidate(c => ({...c, pcMuted: !c.pcMuted}))}
              image="https://images.unsplash.com/photo-1697632155248-d659e2ba672c?auto=format&fit=crop&q=80&w=600"
            />
            <VideoCard 
              label="Aday Mobil Kamera (Çevre)" 
              muted={candidate.mobileMuted} 
              onToggleMute={() => setCandidate(c => ({...c, mobileMuted: !c.mobileMuted}))}
              image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
            />
            <VideoCard 
              label="Sen (Değerlendirici)" 
              muted={true} 
              isOwn={true}
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
            />
          </div>

          {/* Bottom Screen Share */}
          <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative group">
             <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-indigo-600/80 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                   Ekran Paylaşımı (Kontrol Edilebilir Alan)
                </span>
             </div>
             
             <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/30">
                <Monitor className="w-12 h-12 text-slate-700 mb-4" />
                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest animate-pulse italic">Ekran Paylaşımı Bekleniyor...</p>
             </div>

             <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button className="p-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl text-white hover:bg-slate-800 transition-colors">
                   <Settings className="w-4 h-4" />
                </button>
                <button className="p-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl text-white hover:bg-slate-800 transition-colors">
                   <Users className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Evaluation Modal Popup (Centered overlay as requested) */}
        <AnimatePresence>
          {showEvalForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowEvalForm(false)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-[32px] border border-slate-800 shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-400" />
                     </div>
                     <div>
                        <h2 className="text-lg font-black text-white tracking-tighter italic uppercase">Değerlendirme Formu - <span className="text-indigo-400">EMRE TANRISEVEN</span></h2>
                        <p className="text-[10px] text-slate-500 font-bold tracking-widest">TC/ID: 30754051690</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] font-black px-3 py-1 bg-slate-800 rounded-lg text-slate-400 uppercase tracking-widest">11 Adım</span>
                     <button 
                        onClick={() => setShowEvalForm(false)}
                        className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-500 hover:text-white"
                     >
                        <X className="w-6 h-6" />
                     </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[#0a0c1a]">
                   {questions.map((q, i) => (
                     <div key={q.id} className={`p-6 rounded-3xl border transition-all ${q.status === 'success' ? 'bg-emerald-500/5 border-emerald-500/20' : q.status === 'fail' ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="flex flex-col md:flex-row gap-6">
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                 <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">SORU {q.id === 'A2-P1' ? 'BAŞLIK' : q.id}</span>
                                 <div className="flex-1 h-px bg-slate-800" />
                              </div>
                              <h3 className="text-base font-bold text-white mb-4 leading-relaxed">{q.text}</h3>
                              <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                                 <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    {q.criteria}
                                 </p>
                              </div>
                           </div>
                           <div className="shrink-0 flex flex-row md:flex-col gap-3 justify-center">
                              <button 
                                onClick={() => handleStatusUpdate(q.id, 'success')}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${q.status === 'success' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-500 hover:bg-emerald-500/20 hover:text-emerald-400'}`}
                              >
                                BAŞARILI
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(q.id, 'fail')}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${q.status === 'fail' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-slate-500 hover:bg-red-600/20 hover:text-red-400'}`}
                              >
                                BAŞARISIZ
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
                   <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <Info className="w-4 h-4" />
                      Değişiklikler otomatik olarak kaydediliyor
                   </div>
                   <button 
                    onClick={() => {
                        setShowEvalForm(false);
                        toast.success("Değerlendirme formu kaydedildi.");
                    }}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95"
                   >
                     FORMU TAMAMLA VE GÖNDER
                   </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.4);
        }
      `}} />
    </div>
  );
};

const VideoCard: React.FC<{ label: string; muted: boolean; onToggleMute?: () => void; isOwn?: boolean; image: string }> = ({ label, muted, onToggleMute, isOwn, image }) => {
  return (
    <div className="relative group bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <ImageWithFallback 
        src={image} 
        alt={label} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
      
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="px-2 py-1 bg-slate-900/80 backdrop-blur-md rounded-md text-[8px] font-black text-white uppercase tracking-widest border border-white/5">
          {label}
        </span>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-2">
         {isOwn && (
            <span className="px-2 py-1 bg-red-600/80 backdrop-blur-md rounded-md text-[8px] font-black text-white uppercase tracking-widest">Mikrofon</span>
         )}
         <button 
            onClick={onToggleMute}
            className={`p-2 rounded-lg backdrop-blur-md transition-all ${muted ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-slate-900/60 text-white border border-white/10'}`}
         >
            {muted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
         </button>
      </div>

      <div className="absolute bottom-3 left-3">
         <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOwn ? 'bg-red-500' : 'bg-emerald-500'}`} />
            <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">{isOwn ? 'SES GİDİYOR' : 'CANLI YAYIN'}</span>
         </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/10 pointer-events-none">
         <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <MoreVertical className="w-5 h-5 text-white" />
         </div>
      </div>
    </div>
  );
};
