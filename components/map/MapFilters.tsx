'use client';

import { TYPE_ICONS } from '@/data/constants';
import { useLanguage } from '@/lib/i18n';

interface MapFiltersProps {
  filterType: string;
  setFilterType: (type: string) => void;
  filterDifficulty: number;
  setFilterDifficulty: (d: number) => void;
  filteredCount: number;
  totalCount: number;
}

export default function MapFilters({
  filterType,
  setFilterType,
  filterDifficulty,
  setFilterDifficulty,
  filteredCount,
  totalCount,
}: MapFiltersProps) {
  const { lang } = useLanguage();

  const t = {
    zh: {
      filterTitle: '筛选钓点',
      spotType: '钓点类型',
      showAll: '全部显示',
      difficulty: '难度筛选',
      legend: '图例',
      safetyTitle: '安全警告',
      safetyText: '岩石平台钓鱼极其危险，请务必穿着救生衣、防滑鞋，注意潮汐和海浪。切勿独自前往。',
      showing: '显示',
      spots: '个钓点',
    },
    en: {
      filterTitle: 'Filter Spots',
      spotType: 'Spot Type',
      showAll: 'Show All',
      difficulty: 'Difficulty',
      legend: 'Legend',
      safetyTitle: 'Safety Warning',
      safetyText: 'Rock fishing is extremely dangerous. Always wear a life jacket and non-slip footwear, and watch the tides and waves. Never go alone.',
      showing: 'Showing',
      spots: 'spots',
    },
  }[lang];

  const DIFFICULTY_OPTIONS = {
    zh: [
      { value: 0, label: '全部' },
      { value: 1, label: '⭐ 仅新手友好' },
      { value: 2, label: '⭐⭐ 简单及以下' },
      { value: 3, label: '⭐⭐⭐ 中等及以下' },
    ],
    en: [
      { value: 0, label: 'All' },
      { value: 1, label: '⭐ Beginner Only' },
      { value: 2, label: '⭐⭐ Easy & Below' },
      { value: 3, label: '⭐⭐⭐ Medium & Below' },
    ],
  }[lang];

  const getTypeLabel = (info: typeof TYPE_ICONS[string]) => {
    if (lang === 'en' && info.labelEn) return info.labelEn;
    return info.label;
  };

  return (
    <div className="w-[220px] shrink-0 bg-[#141824] border-r border-[#2a3040] flex flex-col h-full overflow-y-auto max-md:hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2a3040]">
        <h2 className="text-[#e6edf3] font-bold text-sm">{lang === 'zh' ? '🔍' : '🔍'} {t.filterTitle}</h2>
      </div>

      {/* Spot Type Filter */}
      <div className="p-4 border-b border-[#2a3040]">
        <h3 className="text-[#8b949e] text-xs font-medium mb-3 uppercase tracking-wider">
          {t.spotType}
        </h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`text-left px-3 py-2 rounded-md text-sm transition-all ${
              filterType === 'all'
                ? 'bg-[#4FC3F7]/20 text-[#4FC3F7]'
                : 'text-[#8b949e] hover:bg-[#1e2433] hover:text-[#e6edf3]'
            }`}
          >
            🌐 {t.showAll}
          </button>
          {Object.entries(TYPE_ICONS).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setFilterType(key)}
              className={`text-left px-3 py-2 rounded-md text-sm transition-all ${
                filterType === key
                  ? 'text-white'
                  : 'text-[#8b949e] hover:bg-[#1e2433] hover:text-[#e6edf3]'
              }`}
              style={
                filterType === key
                  ? { backgroundColor: info.color + '30', color: info.color }
                  : undefined
              }
            >
              {info.icon} {getTypeLabel(info)}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="p-4 border-b border-[#2a3040]">
        <h3 className="text-[#8b949e] text-xs font-medium mb-3 uppercase tracking-wider">
          {t.difficulty}
        </h3>
        <div className="flex flex-col gap-1.5">
          {DIFFICULTY_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilterDifficulty(value)}
              className={`text-left px-3 py-2 rounded-md text-sm transition-all ${
                filterDifficulty === value
                  ? 'bg-[#4FC3F7]/20 text-[#4FC3F7]'
                  : 'text-[#8b949e] hover:bg-[#1e2433] hover:text-[#e6edf3]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-b border-[#2a3040]">
        <h3 className="text-[#8b949e] text-xs font-medium mb-3 uppercase tracking-wider">
          {t.legend}
        </h3>
        <div className="flex flex-col gap-2">
          {Object.entries(TYPE_ICONS).map(([key, info]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: info.color }}
              />
              <span className="text-[#8b949e]">
                {info.icon} {getTypeLabel(info)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Warning */}
      <div className="p-4 border-b border-[#2a3040]">
        <div className="rounded-md border border-[#ef4444]/40 bg-[#ef4444]/10 p-3">
          <p className="text-[#ef4444] text-xs font-medium mb-1">⚠️ {t.safetyTitle}</p>
          <p className="text-[#8b949e] text-[11px] leading-relaxed">
            {t.safetyText}
          </p>
        </div>
      </div>

      {/* Spot Count */}
      <div className="p-4 mt-auto">
        <p className="text-[#6b7280] text-xs text-center">
          {t.showing} <span className="text-[#4FC3F7] font-medium">{filteredCount}</span>
          /{totalCount} {t.spots}
        </p>
      </div>
    </div>
  );
}
