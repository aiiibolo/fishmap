'use client';

import type { FishingSpot } from '@/data/types';
import { TYPE_ICONS, DIFFICULTY_LABELS } from '@/data/constants';
import { useLanguage } from '@/lib/i18n';

const DIFFICULTY_LABELS_EN: Record<number, string> = {
  1: '⭐ Beginner',
  2: '⭐⭐ Easy',
  3: '⭐⭐⭐ Intermediate',
  4: '⭐⭐⭐⭐ Experienced',
};

interface SpotPopupProps {
  spot: FishingSpot;
}

export default function SpotPopup({ spot }: SpotPopupProps) {
  const { lang } = useLanguage();
  const typeInfo = TYPE_ICONS[spot.type];

  const getTypeLabel = (info: typeof TYPE_ICONS[string]) => {
    if (lang === 'en' && info.labelEn) return info.labelEn;
    return info.label;
  };

  const difficultyLabel = lang === 'en'
    ? DIFFICULTY_LABELS_EN[spot.difficulty]
    : DIFFICULTY_LABELS[spot.difficulty];

  const t = {
    zh: {
      fishSpecies: '可钓鱼种',
      fishUnit: '种',
      clickDetail: '点击查看详情 →',
    },
    en: {
      fishSpecies: 'Target species',
      fishUnit: '',
      clickDetail: 'Click for details →',
    },
  }[lang];

  return (
    <div style={{
      background: '#1e2433',
      color: '#e6edf3',
      padding: '12px',
      borderRadius: '8px',
      minWidth: '200px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
        {lang === 'en' ? spot.nameEn : spot.name}
      </div>
      {lang === 'zh' && (
        <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>
          {spot.nameEn}
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{
          background: typeInfo.color + '20',
          color: typeInfo.color,
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
        }}>
          {typeInfo.icon} {getTypeLabel(typeInfo)}
        </span>
        <span style={{ fontSize: '12px' }}>
          {difficultyLabel}
        </span>
      </div>
      <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px' }}>
        🐟 {t.fishSpecies}: {spot.fish.length}{t.fishUnit ? ` ${t.fishUnit}` : ''}
      </div>
      <div style={{ fontSize: '11px', color: '#4FC3F7', cursor: 'pointer' }}>
        {t.clickDetail}
      </div>
    </div>
  );
}
