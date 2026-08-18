import React from 'react';
import { MIN_OUTPUT_COUNT, MAX_OUTPUT_COUNT } from '../lib/constants';
import { Minus, Plus, Layers } from 'lucide-react';

interface JumlahInputProps {
  value: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export const JumlahInput: React.FC<JumlahInputProps> = ({ value, onChange, disabled = false }) => {
  const presets = [5, 10, 25, 50, 100];

  const handleDecrement = () => {
    if (value > MIN_OUTPUT_COUNT && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < MAX_OUTPUT_COUNT && !disabled) {
      onChange(value + 1);
    }
  };

  const handleDirectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = parseInt(e.target.value, 10);
    if (isNaN(rawVal)) {
      onChange(1);
      return;
    }
    const clamped = Math.max(MIN_OUTPUT_COUNT, Math.min(MAX_OUTPUT_COUNT, rawVal));
    onChange(clamped);
  };

  return (
    <div className="w-full bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#fff0f3] text-[#fe4c6f] flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <label htmlFor="jumlah-variasi" className="text-sm font-bold text-gray-900 block">
              Berapa Jumlah Gambar yang Ingin di-Frame:
            </label>
            <span className="text-xs text-gray-500 font-medium">
              Batas min {MIN_OUTPUT_COUNT} s/d maks {MAX_OUTPUT_COUNT} gambar per batch
            </span>
          </div>
        </div>

        {/* Numeric Stepper */}
        <div className="flex items-center justify-center self-start sm:self-auto bg-gray-50 border border-gray-200 rounded-xl p-1">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || value <= MIN_OUTPUT_COUNT}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-[#fe4c6f] hover:border-rose-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-xs"
            aria-label="Kurangi jumlah"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <input
            id="jumlah-variasi"
            type="number"
            min={MIN_OUTPUT_COUNT}
            max={MAX_OUTPUT_COUNT}
            value={value}
            onChange={handleDirectChange}
            disabled={disabled}
            className="w-14 text-center font-extrabold text-gray-900 text-base bg-transparent border-none focus:outline-none focus:ring-0"
          />

          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || value >= MAX_OUTPUT_COUNT}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-[#fe4c6f] hover:border-rose-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-xs"
            aria-label="Tambah jumlah"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-gray-100">
        <span className="text-[11px] font-semibold text-gray-400 mr-1">Preset Cepat:</span>
        {presets.map((preset) => {
          const isSelected = value === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => !disabled && onChange(preset)}
              disabled={disabled}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                isSelected
                  ? 'bg-[#fe4c6f] text-white shadow-xs scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-[#fff0f3] hover:text-[#fe4c6f]'
              }`}
            >
              {preset} Foto
            </button>
          );
        })}
      </div>
    </div>
  );
};
