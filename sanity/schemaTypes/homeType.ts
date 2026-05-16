import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

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
        defineField({
          name: 'description',
          title: 'Descripción',
          type: 'text',
          rows: 3,
        }),
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
            { name: 'text', title: 'Texto', type: 'string' },
            { name: 'link', title: 'Enlace', type: 'string' },
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          title: 'Botón Secundario',
          type: 'object',
          fields: [
            { name: 'text', title: 'Texto', type: 'string' },
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
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'history',
      title: 'Desde 2008',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
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
