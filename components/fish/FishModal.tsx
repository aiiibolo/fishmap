'use client';

import { FishSpecies } from '@/data/types';
import { useLanguage, localized } from '@/lib/i18n';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';

interface FishModalProps {
  fishId: string;
  fish: FishSpecies;
  onClose: () => void;
}

function InfoItem({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="bg-[#0d1117] rounded-lg p-3">
      <div className="text-[10px] text-[#6b7280] mb-1">{label}</div>
      <div className={`text-sm font-medium ${color || 'text-[#e6edf3]'}`}>{value}</div>
    </div>
  );
}

export default function FishModal({ fishId, fish, onClose }: FishModalProps) {
  const { lang } = useLanguage();

  const labels = {
    zh: {
      size: '尺寸',
      bestSeason: '最佳季节',
      eatingQuality: '食用价值',
      minSize: '最低尺寸',
      dailyBag: '每日限额',
      habitat: '栖息地',
      bagUnit: '条',
      techniqueTitle: '🎣 钓法与饵料',
      diet: '食性:',
      bestBait: '最佳饵料:',
      technique: '推荐钓法:',
      descriptionTitle: '📖 详细介绍',
    },
    en: {
      size: 'Size',
      bestSeason: 'Best Season',
      eatingQuality: 'Eating Quality',
      minSize: 'Min. Size',
      dailyBag: 'Daily Bag Limit',
      habitat: 'Habitat',
      bagUnit: 'fish',
      techniqueTitle: '🎣 Technique & Bait',
      diet: 'Diet:',
      bestBait: 'Best Bait:',
      technique: 'Technique:',
      descriptionTitle: '📖 Description',
    },
  }[lang];

  const minSizeDisplay = (() => {
    if (lang === 'en' && fish.minSizeEn) return fish.minSizeEn;
    if (typeof fish.minSize === 'number') return `${fish.minSize}cm`;
    if (lang === 'en' && fish.minSizeEn) return fish.minSizeEn;
    return fish.minSize;
  })();

  return (
    <Modal onClose={onClose} maxWidth="640px">
      {/* Header image area */}
      <div
        className="relative -mx-6 -mt-6 mb-4 h-48 flex items-center justify-center overflow-hidden rounded-t-2xl"
        style={{
          background: `linear-gradient(135deg, ${fish.color}40, ${fish.color}15, #141824)`,
        }}
      >
        <span className="absolute text-8xl opacity-10">{fish.emoji}</span>
        {fish.img ? (
          <Image
            src={fish.img}
            alt={fish.nameEn}
            width={240}
            height={160}
            className="relative z-10 object-contain max-h-40 drop-shadow-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="relative z-10 text-7xl">{fish.emoji}</span>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[#8b949e] hover:text-white hover:bg-black/60 transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Name section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{fish.emoji}</span>
          <h2 className="text-xl font-serif font-bold text-[#e6edf3]">{localized(fish, 'name', lang)}</h2>
        </div>
        {lang === 'zh' && (
          <p className="text-sm text-[#8b949e]">{fish.nameEn}</p>
        )}
        <p className="text-xs text-[#6b7280] italic mt-0.5">{fish.scientific}</p>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <InfoItem label={labels.size} value={localized(fish, 'size', lang)} />
        <InfoItem label={labels.bestSeason} value={localized(fish, 'season', lang)} color="text-[#4FC3F7]" />
        <InfoItem label={labels.eatingQuality} value={localized(fish, 'eating', lang)} color="text-[#f59e0b]" />
        <InfoItem label={labels.minSize} value={minSizeDisplay} />
        <InfoItem label={labels.dailyBag} value={`${fish.bagLimit} ${labels.bagUnit}`} color="text-[#81C784]" />
        <InfoItem label={labels.habitat} value={localized(fish, 'habitat', lang)} />
      </div>

      {/* Technique section */}
      <div className="bg-[#0d1117] rounded-lg p-4 mb-4">
        <h3 className="text-sm font-semibold text-[#e6edf3] mb-3">{labels.techniqueTitle}</h3>
        <div className="space-y-2">
          <div className="flex gap-2 text-sm">
            <span className="text-[#6b7280] shrink-0">{labels.diet}</span>
            <span className="text-[#e6edf3]">{localized(fish, 'diet', lang)}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-[#6b7280] shrink-0">{labels.bestBait}</span>
            <span className="text-[#f59e0b]">{localized(fish, 'bestBait', lang)}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-[#6b7280] shrink-0">{labels.technique}</span>
            <span className="text-[#4FC3F7]">{localized(fish, 'technique', lang)}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#0d1117] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#e6edf3] mb-2">{labels.descriptionTitle}</h3>
        <p className="text-sm text-[#8b949e] leading-relaxed">{localized(fish, 'description', lang)}</p>
      </div>
    </Modal>
  );
}
