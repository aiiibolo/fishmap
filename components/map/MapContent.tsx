'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CENTER, MAP_DEFAULT_ZOOM, TILE_LAYERS } from '@/lib/mapConfig';
import type { TileLayerType } from '@/lib/mapConfig';
import type { FishingSpot } from '@/data/types';
import SpotMarker from './SpotMarker';
import TileSwitch from './TileSwitch';

interface MapContentProps {
  spots: FishingSpot[];
  selectedSpot: FishingSpot | null;
  onSpotClick: (spot: FishingSpot) => void;
}

export default function MapContent({ spots, selectedSpot, onSpotClick }: MapContentProps) {
  const [tileType, setTileType] = useState<TileLayerType>('dark');

  const currentTile = TILE_LAYERS[tileType];

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_DEFAULT_ZOOM}
      zoomControl={false}
      className="h-full w-full"
      style={{ background: '#0d1117' }}
    >
      <TileLayer
        key={tileType}
        url={currentTile.url}
        attribution={currentTile.attribution}
      />
      <ZoomControl position="bottomright" />
      <TileSwitch current={tileType} onChange={setTileType} />
      {spots.map((spot) => (
        <SpotMarker
          key={spot.id}
          spot={spot}
          isSelected={selectedSpot?.id === spot.id}
          onClick={onSpotClick}
        />
      ))}
    </MapContainer>
  );
}
