import React from 'react';
import { X, Cpu, Check, ArrowRight } from 'lucide-react';
import { ENGINES } from '../lib/constants';

interface EngineDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EngineDocsModal: React.FC<EngineDocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
      <div
        className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-white to-[#fff0f3]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#fe4c6f] text-white flex items-center justify-center font-bold shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
                Spesifikasi & Panduan Engine
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Memahami perbedaan algoritma Engine 1, 2, dan 3
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh] space-y-6 text-xs sm:text-sm text-gray-700">
          {/* Intro */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 text-gray-800">
            <p className="font-semibold text-rose-950 mb-1">
              🎯 Mengapa Menambahkan Frame Warna-Warni?
            </p>
            <p className="leading-relaxed">
              Algoritma marketplace (seperti Shopee, Tokopedia, TikTok Shop, Meta Ads) secara rutin mendeteksi gambar duplikat untuk mencegah spam. Dengan menambahkan border warna-warni yang berbeda pada tiap variasi, setiap gambar memiliki hash file & visual signature unik sehingga aman untuk di-upload massal.
            </p>
          </div>

          {/* 3 Engine Cards */}
          <div className="space-y-4">
            {ENGINES.map((engine, idx) => (
              <div
                key={engine.id}
                className="border border-gray-200 rounded-xl p-4 bg-white shadow-2xs hover:border-[#fe4c6f]/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#fff0f3] text-[#fe4c6f] font-extrabold flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">
                      {engine.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fe4c6f]/10 text-[#fe4c6f]">
                    {engine.badge}
                  </span>
                </div>

                <p className="text-gray-600 mb-3 leading-relaxed">
                  {engine.description}
                </p>

                <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-xs">
                  {engine.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-gray-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                  <div className="pt-1.5 mt-1.5 border-t border-gray-200 flex items-center gap-1.5 text-[#fe4c6f] font-bold">
                    <ArrowRight className="w-3 h-3" />
                    <span>Rekomendasi: {engine.recommendedFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Engine 3 Color Modes deep dive */}
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <h4 className="font-extrabold text-gray-900 mb-2">
              Detail 4 Mode Pewarnaan pada Engine 3 (Full Random)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                <span className="font-bold text-[#fe4c6f]">1. Multi-Color (25%)</span>
                <p className="text-gray-600 mt-0.5">
                  4 sisi masing-masing memiliki warna acak yang berbeda.
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                <span className="font-bold text-[#fe4c6f]">2. Single Solid (25%)</span>
                <p className="text-gray-600 mt-0.5">
                  Semua 4 sisi menggunakan 1 warna solid acak yang seragam.
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                <span className="font-bold text-[#fe4c6f]">3. Paired / Berpasangan (25%)</span>
                <p className="text-gray-600 mt-0.5">
                  2 warna berpasangan (atas-bawah vs kiri-kanan atau siku).
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                <span className="font-bold text-[#fe4c6f]">4. 3-Sama 1-Beda (25%)</span>
                <p className="text-gray-600 mt-0.5">
                  3 sisi warna sama, 1 sisi warna berbeda sebagai aksen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#fe4c6f] hover:bg-[#e63958] rounded-xl transition-colors shadow-xs"
          >
            Mengerti & Mulai Generate
          </button>
        </div>
      </div>
    </div>
  );
};
