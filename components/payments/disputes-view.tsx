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
import { updateDisputeStatus } from '@/actions/payments'

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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    function handleStatusFilterChange(status: DisputeStatus | 'all') {
        updateParams({ estado: status === 'all' ? null : status, page: null })
    }

    function handleCancel() {
        setEditingDispute(null)
        setError(null)
        setIsSuccess(false)
    }

    async function handleConfirm(newStatus: DisputeStatus) {
        if (!editingDispute) return
        setIsSubmitting(true)
        setError(null)
        try {
            const updated = await updateDisputeStatus(editingDispute.id, newStatus)
            setItems((prev) =>
                prev.map((dispute) => (dispute.id === updated.id ? updated : dispute))
            )
            setIsSubmitting(false)
            setIsSuccess(true)
        } catch {
            setError('No se pudo actualizar el estado. Intentá de nuevo.')
            setIsSubmitting(false)
        }
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