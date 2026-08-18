import React from 'react';
import { EngineType } from '../types';
import { ENGINES } from '../lib/constants';
import { CheckCircle2, Cpu, Info } from 'lucide-react';

interface EngineSelectorProps {
  selectedEngine: EngineType;
  onSelectEngine: (engine: EngineType) => void;
  disabled?: boolean;
}

export const EngineSelector: React.FC<EngineSelectorProps> = ({
  selectedEngine,
  onSelectEngine,
  disabled = false
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#fff0f3] text-[#fe4c6f] flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-900 block">
              Pilih Engine Pemrosesan:
            </label>
            <span className="text-xs text-gray-500 font-medium">
              Sesuaikan dengan gaya frame dan kebutuhan variasi Anda
            </span>
          </div>
        </div>
      </div>

      {/* 3 Engine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {ENGINES.map((engine) => {
          const isSelected = selectedEngine === engine.id;

          return (
            <div
              key={engine.id}
              onClick={() => !disabled && onSelectEngine(engine.id)}
              className={`relative cursor-pointer rounded-2xl p-4 sm:p-5 transition-all flex flex-col justify-between border-2 text-left ${
                isSelected
                  ? 'bg-[#fff0f3]/40 border-[#fe4c6f] shadow-md ring-2 ring-[#fe4c6f]/20 scale-[1.01]'
                  : 'bg-white border-gray-200/80 hover:border-[#fe4c6f]/60 hover:bg-gray-50/50 shadow-xs'
              } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <div>
                {/* Header with Badge & Check */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isSelected
                        ? 'bg-[#fe4c6f] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {engine.badge}
                  </span>

                  {isSelected && (
                    <span className="text-[#fe4c6f] flex items-center gap-1 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 fill-[#fe4c6f] text-white" />
                      Terpilih
                    </span>
                  )}
                </div>

                {/* Engine Name */}
                <h3 className="text-sm sm:text-base font-extrabold text-gray-900 mb-1 leading-snug">
                  {engine.shortName}
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed mb-3">
                  {engine.tagline}
                </p>

                {/* Visual Frame Simulation Mini Mockup */}
                <div className="my-3 py-2 px-3 rounded-xl bg-gray-50 border border-gray-200/60 flex items-center justify-center">
                  <div
                    className="relative w-24 h-16 rounded overflow-hidden flex items-center justify-center bg-gray-200 text-[10px] font-bold text-gray-500 shadow-inner"
                    style={{
                      borderTop: `6px solid ${engine.id === 'imageku3' ? '#fe4c6f' : '#f97316'}`,
                      borderBottom: `6px solid ${engine.id === 'imageku3' ? '#06b6d4' : '#10b981'}`,
                      borderLeft: `6px solid ${engine.id === 'imageku3' ? '#8b5cf6' : '#ec4899'}`,
                      borderRight: `6px solid ${engine.id === 'imageku3' ? '#eab308' : '#3b82f6'}`
                    }}
                  >
                    <span className="bg-white/80 px-1.5 py-0.5 rounded text-[9px] text-gray-700">
                      Foto Asli
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Specs Table */}
              <div className="pt-2 border-t border-gray-100/90 text-[11px] space-y-1">
                <div className="flex justify-between text-gray-500">
                  <span>Tebal Frame:</span>
                  <span className="font-bold text-gray-800">{engine.borderSpec}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Pola Warna:</span>
                  <span className="font-bold text-gray-800">{engine.colorSpec}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
