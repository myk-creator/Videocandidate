import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CandidateCard } from './CandidateCard';
import { ExamTimer } from './ExamTimer';

const mockCandidates = [
  {
    id: '1',
    name: 'EMRE TANRISEVEN',
    status: 'active',
    pcImage: 'https://images.unsplash.com/photo-1697632155248-d659e2ba672c?auto=format&fit=crop&q=80&w=400',
    mobileImage: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=400',
    screenImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    remainingTime: 2450
  },
  {
    id: '2',
    name: 'AYŞE YILMAZ',
    status: 'warning',
    pcImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    mobileImage: 'https://images.unsplash.com/photo-1556656793-062ff98782a1?auto=format&fit=crop&q=80&w=400',
    screenImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    remainingTime: 3600
  },
  {
    id: '3',
    name: 'BURAK DEMİR',
    status: 'active',
    pcImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    mobileImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
    screenImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    remainingTime: 1200
  }
];

export const ProctorView: React.FC = () => {
  const [examStarted, setExamStarted] = useState(false);
  const [recordingStarted, setRecordingStarted] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#05060f] text-slate-200 selection:bg-indigo-500/30 font-sans">
      <Sidebar candidates={mockCandidates} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          testName="Runway Akademi | İleri Seviye Sınav" 
          sessionId="100020" 
          isActive={examStarted} 
          isRecording={recordingStarted}
          activeCount={mockCandidates.length + 8}
          onStartRecording={() => setRecordingStarted(true)}
          onStart={() => setExamStarted(true)}
          onEnd={() => {
            setExamStarted(false);
            setRecordingStarted(false);
          }}
        />
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gradient-to-br from-[#05060f] via-[#0b0d1a] to-[#05060f]">
          <div className="max-w-[1600px] mx-auto">
            {/* Session Stats Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">OTURUM SÜRESİ</p>
                  <ExamTimer isActive={examStarted} />
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">SINAV MERKEZİ</p>
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    İSTANBUL - TR_NODE_01
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-12">
              {mockCandidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate as any} />
              ))}
              
              {/* Simulation of N candidates */}
              {Array.from({ length: 8 }).map((_, i) => (
                <CandidateCard 
                  key={`extra-${i}`} 
                  candidate={{
                    id: `extra-${i}`,
                    name: `ADAY #${i + 4} TEST`,
                    status: i % 4 === 0 ? 'warning' : 'active',
                    pcImage: `https://images.unsplash.com/photo-${1500000000000 + (i * 1000000)}?auto=format&fit=crop&q=80&w=400`,
                    mobileImage: `https://images.unsplash.com/photo-${1510000000000 + (i * 1000000)}?auto=format&fit=crop&q=80&w=400`,
                    screenImage: `https://images.unsplash.com/photo-${1520000000000 + (i * 1000000)}?auto=format&fit=crop&q=80&w=800`,
                    remainingTime: 1800 + (i * 300)
                  } as any} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.5);
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};
