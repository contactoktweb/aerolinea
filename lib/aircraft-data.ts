export interface Aircraft {
  id: string
  slug: string
  name: string
  model: string
  category: 'light' | 'midsize' | 'super-midsize' | 'heavy' | 'ultra-long-range'
  tagline: string
  description: string
  specs: {
    passengers: number
    range: string
    speed: string
    altitude: string
    baggage: string
  }
  features: string[]
  image: string
  interiorImage: string
  gallery?: any[]
}

export const aircraftData: Aircraft[] = [
  {
    id: '1',
    slug: 'citation-x',
    name: 'Cessna Citation X',
    model: 'Citation X+',
    category: 'super-midsize',
    tagline: 'El jet civil más rápido del mundo',
    description:
      'El Citation X+ redefine la velocidad en la aviación ejecutiva. Con una velocidad máxima de Mach 0.935, es el jet de negocios certificado más rápido del mundo. Su cabina espaciosa y refinada ofrece el máximo confort para vuelos transcontinentales.',
    specs: {
      passengers: 12,
      range: '5,956 km',
      speed: 'Mach 0.935',
      altitude: '51,000 ft',
      baggage: '2.3 m³',
    },
    features: [
      'Wi-Fi de alta velocidad',
      'Sistema de entretenimiento premium',
      'Cocina completamente equipada',
      'Asientos reclinables de cuero',
      'Iluminación ambiental LED',
      'Sistema de climatización avanzado',
    ],
    image: '/images/aircraft/citation-x.jpg',
    interiorImage: '/images/aircraft/citation-x-interior.jpg',
  },
  {
    id: '2',
    slug: 'gulfstream-g650',
    name: 'Gulfstream G650',
    model: 'G650ER',
    category: 'ultra-long-range',
    tagline: 'Lujo sin límites en el cielo',
    description:
      'El Gulfstream G650ER representa la cúspide de la aviación privada. Con el mayor alcance de su clase y una cabina que establece nuevos estándares de lujo, puede conectar ciudades como Lima con cualquier destino del mundo sin escalas.',
    specs: {
      passengers: 19,
      range: '13,890 km',
      speed: 'Mach 0.925',
      altitude: '51,000 ft',
      baggage: '5.5 m³',
    },
    features: [
      'Cabina con 4 zonas diferenciadas',
      'Camas completamente planas',
      'Sistema de filtración de aire 100%',
      'Ventanas panorámicas extra grandes',
      'Suite de ducha disponible',
      'Conectividad satelital global',
    ],
    image: '/images/aircraft/gulfstream-g650.jpg',
    interiorImage: '/images/aircraft/gulfstream-g650-interior.jpg',
  },
  {
    id: '3',
    slug: 'challenger-350',
    name: 'Bombardier Challenger 350',
    model: 'Challenger 350',
    category: 'super-midsize',
    tagline: 'Rendimiento y versatilidad excepcional',
    description:
      'El Challenger 350 combina una cabina espaciosa con un rendimiento superior. Su diseño aerodinámico avanzado y motores eficientes lo convierten en la elección perfecta para ejecutivos que valoran tanto el confort como la eficiencia.',
    specs: {
      passengers: 10,
      range: '5,926 km',
      speed: 'Mach 0.83',
      altitude: '45,000 ft',
      baggage: '2.8 m³',
    },
    features: [
      'Cabina más ancha de su clase',
      'Sistema de visión sintética',
      'Asientos con masaje',
      'Conectividad Ka-band',
      'Iluminación circadiana',
      'Cocina premium con horno',
    ],
    image: '/images/aircraft/challenger-350.jpg',
    interiorImage: '/images/aircraft/challenger-350-interior.jpg',
  },
  {
    id: '4',
    slug: 'phenom-300e',
    name: 'Embraer Phenom 300E',
    model: 'Phenom 300E',
    category: 'light',
    tagline: 'Agilidad y elegancia en perfecta armonía',
    description:
      'El Phenom 300E es el jet ligero más vendido del mundo, y por buena razón. Combina costos operativos reducidos con un interior de clase ejecutiva y un rendimiento que supera a jets de mayor tamaño.',
    specs: {
      passengers: 10,
      range: '3,724 km',
      speed: 'Mach 0.80',
      altitude: '45,000 ft',
      baggage: '2.1 m³',
    },
    features: [
      'Sistema de audio Bose Surround',
      'Control de cabina inteligente',
      'Asientos de cuero italiano',
      'Lavatorio privado',
      'Conexión de dispositivos múltiples',
      'Diseño interior premiado',
    ],
    image: '/images/aircraft/phenom-300e.jpg',
    interiorImage: '/images/aircraft/phenom-300e-interior.jpg',
  },
  {
    id: '5',
    slug: 'falcon-8x',
    name: 'Dassault Falcon 8X',
    model: 'Falcon 8X',
    category: 'ultra-long-range',
    tagline: 'Tres motores, infinitas posibilidades',
    description:
      'El Falcon 8X es el trimotor más avanzado de Dassault. Su configuración única de tres motores proporciona una seguridad excepcional y la capacidad de operar desde aeropuertos de pista corta, abriendo destinos inaccesibles para otros jets.',
    specs: {
      passengers: 16,
      range: '11,945 km',
      speed: 'Mach 0.90',
      altitude: '51,000 ft',
      baggage: '4.5 m³',
    },
    features: [
      'Tres zonas de cabina personalizables',
      'Sistema de vuelo digital EASy III',
      'Reducción de ruido líder en clase',
      'Acceso a 600+ aeropuertos adicionales',
      'Suite de descanso privada',
      'Galley de servicio completo',
    ],
    image: '/images/aircraft/falcon-8x.jpg',
    interiorImage: '/images/aircraft/falcon-8x-interior.jpg',
  },
  {
    id: '6',
    slug: 'hawker-800xp',
    name: 'Hawker 800XP',
    model: 'Hawker 800XP',
    category: 'midsize',
    tagline: 'Confiabilidad probada por décadas',
    description:
      'El Hawker 800XP es sinónimo de confiabilidad y confort. Con décadas de servicio impecable, este jet mediano ofrece una combinación ideal de espacio, alcance y economía para vuelos regionales y continentales.',
    specs: {
      passengers: 8,
      range: '4,667 km',
      speed: 'Mach 0.80',
      altitude: '41,000 ft',
      baggage: '1.5 m³',
    },
    features: [
      'Cabina stand-up completa',
      'Asientos club enfrentados',
      'Sistema de gestión de vuelo Rockwell Collins',
      'Lavatorio cerrado',
      'Configuración ejecutiva flexible',
      'Historial de mantenimiento ejemplar',
    ],
    image: '/images/aircraft/hawker-800xp.jpg',
    interiorImage: '/images/aircraft/hawker-800xp-interior.jpg',
  },
  {
    id: '7',
    slug: 'learjet-75',
    name: 'Learjet 75 Liberty',
    model: 'Learjet 75 Liberty',
    category: 'light',
    tagline: 'El legado de velocidad continúa',
    description:
      'El Learjet 75 Liberty representa la evolución de una leyenda. Heredero del legado de velocidad y rendimiento de Learjet, combina la eficiencia de un jet ligero con la capacidad y alcance de jets superiores.',
    specs: {
      passengers: 9,
      range: '3,778 km',
      speed: 'Mach 0.81',
      altitude: '51,000 ft',
      baggage: '1.8 m³',
    },
    features: [
      'Winglets de alto rendimiento',
      'Cabina con control de presión mejorado',
      'Sistema de entretenimiento personal',
      'Asientos de cuero artesanal',
      'Espacio de trabajo dedicado',
      'Rendimiento en pista corta superior',
    ],
    image: '/images/aircraft/learjet-75.jpg',
    interiorImage: '/images/aircraft/learjet-75-interior.jpg',
  },
]

export function getAircraftBySlug(slug: string): Aircraft | undefined {
  return aircraftData.find((aircraft) => aircraft.slug === slug)
}

export function getAircraftByCategory(
  category: Aircraft['category']
): Aircraft[] {
  return aircraftData.filter((aircraft) => aircraft.category === category)
}

export const categoryLabels: Record<Aircraft['category'], string> = {
  light: 'Jet Ligero',
  midsize: 'Jet Mediano',
  'super-midsize': 'Jet Super Mediano',
  heavy: 'Jet Pesado',
  'ultra-long-range': 'Ultra Largo Alcance',
}
