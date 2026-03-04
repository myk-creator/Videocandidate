import React, { useState } from 'react';
import { Mic, MicOff, Monitor, Smartphone, Laptop, Maximize2, MoreVertical, ShieldCheck, AlertCircle, AlertTriangle, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";

interface VideoFeedProps {
  label: string;
  icon: React.ReactNode;
  imageUrl: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ label, icon, imageUrl }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <motion.div 
      whileHover={{ 
        scale: 1.15,
        zIndex: 50,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative group overflow-visible rounded-xl border border-slate-700/50 bg-slate-900 cursor-zoom-in"
    >
      <div className="aspect-video relative overflow-hidden rounded-xl">
        <ImageWithFallback 
          src={imageUrl} 
          alt={label} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
      </div>

      <div className="absolute top-2 left-2 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 z-10">
        <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider flex items-center gap-1.5">
          {icon}
          {label}
        </span>
      </div>

      <div className="absolute bottom-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 translate-y-1 group-hover:translate-y-0">
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            setIsMuted(!isMuted);
            toast.success(isMuted ? `${label} sesi açıldı` : `${label} sesi kapatıldı`);
          }}
          className={`p-2 rounded-lg backdrop-blur-md transition-colors ${isMuted ? 'bg-red-500/20 text-red-400 hover:bg-red-500/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
        <button className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

interface Candidate {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'disconnected';
  pcImage: string;
  mobileImage: string;
  screenImage: string;
  remainingTime?: number; // In seconds
}

export const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate: initialCandidate }) => {
  const [candidate, setCandidate] = useState(initialCandidate);
  const [isTerminated, setIsTerminated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(candidate.remainingTime || 3600);

  // Individual timer logic
  React.useEffect(() => {
    if (isTerminated || candidate.status === 'disconnected') return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTerminated, candidate.status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleWarn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCandidate(prev => ({ ...prev, status: 'warning' }));
    toast.warning(`${candidate.name} için uyarı gönderildi.`, {
      description: "Aday ekranına 'Şüpheli Hareket' uyarısı iletildi.",
    });
  };

  const handleFinish = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTerminated(true);
    setCandidate(prev => ({ ...prev, status: 'disconnected' }));
    toast.error(`${candidate.name} isimli adayın sınavı sonlandırıldı.`, {
      description: "Oturum zorla kapatıldı.",
    });
  };

  if (isTerminated) {
    return (
      <div className="relative bg-red-950/10 p-8 rounded-3xl border border-red-900/30 flex flex-col items-center justify-center text-center grayscale opacity-60">
        <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mb-4 border border-red-500/30">
          <Power className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{candidate.name}</h3>
        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">OTURUM SONLANDIRILDI</p>
        <button 
          onClick={() => setIsTerminated(false)}
          className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-lg transition-colors font-bold"
        >
          BAĞLANTIYI YENİLE
        </button>
      </div>
    );
  }

  return (
    <div className="group relative bg-slate-900/40 hover:bg-slate-900/60 p-4 rounded-3xl border border-slate-800 transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/5 overflow-visible">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
              {candidate.name.charAt(0)}
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 transition-colors duration-500 ${
              candidate.status === 'active' ? 'bg-emerald-500' : 
              candidate.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
            }`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white tracking-tight leading-tight">{candidate.name}</h3>
              <div className={`px-2 py-0.5 rounded-md text-[9px] font-black tracking-widest border transition-all ${
                timeLeft < 300 
                  ? 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse' 
                  : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
              }`}>
                {formatTime(timeLeft)}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {candidate.status === 'active' && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <ShieldCheck className="w-3 h-3" /> DOĞRULANDI
                </span>
              )}
              {candidate.status === 'warning' && (
                <span className="flex items-center gap-1 text-[10px] text-amber-400 font-bold animate-pulse">
                  <AlertTriangle className="w-3 h-3" /> ŞÜPHELİ
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button 
            onClick={handleWarn}
            className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all active:scale-95"
            title="Uyar"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
          
          <button 
            onClick={handleFinish}
            className="p-2.5 bg-red-600/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95"
            title="Bitir"
          >
            <Power className="w-4 h-4" />
          </button>

          <button className="p-2 text-slate-600 hover:text-white transition-colors ml-1">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 relative z-10">
        <div className="col-span-1">
          <VideoFeed label="PC" icon={<Laptop className="w-3 h-3" />} imageUrl={candidate.pcImage} />
        </div>
        <div className="col-span-1">
          <VideoFeed label="MOBİL" icon={<Smartphone className="w-3 h-3" />} imageUrl={candidate.mobileImage} />
        </div>
        <div className="col-span-2">
          <VideoFeed label="EKRAN" icon={<Monitor className="w-3 h-3" />} imageUrl={candidate.screenImage} />
        </div>
      </div>
      
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex-shrink-0 px-2.5 py-1 bg-slate-900/80 text-[9px] text-slate-500 rounded-md font-bold border border-slate-800">42MS</div>
        <div className="flex-shrink-0 px-2.5 py-1 bg-slate-900/80 text-[9px] text-slate-500 rounded-md font-bold border border-slate-800">30FPS</div>
        <div className="flex-shrink-0 px-2.5 py-1 bg-slate-900/80 text-[9px] text-slate-500 rounded-md font-bold border border-slate-800 uppercase tracking-tighter">TR_SERVER</div>
      </div>
    </div>
  );
};
