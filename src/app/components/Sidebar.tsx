import React, { useState } from 'react';
import { Link } from 'react-router';
import { Send, Search, Users, Activity, MessageSquare, ChevronDown, CheckCircle2, MoreVertical, Settings, LogOut, Camera, Mic, MicOff, Video, VideoOff, ShieldCheck, ShieldAlert } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const ChatBox: React.FC = () => {
  return (
    <div className="flex flex-col h-1/4 min-h-[160px] border-b border-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5" /> GENEL DUYURU
        </h3>
      </div>
      <div className="relative">
        <textarea 
          placeholder="Tüm adaylara mesaj gönder..."
          className="w-full h-24 bg-slate-900/80 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none shadow-inner"
        />
        <button className="absolute bottom-3 right-3 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg active:scale-95 group">
          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};

const CandidateList: React.FC<{ candidates: any[] }> = ({ candidates }) => {
  return (
    <div className="flex flex-col h-1/3 border-b border-slate-800/50 p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Users className="w-3.5 h-3.5" /> ADAY LİSTESİ
        </h3>
        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">{candidates.length} KİŞİ</span>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
        {candidates.map((c) => (
          <div key={c.id} className="group flex items-center justify-between p-2 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-800/50 hover:border-slate-700 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                {c.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{c.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 text-[9px] bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 font-bold uppercase tracking-tight">
                ONAYLI
              </span>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-700 rounded transition-all">
                <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemLogs: React.FC = () => {
  const logs = [
    { time: '15:09:09', msg: 'Gözetmen odaya katıldı.', type: 'info' },
    { time: '15:10:22', msg: 'Sinav oturumu baslatildi.', type: 'info' },
    { time: '15:11:45', msg: 'Emre T. - Ekran paylasimi basladi.', type: 'success' },
    { time: '15:12:01', msg: 'Baglanti sorunu: Ahmet K.', type: 'error' },
  ];

  return (
    <div className="flex flex-col h-1/4 p-4 overflow-hidden border-b border-slate-800/50">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" /> SİSTEM GÜNLÜĞÜ
        </h3>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2.5 text-[11px] leading-relaxed">
            <span className="text-slate-600 tabular-nums font-mono flex-shrink-0">{log.time}</span>
            <span className={`font-medium ${
              log.type === 'error' ? 'text-red-400' : 
              log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'
            }`}>
              {log.msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Sidebar: React.FC<{ candidates: any[] }> = ({ candidates }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);

  return (
    <aside className="w-80 h-screen flex flex-col bg-slate-950/80 border-r border-slate-800/50 backdrop-blur-xl shrink-0 sticky top-0 overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-tight">Runway Akademi</h2>
            <span className="text-xs text-indigo-400/80 font-medium tracking-widest uppercase">PROCTOR PANEL</span>
          </div>
        </div>
      </div>

      <ChatBox />
      <CandidateList candidates={candidates} />
      <SystemLogs />

      <div className="mt-auto p-4 bg-slate-900/60">
        <div className="relative group rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800/80 mb-4 shadow-xl">
          {isVideoOn ? (
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1760278041809-b157c39c30d3?auto=format&fit=crop&q=80&w=400" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
              <VideoOff className="w-10 h-10 text-slate-700" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-lg">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[10px] font-bold text-white uppercase tracking-tighter">SİZ (GÖZETMEN)</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
             <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${isVideoOn ? 'bg-slate-900/80 border-slate-700/50 text-white' : 'bg-red-500/20 border-red-500/30 text-red-400'}`}
             >
               {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
             </button>
             <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${isMicOn ? 'bg-indigo-600/80 border-indigo-400/50 text-white' : 'bg-slate-900/80 border-slate-700/50 text-white'}`}
             >
               {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
             </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500" />
             <span className="text-[11px] font-bold text-slate-300 tracking-tight">CANLI YAYIN AKTİF</span>
          </div>
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer transition-colors" />
            <Link to="/candidate" title="Aday Görünümü" className="p-1 rounded bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all">
               <ShieldCheck className="w-3.5 h-3.5" />
            </Link>
            <Link to="/auditor" title="Dış Denetim" className="p-1 rounded bg-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all">
               <ShieldAlert className="w-3.5 h-3.5" />
            </Link>
            <Link to="/performance" title="Performans Sınavı" className="p-1 rounded bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950 transition-all">
               <Activity className="w-3.5 h-3.5" />
            </Link>
            <LogOut className="w-4 h-4 text-slate-500 hover:text-red-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </aside>
  );
};
