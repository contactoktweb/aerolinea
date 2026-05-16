import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const clientLogoType = defineType({
  name: 'clientLogo',
  title: 'Logos de Clientes',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({ name: 'name', title: 'Nombre del Cliente', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
  ],
})
