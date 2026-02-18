'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('fishmap-lang') as Language;
    if (saved === 'zh' || saved === 'en') {
      setLangState(saved);
    } else {
      // Auto-detect: Chinese browser → Chinese, everything else → English
      const browserLang = navigator.language || '';
      if (browserLang.startsWith('zh')) setLangState('zh');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh' ? '钓鱼指南 | Fishing Guide' : 'Fishing Guide';
  }, [lang]);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('fishmap-lang', l);
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    document.title = l === 'zh' ? '钓鱼指南 | Fishing Guide' : 'Fishing Guide';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Pick the localized field from a data object.
 *  e.g. localized(fish, 'description', 'en') → fish.descriptionEn ?? fish.description
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localized(
  item: Record<string, any>,
  field: string,
  lang: Language,
): string {
  if (lang === 'en') {
    const enValue = item[`${field}En`];
    if (typeof enValue === 'string' && enValue) return enValue;
  }
  return (item[field] as string) ?? '';
}
