import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Clock,
  Monitor,
  Smartphone,
  Video,
  Mic,
  MicOff,
  Maximize2,
  Shield,
  Search,
  MoreVertical,
  Volume2,
  Circle
} from "lucide-react";
import { toast } from "sonner";

const MOCK_CANDIDATES = [
  { id: "1", name: "Mehmet Yılmaz", status: "online", lastSeen: "2s ago", flags: 0, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", initialTime: 3600 },
  { id: "2", name: "Ayşe Kaya", status: "warning", lastSeen: "5s ago", flags: 2, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", initialTime: 2400 },
  { id: "3", name: "Emre Demir", status: "online", lastSeen: "1s ago", flags: 0, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", initialTime: 4500 },
  { id: "4", name: "Canan Öz", status: "offline", lastSeen: "10m ago", flags: 1, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", initialTime: 1800 },
  { id: "5", name: "Burak Sağlam", status: "online", lastSeen: "Just now", flags: 0, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", initialTime: 5400 },
  { id: "6", name: "Selin Yurt", status: "online", lastSeen: "4s ago", flags: 0, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", initialTime: 3200 },
];

export function TheoryProctor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const filteredCandidates = MOCK_CANDIDATES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success("Oturum ekran kaydı başlatıldı.", {
        description: "Tüm aday ekranları kaydediliyor.",
        icon: <Circle className="w-4 h-4 text-red-500 fill-red-500" />
      });
    } else {
      toast.info("Ekran kaydı durduruldu ve kaydedildi.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050508] text-slate-300 font-sans selection:bg-purple-500/30">
      {/* Top Controls Header */}
      <header className="h-16 border-b border-white/5 bg-[#0d0d14]/60 backdrop-blur-xl px-8 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Shield className="w-5 h-5 text-purple-500" />
             </div>
             <div>
                <h1 className="text-sm font-black text-white uppercase tracking-tighter italic leading-none">Teorik Sınav <span className="text-purple-500">Gözetim</span></h1>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Sistem Oturumu: #A-2026-X</p>
             </div>
          </div>

          <div className="h-8 w-px bg-white/5" />

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Adaylarda ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={handleStartRecording}
             className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 border ${
               isRecording 
               ? 'bg-red-600/20 text-red-500 border-red-500/30' 
               : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
             }`}
           >
              <Circle className={`w-4 h-4 ${isRecording ? 'animate-pulse fill-red-500 text-red-500' : ''}`} /> 
              {isRecording ? 'Kaydı Durdur' : 'Ekran Kaydını Başlat'}
           </button>
           
           <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/20 active:scale-95">
              <Activity className="w-4 h-4" /> Tümünü Başlat
           </button>
        </div>
      </header>

      {/* Candidates Grid Area */}
      <main className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[#050508]">
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredCandidates.map((candidate) => (
               <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
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

function CandidateCard({ candidate }: { candidate: typeof MOCK_CANDIDATES[0] }) {
  const [isMuted, setIsMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState(candidate.initialTime);

  useEffect(() => {
    if (candidate.status === 'offline') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [candidate.status]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#0d0d14]/40 border rounded-[2rem] overflow-hidden flex flex-col transition-all duration-300 group ${
        candidate.status === 'warning' 
        ? 'border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.05)] bg-amber-500/5' 
        : candidate.status === 'offline' 
        ? 'border-white/5 opacity-60' 
        : 'border-white/5 hover:border-purple-500/30 shadow-2xl shadow-black hover:bg-[#0d0d14]/60'
      }`}
    >
      {/* Card Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
         <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative shrink-0">
               <img src={candidate.photo} className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10" alt={candidate.name} />
               <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#0d0d14] ${
                 candidate.status === 'online' ? 'bg-emerald-500' : candidate.status === 'warning' ? 'bg-amber-500' : 'bg-slate-600'
               }`} />
            </div>
            <div className="overflow-hidden">
               <div className="flex items-center gap-2">
                  <h3 className="text-[11px] font-black text-white italic truncate uppercase tracking-tighter leading-none">
                    {candidate.name}
                  </h3>
               </div>
               <div className="flex items-center gap-2 mt-1">
                  <Clock className={`w-2.5 h-2.5 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-purple-400'}`} />
                  <span className={`text-[9px] font-mono font-bold tabular-nums ${timeLeft < 300 ? 'text-red-500' : 'text-slate-300'}`}>
                    {formatTime(timeLeft)}
                  </span>
               </div>
            </div>
         </div>
         
         <div className="flex items-center gap-1.5 shrink-0">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-1.5 rounded-lg transition-all ${isMuted ? 'bg-white/5 text-slate-500 hover:text-white' : 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'}`}
            >
               {isMuted ? <MicOff className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
            <button className="p-1.5 rounded-lg bg-white/5 text-slate-500 hover:text-red-500 transition-all">
               <AlertTriangle className="w-3 h-3" />
            </button>
         </div>
      </div>

      {/* Card Content: 3 Screens Layout */}
      <div className="p-3 space-y-3">
         {/* Top Row: Cameras (Side by Side) */}
         <div className="grid grid-cols-2 gap-3 h-32">
            {/* PC Camera */}
            <div className="bg-black rounded-2xl border border-white/5 overflow-hidden relative group/cam">
               <img 
                 src={`https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&candidate=${candidate.id}`} 
                 className="w-full h-full object-cover grayscale-[0.2] group-hover/cam:scale-110 transition-transform duration-700" 
                 alt="PC Camera" 
               />
               <div className="absolute top-2 left-3 flex items-center gap-1.5">
                  <Video className="w-2.5 h-2.5 text-blue-400" />
                  <span className="text-[7px] font-black text-white uppercase tracking-widest drop-shadow-md">ÖN KAMERA</span>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/cam:opacity-100 transition-opacity" />
            </div>

            {/* Phone Camera */}
            <div className="bg-black rounded-2xl border border-white/5 overflow-hidden relative group/cam">
               <img 
                 src={`https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400&candidate=${candidate.id}`} 
                 className="w-full h-full object-cover grayscale-[0.2] group-hover/cam:scale-110 transition-transform duration-700" 
                 alt="Phone Camera" 
               />
               <div className="absolute top-2 left-3 flex items-center gap-1.5">
                  <Smartphone className="w-2.5 h-2.5 text-orange-400" />
                  <span className="text-[7px] font-black text-white uppercase tracking-widest drop-shadow-md">YAN (MOBİL)</span>
               </div>
            </div>
         </div>

         {/* Bottom Row: Screen Share (Larger) */}
         <div className="h-44 bg-black rounded-2xl border border-white/5 overflow-hidden relative group/screen transition-all duration-500 hover:scale-[1.3] hover:z-40 hover:shadow-2xl hover:shadow-purple-500/20 origin-center cursor-zoom-in">
            <div className="w-full h-full bg-slate-900/50 flex flex-col pt-8 px-4 pb-4 gap-2">
               {/* Simulated App View */}
               <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-3 flex flex-col gap-2 overflow-hidden">
                  <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                  <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                     <div className="h-12 bg-white/5 rounded-lg border border-white/5" />
                     <div className="h-12 bg-white/5 rounded-lg border border-white/5" />
                  </div>
                  <div className="h-2 w-5/6 bg-white/10 rounded-full mt-auto" />
               </div>
            </div>

            <div className="absolute top-2 left-4 flex items-center gap-2">
               <Monitor className="w-3 h-3 text-purple-400" />
               <span className="text-[7px] font-black text-white uppercase tracking-widest drop-shadow-md">EKRAN PAYLAŞIMI</span>
            </div>

            <div className="absolute bottom-3 right-4 flex gap-1 opacity-0 group-hover/screen:opacity-100 transition-opacity">
               <button className="p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-black/80 transition-colors border border-white/10">
                  <Maximize2 className="w-3 h-3" />
               </button>
            </div>

            {candidate.status === 'warning' && (
              <div className="absolute inset-0 bg-amber-500/10 animate-pulse pointer-events-none" />
            )}
         </div>
      </div>

      {/* Card Footer: Analytics/Quick Stats */}
      <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between bg-black/20">
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
               <Activity className={`w-2.5 h-2.5 ${candidate.status === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`} />
               <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Sinyal: %{candidate.status === 'warning' ? '64' : '98'}</span>
            </div>
            <div className="w-px h-2 bg-white/10" />
            <div className="flex items-center gap-1.5">
               <Volume2 className="w-2.5 h-2.5 text-slate-500" />
               <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">12db</span>
            </div>
         </div>
         <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest italic">{candidate.lastSeen}</span>
      </div>
    </motion.div>
  );
}
