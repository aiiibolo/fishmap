'use client';

import { useState } from 'react';
import { FISH_DATA } from '@/data/fish';
import { useLanguage, localized } from '@/lib/i18n';
import { useRegion } from '@/lib/region';
import MonthSelector from './MonthSelector';
import SeasonChart from './SeasonChart';

interface SeasonGuideProps {
  onFishClick: (fishId: string) => void;
}

const BADGE_STYLES = ['text-[#f59e0b] bg-[#f59e0b]/10', 'text-[#8b949e] bg-[#8b949e]/10', 'text-[#cd7f32] bg-[#cd7f32]/10'];
const BADGE_LABELS = ['🥇', '🥈', '🥉'];

export default function SeasonGuide({ onFishClick }: SeasonGuideProps) {
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth());
  const { lang } = useLanguage();
  const { region } = useRegion();

  const t = {
    zh: {
      title: '四季钓鱼指南',
      subtitle: '根据月份查看最佳目标鱼种和推荐钓法',
      waterTemp: '水温',
      bestTarget: '🏆 本月最佳目标鱼种',
      noData: '本月暂无推荐鱼种数据',
      selectRegionTitle: '请先选择地区',
      selectRegionText: '季节数据因地区而异。请使用顶部的地区选择器选择一个地区，以查看当地的季节钓鱼指南。',
    },
    en: {
      title: 'Seasonal Fishing Guide',
      subtitle: 'Find the best target species and techniques by month',
      waterTemp: 'Water Temp',
      bestTarget: '🏆 Best Target Species This Month',
      noData: 'No recommended species data for this month',
      selectRegionTitle: 'Select a Region First',
      selectRegionText: 'Seasonal data varies by region. Please use the region selector at the top to choose a region and view the local seasonal fishing guide.',
    },
  }[lang];

  // No region selected — prompt user
  if (!region) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#4FC3F7] to-[#81C784] bg-clip-text text-transparent mb-2">
            {t.title}
          </h2>
          <p className="text-sm text-[#8b949e]">{t.subtitle}</p>
        </div>
        <div className="bg-[#141824] border border-[#2a3040] rounded-xl p-8 text-center">
          <span className="text-4xl block mb-3">🌏</span>
          <h3 className="text-lg font-serif font-bold text-[#e6edf3] mb-2">{t.selectRegionTitle}</h3>
          <p className="text-sm text-[#8b949e] max-w-md mx-auto">{t.selectRegionText}</p>
        </div>
      </div>
    );
  }

  const seasons = region.seasons;
  const season = seasons[selectedMonth];
  const monthFish = season?.fish ?? [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#4FC3F7] to-[#81C784] bg-clip-text text-transparent mb-2">
          {t.title}
        </h2>
        <p className="text-sm text-[#8b949e]">
          {t.subtitle}
        </p>
      </div>

      <MonthSelector
        selectedMonth={selectedMonth}
        onSelect={setSelectedMonth}
        seasons={seasons}
      />

      {/* Selected month info */}
      {season && (
        <div className="mt-6 bg-[#141824] border border-[#2a3040] rounded-xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{season.emoji}</span>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#e6edf3]">{localized(season, 'month', lang)}</h3>
              <p className="text-sm text-[#4FC3F7]">{t.waterTemp} {season.temp}</p>
            </div>
          </div>

          <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">{t.bestTarget}</h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {monthFish.map((fishId, idx) => {
              const fish = FISH_DATA[fishId];
              if (!fish) return null;
              return (
                <button
                  key={fishId}
                  onClick={() => onFishClick(fishId)}
                  className="relative bg-[#0d1117] border border-[#2a3040] rounded-lg p-3 text-left hover:border-[#4FC3F7]/40 hover:-translate-y-[2px] transition-all duration-200 cursor-pointer"
                >
                  {idx < 3 && (
                    <span className={`absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${BADGE_STYLES[idx]}`}>
                      {BADGE_LABELS[idx]}
                    </span>
                  )}
                  <span className="text-2xl block mb-1">{fish.emoji}</span>
                  <div className="text-sm font-medium text-[#e6edf3]">{localized(fish, 'name', lang)}</div>
                  <div className="text-[10px] text-[#6b7280] mt-0.5 truncate">🎣 {localized(fish, 'bestBait', lang)}</div>
                </button>
              );
            })}
          </div>

          {monthFish.length === 0 && (
            <p className="text-sm text-[#6b7280] py-4 text-center">{t.noData}</p>
          )}
        </div>
      )}

      {/* Season Chart */}
      <div className="mt-6">
        <SeasonChart seasons={seasons} />
      </div>
    </div>
  );
}
