export function getLocaleString(field: any, language: string, fallback: string = ''): string {
  if (!field) return fallback
  if (typeof field === 'string') return field
  return field[language] || field['es'] || fallback
}
