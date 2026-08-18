import React from 'react';
import { GeneratedImage } from '../types';
import { X, Download, Eye, Grid } from 'lucide-react';
import { downloadBlob } from '../lib/imageProcessor';

interface AllImagesModalProps {
  isOpen: boolean;
  images: GeneratedImage[];
  onClose: () => void;
  onSelectImage: (image: GeneratedImage) => void;
}

export const AllImagesModal: React.FC<AllImagesModalProps> = ({
  isOpen,
  images,
  onClose,
  onSelectImage
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
      <div
        className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#fff0f3] text-[#fe4c6f] flex items-center justify-center font-bold">
              <Grid className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
                Seluruh Variasi Hasil ({images.length} Gambar)
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Klik pada gambar untuk memperbesar atau download foto satuan
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

        {/* Gallery Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-square bg-gray-100 p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={img.dataUrl}
                    alt={img.filename}
                    className="w-full h-full object-contain rounded transition-transform group-hover:scale-105 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectImage(img);
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    #{img.id}
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectImage(img);
                      }}
                      className="w-8 h-8 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-rose-50 hover:text-[#fe4c6f] shadow-md transition-transform hover:scale-110"
                      title="Perbesar"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadBlob(img.blob, img.filename)}
                      className="w-8 h-8 rounded-full bg-[#fe4c6f] text-white flex items-center justify-center hover:bg-[#e63958] shadow-md transition-transform hover:scale-110"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-gray-700 truncate max-w-[90px]">
                    {img.filename}
                  </span>
                  <span className="text-gray-400 font-medium">
                    {(img.borderPercent * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
