import { type SchemaTypeDefinition } from 'sanity'
import { settingsType } from './settingsType'
import { homeType } from './homeType'
import { aboutType } from './aboutType'
import { serviceType } from './serviceType'
import { testimonialType } from './testimonialType'
import { clientLogoType } from './clientLogoType'
import { quotationType } from './quotationType'
import { aircraftType } from './aircraftType'
import { postType } from './postType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    homeType,
    aboutType,
    serviceType,
    testimonialType,
    clientLogoType,
    quotationType,
    aircraftType,
    postType,
  ],
}
