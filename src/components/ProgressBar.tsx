import React from 'react';
import { GenerationProgress } from '../types';
import { Loader2, Sparkles, CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  progress: GenerationProgress;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const isComplete = progress.percent >= 100;

  return (
    <div className="w-full bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-md animate-fade-in">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 animate-bounce" />
          ) : (
            <Loader2 className="w-5 h-5 text-[#fe4c6f] animate-spin" />
          )}
          <span className="text-sm font-extrabold text-gray-900">
            {progress.statusText}
          </span>
        </div>
        <span className="text-sm font-extrabold text-[#fe4c6f]">
          {progress.percent}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#fe4c6f] to-[#e63958] transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${progress.percent}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-[pulse_1.5s_infinite]"></div>
        </div>
      </div>

      {/* Detail info */}
      <div className="flex items-center justify-between text-xs text-gray-500 mt-2.5 font-medium">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#fe4c6f]" />
          Sedang memproses variasi gambar secara lokal...
        </span>
        <span>
          {progress.current} dari {progress.total} selesai
        </span>
      </div>
    </div>
  );
};
