import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { langStore, SUPPORTED_LANGS, type Lang } from '@/i18n/store';

const BETA_LANGS: Lang[] = ['de', 'pl'];

const LANG_META: Record<Lang, { flag: string; code: string; label: string }> = {
  en: { flag: '🇬🇧', code: 'EN', label: 'English' },
  de: { flag: '🇩🇪', code: 'DE', label: 'Deutsch' },
  pl: { flag: '🇵🇱', code: 'PL', label: 'Polski' },
};

export function LanguageSwitcher() {
  const lang = useStore(langStore);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const others = SUPPORTED_LANGS.filter((l) => l !== lang);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function selectLang(l: Lang) {
    langStore.set(l);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${LANG_META[lang].label}`}
        className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container transition-colors duration-200 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary"
      >
        <span className="text-base leading-none" aria-hidden="true">🌐</span>
        <span>{LANG_META[lang].code}</span>
        <span
          className={`material-symbols-outlined text-sm leading-none transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute top-full right-0 mt-1.5 min-w-[7rem] bg-surface-container-lowest border border-outline-variant/30 rounded shadow-ambient-lg overflow-hidden z-50"
        >
          {others.map((l) => (
            <li key={l} role="option" aria-selected={false}>
              <button
                onClick={() => selectLang(l)}
                className="cursor-pointer w-full flex items-center gap-2.5 px-4 py-2.5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-150"
              >
                <span className="text-base leading-none" aria-hidden="true">{LANG_META[l].flag}</span>
                <span>{LANG_META[l].code}</span>
                {BETA_LANGS.includes(l) && (
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20">
                    Beta
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
