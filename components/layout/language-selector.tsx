'use client'

import { useLanguage } from '@/context/language-context'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
]

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full glass-card w-fit">
      {languages.map((lang, index) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          className={cn(
            'px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300',
            language === lang.code
              ? 'bg-champagne text-background'
              : 'text-pearl/60 hover:text-pearl'
          )}
          title={lang.label}
        >
          {lang.code.toUpperCase()}
          {index < languages.length - 1 && (
            <span className="sr-only">,</span>
          )}
        </button>
      ))}
    </div>
  )
}
