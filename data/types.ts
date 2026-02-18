export type SpotType = 'wharf' | 'beach' | 'breakwall' | 'rock' | 'channel';

export interface FishSpecies {
  id: string;
  name: string;
  nameEn: string;
  scientific: string;
  size: string;
  sizeEn?: string;
  season: string;
  seasonEn?: string;
  eating: string;
  eatingEn?: string;
  emoji: string;
  color: string;
  minSize: number | string;
  minSizeEn?: string;
  bagLimit: number;
  habitat: string;
  habitatEn?: string;
  diet: string;
  dietEn?: string;
  bestBait: string;
  bestBaitEn?: string;
  technique: string;
  techniqueEn?: string;
  description: string;
  descriptionEn?: string;
  img: string;
}

export interface FishingSpot {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  type: SpotType;
  difficulty: 1 | 2 | 3 | 4;
  description: string;
  descriptionEn?: string;
  fish: string[];
  tips: string;
  tipsEn?: string;
}

export interface MonthData {
  month: string;
  monthEn?: string;
  emoji: string;
  temp: string;
  fish: string[];
}

export interface TypeIcon {
  icon: string;
  label: string;
  labelEn?: string;
  color: string;
}

export interface Region {
  id: string;
  name: string;
  nameEn: string;
  state: string;
  center: [number, number];
  zoom: number;
  spots: FishingSpot[];
  seasons: MonthData[];
}
