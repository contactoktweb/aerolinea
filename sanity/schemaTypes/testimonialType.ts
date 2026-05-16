import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', title: 'Nombre del Cliente', type: 'string' }),
    defineField({ name: 'role', title: 'Cargo/Empresa', type: 'string' }),
    defineField({ name: 'content', title: 'Testimonio', type: 'text', rows: 4 }),
    defineField({ name: 'rating', title: 'Calificación (1-5)', type: 'number', validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: 'image', title: 'Foto del Cliente', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'status',
      title: 'Estado de Revisión',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pending' },
          { title: 'Aprobado', value: 'approved' },
          { title: 'Rechazado', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'date',
      title: 'Fecha de Envío',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'image',
    },
  },
})
