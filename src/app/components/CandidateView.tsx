import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Timer, MessageSquare, Video, CheckCircle, ChevronRight, ChevronLeft, AlertTriangle, MousePointer2, Lock } from 'lucide-react';
import { ExamTimer } from './ExamTimer';
import { ConfirmationModal } from './ConfirmationModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from "sonner";

export const CandidateView: React.FC = () => {
  const navigate = useNavigate();
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOutOfBounds, setIsOutOfBounds] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [messages, setMessages] = useState<{ id: string, text: string, type: 'warning' | 'info' }[]>([
    { id: '1', text: 'Sınav kurallarına uyunuz. Kameranızın görüş alanında kalın.', type: 'info' }
  ]);

  const questions = [
    {
      id: 1,
      text: "Aşağıdakilerden hangisi React hook'larından biri değildir?",
      options: ["useState", "useEffect", "useRouter", "useMemo"],
      correct: 2
    },
    {
      id: 2,
      text: "Tailwind CSS'de bir elemanı ortalamak için hangi sınıf kullanılır?",
      options: ["mx-auto", "text-center", "items-center", "Hepsi"],
      correct: 3
    },
    {
      id: 3,
      text: "TypeScript'te bir değişkenin tipini belirtmek için hangi karakter kullanılır?",
      options: [":", "=", "=>", "?:"],
      correct: 0
    }
  ];

  // Simulation of proctor actions
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecordingStarted(true);
      toast.info("Gözetmen oturum kaydını başlattı.", { icon: <Video className="w-4 h-4 text-red-500 animate-pulse" /> });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartExam = () => {
    setExamStarted(true);
    toast.success("Sınav Başlatıldı! Başarılar dileriz.");
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
  };

  const handleFinishExam = () => {
    setExamCompleted(true);
    setExamStarted(false);
    toast.success("Sınavınız başarıyla tamamlandı!", {
      description: "Sonuçlarınız değerlendirmeye alındı.",
      icon: <CheckCircle className="text-emerald-500" />
    });
  };

  // Security Mechanisms
  useEffect(() => {
    if (!examStarted || examCompleted) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsOutOfBounds(true);
      } else {
        setIsOutOfBounds(false);
      }
    };

    const handleBlur = () => {
      setIsOutOfBounds(true);
    };

    const handleFocus = () => {
      setIsOutOfBounds(false);
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow F5 (refresh)
      if (e.key === 'F5') return;

      // Block all Ctrl combinations
      if (e.ctrlKey) {
        e.preventDefault();
        return;
      }

      // Block all Alt combinations
      if (e.altKey) {
        e.preventDefault();
        return;
      }

      // Block Windows / Meta keys
      if (e.key === 'Meta' || e.key === 'OS' || e.key === 'Win') {
        e.preventDefault();
        return;
      }

      // Block Print Screen
      if (e.key === 'PrintScreen' || e.key === 'Snapshot') {
        e.preventDefault();
        toast.error("Ekran görüntüsü almak yasaktır!", { icon: <Lock className="w-4 h-4" /> });
        return;
      }

      // Block all F keys except F5
      if (e.key.length === 2 && e.key.startsWith('F')) {
        e.preventDefault();
        return;
      }

      // Block some specific keys that might be used for navigation or capturing
      const forbiddenKeys = ['ContextMenu', 'Escape', 'Tab'];
      if (forbiddenKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [examStarted, examCompleted]);

  // Simulate receiving a warning from proctor
  useEffect(() => {
    if (examStarted) {
      const timer = setTimeout(() => {
        const newMessage = { id: Date.now().toString(), text: 'Şüpheli hareket tespit edildi! Lütfen kameraya odaklanın.', type: 'warning' as const };
        setMessages(prev => [...prev, newMessage]);
        toast.error("Gözetmen Uyarısı: Şüpheli Hareket!", {
          duration: 5000,
          icon: <AlertTriangle className="text-red-500" />
        });
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [examStarted]);

  return (
    <div className="min-h-screen bg-[#05060f] text-slate-200 font-sans flex flex-col">
      {/* Out of Bounds Security Overlay */}
      <AnimatePresence>
        {isOutOfBounds && examStarted && !examCompleted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-red-950/60 backdrop-blur-3xl"
          >
            <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-[32px] p-10 text-center shadow-2xl shadow-red-500/20">
              <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">GÜVENLİK İHLALİ!</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Başka bir sekme veya ekrana geçiş yaptınız. Sınav sırasında sistemden ayrılmanız <span className="text-red-400 font-bold underline">kesinlikle yasaktır</span>.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                   <div className="p-2 bg-red-500/10 rounded-lg">
                      <MousePointer2 className="w-4 h-4 text-red-400" />
                   </div>
                   <p className="text-xs font-bold text-slate-300 text-left">Lütfen mouse imlecinizi bu ekran içerisinde tutunuz.</p>
                </div>
                <button 
                  onClick={() => setIsOutOfBounds(false)}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-red-600/20"
                >
                  SINAVA GERİ DÖN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Runway <span className="text-indigo-400">Akademi</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Aday Sınav Paneli</p>
          </div>
        </div>

        {examStarted && (
          <div className="flex items-center gap-6">
            <ExamTimer isActive={examStarted} initialSeconds={3600} />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              SINAVI TAMAMLA
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Questions */}
        <div className="flex-1 p-8 overflow-y-auto">
          {examCompleted ? (
            <div className="max-w-2xl mx-auto mt-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                <CheckCircle className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 italic uppercase tracking-tight">Tebrikler!</h2>
              <p className="text-xl text-emerald-400 font-bold mb-8 uppercase tracking-widest">SINAVI BAŞARIYLA TAMAMLADINIZ</p>
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-md mb-12">
                 <div className="grid grid-cols-2 gap-8 text-left">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">CEVAPLANAN SORU</p>
                      <p className="text-2xl font-bold text-white tracking-tight">{Object.keys(selectedAnswers).length} / {questions.length}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">TOPLAM SÜRE</p>
                      <p className="text-2xl font-bold text-white tracking-tight">08:12</p>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
              >
                ANA SAYFAYA DÖN
              </button>
            </div>
          ) : !examStarted ? (
            <div className="max-w-2xl mx-auto mt-20 text-center">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-700 ${recordingStarted ? 'bg-red-600/20 border border-red-500/30' : 'bg-amber-600/20 border border-amber-500/30'}`}>
                {recordingStarted ? <Video className="w-10 h-10 text-red-500 animate-pulse" /> : <Lock className="w-10 h-10 text-amber-500" />}
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {recordingStarted ? 'Sınava Hazır Mısınız?' : 'Oturum Kaydı Bekleniyor...'}
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {recordingStarted 
                  ? "Oturum kaydı başlatıldı. Gözetmeniniz sınav boyunca sizi canlı olarak takip edecektir. Sınav kurallarına uymadığınız takdirde gözetmen sınavınızı sonlandırma yetkisine sahiptir."
                  : "Sınavın başlaması için gözetmenin oturum kaydını aktif etmesi gerekmektedir. Lütfen kameradan ayrılmayınız."
                }
              </p>
              <button 
                disabled={!recordingStarted}
                onClick={handleStartExam}
                className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 active:scale-95 ${
                  recordingStarted 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50 shadow-none'
                }`}
              >
                {recordingStarted ? 'SINAVI BAŞLAT' : 'BEKLENİYOR...'}
              </button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  {questions.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border transition-all ${
                        currentQuestion === idx 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                          : selectedAnswers[idx] !== undefined
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-400">SORU {currentQuestion + 1} / {questions.length}</span>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-3xl backdrop-blur-sm mb-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-8 leading-snug">
                  {questions[currentQuestion].text}
                </h3>
                
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full p-5 rounded-2xl border flex items-center gap-4 transition-all text-left ${
                        selectedAnswers[currentQuestion] === idx
                          ? 'bg-indigo-600/20 border-indigo-600 text-white ring-2 ring-indigo-600/20'
                          : 'bg-slate-800/30 border-slate-700 hover:border-slate-600 text-slate-400 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border ${
                        selectedAnswers[currentQuestion] === idx
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="font-semibold">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button 
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-bold text-sm transition-all"
                >
                  <ChevronLeft className="w-5 h-5" /> ÖNCEKİ SORU
                </button>
                <button 
                  disabled={currentQuestion === questions.length - 1}
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-bold text-sm transition-all text-white shadow-lg shadow-indigo-600/20"
                >
                  SONRAKİ SORU <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Proctor & Messages */}
        <aside className="w-[380px] border-l border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col p-6">
          {/* Proctor Feed */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Video className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">GÖZETMEN YAYINI</span>
            </div>
            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative group">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" 
                alt="Proctor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-red-500/80 backdrop-blur-md rounded-md">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                <span className="text-[8px] font-bold text-white uppercase tracking-tighter">CANLI</span>
              </div>
              <div className="absolute bottom-3 left-3">
                <p className="text-[10px] font-bold text-white">Gözetmen: Selin Kaya</p>
                <p className="text-[8px] text-white/50">Runway Akademi - Denetçi</p>
              </div>
            </div>
          </div>

          {/* System Warnings */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">GÖZETMEN MESAJLARI</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-2xl border ${
                      msg.type === 'warning' 
                        ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                        : 'bg-indigo-500/5 border-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1 rounded-md ${msg.type === 'warning' ? 'bg-red-500/20' : 'bg-indigo-500/20'}`}>
                        {msg.type === 'warning' ? <AlertTriangle className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold leading-relaxed">{msg.text}</p>
                        <span className="text-[8px] opacity-40 font-bold mt-1 block">YENİ MESAJ</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* User Preview (Own Feed) */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">KAMERA ÖNİZLEME</span>
            </div>
            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative">
               <ImageWithFallback 
                src="https://images.unsplash.com/photo-1697632155248-d659e2ba672c?auto=format&fit=crop&q=80&w=400" 
                alt="Me"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-indigo-600/10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-sm">
                <span className="text-[10px] font-bold text-white px-3 py-1 bg-white/10 rounded-full border border-white/20">KAMERA AKTİF</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleFinishExam}
        title="Sınavı Tamamlamak İstediğinize Emin Misiniz?"
        description="Sınavı bitirdiğinizde verdiğiniz cevaplar kaydedilecek ve tekrar değişiklik yapamayacaksınız. Bu işlemi geri alamazsınız."
        confirmText="Evet, Sınavı Bitir"
        cancelText="Sorulara Geri Dön"
        variant="primary"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.2);
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};
