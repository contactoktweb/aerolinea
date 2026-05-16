import { StarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({
      name: 'iconType',
      title: 'Icono',
      type: 'string',
      options: {
        list: [
          { title: 'Avión', value: 'ph:airplane-light' },
          { title: 'Reloj', value: 'ph:clock-light' },
          { title: 'Corazón/Médico', value: 'ph:heart-light' },
          { title: 'Caja/Carga', value: 'ph:package-light' },
          { title: 'Seguridad', value: 'ph:shield-check-light' },
          { title: 'Estrella', value: 'ph:star-light' },
        ],
      },
    }),
    defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
})
