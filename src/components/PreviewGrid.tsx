import React from 'react';
import { GeneratedImage } from '../types';
import { Eye, Download, Sparkles, Grid } from 'lucide-react';
import { downloadBlob } from '../lib/imageProcessor';

interface PreviewGridProps {
  totalGenerated: number;
  previewImages: GeneratedImage[];
  allImages: GeneratedImage[];
  onOpenLightbox: (image: GeneratedImage) => void;
  onOpenAllModal: () => void;
}

export const PreviewGrid: React.FC<PreviewGridProps> = ({
  totalGenerated,
  previewImages,
  allImages,
  onOpenLightbox,
  onOpenAllModal
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Celebration & Info Header */}
      <div className="bg-gradient-to-r from-[#fff0f3] to-rose-50 border border-[#fe4c6f]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#fe4c6f] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
              Proses Selesai! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              <strong className="text-[#fe4c6f]">{totalGenerated} gambar variasi</strong> berhasil dibuat. Berikut 3 contoh preview hasilnya:
            </p>
          </div>
        </div>

        {totalGenerated > 3 && (
          <button
            type="button"
            onClick={onOpenAllModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#fe4c6f] bg-white border border-[#fe4c6f]/30 hover:bg-rose-50 rounded-xl shadow-xs transition-all shrink-0 hover:scale-105"
          >
            <Grid className="w-4 h-4" />
            Lihat Semua ({totalGenerated} Gambar)
          </button>
        )}
      </div>

      {/* 3 Preview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {previewImages.map((img, idx) => (
          <div
            key={img.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            {/* Image display container */}
            <div className="relative aspect-square bg-gray-100 flex items-center justify-center p-2.5 overflow-hidden">
              <img
                src={img.dataUrl}
                alt={`Preview Variasi ${img.id}`}
                className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                onClick={() => onOpenLightbox(img)}
              />

              {/* Top Badge */}
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                Contoh #{idx + 1}
              </div>

              {/* Hover actions overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(img)}
                  className="w-9 h-9 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-rose-50 hover:text-[#fe4c6f] shadow-lg transition-transform hover:scale-110"
                  title="Perbesar gambar"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => downloadBlob(img.blob, img.filename)}
                  className="w-9 h-9 rounded-full bg-[#fe4c6f] text-white flex items-center justify-center hover:bg-[#e63958] shadow-lg transition-transform hover:scale-110"
                  title="Download foto ini saja"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom details */}
            <div className="p-3 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-700">{img.filename}</span>
              <span className="text-[11px] text-gray-500 font-medium">
                Frame: {(img.borderPercent * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
