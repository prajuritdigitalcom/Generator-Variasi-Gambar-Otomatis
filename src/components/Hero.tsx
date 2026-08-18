import React from 'react';
import { UploadCloud, Sliders, Cpu, Download } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center pt-8 pb-6 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-4">
        Ubah 1 Foto Jadi <span className="text-[#fe4c6f] bg-clip-text">Banyak Variasi</span> dalam Sekejap
      </h1>

      {/* Sub-headline */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
        Tambahkan frame multi-warna otomatis untuk katalog produk marketplace, konten A/B testing, dan menghindari deteksi duplikasi gambar. Cepat, instan, & unduh langsung bundel ZIP.
      </p>

      {/* 4 Steps Roadmap */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-xs text-left">
          <div className="w-7 h-7 rounded-lg bg-[#fff0f3] text-[#fe4c6f] flex items-center justify-center font-bold text-xs shrink-0">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Langkah 1</p>
            <p className="text-xs font-bold text-gray-800">Upload Gambar</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-xs text-left">
          <div className="w-7 h-7 rounded-lg bg-[#fff0f3] text-[#fe4c6f] flex items-center justify-center font-bold text-xs shrink-0">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Langkah 2</p>
            <p className="text-xs font-bold text-gray-800">Atur Jumlah (1-100)</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-xs text-left">
          <div className="w-7 h-7 rounded-lg bg-[#fff0f3] text-[#fe4c6f] flex items-center justify-center font-bold text-xs shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Langkah 3</p>
            <p className="text-xs font-bold text-gray-800">Pilih Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-xs text-left">
          <div className="w-7 h-7 rounded-lg bg-[#fff0f3] text-[#fe4c6f] flex items-center justify-center font-bold text-xs shrink-0">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Langkah 4</p>
            <p className="text-xs font-bold text-gray-800">Generate & ZIP</p>
          </div>
        </div>
      </div>
    </section>
  );
};
