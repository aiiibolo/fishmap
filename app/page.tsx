'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import FishingMap from '@/components/map/FishingMap';
import MapFilters from '@/components/map/MapFilters';
import SpotPanel from '@/components/map/SpotPanel';
import FishGuide from '@/components/fish/FishGuide';
import FishModal from '@/components/fish/FishModal';
import SeasonGuide from '@/components/season/SeasonGuide';
import RegulationsTab from '@/components/info/RegulationsTab';
import { useMapFilters } from '@/hooks/useMapFilters';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useRegion } from '@/lib/region';
import { FISH_DATA } from '@/data/fish';
import { FishingSpot } from '@/data/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(null);
  const [selectedFish, setSelectedFish] = useState<string | null>(null);

  const { region, regions, setRegion, clearRegion } = useRegion();
  useGeolocation();

  const spots = region?.spots ?? [];
  const { filterType, setFilterType, filterDifficulty, setFilterDifficulty, filteredSpots } = useMapFilters(spots);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedSpot(null);
        }}
      />

      <main className="flex-1 relative overflow-hidden z-0">
        {/* Map Tab */}
        {activeTab === 'map' && (
          <div className="flex h-full">
            <MapFilters
              filterType={filterType}
              setFilterType={setFilterType}
              filterDifficulty={filterDifficulty}
              setFilterDifficulty={setFilterDifficulty}
              filteredCount={filteredSpots.length}
              totalCount={spots.length}
              hasRegion={!!region}
              onBackToOverview={clearRegion}
            />
            <div className="flex-1 relative">
              <FishingMap
                spots={filteredSpots}
                selectedSpot={selectedSpot}
                onSpotClick={setSelectedSpot}
                region={region}
                regions={regions}
                onRegionClick={setRegion}
              />
            </div>
          </div>
        )}

        {/* Fish Guide Tab */}
        {activeTab === 'fish' && (
          <div className="h-full overflow-auto">
            <FishGuide onFishClick={setSelectedFish} />
          </div>
        )}

        {/* Season Guide Tab */}
        {activeTab === 'season' && (
          <div className="h-full overflow-auto">
            <SeasonGuide onFishClick={setSelectedFish} />
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="h-full overflow-auto">
            <RegulationsTab />
          </div>
        )}
      </main>

      {/* Spot Panel (outside main so z-index works above header) */}
      {activeTab === 'map' && (
        <SpotPanel
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
          onFishClick={setSelectedFish}
        />
      )}

      {/* Fish Modal (global) */}
      {selectedFish && FISH_DATA[selectedFish] && (
        <FishModal
          fishId={selectedFish}
          fish={FISH_DATA[selectedFish]}
          onClose={() => setSelectedFish(null)}
        />
      )}
    </div>
  );
}
