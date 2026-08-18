import React from 'react';
import { BRAND_LOGO_URL } from '../lib/constants';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  onOpenFaq?: () => void;
  onOpenDocs?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFaq, onOpenDocs }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-rose-200 group-hover:scale-105 transition-transform">
              <img
                src={BRAND_LOGO_URL}
                alt="Prajurit Digital Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if external image fails to load
                  (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="%23fe4c6f"><rect width="24" height="24" rx="6" fill="%23fe4c6f"/><path d="M7 12l3 3 7-7" stroke="white" stroke-width="2" fill="none"/></svg>';
                }}
              />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe4c6f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fe4c6f]"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900">
                Prajurit <span className="text-[#fe4c6f]">Digital</span>
              </h1>
              <span className="hidden xs:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#fff0f3] text-[#fe4c6f] border border-[#fe4c6f]/20">
                v1.0 Pro
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">
              Generator Variasi Frame Gambar Otomatis
            </p>
          </div>
        </div>

        {/* Right side shortcuts */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Client-Side Privacy
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Zap className="w-3.5 h-3.5" />
              Maks 100 Output / Batch
            </span>
          </div>

          {onOpenFaq && (
            <button
              onClick={onOpenFaq}
              className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#fe4c6f] px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            >
              Panduan & FAQ
            </button>
          )}

          {onOpenDocs && (
            <button
              onClick={onOpenDocs}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold bg-[#fe4c6f] text-white hover:bg-[#e63958] px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Info Engine</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
