'use client'

import { useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { EditStatusModal } from './edit-status-modal'
import { DisputeFilters } from './dispute-filters'
import { DisputeMobileList } from './dispute-mobile-list'
import { DisputesTable } from './disputes-table'
import { DisputePagination } from './dispute-pagination'
import type { Dispute, DisputeStatus } from '@/types/payments'

interface DisputesViewProps {
    disputes: Dispute[]
    search: string
    statusFilter: DisputeStatus | 'all'
    page: number
    totalPages: number
}

export function DisputesView({ disputes, search, statusFilter, page, totalPages }: DisputesViewProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [, startTransition] = useTransition()

    // Estado puramente de UI: qué disputa se edita.
    // Nunca decide qué disputas se muestran — eso lo resuelve page.tsx.
    const [editingDispute, setEditingDispute] = useState<Dispute | null>(null)

    // Overlay local para reflejar el cambio de estado al instante (mock, sin API).
    const [items, setItems] = useState(disputes)
    useEffect(() => {
        setItems(disputes)
    }, [disputes])

    // Input de búsqueda con debounce hacia la URL, que es la fuente de verdad.
    const [searchInput, setSearchInput] = useState(search)
    useEffect(() => {
        setSearchInput(search)
    }, [search])

    useEffect(() => {
        const handle = setTimeout(() => {
            if (searchInput === search) return
            updateParams({ q: searchInput || null, page: null })
        }, 300)
        return () => clearTimeout(handle)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput])

    function updateParams(next: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString())
        for (const [key, value] of Object.entries(next)) {
            if (value === null || value === '') {
                params.delete(key)
            } else {
                params.set(key, value)
            }
        }
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`)
        })
    }

    function handleStatusFilterChange(status: DisputeStatus | 'all') {
        // Cambiar el filtro invalida la página actual.
        updateParams({ estado: status === 'all' ? null : status, page: null })
    }

    function handlePageChange(newPage: number) {
        if (newPage < 1 || newPage > totalPages || newPage === page) return
        updateParams({ page: newPage === 1 ? null : String(newPage) })
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
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#5C5E56] dark:text-[#8C8E82]">
                        Pagos / Disputas
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1">
                        Disputas
                    </h1>
                </div>
                <Link
                    href={process.env.NEXT_PUBLIC_ANALYTICS_APP_URL!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-xs uppercase tracking-wide text-[#5C5E56] dark:text-[#8C8E82] hover:text-[#C1440E] dark:hover:text-[#E0662B] transition-colors"
                >
                    Ver historial completo en Dashboard
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

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

                <DisputePagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
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