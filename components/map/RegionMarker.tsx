'use client';

import { useMemo } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import type { Region } from '@/data/types';
import { useLanguage } from '@/lib/i18n';

function createRegionIcon(spotCount: number): L.DivIcon {
  const size = 56;
  const hasSpots = spotCount > 0;

  return L.divIcon({
    html: `<div style="
      display:flex;align-items:center;justify-content:center;flex-direction:column;
      width:${size}px;height:${size}px;border-radius:50%;
      background:${hasSpots ? '#4FC3F7' : '#6b7280'}20;
      border:2px solid ${hasSpots ? '#4FC3F7' : '#6b7280'};
      cursor:pointer;
      box-shadow:0 0 20px ${hasSpots ? '#4FC3F7' : '#6b7280'}40;
      transition:all 0.3s;
    ">
      <span style="font-size:22px;">📍</span>
      ${hasSpots ? `<span style="font-size:9px;color:#4FC3F7;margin-top:-2px;">${spotCount}</span>` : ''}
    </div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

interface RegionMarkerProps {
  region: Region;
  onClick: (regionId: string) => void;
}

export default function RegionMarker({ region, onClick }: RegionMarkerProps) {
  const { lang } = useLanguage();
  const icon = useMemo(() => createRegionIcon(region.spots.length), [region.spots.length]);
  const name = lang === 'en' ? region.nameEn : region.name;

  return (
    <Marker
      position={region.center}
      icon={icon}
      eventHandlers={{
        click: () => onClick(region.id),
      }}
    >
      <Tooltip direction="bottom" offset={[0, 20]} permanent className="region-tooltip">
        <span style={{ fontWeight: 600 }}>{name}</span>
        <span style={{ color: '#8b949e', fontSize: '11px', marginLeft: '4px' }}>
          {region.state}
        </span>
        {region.spots.length === 0 && (
          <span style={{ color: '#6b7280', fontSize: '10px', display: 'block' }}>
            {lang === 'zh' ? '即将推出' : 'Coming soon'}
          </span>
        )}
      </Tooltip>
    </Marker>
  );
}
