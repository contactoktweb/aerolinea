export function getLocaleString(obj: any, locale: string = 'es'): string {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[locale] || obj['es'] || ''
}

export function getLocaleArray<T>(obj: any, locale: string = 'es'): T[] {
  if (!obj) return []
  if (Array.isArray(obj)) return obj
  return obj[locale] || obj['es'] || []
}
