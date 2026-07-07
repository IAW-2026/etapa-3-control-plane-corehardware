'use client'

import { useState } from 'react'
import { useListView } from '@/hooks/use-list-view'
import { EditStatusModal } from './edit-status-modal'
import { DisputeFilters } from './dispute-filters'
import { DisputeMobileList } from './dispute-mobile-list'
import { DisputesTable } from './disputes-table'
import { Pagination } from '../ui/pagination'
import type { Dispute, DisputeStatus } from '@/types/payments'
import { PageHeader } from '../ui/page-header'

interface DisputesViewProps {
    disputes: Dispute[]
    search: string
    statusFilter: DisputeStatus | 'all'
    page: number
    totalPages: number
}

export function DisputesView({ disputes, search, statusFilter, page, totalPages }: DisputesViewProps) {
    const { items, setItems, searchInput, setSearchInput, updateParams, handlePageChange } = useListView({
        items: disputes,
        search,
        page,
        totalPages,
    })

    const [editingDispute, setEditingDispute] = useState<Dispute | null>(null)

    function handleStatusFilterChange(status: DisputeStatus | 'all') {
        updateParams({ estado: status === 'all' ? null : status, page: null })
    }

    function handleConfirm(newStatus: DisputeStatus) {
        if (!editingDispute) return
        setItems((prev) =>
            prev.map((dispute) =>
                dispute.id === editingDispute.id ? { ...dispute, estado: newStatus } : dispute
            )
        )
        setEditingDispute(null)
    }

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Pagos / Disputas"
                title="Disputas"
                linkLabel="Ver historial completo en Dashboard"
                href={process.env.NEXT_PUBLIC_ANALYTICS_APP_URL! + "/finanzas"}
            />

            <DisputeFilters
                searchInput={searchInput}
                onSearchChange={setSearchInput}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
            />

            <div className="border border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412]">
                {items.length === 0 ? (
                    <p className="px-4 py-10 text-center text-sm text-[#5C5E56] dark:text-[#8C8E82]">
                        No se encontraron disputas con esos criterios.
                    </p>
                ) : (
                    <>
                        <DisputeMobileList items={items} onEdit={setEditingDispute} />
                        <DisputesTable items={items} onEdit={setEditingDispute} />
                    </>
                )}

                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

            {editingDispute && (
                <EditStatusModal
                    dispute={editingDispute}
                    onCancel={() => setEditingDispute(null)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    )
}