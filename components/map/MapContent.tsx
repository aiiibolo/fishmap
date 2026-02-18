'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AUSTRALIA_CENTER, AUSTRALIA_ZOOM, TILE_LAYERS } from '@/lib/mapConfig';
import type { TileLayerType } from '@/lib/mapConfig';
import type { FishingSpot, Region } from '@/data/types';
import SpotMarker from './SpotMarker';
import RegionMarker from './RegionMarker';
import TileSwitch from './TileSwitch';

/** Animates the map to a new center/zoom when they change. */
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

interface MapContentProps {
  spots: FishingSpot[];
  selectedSpot: FishingSpot | null;
  onSpotClick: (spot: FishingSpot) => void;
  region: Region | null;
  regions: Region[];
  onRegionClick: (regionId: string) => void;
}

export default function MapContent({
  spots,
  selectedSpot,
  onSpotClick,
  region,
  regions,
  onRegionClick,
}: MapContentProps) {
  const [tileType, setTileType] = useState<TileLayerType>('dark');

  const currentTile = TILE_LAYERS[tileType];
  const center = region ? region.center : AUSTRALIA_CENTER;
  const zoom = region ? region.zoom : AUSTRALIA_ZOOM;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      className="h-full w-full"
      style={{ background: '#0d1117' }}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        key={tileType}
        url={currentTile.url}
        attribution={currentTile.attribution}
      />
      <ZoomControl position="bottomright" />
      <TileSwitch current={tileType} onChange={setTileType} />

      {/* Overview mode: show region markers */}
      {!region &&
        regions.map((r) => (
          <RegionMarker key={r.id} region={r} onClick={onRegionClick} />
        ))}

      {/* Region mode: show spot markers */}
      {region &&
        spots.map((spot) => (
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
