export type SpotType = 'wharf' | 'beach' | 'breakwall' | 'rock' | 'channel';

export interface FishSpecies {
  id: string;
  name: string;
  nameEn: string;
  scientific: string;
  size: string;
  season: string;
  eating: string;
  emoji: string;
  color: string;
  minSize: number | string;
  bagLimit: number;
  habitat: string;
  diet: string;
  bestBait: string;
  technique: string;
  description: string;
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
  fish: string[];
  tips: string;
}

export interface MonthData {
  month: string;
  emoji: string;
  temp: string;
  fish: string[];
}

export interface TypeIcon {
  icon: string;
  label: string;
  color: string;
}
