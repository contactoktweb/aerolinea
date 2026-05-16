import { InfoOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

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
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text', rows: 3 },
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
            { name: 'label', title: 'Etiqueta', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'legacy',
      title: 'Nuestro Legado',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text', rows: 5 },
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
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text', rows: 3 },
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
            { name: 'role', title: 'Rol', type: 'string' },
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
