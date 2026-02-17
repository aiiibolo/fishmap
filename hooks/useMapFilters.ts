'use client';

import { useState, useMemo } from 'react';
import { FishingSpot } from '@/data/types';

export function useMapFilters(spots: FishingSpot[]) {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<number>(0);

  const filteredSpots = useMemo(() => {
    return spots.filter((s) => {
      if (filterType !== 'all' && s.type !== filterType) return false;
      if (filterDifficulty > 0 && s.difficulty > filterDifficulty) return false;
      return true;
    });
  }, [spots, filterType, filterDifficulty]);

  return {
    filterType,
    setFilterType,
    filterDifficulty,
    setFilterDifficulty,
    filteredSpots,
  };
}
