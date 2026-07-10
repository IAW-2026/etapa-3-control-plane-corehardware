import { SellersView } from '@/components/seller/sellers-view'
import { getSellers } from '@/actions/seller'
import { PAGE_SIZE } from '@/lib/constants'

interface SellersPageProps {
    searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SellersPage({ searchParams }: SellersPageProps) {
    const params = await searchParams
    const search = params.q ?? ''

    const requestedPage = params.page ? parseInt(params.page, 10) : 1
    const page = Number.isFinite(requestedPage) ? Math.max(requestedPage, 1) : 1
    const offset = (page - 1) * PAGE_SIZE

    const { sellers, total } = await getSellers(search, offset, PAGE_SIZE)
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    return (
        <SellersView
            sellers={sellers}
            search={search}
            page={Math.min(page, totalPages)}
            totalPages={totalPages}
        />
    )
}