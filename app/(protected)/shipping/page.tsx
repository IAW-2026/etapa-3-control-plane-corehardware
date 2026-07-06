import { OperatorsView } from '@/components/shipping/operators-view'
import { PAGE_SIZE } from '@/lib/constants'
import type { Operator } from '@/types/shipping'

const mockOperators: Operator[] = [
    {
        id: 'clx5e6f7g8h9i0j1k2l3m4n5',
        clerkUserId: 'user_3abcXYZ',
        dni: '30123456',
        cuilCuit: '20301234567',
        apellido: 'Gómez',
        nombre: 'Martín',
        sexo: 'M',
        direccion: 'Av. Colón 450, Bahía Blanca',
        mail: 'martin.gomez@example.com',
        celular: '+54 291 400-1234',
        fechaNacimiento: '1988-04-12T00:00:00.000Z',
        nacionalidad: 'Argentina',
        isDeleted: false,
    },
    {
        id: 'clx6f7g8h9i0j1k2l3m4n5o6',
        clerkUserId: 'user_3defXYZ',
        dni: '28456789',
        cuilCuit: '27284567890',
        apellido: 'Fernández',
        nombre: 'Lucía',
        sexo: 'F',
        direccion: 'Calle 9 de Julio 1230, Bahía Blanca',
        mail: 'lucia.fernandez@example.com',
        celular: '+54 291 400-5678',
        fechaNacimiento: '1991-09-03T00:00:00.000Z',
        nacionalidad: 'Argentina',
        isDeleted: false,
    },
    {
        id: 'clx7g8h9i0j1k2l3m4n5o6p7',
        clerkUserId: 'user_3ghiXYZ',
        dni: '25789012',
        cuilCuit: '20257890123',
        apellido: 'Silva',
        nombre: 'Diego',
        sexo: 'M',
        direccion: 'Ruta 3 Km 8, Bahía Blanca',
        mail: 'diego.silva@example.com',
        celular: '+54 291 400-9012',
        fechaNacimiento: '1985-01-20T00:00:00.000Z',
        nacionalidad: 'Argentina',
        isDeleted: true,
    },
    {
        id: 'clx8h9i0j1k2l3m4n5o6p7q8',
        clerkUserId: 'user_3jklXYZ',
        dni: '32901234',
        cuilCuit: '27329012345',
        apellido: 'Rodríguez',
        nombre: 'Valentina',
        sexo: 'F',
        direccion: 'Alsina 78, Bahía Blanca',
        mail: 'valentina.rodriguez@example.com',
        celular: '+54 291 400-3456',
        fechaNacimiento: '1994-11-30T00:00:00.000Z',
        nacionalidad: 'Argentina',
        isDeleted: false,
    },
]

function getFilteredOperators(search: string): Operator[] {
    const term = search.trim().toLowerCase()
    return mockOperators.filter((operator) => term === '' || operator.id.toLowerCase().includes(term))
}

interface OperatorsPageProps {
    searchParams: Promise<{ q?: string; page?: string }>
}

export default async function OperatorsPage({ searchParams }: OperatorsPageProps) {
    const params = await searchParams
    const search = params.q ?? ''

    const filtered = getFilteredOperators(search)
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const requestedPage = params.page ? parseInt(params.page, 10) : 1
    const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1
    const operators = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return <OperatorsView operators={operators} search={search} page={page} totalPages={totalPages} />
}