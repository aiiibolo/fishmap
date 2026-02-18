'use client';

import { useState, useRef, useEffect } from 'react';
import { useRegion } from '@/lib/region';
import { useLanguage } from '@/lib/i18n';
import { findNearestRegion } from '@/data/regions';

export default function RegionSelector() {
  const { region, regions, setRegion, clearRegion } = useRegion();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const t = {
    zh: {
      selectRegion: '选择地区',
      allRegions: '全部地区',
      locate: '定位',
      comingSoon: '即将推出',
    },
    en: {
      selectRegion: 'Select Region',
      allRegions: 'All Regions',
      locate: 'Locate',
      comingSoon: 'Coming soon',
    },
  }[lang];

  const buttonLabel = region
    ? (lang === 'en' ? region.nameEn : region.name)
    : t.selectRegion;

  function handleLocate() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestRegion(pos.coords.latitude, pos.coords.longitude);
        setRegion(nearest.id);
        setOpen(false);
      },
      () => {},
      { timeout: 8000 }
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
          region
            ? 'bg-[#81C784]/15 text-[#81C784] border border-[#81C784]/30'
            : 'bg-[#141824] text-[#8b949e] border border-[#2a3040] hover:text-[#e6edf3] hover:border-[#4FC3F7]/30'
        }`}
      >
        <span>{region ? '📍' : '🌏'}</span>
        <span className="hidden sm:inline">{buttonLabel}</span>
        <span className={`text-[8px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 bg-[#141824] border border-[#2a3040] rounded-lg shadow-xl z-[9000] overflow-hidden animate-fadeIn">
          {/* All regions option */}
          <button
            onClick={() => { clearRegion(); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-xs flex items-center gap-2 transition-colors cursor-pointer ${
              !region
                ? 'bg-[#4FC3F7]/10 text-[#4FC3F7]'
                : 'text-[#8b949e] hover:bg-[#1e2433] hover:text-[#e6edf3]'
            }`}
          >
            🌏 {t.allRegions}
          </button>

          <div className="border-t border-[#2a3040]" />

          {/* Region list */}
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => { setRegion(r.id); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                region?.id === r.id
                  ? 'bg-[#81C784]/10 text-[#81C784]'
                  : 'text-[#8b949e] hover:bg-[#1e2433] hover:text-[#e6edf3]'
              }`}
            >
              <span>
                📍 {lang === 'en' ? r.nameEn : r.name}
                <span className="text-[#6b7280] ml-1.5">{r.state}</span>
              </span>
              {r.spots.length === 0 && (
                <span className="text-[10px] text-[#6b7280] bg-[#6b7280]/10 px-1.5 py-0.5 rounded">
                  {t.comingSoon}
                </span>
              )}
            </button>
          ))}

          <div className="border-t border-[#2a3040]" />

          {/* Locate button */}
          <button
            onClick={handleLocate}
            className="w-full text-left px-4 py-2.5 text-xs text-[#4FC3F7] hover:bg-[#1e2433] transition-colors cursor-pointer flex items-center gap-2"
          >
            📍 {t.locate}
          </button>
        </div>
      )}
    </div>
  );
}
