import type {StructureResolver} from 'sanity/structure'
import { CogIcon, HomeIcon, InfoOutlineIcon, StarIcon, UserIcon, ImagesIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // Configuración Global (Singleton)
      S.listItem()
        .title('Configuración Global')
        .id('settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.divider(),

      // Carpeta: Página de Inicio
      S.listItem()
        .title('Página de Inicio')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Secciones de Inicio')
            .items([
              S.listItem()
                .title('Hero y Esencia')
                .id('home')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('home')
                    .documentId('home')
                ),
              S.listItem()
                .title('Servicios')
                .icon(StarIcon)
                .child(S.documentTypeList('service').title('Nuestros Servicios')),
              S.listItem()
                .title('Testimonios')
                .icon(UserIcon)
                .child(S.documentTypeList('testimonial').title('Reseñas de Clientes')),
              S.listItem()
                .title('Logos de Clientes')
                .icon(ImagesIcon)
                .child(S.documentTypeList('clientLogo').title('Carousel de Aliados')),
            ])
        ),

      // Carpeta: Página Nosotros
      S.listItem()
        .title('Página Nosotros')
        .icon(InfoOutlineIcon)
        .child(
          S.list()
            .title('Secciones de Nosotros')
            .items([
              S.listItem()
                .title('Contenido Principal')
                .id('about')
                .icon(InfoOutlineIcon)
                .child(
                  S.document()
                    .schemaType('about')
                    .documentId('about')
                ),
              // Aquí podrías agregar más subsecciones si fuera necesario
            ])
        ),

      S.divider(),

      // Nuestra Flota
      S.listItem()
        .title('Nuestra Flota')
        .icon(StarIcon)
        .child(
          S.documentTypeList('aircraft')
            .title('Inventario de Aeronaves')
        ),

      // Cotizaciones
      S.listItem()
        .title('Cotizaciones')
        .icon(StarIcon)
        .child(S.documentTypeList('quotation').title('Solicitudes de Cotización')),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'settings',
            'home',
            'about',
            'service',
            'testimonial',
            'clientLogo',
            'quotation',
            'aircraft',
          ].includes(listItem.getId()!)
      ),
    ])
