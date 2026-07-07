import { SellersView } from '@/components/seller/sellers-view'
import { PAGE_SIZE } from '@/lib/constants'
import { Seller } from '@/types/seller'

const mockSellers: Seller[] = [
    {
        id: "clmn5d2a8000008l65n2e9k4p",
        cuit: "30-71123456-7",
        name: "Distribuidora del Sur S.A.",
        address: "Av. Rivadavia 1234, Bahía Blanca",
        email: "contacto@distribuidorasur.com",
        phoneNumber: "+542914000000",
        startOfActivities: "2015-05-20",
        VATCondition: "Responsable Inscripto",
        clerkUserId: "user_abc_123",
        isDeleted: false
    },
    {
        id: "clmn5d2a8000008l65n2e9k4q",
        cuit: "20-25444888-2",
        name: "Juan Pérez",
        address: "Calle Falsa 742, CABA",
        email: "juan.perez@email.com",
        phoneNumber: "+541155554444",
        startOfActivities: "2026-01-15",
        VATCondition: "Monotributista",
        clerkUserId: "user_def_456",
        isDeleted: false
    },
    {
        id: "clmn5d2a8000008l65n2e9k4r",
        cuit: "30-70888999-3",
        name: "Tech Solutions SRL",
        address: "Parque Industrial, Bahía Blanca",
        email: "ventas@techsolutions.ar",
        phoneNumber: "+542914111111",
        startOfActivities: "2020-11-02",
        VATCondition: "Responsable Inscripto",
        clerkUserId: "user_xyz_789",
        isDeleted: false
    },
    {
        id: "clmn5d2a8000008l65n2e9k4s",
        cuit: "27-30111222-4",
        name: "Almacén La Esquina",
        address: "Belgrano 500, Bahía Blanca",
        email: "almacen.esquina@mail.com",
        phoneNumber: "+542914222222",
        startOfActivities: "2010-03-10",
        VATCondition: "Exento",
        clerkUserId: "user_ghi_012",
        isDeleted: false
    }
]

function getFilteredSellers(search: string): Seller[] {
    const term = search.trim().toLowerCase()
    return mockSellers.filter((seller) => term === '' || seller.id.toLowerCase().includes(term))
}

interface SellersPageProps {
    searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SellersPage({ searchParams }: SellersPageProps) {
    const params = await searchParams
    const search = params.q ?? ''

    const filtered = getFilteredSellers(search)
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const requestedPage = params.page ? parseInt(params.page, 10) : 1
    const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1
    const sellers = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return <SellersView sellers={sellers} search={search} page={page} totalPages={totalPages} />
}