'use client';

import { useLanguage } from '@/lib/i18n';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1e2433] transition-all duration-200 cursor-pointer border border-[#2a3040]"
      aria-label="Switch language"
    >
      <span className="text-sm">🌐</span>
      <span>{lang === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
}
