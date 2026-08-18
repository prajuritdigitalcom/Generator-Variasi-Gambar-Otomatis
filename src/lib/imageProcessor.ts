import JSZip from 'jszip';
import { EngineType, GeneratedImage, GenerateResult, GenerationProgress } from '../types';

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random RGB color
 */
function getRandomRGB(): { r: number; g: number; b: number; css: string } {
  const r = randomInt(0, 255);
  const g = randomInt(0, 255);
  const b = randomInt(0, 255);
  return {
    r,
    g,
    b,
    css: `rgb(${r}, ${g}, ${b})`
  };
}

/**
 * Generate random float between min and max
 */
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export interface BorderConfig {
  borderPercent: number;
  borderPx: number;
  mode?: string;
  colors: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
}

/**
 * Calculate border properties based on selected engine
 */
export function calculateBorderConfig(
  imgWidth: number,
  imgHeight: number,
  engine: EngineType
): BorderConfig {
  const minSide = Math.min(imgWidth, imgHeight);

  if (engine === 'imageku1') {
    // Engine 1: Fixed 10%
    const borderPercent = 0.10;
    const borderPx = Math.max(1, Math.round(minSide * borderPercent));
    return {
      borderPercent,
      borderPx,
      colors: {
        top: getRandomRGB().css,
        bottom: getRandomRGB().css,
        left: getRandomRGB().css,
        right: getRandomRGB().css
      }
    };
  }

  if (engine === 'imageku2') {
    // Engine 2: Random 5% to 20%
    const borderPercent = randomFloat(0.05, 0.20);
    const borderPx = Math.max(1, Math.round(minSide * borderPercent));
    return {
      borderPercent,
      borderPx,
      colors: {
        top: getRandomRGB().css,
        bottom: getRandomRGB().css,
        left: getRandomRGB().css,
        right: getRandomRGB().css
      }
    };
  }

  // Engine 3: Full Random (Random 5%-20% + 4 Color Modes)
  const borderPercent = randomFloat(0.05, 0.20);
  const borderPx = Math.max(1, Math.round(minSide * borderPercent));

  const modes = ['multi', 'single', 'paired', 'three-same-one-different'] as const;
  const mode = modes[Math.floor(Math.random() * modes.length)];

  let colors: { top: string; bottom: string; left: string; right: string };

  if (mode === 'multi') {
    colors = {
      top: getRandomRGB().css,
      bottom: getRandomRGB().css,
      left: getRandomRGB().css,
      right: getRandomRGB().css
    };
  } else if (mode === 'single') {
    const singleColor = getRandomRGB().css;
    colors = {
      top: singleColor,
      bottom: singleColor,
      left: singleColor,
      right: singleColor
    };
  } else if (mode === 'paired') {
    const c1 = getRandomRGB().css;
    const c2 = getRandomRGB().css;
    const pairingOption = randomInt(1, 3);

    if (pairingOption === 1) {
      colors = { top: c1, bottom: c1, left: c2, right: c2 };
    } else if (pairingOption === 2) {
      colors = { top: c1, left: c1, bottom: c2, right: c2 };
    } else {
      colors = { top: c1, right: c1, bottom: c2, left: c2 };
    }
  } else {
    // mode === 'three-same-one-different'
    const c1 = getRandomRGB().css;
    const c2 = getRandomRGB().css;
    const sides = ['top', 'bottom', 'left', 'right'] as const;
    const diffSide = sides[Math.floor(Math.random() * sides.length)];

    colors = {
      top: c1,
      bottom: c1,
      left: c1,
      right: c1
    };
    colors[diffSide] = c2;
  }

  return {
    borderPercent,
    borderPx,
    mode,
    colors
  };
}

/**
 * Render framed image onto a Canvas following Python PIL's exact drawing coordinates
 */
