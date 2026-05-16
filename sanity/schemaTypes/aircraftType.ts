import { StarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const aircraftType = defineType({
  name: 'aircraft',
  title: 'Flota (Aeronaves)',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Aeronave',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Modelo Técnico',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Jet Ligero', value: 'light' },
          { title: 'Jet Mediano', value: 'midsize' },
          { title: 'Jet Super Mediano', value: 'super-midsize' },
          { title: 'Jet Pesado', value: 'heavy' },
          { title: 'Ultra Largo Alcance', value: 'ultra-long-range' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Eslogan/Frase Corta',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Detallada',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'specs',
      title: 'Especificaciones Técnicas',
      type: 'object',
      fields: [
        { name: 'passengers', title: 'Pasajeros Máximos', type: 'number' },
        { name: 'range', title: 'Alcance (km)', type: 'string' },
        { name: 'speed', title: 'Velocidad Crucero', type: 'string' },
        { name: 'altitude', title: 'Altitud Máxima', type: 'string' },
        { name: 'baggage', title: 'Capacidad de Equipaje', type: 'string' },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Características Destacadas',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Imagen Exterior',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'interiorImage',
      title: 'Imagen Interior',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      description: 'Puedes arrastrar y soltar múltiples imágenes aquí para subirlas en lote.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'order',
      title: 'Orden de Aparición',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})
