import React from 'react';
import { GeneratedImage } from '../types';
import { X, Download, Copy, Check } from 'lucide-react';
import { downloadBlob } from '../lib/imageProcessor';

interface LightboxModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!image) return null;

  const handleCopy = async () => {
    try {
      // Try copy to clipboard
      const item = new ClipboardItem({ [image.blob.type]: image.blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div
        className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
              {image.filename}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Ketebalan Frame: {(image.borderPercent * 100).toFixed(1)}% ({image.borderPx} px)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Display */}
        <div className="p-4 sm:p-6 bg-gray-900/90 flex items-center justify-center overflow-auto max-h-[60vh]">
          <img
            src={image.dataUrl}
            alt={image.filename}
            className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-lg border border-white/10"
          />
        </div>

        {/* Color Palette breakdown */}
        <div className="p-4 bg-white border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-bold">Warna Frame:</span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: image.colors.top }}
                title={`Atas: ${image.colors.top}`}
              />
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: image.colors.bottom }}
                title={`Bawah: ${image.colors.bottom}`}
              />
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: image.colors.left }}
                title={`Kiri: ${image.colors.left}`}
              />
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: image.colors.right }}
                title={`Kanan: ${image.colors.right}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Tersalin!' : 'Salin Gambar'}
            </button>
            <button
              type="button"
              onClick={() => downloadBlob(image.blob, image.filename)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#fe4c6f] hover:bg-[#e63958] rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download JPG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
