import { OperatorsView } from '@/components/shipping/operators-view'
import { getOperators } from '@/actions/shipping'
import { PAGE_SIZE } from '@/lib/constants'

interface OperatorsPageProps {
    searchParams: Promise<{ q?: string; page?: string }>
}

export default async function OperatorsPage({ searchParams }: OperatorsPageProps) {
    const params = await searchParams
    const search = params.q ?? ''

    const requestedPage = params.page ? parseInt(params.page, 10) : 1
    const page = Number.isFinite(requestedPage) ? Math.max(requestedPage, 1) : 1
    const offset = (page - 1) * PAGE_SIZE

    const { operators, total } = await getOperators(search, offset, PAGE_SIZE)
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    return (
        <OperatorsView
            operators={operators}
            search={search}
            page={Math.min(page, totalPages)}
            totalPages={totalPages}
        />
    )
}