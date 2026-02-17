'use client';

import { useLanguage } from '@/lib/i18n';
import LanguageToggle from '@/components/layout/LanguageToggle';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'map', icon: '🗺️', zh: '钓点地图', en: 'Fishing Map' },
  { id: 'fish', icon: '🐟', zh: '鱼种图鉴', en: 'Fish Guide' },
  { id: 'season', icon: '📅', zh: '季节指南', en: 'Seasons' },
  { id: 'info', icon: '📋', zh: '钓鱼须知', en: 'Info' },
];

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { lang } = useLanguage();

  return (
    <header className="w-full bg-[#0d1117] border-b border-[#2a3040] px-4 py-2 flex items-center justify-between shrink-0 z-50">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl animate-float">
          🎣
        </span>
        <div className="min-w-0">
          <h1 className="text-lg font-serif font-bold bg-gradient-to-r from-[#4FC3F7] to-[#81C784] bg-clip-text text-transparent leading-tight">
            {lang === 'zh' ? '纽卡斯尔钓鱼地图' : 'Newcastle Fishing Map'}
          </h1>
          <p className="text-[10px] text-[#6b7280] hidden sm:block leading-tight">
            {lang === 'zh'
              ? 'Newcastle NSW · 岸钓指南 · 15 个钓点 · 20 种鱼类'
              : 'Newcastle NSW · Shore Fishing Guide · 15 Spots · 20 Species'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-1 bg-[#141824] rounded-full px-1 py-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#4FC3F7]/15 text-[#4FC3F7]'
                  : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1e2433]'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab[lang]}</span>
            </button>
          ))}
        </nav>
        <LanguageToggle />
      </div>

    </header>
  );
}
