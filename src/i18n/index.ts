import { en } from './locales/en';
import { de } from './locales/de';
import { pl } from './locales/pl';

export { en, de, pl };
export type { Translations } from './locales/en';
export type { Lang } from './store';

export const translations = { en, de, pl } as const;
