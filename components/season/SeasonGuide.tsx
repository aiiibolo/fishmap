'use client';

import { useState } from 'react';
import { FISH_DATA } from '@/data/fish';
import { SEASONS } from '@/data/seasons';
import MonthSelector from './MonthSelector';
import SeasonChart from './SeasonChart';

interface SeasonGuideProps {
  onFishClick: (fishId: string) => void;
}

const BADGE_STYLES = ['text-[#f59e0b] bg-[#f59e0b]/10', 'text-[#8b949e] bg-[#8b949e]/10', 'text-[#cd7f32] bg-[#cd7f32]/10'];
const BADGE_LABELS = ['🥇', '🥈', '🥉'];

export default function SeasonGuide({ onFishClick }: SeasonGuideProps) {
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth());

  const season = SEASONS[selectedMonth];
  const monthFish = season?.fish ?? [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#4FC3F7] to-[#81C784] bg-clip-text text-transparent mb-2">
          四季钓鱼指南
        </h2>
        <p className="text-sm text-[#8b949e]">
          根据月份查看最佳目标鱼种和推荐钓法
        </p>
      </div>

      <MonthSelector
        selectedMonth={selectedMonth}
        onSelect={setSelectedMonth}
        seasons={SEASONS}
      />

      {/* Selected month info */}
      {season && (
        <div className="mt-6 bg-[#141824] border border-[#2a3040] rounded-xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{season.emoji}</span>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#e6edf3]">{season.month}</h3>
              <p className="text-sm text-[#4FC3F7]">水温 {season.temp}</p>
            </div>
          </div>

          <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">🏆 本月最佳目标鱼种</h4>

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
                  <div className="text-sm font-medium text-[#e6edf3]">{fish.name}</div>
                  <div className="text-[10px] text-[#6b7280] mt-0.5 truncate">🎣 {fish.bestBait}</div>
                </button>
              );
            })}
          </div>

          {monthFish.length === 0 && (
            <p className="text-sm text-[#6b7280] py-4 text-center">本月暂无推荐鱼种数据</p>
          )}
        </div>
      )}

      {/* Season Chart */}
      <div className="mt-6">
        <SeasonChart />
      </div>
    </div>
  );
}
