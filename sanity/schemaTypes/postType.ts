import { BookIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { localizedString, localizedText, localizedArray } from '../lib/localeFields'

export const postType = defineType({
  name: 'post',
  title: 'Blog (Noticias)',
  type: 'document',
  icon: BookIcon,
  fields: [
    localizedString('title', 'Título'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.es',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedText('excerpt', 'Resumen/Extracto'),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Industria', value: 'Industria' },
          { title: 'Flota', value: 'Flota' },
          { title: 'Destinos', value: 'Destinos' },
          { title: 'Servicios', value: 'Servicios' },
          { title: 'Sostenibilidad', value: 'Sostenibilidad' },
          { title: 'Empresas', value: 'Empresas' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Fecha de Publicación',
      type: 'date',
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de Lectura (ej: 5 min)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Artículo Destacado',
      type: 'boolean',
      initialValue: false,
    }),
    localizedArray('body', 'Contenido (Cuerpo)', [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'Quote', value: 'blockquote' },
        ],
        lists: [{ title: 'Bullet', value: 'bullet' }],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
        },
      },
      {
        type: 'image',
        options: { hotspot: true },
        fields: [
          localizedString('alt', 'Texto Alternativo'),
        ],
      },
    ]),
    // We could localize the body too, but for now let's focus on the main fields
    // If the user wants full body localization, we'd use localizedArray or similar for portable text
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'category',
      media: 'image',
    },
  },
})
