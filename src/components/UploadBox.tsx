import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';
import { MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES, ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES } from '../lib/constants';

interface UploadBoxProps {
  selectedFile: File | null;
  previewUrl: string | null;
  imageDimensions: { width: number; height: number } | null;
  onFileSelect: (file: File) => void;
  onFileClear: () => void;
  disabled?: boolean;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  selectedFile,
  previewUrl,
  imageDimensions,
  onFileSelect,
  onFileClear,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);

    // 1. Check extension & MIME
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isAllowedExt = ALLOWED_EXTENSIONS.includes(extension);
    const isAllowedMime = ALLOWED_MIME_TYPES.includes(file.type);

    if (!isAllowedExt && !isAllowedMime) {
      setErrorMessage(
        `Format file "${file.name}" tidak didukung. Harap upload gambar berekstensi .jpg, .jpeg, .png, atau .webp.`
      );
      return;
    }

    // 2. Check size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(
        `Ukuran file (${(file.size / (1024 * 1024)).toFixed(1)} MB) melebihi batas maksimal ${MAX_FILE_SIZE_MB} MB.`
      );
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
        disabled={disabled}
      />

      {/* Upload Dropzone or Selected Preview */}
      {!selectedFile || !previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
            isDragging
              ? 'border-[#fe4c6f] bg-[#fff0f3]/70 scale-[1.01]'
              : 'border-gray-300 hover:border-[#fe4c6f] bg-white hover:bg-[#fff0f3]/30'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#fff0f3] text-[#fe4c6f] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div>
              <p className="text-base font-bold text-gray-800">
                Tarik & letakkan gambar di sini, atau{' '}
                <span className="text-[#fe4c6f] underline decoration-2 underline-offset-2">
                  klik untuk memilih file
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                Mendukung JPG, JPEG, PNG, WEBP (Maksimal 10 MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview Box */
        <div className="bg-white border-2 border-rose-100 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Thumbnail */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 shadow-inner flex items-center justify-center group">
              <img
                src={previewUrl}
                alt="Preview Gambar Terpilih"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-semibold px-2 py-1 bg-black/60 rounded">
                  {imageDimensions ? `${imageDimensions.width}×${imageDimensions.height}` : 'Preview'}
                </span>
              </div>
            </div>

            {/* Info and Actions */}
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-600 text-xs font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Gambar Utama Siap Diproses</span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-gray-900 truncate max-w-sm" title={selectedFile.name}>
                {selectedFile.name}
              </h4>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1.5 text-xs text-gray-500 font-medium">
                <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>
                {imageDimensions && (
                  <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                    Dimensi: {imageDimensions.width} × {imageDimensions.height} px
                  </span>
                )}
                <span className="bg-[#fff0f3] text-[#fe4c6f] px-2 py-0.5 rounded-md font-semibold">
                  Format: {selectedFile.name.split('.').pop()?.toUpperCase()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Ganti Gambar
                </button>
                <button
                  type="button"
                  onClick={onFileClear}
                  disabled={disabled}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-700 text-xs font-medium animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
