import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface ExamTimerProps {
  isActive: boolean;
  initialSeconds?: number;
  onTimeEnd?: () => void;
  className?: string;
}

export const ExamTimer: React.FC<ExamTimerProps> = ({ 
  isActive, 
  initialSeconds = 3600, 
  onTimeEnd,
  className = ""
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval: any = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      onTimeEnd?.();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, onTimeEnd]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWarning = seconds < 300; // Last 5 minutes

  return (
    <div className={`flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 ${isWarning ? 'animate-pulse' : ''} ${className}`}>
      <Timer className={`w-4 h-4 ${isWarning ? 'text-red-500' : 'text-indigo-400'}`} />
      <span className={`text-sm font-bold tabular-nums ${isWarning ? 'text-red-500' : 'text-white'}`}>
        {formatTime(seconds)}
      </span>
      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider ml-1">KALAN SÜRE</span>
    </div>
  );
};
