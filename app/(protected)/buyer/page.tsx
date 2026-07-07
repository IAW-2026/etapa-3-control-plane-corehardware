import { BuyersView } from '@/components/buyer/buyers-view'
import { PAGE_SIZE } from '@/lib/constants'
import { Buyer } from '@/types/buyer'

const mockBuyers: Buyer[] = [
    {
        id: "cl7v1x2a0000008mih7b3h9za",
        dni: "35444222",
        cuilCuit: "20354442221",
        apellido: "González",
        nombre: "Juan Pablo",
        sexo: "Masculino",
        direccion: "Av. Corrientes 1234, CABA",
        mail: "juan.gonzalez@email.com",
        celular: "1155667788",
        fechaNacimiento: "1990-05-15",
        nacionalidad: "Argentina",
        condicionIva: "Responsable Inscripto",
        clerkUserId: "user_2aB1c2D3e4F5g6H7i8J9k0L",
        isDeleted: false,
        perfilCompleto: true
    },
    {
        id: "cl7v1x2a0000108mih7b3h9zb",
        dni: "28999111",
        cuilCuit: "27289991114",
        apellido: "Martínez",
        nombre: "Laura",
        sexo: "Femenino",
        direccion: "Calle Falsa 742, Córdoba",
        mail: "laura.mtz@email.com",
        celular: "3514443322",
        fechaNacimiento: "1982-11-02",
        nacionalidad: "Argentina",
        condicionIva: "Consumidor Final",
        clerkUserId: "user_9zY8x7W6v5U4t3S2r1Q0p",
        isDeleted: false,
        perfilCompleto: true
    },
    {
        id: "cl7v1x2a0000208mih7b3h9zc",
        dni: "41000555",
        cuilCuit: "20410005559",
        apellido: "Sánchez",
        nombre: "Carlos",
        sexo: "Masculino",
        direccion: "Rivadavia 500, Rosario",
        mail: "carlos.sanchez@email.com",
        celular: "3412229988",
        fechaNacimiento: "2001-08-20",
        nacionalidad: "Argentina",
        condicionIva: "Monotributista",
        clerkUserId: "user_1aB2c3D4e5F6g7H8i9J0k1L",
        isDeleted: false,
        perfilCompleto: true
    },
    {
        id: "cl7v1x2a0000308mih7b3h9zd",
        dni: "30555666",
        cuilCuit: "20305556662",
        apellido: "Rodríguez",
        nombre: "Ana",
        sexo: "Femenino",
        direccion: "San Martín 100, Mendoza",
        mail: "ana.rodriguez@email.com",
        celular: "2614445566",
        fechaNacimiento: "1995-09-30",
        nacionalidad: "Argentina",
        condicionIva: "Responsable Inscripto",
        clerkUserId: "user_5mN4oP3qR2sT1uV0wX9yZ",
        isDeleted: false,
        perfilCompleto: true
    }
]

function getFilteredBuyers(search: string): Buyer[] {
    const term = search.trim().toLowerCase()
    return mockBuyers.filter((buyer) => term === '' || buyer.id.toLowerCase().includes(term))
}

interface BuyersPageProps {
    searchParams: Promise<{ q?: string; page?: string }>
}

export default async function BuyersPage({ searchParams }: BuyersPageProps) {
    const params = await searchParams
    const search = params.q ?? ''

    const filtered = getFilteredBuyers(search)
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const requestedPage = params.page ? parseInt(params.page, 10) : 1
    const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1
    const buyers = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return <BuyersView buyers={buyers} search={search} page={page} totalPages={totalPages} />
}