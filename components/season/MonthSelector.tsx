'use client';

import { MonthData } from '@/data/types';

interface MonthSelectorProps {
  selectedMonth: number;
  onSelect: (month: number) => void;
  seasons: MonthData[];
}

export default function MonthSelector({ selectedMonth, onSelect, seasons }: MonthSelectorProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-2">
      {seasons.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
            selectedMonth === i
              ? 'bg-[#4FC3F7]/15 border border-[#4FC3F7]/40 text-[#4FC3F7]'
              : 'bg-[#141824] border border-[#2a3040] text-[#8b949e] hover:border-[#4FC3F7]/20 hover:text-[#e6edf3]'
          }`}
        >
          <span className="text-base">{s.emoji}</span>
          <span>{s.month}</span>
        </button>
      ))}
    </div>
  );
}
