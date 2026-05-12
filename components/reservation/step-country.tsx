'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const countries = [
  { name: 'Afganistán', code: 'AF' },
  { name: 'Albania', code: 'AL' },
  { name: 'Alemania', code: 'DE' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Antigua y Barbuda', code: 'AG' },
  { name: 'Arabia Saudita', code: 'SA' },
  { name: 'Argelia', code: 'DZ' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaiyán', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bangladés', code: 'BD' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Baréin', code: 'BH' },
  { name: 'Bélgica', code: 'BE' },
  { name: 'Belice', code: 'BZ' },
  { name: 'Benín', code: 'BJ' },
  { name: 'Bielorrusia', code: 'BY' },
  { name: 'Birmania', code: 'MM' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Bosnia y Herzegovina', code: 'BA' },
  { name: 'Botsuana', code: 'BW' },
  { name: 'Brasil', code: 'BR' },
  { name: 'Brunéi', code: 'BN' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Bután', code: 'BT' },
  { name: 'Cabo Verde', code: 'CV' },
  { name: 'Camboya', code: 'KH' },
  { name: 'Camerún', code: 'CM' },
  { name: 'Canadá', code: 'CA' },
  { name: 'Catar', code: 'QA' },
  { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Chipre', code: 'CY' },
  { name: 'Ciudad del Vaticano', code: 'VA' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Comoras', code: 'KM' },
  { name: 'Corea del Norte', code: 'KP' },
  { name: 'Corea del Sur', code: 'KR' },
  { name: 'Costa de Marfil', code: 'CI' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Croacia', code: 'HR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Dinamarca', code: 'DK' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Egipto', code: 'EG' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Emiratos Árabes Unidos', code: 'AE' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Eslovaquia', code: 'SK' },
  { name: 'Eslovenia', code: 'SI' },
  { name: 'España', code: 'ES' },
  { name: 'Estados Unidos', code: 'US' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Etiopía', code: 'ET' },
  { name: 'Filipinas', code: 'PH' },
  { name: 'Finlandia', code: 'FI' },
  { name: 'Fiyi', code: 'FJ' },
  { name: 'Francia', code: 'FR' },
  { name: 'Gabón', code: 'GA' },
  { name: 'Gambia', code: 'GM' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Granada', code: 'GD' },
  { name: 'Grecia', code: 'GR' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Guinea Ecuatorial', code: 'GQ' },
  { name: 'Guinea-Bisáu', code: 'GW' },
  { name: 'Haití', code: 'HT' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Hungría', code: 'HU' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Irak', code: 'IQ' },
  { name: 'Irán', code: 'IR' },
  { name: 'Irlanda', code: 'IE' },
  { name: 'Islandia', code: 'IS' },
  { name: 'Islas Marshall', code: 'MH' },
  { name: 'Islas Salomón', code: 'SB' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italia', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japón', code: 'JP' },
  { name: 'Jordania', code: 'JO' },
  { name: 'Kazajistán', code: 'KZ' },
  { name: 'Kenia', code: 'KE' },
  { name: 'Kirguistán', code: 'KG' },
  { name: 'Kiribati', code: 'KI' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Laos', code: 'LA' },
  { name: 'Lesoto', code: 'LS' },
  { name: 'Letonia', code: 'LV' },
  { name: 'Líbano', code: 'LB' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Libia', code: 'LY' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lituania', code: 'LT' },
  { name: 'Luxemburgo', code: 'LU' },
  { name: 'Macedonia del Norte', code: 'MK' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Malasia', code: 'MY' },
  { name: 'Malaui', code: 'MW' },
  { name: 'Maldivas', code: 'MV' },
  { name: 'Malí', code: 'ML' },
  { name: 'Malta', code: 'MT' },
  { name: 'Marruecos', code: 'MA' },
  { name: 'Mauricio', code: 'MU' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'México', code: 'MX' },
  { name: 'Micronesia', code: 'FM' },
  { name: 'Moldavia', code: 'MD' },
  { name: 'Mónaco', code: 'MC' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Montenegro', code: 'ME' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Nauru', code: 'NR' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Níger', code: 'NE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Noruega', code: 'NO' },
  { name: 'Nueva Zelanda', code: 'NZ' },
  { name: 'Omán', code: 'OM' },
  { name: 'Países Bajos', code: 'NL' },
  { name: 'Pakistán', code: 'PK' },
  { name: 'Palaos', code: 'PW' },
  { name: 'Panamá', code: 'PA' },
  { name: 'Papúa Nueva Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Perú', code: 'PE' },
  { name: 'Polonia', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Reino Unido', code: 'GB' },
  { name: 'República Centroafricana', code: 'CF' },
  { name: 'República Checa', code: 'CZ' },
  { name: 'República del Congo', code: 'CG' },
  { name: 'República Democrática del Congo', code: 'CD' },
  { name: 'República Dominicana', code: 'DO' },
  { name: 'Ruanda', code: 'RW' },
  { name: 'Rumania', code: 'RO' },
  { name: 'Rusia', code: 'RU' },
  { name: 'Samoa', code: 'WS' },
  { name: 'San Cristóbal y Nieves', code: 'KN' },
  { name: 'San Marino', code: 'SM' },
  { name: 'San Vicente y las Granadinas', code: 'VC' },
  { name: 'Santa Lucía', code: 'LC' },
  { name: 'Santo Tomé y Príncipe', code: 'ST' },
  { name: 'Senegal', code: 'SN' },
  { name: 'Serbia', code: 'RS' },
  { name: 'Seychelles', code: 'SC' },
  { name: 'Sierra Leona', code: 'SL' },
  { name: 'Singapur', code: 'SG' },
  { name: 'Siria', code: 'SY' },
  { name: 'Somalia', code: 'SO' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Suazilandia', code: 'SZ' },
  { name: 'Sudáfrica', code: 'ZA' },
  { name: 'Sudán', code: 'SD' },
  { name: 'Sudán del Sur', code: 'SS' },
  { name: 'Suecia', code: 'SE' },
  { name: 'Suiza', code: 'CH' },
  { name: 'Surinam', code: 'SR' },
  { name: 'Tailandia', code: 'TH' },
  { name: 'Tanzania', code: 'TZ' },
  { name: 'Tayikistán', code: 'TJ' },
  { name: 'Timor Oriental', code: 'TL' },
  { name: 'Togo', code: 'TG' },
  { name: 'Tonga', code: 'TO' },
  { name: 'Trinidad y Tobago', code: 'TT' },
  { name: 'Túnez', code: 'TN' },
  { name: 'Turkmenistán', code: 'TM' },
  { name: 'Turquía', code: 'TR' },
  { name: 'Tuvalu', code: 'TV' },
  { name: 'Ucrania', code: 'UA' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Uzbekistán', code: 'UZ' },
  { name: 'Vanuatu', code: 'VU' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Yemen', code: 'YE' },
  { name: 'Yibuti', code: 'DJ' },
  { name: 'Zambia', code: 'ZM' },
  { name: 'Zimbabue', code: 'ZW' },
]

interface StepCountryProps {
  data: ReservationData
  updateData: (updates: Partial<ReservationData>) => void
  onNext: () => void
}

export function StepCountry({ data, updateData, onNext }: StepCountryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredCountries = useMemo(() => {
    return countries.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleSelect = (countryName: string) => {
    updateData({ country: countryName })
    setSearchTerm(countryName)
    setIsOpen(false)
    
    // SEO URL logic
    const slug = countryName.toLowerCase()
      .replace(/ /g, '-')
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    const newPath = `/reserva/${slug}-reserva-de-vuelo`
    window.history.pushState({ path: newPath }, '', newPath)
  }

  const selectedCountry = countries.find(c => c.name === data.country)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      <div className="text-center">
        <span className="text-sm font-bold text-champagne uppercase tracking-[0.2em] mb-2 block">
          Paso 1 de 5
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-champagne mb-4 font-bold">
          ¿Desde qué país viaja?
        </h2>
        <p className="text-burgundy/60 max-w-lg mx-auto font-medium">
          Seleccione su país de residencia o ubicación actual para personalizar su experiencia de vuelo privado.
        </p>
      </div>

      <div className="relative max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Icon icon="ph:globe-hemisphere-west-light" className="w-5 h-5 text-burgundy/40" />
          </div>
          <input
            type="text"
            placeholder="Buscar país..."
            value={searchTerm}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-burgundy/5 border border-burgundy/10 rounded-xl text-burgundy placeholder:text-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition-all font-medium"
          />
          {data.country && (
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-[100] left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-white border border-burgundy/10 rounded-xl shadow-2xl"
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => handleSelect(c.name)}
                  className="w-full text-left px-6 py-3 hover:bg-burgundy/5 text-burgundy transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-[10px] text-burgundy/30 group-hover:text-burgundy/60">{c.code}</span>
                </button>
              ))
            ) : (
              <div className="px-6 py-4 text-burgundy/40 text-sm">No se encontraron resultados</div>
            )}
          </motion.div>
        )}
      </div>

      {data.country && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto p-8 bg-burgundy/[0.02] border border-burgundy/5 rounded-2xl text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center">
              <Icon icon="ph:info-light" className="w-6 h-6 text-champagne" />
            </div>
          </div>
          <h4 className="font-serif text-xl text-champagne mb-3">Vuelos Privados en {data.country}</h4>
          <p className="text-sm text-burgundy/70 leading-relaxed font-medium">
            Ofrecemos servicios de aviación ejecutiva de primer nivel en todo {data.country}. 
            Nuestra flota está lista para conectar {data.country} con cualquier destino global, 
            garantizando privacidad, seguridad y un servicio inigualable. Reserve su vuelo hoy mismo 
            y experimente la excelencia de Aerolíneas Santander.
          </p>
        </motion.div>
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={onNext}
          disabled={!data.country}
          className="group flex items-center gap-3 bg-burgundy text-white px-12 py-4 rounded-none text-sm uppercase tracking-[0.2em] font-bold hover:bg-burgundy/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continuar</span>
          <Icon icon="ph:arrow-right-light" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  )
}
