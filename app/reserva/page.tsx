import { Metadata } from 'next'
import { ReservationForm } from '@/components/reservation/reservation-form'

export const metadata: Metadata = {
  title: 'Reservar Vuelo',
  description:
    'Reserve su vuelo privado con Aerolínea Santander. Complete nuestro formulario y nuestro equipo VIP se pondrá en contacto en menos de 1 hora.',
}

export default function ReservaPage() {
  return <ReservationForm />
}
