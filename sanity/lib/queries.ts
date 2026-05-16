import { defineQuery } from 'next-sanity'

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
  title,
  logo,
  logoFooter,
  favicon,
  appleIcon,
  ogImage,
  email,
  phone,
  address,
  notificationEmail,
  socialLinks
}`)

export const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
  hero {
    description,
    image,
    ctaPrimary,
    ctaSecondary
  },
  essence {
    title,
    description
  },
  history {
    title,
    description
  },
  "services": *[_type == "service"] | order(order asc){
    title,
    description,
    iconType,
    image,
    "href": "/reserva"
  },
  "testimonials": *[_type == "testimonial" && status == "approved"],
  "clientLogos": *[_type == "clientLogo"] | order(order asc){
    name,
    image
  }
}`)

export const ABOUT_QUERY = defineQuery(`*[_type == "about"][0]{
  hero,
  stats,
  legacy,
  values,
  team
}`)

export const FLEET_QUERY = defineQuery(`*[_type == "aircraft"] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  model,
  category,
  tagline,
  description,
  specs,
  features,
  image,
  interiorImage,
  gallery
}`)

export const AIRCRAFT_BY_SLUG_QUERY = defineQuery(`*[_type == "aircraft" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  model,
  category,
  tagline,
  description,
  specs,
  features,
  image,
  interiorImage,
  gallery
}`)

export const POSTS_QUERY = defineQuery(`*[_type == "post"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  date,
  readTime,
  image,
  featured
}`)

export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  date,
  readTime,
  image,
  featured,
  body
}`)
