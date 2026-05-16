import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Configuración Global',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Sitio',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoFooter',
      title: 'Logo Footer',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon (Ícono del navegador)',
      description: 'Ícono que aparece en las pestañas del navegador. Tamaño recomendado: 512x512 px.',
      type: 'image',
    }),
    defineField({
      name: 'appleIcon',
      title: 'Apple Touch Icon',
      description: 'Ícono para dispositivos Apple (iPhone/iPad). Tamaño recomendado: 180x180 px.',
      type: 'image',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para Redes Sociales (OG Image)',
      description: 'Imagen que aparece al compartir el sitio en WhatsApp, Facebook, Twitter, etc. Tamaño ideal: 1200x630 px.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Email de Contacto',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono de Contacto',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'string',
    }),
    defineField({
      name: 'notificationEmail',
      title: 'Email de Notificaciones',
      description: 'Email donde llegarán los avisos de nuevos contactos',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Plataforma', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'icon',
              title: 'Icono',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'ph:facebook-logo-light' },
                  { title: 'Instagram', value: 'ph:instagram-logo-light' },
                  { title: 'LinkedIn', value: 'ph:linkedin-logo-light' },
                  { title: 'Twitter/X', value: 'ph:twitter-logo-light' },
                  { title: 'WhatsApp', value: 'ph:whatsapp-logo-light' },
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      logo: 'logo',
    },
    prepare({ logo }) {
      return {
        title: 'Configuración General del Sitio',
        media: logo,
      }
    },
  },
})
