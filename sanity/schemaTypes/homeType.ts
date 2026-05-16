import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from '../lib/localeFields'

export const homeType = defineType({
  name: 'home',
  title: 'Página de Inicio',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Sección Hero',
      type: 'object',
      fields: [
        localizedText('description', 'Descripción'),
        defineField({
          name: 'image',
          title: 'Imagen de Fondo',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'ctaPrimary',
          title: 'Botón Primario',
          type: 'object',
          fields: [
            localizedString('text', 'Texto'),
            { name: 'link', title: 'Enlace', type: 'string' },
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          title: 'Botón Secundario',
          type: 'object',
          fields: [
            localizedString('text', 'Texto'),
            { name: 'link', title: 'Enlace', type: 'string' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'essence',
      title: 'Nuestra Esencia',
      type: 'object',
      fields: [
        localizedString('title', 'Título'),
        localizedText('description', 'Descripción'),
      ],
    }),
    defineField({
      name: 'history',
      title: 'Desde 2008',
      type: 'object',
      fields: [
        localizedString('title', 'Título'),
        localizedText('description', 'Descripción'),
      ],
    }),
  ],
  preview: {
    select: {
      image: 'hero.image',
    },
    prepare({ image }) {
      return {
        title: 'Contenido Hero y Esencia',
        media: image,
      }
    },
  },
})
