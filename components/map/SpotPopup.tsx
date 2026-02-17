import type { FishingSpot } from '@/data/types';
import { TYPE_ICONS, DIFFICULTY_LABELS } from '@/data/constants';

interface SpotPopupProps {
  spot: FishingSpot;
}

export default function SpotPopup({ spot }: SpotPopupProps) {
  const typeInfo = TYPE_ICONS[spot.type];

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
        {spot.name}
      </div>
      <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>
        {spot.nameEn}
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{
          background: typeInfo.color + '20',
          color: typeInfo.color,
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
        }}>
          {typeInfo.icon} {typeInfo.label}
        </span>
        <span style={{ fontSize: '12px' }}>
          {DIFFICULTY_LABELS[spot.difficulty]}
        </span>
      </div>
      <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px' }}>
        🐟 可钓鱼种: {spot.fish.length} 种
      </div>
      <div style={{ fontSize: '11px', color: '#4FC3F7', cursor: 'pointer' }}>
        点击查看详情 →
      </div>
    </div>
  );
}
