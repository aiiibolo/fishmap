'use client';

import dynamic from 'next/dynamic';
import { FishingSpot } from '@/data/types';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#141824]">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">🗺️</div>
        <p className="text-[#8b949e] text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

interface FishingMapProps {
  spots: FishingSpot[];
  selectedSpot: FishingSpot | null;
  onSpotClick: (spot: FishingSpot) => void;
}

export default function FishingMap({ spots, selectedSpot, onSpotClick }: FishingMapProps) {
  return <MapContent spots={spots} selectedSpot={selectedSpot} onSpotClick={onSpotClick} />;
}
