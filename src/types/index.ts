export type EngineType = 'imageku1' | 'imageku2' | 'imageku3';

export interface EngineInfo {
  id: EngineType;
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
  description: string;
  details: string[];
  borderSpec: string;
  colorSpec: string;
  recommendedFor: string;
}

export interface GenerationProgress {
  current: number;
  total: number;
  statusText: string;
  percent: number;
}

export interface GeneratedImage {
  id: number;
  filename: string;
  blob: Blob;
  dataUrl: string;
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

export interface GenerateResult {
  totalGenerated: number;
  previewImages: GeneratedImage[];
  allImages: GeneratedImage[];
  zipBlob: Blob;
  zipFileName: string;
}
