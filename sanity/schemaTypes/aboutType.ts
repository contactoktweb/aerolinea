import { InfoOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from '../lib/localeFields'

export const aboutType = defineType({
  name: 'about',
  title: 'Página Nosotros',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Sección Hero',
      type: 'object',
      fields: [
        localizedString('title', 'Título'),
        localizedString('subtitle', 'Subtítulo'),
        localizedText('description', 'Descripción'),
        { name: 'image', title: 'Imagen de Fondo', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valor (Número)', type: 'number' },
            { name: 'suffix', title: 'Sufijo (ej: +)', type: 'string' },
            localizedString('label', 'Etiqueta'),
          ],
        },
      ],
    }),
    defineField({
      name: 'legacy',
      title: 'Nuestro Legado',
      type: 'object',
      fields: [
        localizedString('title', 'Título'),
        localizedString('subtitle', 'Subtítulo'),
        localizedText('description', 'Descripción'),
        { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Nuestros Valores',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            localizedString('title', 'Título'),
            localizedText('description', 'Descripción'),
          ],
        },
      ],
    }),
    defineField({
      name: 'team',
      title: 'Nuestro Equipo',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nombre', type: 'string' },
            localizedString('role', 'Rol'),
            { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      image: 'hero.image',
    },
    prepare({ image }) {
      return {
        title: 'Contenido de Página Nosotros',
        media: image,
      }
    },
  },
})
