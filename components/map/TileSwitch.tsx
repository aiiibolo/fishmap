'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TileLayerType } from '@/lib/mapConfig';

interface TileSwitchProps {
  current: TileLayerType;
  onChange: (type: TileLayerType) => void;
}

const TILE_OPTIONS: { key: TileLayerType; icon: string; label: string }[] = [
  { key: 'dark', icon: '🌙', label: '暗色' },
  { key: 'standard', icon: '🗺️', label: '标准' },
  { key: 'satellite', icon: '🛰️', label: '卫星' },
];

function TileSwitchContent({ current, onChange }: TileSwitchProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 1000,
        display: 'flex',
        gap: '2px',
        background: '#141824',
        borderRadius: '8px',
        padding: '3px',
        border: '1px solid #2a3040',
        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
      }}
    >
      {TILE_OPTIONS.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            background: current === key ? '#4FC3F7' : 'transparent',
            color: current === key ? '#0d1117' : '#8b949e',
            fontWeight: current === key ? 600 : 400,
            transition: 'all 0.2s',
          }}
        >
          {icon} {label}
        </button>
      ))}
    </div>
  );
}

export default function TileSwitch({ current, onChange }: TileSwitchProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');
    if (mapContainer) {
      setContainer(mapContainer as HTMLElement);
    }
  }, []);

  if (!container) return null;

  return createPortal(
    <TileSwitchContent current={current} onChange={onChange} />,
    container
  );
}
