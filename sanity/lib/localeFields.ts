import { defineField } from 'sanity'

export const supportedLanguages = [
  { id: 'es', title: 'Español', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'fr', title: 'Français' },
]

export const localizedString = (name: string, title: string, description?: string) => 
  defineField({
    name,
    title,
    description,
    type: 'object',
    fields: supportedLanguages.map(lang => ({
      name: lang.id,
      title: lang.title,
      type: 'string',
    })),
  })

export const localizedText = (name: string, title: string, description?: string) => 
  defineField({
    name,
    title,
    description,
    type: 'object',
    fields: supportedLanguages.map(lang => ({
      name: lang.id,
      title: lang.title,
      type: 'text',
    })),
  })

export const localizedArray = (name: string, title: string, of: any[], description?: string) => 
  defineField({
    name,
    title,
    description,
    type: 'object',
    fields: supportedLanguages.map(lang => ({
      name: lang.id,
      title: lang.title,
      type: 'array',
      of: of,
    })),
  })
