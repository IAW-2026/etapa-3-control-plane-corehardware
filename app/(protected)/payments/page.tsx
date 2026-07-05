import { DisputesView } from '@/components/payments/disputes-view'
import { PAGE_SIZE } from '@/lib/constants'
import { DISPUTE_STATUSES, type Dispute, type DisputeStatus } from '@/types/payments'

const mockDisputes: Dispute[] = [
    {
        id: 'clx1a2b3c4d5e6f7g8h9i0j1',
        clerkUserId: 'user_2abcXYZ',
        pedidoId: 'ped_10234',
        pagoId: 'pag_88213',
        fechaDeInicio: '2026-06-18T10:00:00.000Z',
        fechaDeFinalizacion: null,
        estado: 'pendiente',
        descripcion:
            'El producto llegó dañado y el vendedor no responde los mensajes desde hace 5 días.',
    },
    {
        id: 'clx2b3c4d5e6f7g8h9i0j1k2',
        clerkUserId: 'user_2defXYZ',
        pedidoId: 'ped_10289',
        pagoId: 'pag_88240',
        fechaDeInicio: '2026-06-10T14:30:00.000Z',
        fechaDeFinalizacion: '2026-06-15T09:15:00.000Z',
        estado: 'reembolsada',
        descripcion: 'Pedido nunca llegó, el tracking se detuvo hace dos semanas.',
    },
    {
        id: 'clx3c4d5e6f7g8h9i0j1k2l3',
        clerkUserId: 'user_2ghiXYZ',
        pedidoId: 'ped_10301',
        pagoId: 'pag_88266',
        fechaDeInicio: '2026-06-25T08:45:00.000Z',
        fechaDeFinalizacion: null,
        estado: 'repuesta',
        descripcion: 'El comprador dice que la talla no coincide con la publicada.',
    },
    {
        id: 'clx4d5e6f7g8h9i0j1k2l3m4',
        clerkUserId: 'user_2jklXYZ',
        pedidoId: 'ped_10315',
        pagoId: 'pag_88290',
        fechaDeInicio: '2026-06-02T11:20:00.000Z',
        fechaDeFinalizacion: '2026-06-08T16:00:00.000Z',
        estado: 'rechazada',
        descripcion:
            'Reclamo sin evidencia suficiente, el vendedor presentó comprobante de entrega firmado.',
    },
]

function isDisputeStatus(value: string): value is DisputeStatus {
    return (DISPUTE_STATUSES as string[]).includes(value)
}

// Simula lo que en producción sería una llamada a la API con estos mismos
// parámetros (GET /disputes?estado=...&q=...). El día que exista la API real,
// esta función se reemplaza por ese fetch y ni page.tsx ni DisputesView
// cambian su contrato de props.
function getFilteredDisputes(search: string, statusFilter: DisputeStatus | 'all'): Dispute[] {
    const term = search.trim().toLowerCase()
    return mockDisputes.filter((dispute) => {
        const matchesSearch = term === '' || dispute.id.toLowerCase().includes(term)
        const matchesStatus = statusFilter === 'all' || dispute.estado === statusFilter
        return matchesSearch && matchesStatus
    })
}

interface PaymentsPageProps {
    searchParams: Promise<{ q?: string; estado?: string; page?: string }>
}

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
    const params = await searchParams
    const search = params.q ?? ''
    const statusFilter: DisputeStatus | 'all' =
        params.estado && isDisputeStatus(params.estado) ? params.estado : 'all'
 
    const filtered = getFilteredDisputes(search, statusFilter)
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const requestedPage = params.page ? parseInt(params.page, 10) : 1
    const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1
    const disputes = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
 
    return (
        <DisputesView
            disputes={disputes}
            search={search}
            statusFilter={statusFilter}
            page={page}
            totalPages={totalPages}
        />
    )
}