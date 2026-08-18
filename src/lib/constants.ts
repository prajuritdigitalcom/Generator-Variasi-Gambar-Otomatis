import { EngineInfo } from '../types';

export const PRIMARY_COLOR = '#fe4c6f';
export const PRIMARY_HOVER = '#e63958';
export const PRIMARY_BG = '#fff0f3';
export const BRAND_LOGO_URL = 'https://i.ibb.co.com/wr0x733r/prajurit-digital.jpg';

export const ENGINES: EngineInfo[] = [
  {
    id: 'imageku1',
    name: 'Engine 1 — Frame Ukuran Tetap',
    shortName: 'Frame Tetap 10%',
    badge: 'Konsisten',
    tagline: 'Ukuran frame konsisten di setiap gambar (10%).',
    description: 'Menghasilkan frame dengan ketebalan border seragam 10% dari sisi terpendek gambar, dengan kombinasi 4 warna acak di setiap sisi.',
    details: [
      'Ketebalan frame: Tetap 10%',
      'Warna: 4 warna acak berbeda (Atas, Bawah, Kiri, Kanan)',
      'Cocok untuk kebutuhan marketplace yang butuh keseragaman ukuran'
    ],
    borderSpec: 'Tetap 10%',
    colorSpec: '4 Warna Acak',
    recommendedFor: 'Katalog Produk & Shopee/TikTok Shop'
  },
  {
    id: 'imageku2',
    name: 'Engine 2 — Frame Ukuran Acak',
    shortName: 'Frame Acak 5%–20%',
    badge: 'Dinamis',
    tagline: 'Ukuran frame bervariasi secara acak (5%–20%) di tiap gambar.',
    description: 'Setiap gambar yang dihasilkan memiliki ketebalan frame yang berbeda-beda secara dinamis antara 5% hingga 20%, dengan 4 warna acak.',
    details: [
      'Ketebalan frame: Acak 5% s/d 20% per gambar',
      'Warna: 4 warna acak berbeda di tiap sisi',
      'Memberikan variasi ketebalan border natural untuk menghindari duplikasi'
    ],
    borderSpec: 'Acak 5% – 20%',
    colorSpec: '4 Warna Acak',
    recommendedFor: 'A/B Testing Iklan & Anti Duplikat'
  },
  {
    id: 'imageku3',
    name: 'Engine 3 — Full Random (Maksimal)',
    shortName: 'Full Random Mode',
    badge: 'Paling Variatif',
    tagline: 'Ukuran dan pola warna frame sepenuhnya acak — hasil paling bervariasi.',
    description: 'Kombinasi ketebalan acak (5%–20%) dengan 4 mode pewarnaan cerdas: Multi-color, Single Solid, Paired (2 warna berpasangan), dan 3-Sama 1-Beda.',
    details: [
      'Ketebalan frame: Acak 5% s/d 20% per gambar',
      'Pola Warna: 4 Mode (Multi, Single, Paired, 3-Sama-1-Beda)',
      'Variasi visual paling kaya dan unik untuk skala besar'
    ],
    borderSpec: 'Acak 5% – 20%',
    colorSpec: '4 Mode Acak Cerdas',
    recommendedFor: 'Konten Kreator, Marketer & Scale-Up'
  }
];

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MIN_OUTPUT_COUNT = 1;
export const MAX_OUTPUT_COUNT = 100;
export const DEFAULT_OUTPUT_COUNT = 5;
