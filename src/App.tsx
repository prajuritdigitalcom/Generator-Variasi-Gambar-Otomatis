/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UploadBox } from './components/UploadBox';
import { JumlahInput } from './components/JumlahInput';
import { EngineSelector } from './components/EngineSelector';
import { ProgressBar } from './components/ProgressBar';
import { PreviewGrid } from './components/PreviewGrid';
import { DownloadSection } from './components/DownloadSection';
import { LightboxModal } from './components/LightboxModal';
import { AllImagesModal } from './components/AllImagesModal';
import { EngineDocsModal } from './components/EngineDocsModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

import { EngineType, GeneratedImage, GenerateResult, GenerationProgress } from './types';
import { DEFAULT_OUTPUT_COUNT } from './lib/constants';
import { generateVariations } from './lib/imageProcessor';
import { Play, Sparkles, AlertCircle, Layers } from 'lucide-react';

export default function App() {
  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [jumlah, setJumlah] = useState<number>(DEFAULT_OUTPUT_COUNT);
  const [selectedEngine, setSelectedEngine] = useState<EngineType>('imageku1');

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [activeLightboxImage, setActiveLightboxImage] = useState<GeneratedImage | null>(null);
  const [isAllImagesModalOpen, setIsAllImagesModalOpen] = useState<boolean>(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState<boolean>(false);

  // Handle File Selection
  const handleFileSelect = (file: File) => {
    // Clear previous object URL if any
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setResult(null);
    setErrorMessage(null);

    // Read dimensions
    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  };

  // Handle File Clear
  const handleFileClear = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageDimensions(null);
    setResult(null);
    setProgress(null);
    setErrorMessage(null);
  };

  // Reset all state to initial (FR-8.1)
  const handleReset = () => {
    handleFileClear();
    setJumlah(DEFAULT_OUTPUT_COUNT);
    setSelectedEngine('imageku1');
    setIsGenerating(false);
  };

  // Generate Handler (FR-5.1 - 5.4)
  const handleGenerate = async () => {
    if (!selectedFile) {
      setErrorMessage('Silakan upload gambar terlebih dahulu sebelum memulai proses.');
      return;
    }

    if (jumlah < 1 || jumlah > 100) {
      setErrorMessage('Jumlah variasi harus di antara 1 dan 100.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setProgress({
      current: 0,
      total: jumlah,
      statusText: 'Memulai robot pembuat frame...',
      percent: 0
    });

    try {
      const generatedResult = await generateVariations(
        selectedFile,
        selectedEngine,
        jumlah,
        (p) => setProgress(p)
      );

      setResult(generatedResult);

      // Smooth scroll down to results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat memproses gambar. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between text-[#1f1f1f]">
      {/* Header */}
      <Header
        onOpenFaq={() => {
          const faqEl = document.getElementById('faq-section');
          faqEl?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenDocs={() => setIsDocsModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
        <Hero />

        {/* Main interactive card */}
        <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-900/5 p-5 sm:p-8 md:p-10 space-y-8">
          {/* Section 1: Upload */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#fe4c6f] bg-[#fff0f3] px-3 py-1 rounded-full">
                Langkah 1 dari 3
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {selectedFile ? '1 Gambar Siap' : 'Belum Ada Gambar'}
              </span>
            </div>
            <UploadBox
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              imageDimensions={imageDimensions}
              onFileSelect={handleFileSelect}
              onFileClear={handleFileClear}
              disabled={isGenerating}
            />
          </div>

          {/* Section 2: Jumlah Variasi */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#fe4c6f] bg-[#fff0f3] px-3 py-1 rounded-full">
                Langkah 2 dari 3
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Target: {jumlah} Variasi
              </span>
            </div>
            <JumlahInput
              value={jumlah}
              onChange={setJumlah}
              disabled={isGenerating}
            />
          </div>

          {/* Section 3: Pilihan Engine */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#fe4c6f] bg-[#fff0f3] px-3 py-1 rounded-full">
                Langkah 3 dari 3
              </span>
              <button
                type="button"
                onClick={() => setIsDocsModalOpen(true)}
                className="text-xs font-bold text-[#fe4c6f] hover:underline"
              >
                Lihat Panduan Engine &rarr;
              </button>
            </div>
            <EngineSelector
              selectedEngine={selectedEngine}
              onSelectEngine={setSelectedEngine}
              disabled={isGenerating}
            />
          </div>

          {/* Error display */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm font-medium">
              <AlertCircle className="w-5 h-5 text-[#fe4c6f] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Terjadi Kesalahan:</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Progress Bar (Visible while generating) */}
          {isGenerating && progress && (
            <ProgressBar progress={progress} />
          )}

          {/* Generate Button (CTA) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !selectedFile}
              className={`w-full py-4 sm:py-5 px-6 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 transition-all shadow-lg text-white ${
                !selectedFile || isGenerating
                  ? 'bg-gray-300 shadow-none cursor-not-allowed text-gray-500'
                  : 'bg-[#fe4c6f] hover:bg-[#e63958] active:scale-[0.99] shadow-[#fe4c6f]/30 hover:shadow-xl hover:shadow-[#fe4c6f]/40'
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Robot Sedang Memproses Variasi Gambar...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
                  <span>Jalankan Robot & Buat {jumlah} Variasi!</span>
                  <Play className="w-4 h-4 fill-white ml-1" />
                </>
              )}
            </button>

            {!selectedFile && (
              <p className="text-center text-xs text-gray-400 mt-2 font-medium">
                * Silakan upload gambar di atas untuk mengaktifkan tombol generate
              </p>
            )}
          </div>
        </div>

        {/* Results Section (FR-6 & FR-7) */}
        {result && (
          <div id="results-section" className="mt-10 space-y-6 animate-fade-in scroll-mt-24">
            <PreviewGrid
              totalGenerated={result.totalGenerated}
              previewImages={result.previewImages}
              allImages={result.allImages}
              onOpenLightbox={(img) => setActiveLightboxImage(img)}
              onOpenAllModal={() => setIsAllImagesModalOpen(true)}
            />

            <DownloadSection
              zipBlob={result.zipBlob}
              zipFileName={result.zipFileName}
              totalGenerated={result.totalGenerated}
              onReset={handleReset}
            />
          </div>
        )}

        {/* FAQ & Information Section */}
        <div id="faq-section">
          <FaqSection />
        </div>
      </main>

      {/* Modals */}
      <LightboxModal
        image={activeLightboxImage}
        onClose={() => setActiveLightboxImage(null)}
      />

      <AllImagesModal
        isOpen={isAllImagesModalOpen}
        images={result?.allImages || []}
        onClose={() => setIsAllImagesModalOpen(false)}
        onSelectImage={(img) => setActiveLightboxImage(img)}
      />

      <EngineDocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