export function drawFramedImage(
  img: HTMLImageElement | ImageBitmap,
  config: BorderConfig
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const origW = img.width;
  const origH = img.height;
  const { borderPx, colors } = config;

  const newW = origW + borderPx * 2;
  const newH = origH + borderPx * 2;

  const canvas = document.createElement('canvas');
  canvas.width = newW;
  canvas.height = newH;
  const ctx = canvas.getContext('2d', { willReadFrequently: false });

  if (!ctx) {
    throw new Error('Canvas 2D context tidak didukung pada browser ini.');
  }

  // 1. Draw solid background to match original size expansion
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, newW, newH);

  // 2. Draw original image in center (borderPx offset)
  ctx.drawImage(img, borderPx, borderPx, origW, origH);

  // 3. Draw 4 border rectangles exactly like Python Pillow:
  // Top: [0, 0, width, border_size]
  ctx.fillStyle = colors.top;
  ctx.fillRect(0, 0, newW, borderPx);

  // Bottom: [0, height - border_size, width, height]
  ctx.fillStyle = colors.bottom;
  ctx.fillRect(0, newH - borderPx, newW, borderPx);

  // Left: [0, 0, border_size, height]
  ctx.fillStyle = colors.left;
  ctx.fillRect(0, 0, borderPx, newH);

  // Right: [width - border_size, 0, width, height]
  ctx.fillStyle = colors.right;
  ctx.fillRect(newW - borderPx, 0, borderPx, newH);

  return { canvas, ctx };
}

/**
 * Convert canvas to JPEG blob
 */
function canvasToBlob(canvas: HTMLCanvasElement, quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Gagal mengonversi canvas ke Blob.'));
        }
      },
      'image/jpeg',
      quality
    );
  });
}

/**
 * Load HTMLImageElement from File or URL
 */
export function loadImage(src: string | File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    let objectUrl = '';
    if (typeof src === 'string') {
      img.src = src;
    } else {
      objectUrl = URL.createObjectURL(src);
      img.src = objectUrl;
    }

    img.onload = () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      resolve(img);
    };

    img.onerror = (err) => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      reject(new Error('Gagal memuat gambar. Pastikan format file valid.'));
    };
  });
}

/**
 * Main Generator Function
 * Generates N variations, creates previews and packages into a ZIP
 */
export async function generateVariations(
  imageSource: HTMLImageElement | File,
  engine: EngineType,
  count: number,
  onProgress?: (progress: GenerationProgress) => void
): Promise<GenerateResult> {
  if (count < 1 || count > 100) {
    throw new Error('Jumlah gambar harus di antara 1 dan 100.');
  }

  // Load image if File is passed
  let imgElement: HTMLImageElement;
  if (imageSource instanceof File) {
    onProgress?.({
      current: 0,
      total: count,
      statusText: 'Membaca gambar asli...',
      percent: 5
    });
    imgElement = await loadImage(imageSource);
  } else {
    imgElement = imageSource;
  }

  const generatedImages: GeneratedImage[] = [];
  const zip = new JSZip();
  const timestamp = Math.floor(Date.now() / 1000);
  const zipFileName = `variasi-gambar-${timestamp}.zip`;

  // Process images sequentially to allow smooth UI progress updates & avoid memory spiking
  for (let i = 0; i < count; i++) {
    const progressPercent = Math.round(10 + ((i + 1) / count) * 75);
    onProgress?.({
      current: i + 1,
      total: count,
      statusText: `Robot sedang bekerja (${i + 1}/${count})...`,
      percent: progressPercent
    });

    const borderConfig = calculateBorderConfig(imgElement.width, imgElement.height, engine);
    const { canvas } = drawFramedImage(imgElement, borderConfig);

    const blob = await canvasToBlob(canvas);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
    const filename = `framed_image_${i + 1}.jpg`;

    // Add to ZIP
    zip.file(filename, blob);

    generatedImages.push({
      id: i + 1,
      filename,
      blob,
      dataUrl,
      borderPercent: borderConfig.borderPercent,
      borderPx: borderConfig.borderPx,
      mode: borderConfig.mode,
      colors: borderConfig.colors
    });

    // Small yield to allow UI repaint
    await new Promise((r) => setTimeout(r, 16));
  }

  onProgress?.({
    current: count,
    total: count,
    statusText: 'Menyusun file ZIP...',
    percent: 95
  });

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  onProgress?.({
    current: count,
    total: count,
    statusText: 'Proses selesai!',
    percent: 100
  });

  return {
    totalGenerated: count,
    previewImages: generatedImages.slice(0, 3),
    allImages: generatedImages,
    zipBlob,
    zipFileName
  };
}

/**
 * Trigger browser download of a Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
