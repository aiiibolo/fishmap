'use client';

import type { FishingSpot } from '@/data/types';
import { TYPE_ICONS, DIFFICULTY_LABELS } from '@/data/constants';
import { FISH_DATA } from '@/data/fish';
import { useLanguage, localized } from '@/lib/i18n';

interface SpotPanelProps {
  spot: FishingSpot | null;
  onClose: () => void;
  onFishClick: (fishId: string) => void;
}

const DIFFICULTY_LABELS_EN: Record<number, string> = {
  1: '⭐ Beginner',
  2: '⭐⭐ Easy',
  3: '⭐⭐⭐ Intermediate',
  4: '⭐⭐⭐⭐ Experienced',
};

export default function SpotPanel({ spot, onClose, onFishClick }: SpotPanelProps) {
  const { lang } = useLanguage();

  if (!spot) return null;

  const typeInfo = TYPE_ICONS[spot.type];
  const fishList = spot.fish
    .filter((id) => FISH_DATA[id])
    .map((id) => FISH_DATA[id]);

  const t = {
    zh: {
      intro: '📍 简介',
      tips: '💡 钓鱼建议',
      fishSpecies: '🐟 可钓鱼种',
      size: '📏',
      eating: '🍽️',
    },
    en: {
      intro: '📍 Overview',
      tips: '💡 Fishing Tips',
      fishSpecies: '🐟 Target Species',
      size: '📏',
      eating: '🍽️',
    },
  }[lang];

  const getTypeLabel = (info: typeof TYPE_ICONS[string]) => {
    if (lang === 'en' && info.labelEn) return info.labelEn;
    return info.label;
  };

  const difficultyLabel = lang === 'en'
    ? DIFFICULTY_LABELS_EN[spot.difficulty]
    : DIFFICULTY_LABELS[spot.difficulty];

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black/40 z-[1001] md:hidden"
        onClick={onClose}
      />

      <div
        className={`
          fixed top-0 right-0 z-[1002] h-full overflow-y-auto
          w-full md:w-[380px]
          bg-[#141824] border-l border-[#2a3040]
          shadow-2xl
          animate-slide-in-right
        `}
      >
        {/* Header with gradient */}
        <div
          className="relative p-6 pb-4"
          style={{
            background: `linear-gradient(135deg, ${typeInfo.color}20 0%, transparent 60%)`,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#1e2433] text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#2a3040] transition-all"
          >
            ✕
          </button>

          {/* Type icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
            style={{
              background: typeInfo.color + '25',
              border: `1px solid ${typeInfo.color}40`,
            }}
          >
            {typeInfo.icon}
          </div>

          {/* Spot name */}
          <h2 className="text-[#e6edf3] text-xl font-bold">
            {lang === 'en' ? spot.nameEn : spot.name}
          </h2>
          {lang === 'zh' && (
            <p className="text-[#8b949e] text-sm mt-1">
              {spot.nameEn}
            </p>
          )}

          {/* Badges */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{
                background: typeInfo.color + '20',
                color: typeInfo.color,
              }}
            >
              {typeInfo.icon} {getTypeLabel(typeInfo)}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs bg-[#1e2433] text-[#e6edf3]">
              {difficultyLabel}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-4 border-t border-[#2a3040]">
          <h3 className="text-[#e6edf3] text-sm font-semibold mb-2">{t.intro}</h3>
          <p className="text-[#8b949e] text-sm leading-relaxed">
            {localized(spot, 'description', lang)}
          </p>
        </div>

        {/* Tips */}
        {spot.tips && (
          <div className="px-6 py-4 border-t border-[#2a3040]">
            <h3 className="text-[#e6edf3] text-sm font-semibold mb-2">
              {t.tips}
            </h3>
            <div className="rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/25 p-3">
              <p className="text-[#f59e0b] text-sm leading-relaxed">
                {localized(spot, 'tips', lang)}
              </p>
            </div>
          </div>
        )}

        {/* Fish species */}
        <div className="px-6 py-4 border-t border-[#2a3040]">
          <h3 className="text-[#e6edf3] text-sm font-semibold mb-3">
            {t.fishSpecies} ({fishList.length})
          </h3>
          <div className="flex flex-col gap-2">
            {fishList.map((fish) => {
              if (!fish) return null;
              return (
                <button
                  key={fish.id}
                  onClick={() => onFishClick(fish.id)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1e2433] hover:bg-[#252d3d] border border-[#2a3040] hover:border-[#3a4050] transition-all text-left group"
                >
                  <span className="text-2xl shrink-0">{fish.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#e6edf3] text-sm font-medium truncate">
                      {lang === 'en' ? fish.nameEn : fish.name}
                    </div>
                    {lang === 'zh' && (
                      <div className="text-[#6b7280] text-xs truncate">
                        {fish.nameEn}
                      </div>
                    )}
                    <div className="flex gap-3 mt-1">
                      <span className="text-[#8b949e] text-xs">
                        {t.size} {localized(fish, 'size', lang)}
                      </span>
                      <span className="text-[#8b949e] text-xs">
                        {t.eating} {localized(fish, 'eating', lang)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[#6b7280] text-sm group-hover:text-[#4FC3F7] transition-colors">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-8" />
      </div>
    </>
  );
}
