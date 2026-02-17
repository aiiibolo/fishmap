'use client';

import { FishSpecies } from '@/data/types';
import { useLanguage, localized } from '@/lib/i18n';
import Image from 'next/image';

interface FishCardProps {
  fishId: string;
  fish: FishSpecies;
  onClick: () => void;
}

export default function FishCard({ fishId, fish, onClick }: FishCardProps) {
  const { lang } = useLanguage();

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-[#2a3040] bg-[#141824] overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:border-[#4FC3F7]/40 hover:shadow-lg hover:shadow-[#4FC3F7]/5"
    >
      <div
        className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${fish.color}30, ${fish.color}10)`,
        }}
      >
        <span className="text-5xl opacity-20 absolute">{fish.emoji}</span>
        {fish.img && (
          <Image
            src={fish.img}
            alt={fish.nameEn}
            width={160}
            height={100}
            className="relative z-10 object-contain max-h-24 drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        {!fish.img && (
          <span className="relative z-10 text-5xl">{fish.emoji}</span>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-sm">{fish.emoji}</span>
          <span className="text-sm font-semibold text-[#e6edf3] truncate">
            {localized(fish, 'name', lang)}
          </span>
        </div>
        <p className="text-[11px] text-[#6b7280] mb-2 truncate">
          {lang === 'zh' ? fish.nameEn : fish.scientific}
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2433] text-[#8b949e]">
            {localized(fish, 'size', lang)}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2433] text-[#f59e0b]">
            {localized(fish, 'eating', lang)}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2433] text-[#81C784]">
            {lang === 'zh' ? `限${fish.bagLimit}条` : `${fish.bagLimit} limit`}
          </span>
        </div>
      </div>
    </div>
  );
}
