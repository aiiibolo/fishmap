import { TypeIcon } from './types';

export const TYPE_ICONS: Record<string, TypeIcon> = {
  wharf: { icon: "🏗️", label: "码头", labelEn: "Wharf", color: "#4A90D9" },
  beach: { icon: "🏖️", label: "海滩", labelEn: "Beach", color: "#F5A623" },
  breakwall: { icon: "🧱", label: "防波堤", labelEn: "Breakwall", color: "#7B8794" },
  rock: { icon: "🪨", label: "岩石平台", labelEn: "Rock Platform", color: "#8B4513" },
  channel: { icon: "🌊", label: "水道/河口", labelEn: "Channel/Estuary", color: "#2E86AB" },
};

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: "⭐ 新手友好",
  2: "⭐⭐ 简单",
  3: "⭐⭐⭐ 中等",
  4: "⭐⭐⭐⭐ 需经验",
};

export const DIFFICULTY_LABELS_EN: Record<number, string> = {
  1: "⭐ Beginner Friendly",
  2: "⭐⭐ Easy",
  3: "⭐⭐⭐ Intermediate",
  4: "⭐⭐⭐⭐ Experienced",
};
