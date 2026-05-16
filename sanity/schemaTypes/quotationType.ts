import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const quotationType = defineType({
  name: 'quotation',
  title: 'Cotizaciones',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Teléfono', type: 'string', readOnly: true }),
    defineField({ name: 'origin', title: 'Origen', type: 'string', readOnly: true }),
    defineField({ name: 'destination', title: 'Destino', type: 'string', readOnly: true }),
    defineField({ name: 'date', title: 'Fecha de Viaje', type: 'date', readOnly: true }),
    defineField({ name: 'passengers', title: 'Pasajeros', type: 'number', readOnly: true }),
    defineField({ name: 'tripType', title: 'Tipo de Viaje', type: 'string', readOnly: true }),
    defineField({ name: 'status', title: 'Estado', type: 'string', initialValue: 'new', options: { list: [
      { title: 'Nuevo', value: 'new' },
      { title: 'Contactado', value: 'contacted' },
      { title: 'Cerrado', value: 'closed' },
      { title: 'Cancelado', value: 'cancelled' },
    ]}}),
    defineField({ name: 'notes', title: 'Notas Internas', type: 'text', rows: 4 }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'destination',
      date: 'date',
    },
    prepare({ title, subtitle, date }) {
      return {
        title: `${title} - ${subtitle}`,
        subtitle: `Fecha: ${date || 'No definida'}`,
      }
    },
  },
})
