'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '@/lib/i18n';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = LANGUAGES.find((l) => l.value === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1e2433] transition-all duration-200 cursor-pointer border border-[#2a3040]"
        aria-label="Select language"
        aria-expanded={open}
      >
        <span className="text-sm">🌐</span>
        <span>Language</span>
        <span className={`text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-[#141824] border border-[#2a3040] rounded-lg shadow-xl overflow-hidden z-[9999]">
          {LANGUAGES.map((l) => (
            <button
              key={l.value}
              onClick={() => { setLang(l.value); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-xs whitespace-nowrap transition-colors cursor-pointer ${
                lang === l.value
                  ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                  : 'text-[#e6edf3] hover:bg-[#1e2433]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
