'use client'

import { useState } from 'react'
import { useListView } from '@/hooks/use-list-view'
import { EditSellerModal } from './edit-seller-modal'
import { SellerFilters } from './seller-filters'
import { SellerMobileList } from './seller-mobile-list'
import { SellersTable } from './sellers-table'
import { Pagination } from '../ui/pagination'
import type { Seller } from '@/types/seller'
import { PageHeader } from '../ui/page-header'

interface SellersViewProps {
    sellers: Seller[]
    search: string
    page: number
    totalPages: number
}

export function SellersView({ sellers, search, page, totalPages }: SellersViewProps) {
    const { items, setItems, searchInput, setSearchInput, handlePageChange } = useListView({
        items: sellers,
        search,
        page,
        totalPages,
    })

    const [editingSeller, setEditingSeller] = useState<Seller | null>(null)

    function handleConfirm(updated: Seller) {
            setItems((prev) => prev.map((op) => (op.id === updated.id ? updated : op)))
            setEditingSeller(null)
        }

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Vendedor / Vendedores"
                title="Vendedores"
                linkLabel="Ver usuarios en Dashboard"
                href={process.env.NEXT_PUBLIC_ANALYTICS_APP_URL! + "/usuarios"}
            />

            <SellerFilters searchInput={searchInput} onSearchChange={setSearchInput} />

            <div className="border border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412]">
                {items.length === 0 ? (
                    <p className="px-4 py-10 text-center text-sm text-[#5C5E56] dark:text-[#8C8E82]">
                        No se encontraron vendedores con esos criterios.
                    </p>
                ) : (
                    <>
                        <SellerMobileList items={items} onEdit={setEditingSeller} />
                        <SellersTable items={items} onEdit={setEditingSeller} />
                    </>
                )}

                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

            {editingSeller && (
                <EditSellerModal
                    seller={editingSeller}
                    onCancel={() => setEditingSeller(null)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    )
}