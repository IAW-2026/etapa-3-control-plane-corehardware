import { BuyersView } from '@/components/buyer/buyers-view'
import { getBuyers } from '@/actions/buyer'
import { PAGE_SIZE } from '@/lib/constants'

interface BuyersPageProps {
    searchParams: Promise<{ q?: string; page?: string }>
}

export default async function BuyersPage({ searchParams }: BuyersPageProps) {
    const params = await searchParams
    const search = params.q ?? ''

    const requestedPage = params.page ? parseInt(params.page, 10) : 1
    const page = Number.isFinite(requestedPage) ? Math.max(requestedPage, 1) : 1
    const offset = (page - 1) * PAGE_SIZE

    const { buyers, total } = await getBuyers(search, offset, PAGE_SIZE)
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    return (
        <BuyersView
            buyers={buyers}
            search={search}
            page={Math.min(page, totalPages)}
            totalPages={totalPages}
        />
    )
}