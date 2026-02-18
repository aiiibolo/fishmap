'use client';

import { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode } from 'react';
import type { Region } from '@/data/types';
import { REGIONS, getRegion } from '@/data/regions';

interface RegionContextType {
  region: Region | null;
  regions: Region[];
  setRegion: (id: string) => void;
  clearRegion: () => void;
}

const RegionContext = createContext<RegionContextType>({
  region: null,
  regions: REGIONS,
  setRegion: () => {},
  clearRegion: () => {},
});

const STORAGE_KEY = 'fishmap-region';

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = getRegion(saved) ?? null;
        if (found) setRegionState(found);
      }
    } catch { /* ignore */ }
  }, []);

  const setRegion = useCallback((id: string) => {
    const found = getRegion(id);
    if (found) {
      setRegionState(found);
      localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  const clearRegion = useCallback(() => {
    setRegionState(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ region, regions: REGIONS, setRegion, clearRegion }),
    [region, setRegion, clearRegion]
  );

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
