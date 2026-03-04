import React, { useState } from 'react';
import { ShieldAlert, Users, Eye, Volume2, VolumeX, Grid, List, Search, Filter, Info, ShieldCheck } from 'lucide-react';
import { CandidateCard } from './CandidateCard';
import { ExamTimer } from './ExamTimer';
import { motion, AnimatePresence } from 'motion/react';

const mockCandidates = [
  {
    id: '1',
    name: 'EMRE TANRISEVEN',
    status: 'active',
    pcImage: 'https://images.unsplash.com/photo-1697632155248-d659e2ba672c?auto=format&fit=crop&q=80&w=400',
    mobileImage: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=400',
    screenImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'AYŞE YILMAZ',
    status: 'warning',
    pcImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    mobileImage: 'https://images.unsplash.com/photo-1556656793-062ff98782a1?auto=format&fit=crop&q=80&w=400',
    screenImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'BURAK DEMİR',
    status: 'active',
    pcImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    mobileImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
    screenImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'CANAN KAYA',
    status: 'active',
    pcImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    mobileImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
    screenImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  }
];

export const AuditorView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAudioMutedAll, setIsAudioMutedAll] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-amber-500/30">
      {/* Audit Header */}
      <header className="h-20 border-b border-amber-500/10 bg-slate-950/80 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-[100] shadow-2xl shadow-amber-500/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <ShieldAlert className="w-6 h-6 text-slate-950" />
             </div>
             <div>
                <h1 className="text-xl font-bold text-white tracking-tight leading-tight">Runway <span className="text-amber-500">Dış Denetim</span></h1>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">AUDIT MODE</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
             </div>
          </div>

          <div className="h-10 w-px bg-slate-800 hidden md:block" />

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">OTURUM DURUMU</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase">AKTİF OTURUM</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded-md border border-slate-700">ID: 100020</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">KALAN SÜRE</span>
              <ExamTimer isActive={true} className="!bg-transparent !border-none !p-0 !h-auto" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
             <button 
              onClick={() => setIsAudioMutedAll(!isAudioMutedAll)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${isAudioMutedAll ? 'text-slate-500 hover:text-white' : 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'}`}
             >
               {isAudioMutedAll ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
               TÜM SESLERİ {isAudioMutedAll ? 'AÇ' : 'KAPAT'}
             </button>
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-400" />
             </div>
             <div className="hidden xl:block">
                <p className="text-[10px] font-bold text-white leading-none">Dış Denetçi</p>
                <p className="text-[8px] text-amber-500 font-bold uppercase mt-1">Sadece İzleme</p>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-[#02040a] via-[#050811] to-[#02040a] custom-scrollbar">
        <div className="max-w-[1800px] mx-auto">
          {/* Audit Info Alert */}
          <div className="mb-8 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
             <div className="p-2 bg-amber-500/10 rounded-lg">
                <Info className="w-5 h-5 text-amber-500" />
             </div>
             <div>
                <p className="text-sm font-bold text-amber-200">GİZLİLİK VE DENETİM UYARISI</p>
                <p className="text-xs text-amber-500/70">Şu anda "Dış Denetim" modundasınız. Tüm adayların ses, video ve ekran paylaşımlarına tam erişiminiz bulunmaktadır. Yapılan tüm izleme faaliyetleri sistem günlüğüne kaydedilmektedir.</p>
             </div>
             <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-500">ŞİFRELİ BAĞLANTI AKTİF</span>
             </div>
          </div>

          {/* Grid View */}
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1'}`}>
            {mockCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate as any} />
            ))}
            
            {/* Simulation of more candidates for audit scaling */}
            {Array.from({ length: 12 }).map((_, i) => (
              <CandidateCard 
                key={`audit-${i}`} 
                candidate={{
                  id: `audit-${i}`,
                  name: `DENETİM_ADAY_${i + 5}`,
                  status: i % 5 === 0 ? 'warning' : 'active',
                  pcImage: `https://images.unsplash.com/photo-${1500000000000 + (i * 1000000)}?auto=format&fit=crop&q=80&w=400`,
                  mobileImage: `https://images.unsplash.com/photo-${1510000000000 + (i * 1000000)}?auto=format&fit=crop&q=80&w=400`,
                  screenImage: `https://images.unsplash.com/photo-${1520000000000 + (i * 1000000)}?auto=format&fit=crop&q=80&w=800`
                } as any} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* Audit Stats Footer */}
      <footer className="h-10 border-t border-slate-800 bg-slate-950/80 backdrop-blur-md px-8 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <Eye className="w-3 h-3 text-amber-500" />
              TOPLAM İZLENEN: 16 ADAY
           </div>
           <div className="flex items-center gap-2">
              <Grid className="w-3 h-3 text-amber-500" />
              GÖRÜNÜM: {viewMode.toUpperCase()}
           </div>
        </div>
        <div className="flex items-center gap-6">
           <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              DENETİM SUNUCUSU: ONLINE
           </span>
           <span className="text-slate-700">|</span>
           <span>SÜRÜM v2.4.0-AUDIT</span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.4);
        }
      `}} />
    </div>
  );
};
