'use client';

import { useEffect, useRef } from 'react';
import { useRegion } from '@/lib/region';
import { findNearestRegion } from '@/data/regions';

const STORAGE_KEY = 'fishmap-region';

/**
 * Auto-detect nearest region via browser geolocation on first visit.
 * Only runs when no region has been saved to localStorage.
 */
export function useGeolocation() {
  const { setRegion } = useRegion();
  const setRegionRef = useRef(setRegion);
  setRegionRef.current = setRegion;

  useEffect(() => {
    // Skip if a region is already saved
    if (localStorage.getItem(STORAGE_KEY)) return;

    if (!navigator.geolocation) return;

    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;
        const { latitude, longitude } = position.coords;
        const nearest = findNearestRegion(latitude, longitude);
        setRegionRef.current(nearest.id);
      },
      () => {
        // User denied or error — stay in overview mode
      },
      { timeout: 10000, maximumAge: 300000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);
}
