import { FishSpecies } from '@/data/types';
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
          <h2 className="text-xl font-serif font-bold text-[#e6edf3]">{fish.name}</h2>
        </div>
        <p className="text-sm text-[#8b949e]">{fish.nameEn}</p>
        <p className="text-xs text-[#6b7280] italic mt-0.5">{fish.scientific}</p>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <InfoItem label="尺寸" value={fish.size} />
        <InfoItem label="最佳季节" value={fish.season} color="text-[#4FC3F7]" />
        <InfoItem label="食用价值" value={fish.eating} color="text-[#f59e0b]" />
        <InfoItem label="最低尺寸" value={typeof fish.minSize === 'number' ? `${fish.minSize}cm` : fish.minSize} />
        <InfoItem label="每日限额" value={`${fish.bagLimit} 条`} color="text-[#81C784]" />
        <InfoItem label="栖息地" value={fish.habitat} />
      </div>

      {/* Technique section */}
      <div className="bg-[#0d1117] rounded-lg p-4 mb-4">
        <h3 className="text-sm font-semibold text-[#e6edf3] mb-3">🎣 钓法与饵料</h3>
        <div className="space-y-2">
          <div className="flex gap-2 text-sm">
            <span className="text-[#6b7280] shrink-0">食性:</span>
            <span className="text-[#e6edf3]">{fish.diet}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-[#6b7280] shrink-0">最佳饵料:</span>
            <span className="text-[#f59e0b]">{fish.bestBait}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-[#6b7280] shrink-0">推荐钓法:</span>
            <span className="text-[#4FC3F7]">{fish.technique}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#0d1117] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#e6edf3] mb-2">📖 详细介绍</h3>
        <p className="text-sm text-[#8b949e] leading-relaxed">{fish.description}</p>
      </div>
    </Modal>
  );
}
