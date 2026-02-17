'use client';

import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { FishingSpot, SpotType } from '@/data/types';
import { TYPE_ICONS, DIFFICULTY_LABELS } from '@/data/constants';
import SpotPopup from './SpotPopup';

function createSpotIcon(type: SpotType, isSelected: boolean): L.DivIcon {
  const typeInfo = TYPE_ICONS[type];
  const size = isSelected ? 44 : 36;
  const fontSize = isSelected ? 20 : 16;

  return L.divIcon({
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      width:${size}px;height:${size}px;border-radius:50%;
      background:${isSelected ? typeInfo.color : '#1e2433'};
      border:2px solid ${isSelected ? '#fff' : typeInfo.color};
      font-size:${fontSize}px;
      box-shadow:${isSelected ? '0 0 20px ' + typeInfo.color + '60' : '0 2px 8px rgba(0,0,0,0.4)'};
      transition:all 0.3s;cursor:pointer;
    ">${typeInfo.icon}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

interface SpotMarkerProps {
  spot: FishingSpot;
  isSelected: boolean;
  onClick: (spot: FishingSpot) => void;
}

export default function SpotMarker({ spot, isSelected, onClick }: SpotMarkerProps) {
  const icon = useMemo(
    () => createSpotIcon(spot.type, isSelected),
    [spot.type, isSelected]
  );

  return (
    <Marker
      position={[spot.lat, spot.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onClick(spot),
      }}
    >
      <Popup>
        <SpotPopup spot={spot} />
      </Popup>
    </Marker>
  );
}
