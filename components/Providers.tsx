'use client';

import { LanguageProvider } from '@/lib/i18n';
import { RegionProvider } from '@/lib/region';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <RegionProvider>{children}</RegionProvider>
    </LanguageProvider>
  );
}
