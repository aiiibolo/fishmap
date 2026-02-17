'use client';

import { TYPE_ICONS } from '@/data/constants';

interface MapFiltersProps {
  filterType: string;
  setFilterType: (type: string) => void;
  filterDifficulty: number;
  setFilterDifficulty: (d: number) => void;
  filteredCount: number;
  totalCount: number;
}

const DIFFICULTY_OPTIONS = [
  { value: 0, label: '全部' },
  { value: 1, label: '⭐ 仅新手友好' },
  { value: 2, label: '⭐⭐ 简单及以下' },
  { value: 3, label: '⭐⭐⭐ 中等及以下' },
];

export default function MapFilters({
  filterType,
  setFilterType,
  filterDifficulty,
  setFilterDifficulty,
  filteredCount,
  totalCount,
}: MapFiltersProps) {
  return (
    <div className="w-[220px] shrink-0 bg-[#141824] border-r border-[#2a3040] flex flex-col h-full overflow-y-auto max-md:hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2a3040]">
        <h2 className="text-[#e6edf3] font-bold text-sm">🔍 筛选钓点</h2>
      </div>

      {/* Spot Type Filter */}
      <div className="p-4 border-b border-[#2a3040]">
        <h3 className="text-[#8b949e] text-xs font-medium mb-3 uppercase tracking-wider">
          钓点类型
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
            🌐 全部显示
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
              {info.icon} {info.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="p-4 border-b border-[#2a3040]">
        <h3 className="text-[#8b949e] text-xs font-medium mb-3 uppercase tracking-wider">
          难度筛选
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
          图例
        </h3>
        <div className="flex flex-col gap-2">
          {Object.entries(TYPE_ICONS).map(([key, info]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: info.color }}
              />
              <span className="text-[#8b949e]">
                {info.icon} {info.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Warning */}
      <div className="p-4 border-b border-[#2a3040]">
        <div className="rounded-md border border-[#ef4444]/40 bg-[#ef4444]/10 p-3">
          <p className="text-[#ef4444] text-xs font-medium mb-1">⚠️ 安全警告</p>
          <p className="text-[#8b949e] text-[11px] leading-relaxed">
            岩石平台钓鱼极其危险，请务必穿着救生衣、防滑鞋，注意潮汐和海浪。切勿独自前往。
          </p>
        </div>
      </div>

      {/* Spot Count */}
      <div className="p-4 mt-auto">
        <p className="text-[#6b7280] text-xs text-center">
          显示 <span className="text-[#4FC3F7] font-medium">{filteredCount}</span>
          /{totalCount} 个钓点
        </p>
      </div>
    </div>
  );
}
