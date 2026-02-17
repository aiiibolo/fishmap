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
import { SPOTS } from '@/data/spots';
import { FISH_DATA } from '@/data/fish';
import { FishingSpot } from '@/data/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(null);
  const [selectedFish, setSelectedFish] = useState<string | null>(null);
  const { filterType, setFilterType, filterDifficulty, setFilterDifficulty, filteredSpots } = useMapFilters(SPOTS);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedSpot(null);
        }}
      />

      <main className="flex-1 relative overflow-hidden">
        {/* Map Tab */}
        {activeTab === 'map' && (
          <div className="flex h-full">
            <MapFilters
              filterType={filterType}
              setFilterType={setFilterType}
              filterDifficulty={filterDifficulty}
              setFilterDifficulty={setFilterDifficulty}
              filteredCount={filteredSpots.length}
              totalCount={SPOTS.length}
            />
            <div className="flex-1 relative">
              <FishingMap
                spots={filteredSpots}
                selectedSpot={selectedSpot}
                onSpotClick={setSelectedSpot}
              />
              <SpotPanel
                spot={selectedSpot}
                onClose={() => setSelectedSpot(null)}
                onFishClick={setSelectedFish}
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
