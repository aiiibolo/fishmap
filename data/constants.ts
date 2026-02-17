import { TypeIcon } from './types';

export const TYPE_ICONS: Record<string, TypeIcon> = {
  wharf: { icon: "🏗️", label: "码头", color: "#4A90D9" },
  beach: { icon: "🏖️", label: "海滩", color: "#F5A623" },
  breakwall: { icon: "🧱", label: "防波堤", color: "#7B8794" },
  rock: { icon: "🪨", label: "岩石平台", color: "#8B4513" },
  channel: { icon: "🌊", label: "水道/河口", color: "#2E86AB" },
};

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: "⭐ 新手友好",
  2: "⭐⭐ 简单",
  3: "⭐⭐⭐ 中等",
  4: "⭐⭐⭐⭐ 需经验",
};
