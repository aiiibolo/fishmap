import type { Region } from '../types';
import { NEWCASTLE } from './newcastle';
import { SYDNEY } from './sydney';
import { MELBOURNE } from './melbourne';
import { BRISBANE } from './brisbane';

export { NEWCASTLE, SYDNEY, MELBOURNE, BRISBANE };

export const REGIONS: Region[] = [NEWCASTLE, SYDNEY, MELBOURNE, BRISBANE];

export function getRegion(id: string): Region | undefined {
  return REGIONS.find((r) => r.id === id);
}

/** Find the nearest region to a given latitude/longitude using Haversine distance. */
export function findNearestRegion(lat: number, lng: number): Region {
  let nearest = REGIONS[0];
  let minDist = Infinity;

  for (const region of REGIONS) {
    const dLat = region.center[0] - lat;
    const dLng = region.center[1] - lng;
    // Simplified squared-distance (sufficient for nearest comparison at this scale)
    const dist = dLat * dLat + dLng * dLng;
    if (dist < minDist) {
      minDist = dist;
      nearest = region;
    }
  }

  return nearest;
}
