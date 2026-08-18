import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Sparkles, Layers, ShoppingBag } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa itu Generator Variasi Gambar dan bagaimana cara kerjanya?',
      a: 'Aplikasi ini mengambil 1 gambar utama yang Anda upload, lalu secara otomatis membuat hingga 100 variasi gambar baru dengan menambahkan bingkai (frame/border) warna-warni solid di keempat sisinya. Hasilnya dibundel dalam 1 file ZIP yang bisa langsung diunduh.'
    },
    {
      q: 'Mengapa dropshipper & reseller membutuhkan tool ini?',
      a: 'Marketplace seperti Shopee, TikTok Shop, Tokopedia, dan Lazada memiliki sistem pendeteksi gambar duplikat. Ketika Anda mengunggah produk yang sama berkali-kali atau produk dari supplier umum, border warna-warni dengan variasi acak ini mengubah visual signature dan hash file gambar sehingga terhindar dari penalti spam duplikat.'
    },
    {
      q: 'Apa perbedaan antara Engine 1, Engine 2, dan Engine 3?',
      a: 'Engine 1 (Tetap 10%): Ukuran frame konsisten 10% di setiap foto dengan 4 warna acak. Engine 2 (Acak 5%-20%): Ketebalan frame acak di tiap foto. Engine 3 (Full Random): Ketebalan acak ditambah 4 pola warna cerdas (Multi, Solid, Berpasangan, dan 3-Sama-1-Beda) untuk variasi visual paling kaya.'
    },
    {
      q: 'Apakah gambar saya aman dan disimpan di server?',
      a: 'Sangat aman! Seluruh pemrosesan dilakukan langsung di browser komputer/ponsel Anda (in-memory). Gambar Anda tidak pernah diunggah atau disimpan ke server publik manapun.'
    },
    {
      q: 'Berapa jumlah maksimal gambar yang bisa dibuat dalam satu kali generate?',
      a: 'Anda dapat memilih antara 1 hingga 100 gambar dalam sekali proses. Di layar akan ditampilkan 3 gambar preview teratas, dan file ZIP otomatis berisi seluruh jumlah gambar yang Anda minta.'
    },
    {
      q: 'Format file apa saja yang didukung?',
      a: 'Kami mendukung format JPG, JPEG, PNG, dan WEBP dengan ukuran file hingga 10 MB.'
    }
  ];

  return (
    <section className="mt-12 pt-8 border-t border-gray-200/80 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0f3] text-[#fe4c6f] text-xs font-bold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Bantuan & Informasi</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-1">
          Pelajari lebih lanjut tentang manfaat dan cara memaksimalkan tool variasi gambar ini.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-2xl overflow-hidden transition-all bg-white ${
                isOpen ? 'border-[#fe4c6f]/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm sm:text-base hover:text-[#fe4c6f] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#fe4c6f]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 mt-1">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
