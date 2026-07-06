'use client'

import { useState } from 'react'
import { useListView } from '@/hooks/use-list-view'
import { OperatorFilters } from './operator-filters'
import { OperatorMobileList } from './operator-mobile-list'
import { OperatorTable } from './operators-table'
import { EditOperatorModal } from './edit-operator-modal'
import { Pagination } from '@/components/ui/pagination'
import type { Operator } from '@/types/shipping'
import { PageHeader } from '../ui/page-header'

interface OperatorsViewProps {
    operators: Operator[]
    search: string
    page: number
    totalPages: number
}

export function OperatorsView({ operators, search, page, totalPages }: OperatorsViewProps) {
    const { items, setItems, searchInput, setSearchInput, handlePageChange } = useListView({
        items: operators,
        search,
        page,
        totalPages,
    })

    const [editingOperator, setEditingOperator] = useState<Operator | null>(null)

    function handleConfirm(updated: Operator) {
        setItems((prev) => prev.map((op) => (op.id === updated.id ? updated : op)))
        setEditingOperator(null)
    }

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Envíos / Operadores"
                title="Operadores"
                linkLabel="Ver en Dashboard"
                href={process.env.NEXT_PUBLIC_ANALYTICS_APP_URL! + "/usuarios"}
            />

            <OperatorFilters searchInput={searchInput} onSearchChange={setSearchInput} />

            <div className="border border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412]">
                {items.length === 0 ? (
                    <p className="px-4 py-10 text-center text-sm text-[#5C5E56] dark:text-[#8C8E82]">
                        No se encontraron operadores con esos criterios.
                    </p>
                ) : (
                    <>
                        <OperatorMobileList items={items} onEdit={setEditingOperator} />
                        <OperatorTable items={items} onEdit={setEditingOperator} />
                    </>
                )}

                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

            {editingOperator && (
                <EditOperatorModal
                    operator={editingOperator}
                    onCancel={() => setEditingOperator(null)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    )
}