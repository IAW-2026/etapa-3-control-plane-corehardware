'use client'

import { useState } from 'react'
import { useListView } from '@/hooks/use-list-view'
import { EditBuyerModal } from './edit-buyer-modal'
import { BuyerFilters } from './buyer-filters'
import { BuyerMobileList } from './buyer-mobile-list'
import { BuyersTable } from './buyers-table'
import { Pagination } from '../ui/pagination'
import type { Buyer, BuyerUpdatableFields } from '@/types/buyer'
import { PageHeader } from '../ui/page-header'
import { updateBuyer } from '@/actions/buyer'

interface BuyersViewProps {
    buyers: Buyer[]
    search: string
    page: number
    totalPages: number
}

export function BuyersView({ buyers, search, page, totalPages }: BuyersViewProps) {
    const { items, setItems, searchInput, setSearchInput, handlePageChange } = useListView({
        items: buyers,
        search,
        page,
        totalPages,
    })

    const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    function handleCancel() {
        setEditingBuyer(null)
        setError(null)
        setIsSuccess(false)
    }

    async function handleConfirm(changes: Partial<BuyerUpdatableFields>) {
        if (!editingBuyer) return
        setIsSubmitting(true)
        setError(null)
        try {
            const updated = await updateBuyer(editingBuyer.id, changes)
            setItems((prev) => prev.map((buyer) => (buyer.id === updated.id ? updated : buyer)))
            setIsSubmitting(false)
            setIsSuccess(true)
        } catch {
            setError('No se pudo actualizar el comprador. Intentá de nuevo.')
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Comprador / Compradores"
                title="Compradores"
                linkLabel="Ver usuarios en Dashboard"
                href={process.env.NEXT_PUBLIC_ANALYTICS_APP_URL! + "/usuarios"}
            />

            <BuyerFilters searchInput={searchInput} onSearchChange={setSearchInput} />

            <div className="border border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412]">
                {items.length === 0 ? (
                    <p className="px-4 py-10 text-center text-sm text-[#5C5E56] dark:text-[#8C8E82]">
                        No se encontraron compradores con esos criterios.
                    </p>
                ) : (
                    <>
                        <BuyerMobileList items={items} onEdit={setEditingBuyer} />
                        <BuyersTable items={items} onEdit={setEditingBuyer} />
                    </>
                )}

                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

            {editingBuyer && (
                <EditBuyerModal
                    buyer={editingBuyer}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    isSubmitting={isSubmitting}
                    error={error}
                    isSuccess={isSuccess}
                />
            )}
        </div>
    )
}