'use client';

import { FISH_DATA } from '@/data/fish';
import { SEASONS } from '@/data/seasons';
import { useLanguage, localized } from '@/lib/i18n';

const POPULAR_FISH_IDS = Object.keys(FISH_DATA).slice(0, 12);

function isFishActive(fishId: string, monthIndex: number): boolean {
  const season = SEASONS[monthIndex];
  return season?.fish?.includes(fishId) ?? false;
}

export default function SeasonChart() {
  const { lang } = useLanguage();

  const t = {
    zh: {
      title: '📊 全年鱼种活跃度总览',
      species: '鱼种',
    },
    en: {
      title: '📊 Year-Round Species Activity Overview',
      species: 'Species',
    },
  }[lang];

  return (
    <div className="bg-[#141824] border border-[#2a3040] rounded-xl overflow-hidden">
      <div className="p-4 border-b border-[#2a3040]">
        <h3 className="text-sm font-semibold text-[#e6edf3]">{t.title}</h3>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Month header row */}
          <div className="grid gap-px bg-[#2a3040]" style={{ gridTemplateColumns: '140px repeat(12, 1fr)' }}>
            <div className="bg-[#0d1117] px-3 py-2 text-[10px] text-[#6b7280] font-medium sticky left-0 z-10">
              {t.species}
            </div>
            {SEASONS.map((s, i) => (
              <div key={i} className="bg-[#0d1117] px-1 py-2 text-center">
                <span className="text-xs">{s.emoji}</span>
                <div className="text-[10px] text-[#6b7280]">{localized(s, 'month', lang).slice(0, 3)}</div>
              </div>
            ))}
          </div>

          {/* Fish rows */}
          {POPULAR_FISH_IDS.map((fishId) => {
            const fish = FISH_DATA[fishId];
            if (!fish) return null;
            return (
              <div
                key={fishId}
                className="grid gap-px bg-[#2a3040]"
                style={{ gridTemplateColumns: '140px repeat(12, 1fr)' }}
              >
                <div className="bg-[#141824] px-3 py-1.5 flex items-center gap-1.5 sticky left-0 z-10">
                  <span className="text-xs">{fish.emoji}</span>
                  <span className="text-[11px] text-[#e6edf3] truncate">{localized(fish, 'name', lang)}</span>
                </div>
                {SEASONS.map((_, mi) => {
                  const active = isFishActive(fishId, mi);
                  return (
                    <div
                      key={mi}
                      className="bg-[#141824] flex items-center justify-center py-1.5"
                    >
                      {active ? (
                        <div
                          className="w-full h-full flex items-center justify-center rounded-sm mx-0.5"
                          style={{ backgroundColor: fish.color + '30' }}
                        >
                          <span style={{ color: fish.color }} className="text-[10px]">●</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#2a3040]">·</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
