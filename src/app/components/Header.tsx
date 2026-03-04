import React from 'react';
import { Settings, LogOut, Bell, Search, Play, Square, Users, Circle } from 'lucide-react';

interface HeaderProps {
  testName: string;
  sessionId: string;
  isActive: boolean;
  isRecording?: boolean;
  activeCount: number;
}

export const Header: React.FC<HeaderProps & { onStart?: () => void, onEnd?: () => void, onStartRecording?: () => void }> = ({ 
  testName, sessionId, isActive, isRecording, activeCount, onStart, onEnd, onStartRecording 
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-white tracking-tight">{testName}</h1>
            <span className="px-2 py-0.5 text-xs bg-slate-800 text-slate-400 rounded-md">OTURUM ID: {sessionId}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : isRecording ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-amber-500'}`} />
            <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">
              {isActive ? 'OTURUM DEVAM EDİYOR' : isRecording ? 'KAYIT DEVAM EDİYOR (BEKLEMEDE)' : 'OTURUM BEKLETİLİYOR'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <Users className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white tabular-nums">{activeCount}</span>
          <span className="text-xs text-slate-400">AKTİF ADAY</span>
        </div>

        <div className="flex items-center gap-3">
          {!isRecording ? (
            <button 
              onClick={onStartRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 active:scale-95 text-xs uppercase tracking-widest"
            >
              <Circle className="w-3.5 h-3.5 fill-white animate-pulse" />
              <span>KAYDI BAŞLAT</span>
            </button>
          ) : (
            <button 
              onClick={onStart}
              disabled={isActive}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-bold shadow-lg active:scale-95 text-xs uppercase tracking-widest ${
                isActive ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isActive ? '' : 'fill-current'}`} />
              <span>{isActive ? 'SINAV DEVAM EDİYOR' : 'SINAVI BAŞLAT'}</span>
            </button>
          )}
          
          <button 
            onClick={onEnd}
            disabled={!isRecording}
            className={`flex items-center gap-2 px-5 py-2.5 border rounded-lg transition-all font-bold active:scale-95 text-xs uppercase tracking-widest ${
              !isRecording ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500'
            }`}
          >
            <Square className={`w-3.5 h-3.5 ${!isRecording ? '' : 'fill-current'}`} />
            <span>SINAVI BİTİR</span>
          </button>
        </div>
      </div>
    </header>
  );
};
