import { DisputesView } from '@/components/payments/disputes-view'
import { getDisputes } from '@/actions/payments'
import { PAGE_SIZE } from '@/lib/constants'
import { DISPUTE_STATUSES, type DisputeStatus } from '@/types/payments'

function isDisputeStatus(value: string): value is DisputeStatus {
    return (DISPUTE_STATUSES as string[]).includes(value)
}

interface PaymentsPageProps {
    searchParams: Promise<{ q?: string; estado?: string; page?: string }>
}

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
    const params = await searchParams
    const search = params.q ?? ''
    const statusFilter: DisputeStatus | 'all' =
        params.estado && isDisputeStatus(params.estado) ? params.estado : 'all'

    const requestedPage = params.page ? parseInt(params.page, 10) : 1
    const page = Number.isFinite(requestedPage) ? Math.max(requestedPage, 1) : 1
    const offset = (page - 1) * PAGE_SIZE

    const { disputes, total } = await getDisputes(search, statusFilter, offset, PAGE_SIZE)
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    return (
        <DisputesView
            disputes={disputes}
            search={search}
            statusFilter={statusFilter}
            page={Math.min(page, totalPages)}
            totalPages={totalPages}
        />
    )
}