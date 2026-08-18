import React, { useState } from 'react';
import { Download, RotateCcw, Check, Sparkles } from 'lucide-react';
import { downloadBlob } from '../lib/imageProcessor';
import confetti from 'canvas-confetti';

interface DownloadSectionProps {
  zipBlob: Blob | null;
  zipFileName: string;
  totalGenerated: number;
  onReset: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  zipBlob,
  zipFileName,
  totalGenerated,
  onReset
}) => {
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (!zipBlob) return;
    setDownloading(true);

    try {
      // Fire confetti celebratory effect
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#fe4c6f', '#f97316', '#10b981', '#3b82f6', '#8b5cf6']
        });
      } catch {
        // Confetti fallback
      }

      downloadBlob(zipBlob, zipFileName);
      setHasDownloaded(true);
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  const zipSizeMB = zipBlob ? (zipBlob.size / (1024 * 1024)).toFixed(2) : '0';

  return (
    <div className="w-full bg-white border-2 border-rose-100 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-[#fe4c6f]" />
            Unduh Seluruh Variasi ({totalGenerated} Foto)
          </h4>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Semua gambar tersimpan rapi dalam 1 file ZIP: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-[11px]">{zipFileName}</code> ({zipSizeMB} MB)
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!zipBlob || downloading}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-white bg-[#fe4c6f] hover:bg-[#e63958] active:scale-95 shadow-md shadow-[#fe4c6f]/25 transition-all text-sm group"
          >
            {hasDownloaded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Unduh Lagi ZIP ({zipSizeMB} MB)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download File ZIP ({totalGenerated} Gambar)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-sm shrink-0"
            title="Reset ke kondisi awal"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden xs:inline">Mulai Ulang</span>
          </button>
        </div>
      </div>

      {hasDownloaded && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>File ZIP berhasil diunduh ke folder Downloads perangkat Anda!</span>
        </div>
      )}
    </div>
  );
};
