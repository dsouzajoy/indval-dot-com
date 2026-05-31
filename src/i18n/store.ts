import { atom } from 'nanostores';

export type Lang = 'en' | 'de' | 'pl';
export const SUPPORTED_LANGS: Lang[] = ['en', 'de', 'pl'];

function detectInitialLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  }
  if (typeof navigator !== 'undefined') {
    const locale = navigator.language.slice(0, 2).toLowerCase();
    if (locale === 'de') return 'de';
    if (locale === 'pl') return 'pl';
  }
  return 'en';
}

export const langStore = atom<Lang>(detectInitialLang());

langStore.subscribe((lang) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lang', lang);
  }
});
