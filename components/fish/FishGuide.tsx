'use client';

import { useState } from 'react';
import { FISH_DATA } from '@/data/fish';
import FishCard from './FishCard';

interface FishGuideProps {
  onFishClick: (fishId: string) => void;
}

export default function FishGuide({ onFishClick }: FishGuideProps) {
  const [search, setSearch] = useState('');

  const entries = Object.entries(FISH_DATA).filter(([, fish]) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      fish.name.toLowerCase().includes(q) ||
      fish.nameEn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#4FC3F7] to-[#81C784] bg-clip-text text-transparent mb-2">
          纽卡斯尔鱼种图鉴
        </h2>
        <p className="text-sm text-[#8b949e]">
          纽卡斯尔海域常见的 {Object.keys(FISH_DATA).length} 种岸钓鱼类，点击查看详细信息
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="搜索鱼种名称..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm bg-[#141824] border border-[#2a3040] rounded-lg px-4 py-2 text-sm text-[#e6edf3] placeholder-[#6b7280] outline-none focus:border-[#4FC3F7]/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {entries.map(([id, fish]) => (
          <FishCard
            key={id}
            fishId={id}
            fish={fish}
            onClick={() => onFishClick(id)}
          />
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12 text-[#6b7280]">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm">没有找到匹配的鱼种</p>
        </div>
      )}
    </div>
  );
}
