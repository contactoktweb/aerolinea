'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'ES', label: 'Español' },
  { code: 'EN', label: 'English' },
  { code: 'FR', label: 'Français' },
]

export function LanguageSelector() {
  const [activeLanguage, setActiveLanguage] = useState('ES')

  return (
    <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full glass-card">
      {languages.map((lang, index) => (
        <button
          key={lang.code}
          onClick={() => setActiveLanguage(lang.code)}
          className={cn(
            'px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300',
            activeLanguage === lang.code
              ? 'bg-champagne text-background'
              : 'text-pearl/60 hover:text-pearl'
          )}
          title={lang.label}
        >
          {lang.code}
          {index < languages.length - 1 && (
            <span className="sr-only">,</span>
          )}
        </button>
      ))}
    </div>
  )
}
