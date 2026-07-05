'use client'

import { Search } from 'lucide-react'
import { DISPUTE_STATUSES, STATUS_LABELS, type DisputeStatus } from '@/types/payments'

interface DisputeFiltersProps {
    searchInput: string
    onSearchChange: (value: string) => void
    statusFilter: DisputeStatus | 'all'
    onStatusFilterChange: (status: DisputeStatus | 'all') => void
}

export function DisputeFilters({
    searchInput,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
}: DisputeFiltersProps) {
    return (
        // El corte a fila se hace en lg (no sm): en anchos intermedios, compartir
        // fila con los botones de estado hacía que el buscador (flex-1) se
        // achicara casi a desaparecer. Antes de lg, todo apilado full-width.
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:w-72 lg:flex-shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6D64] dark:text-[#8C8E82]" />
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar por ID de disputa"
                    className="w-full pl-9 pr-3 py-2 border border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412] text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    aria-pressed={statusFilter === 'all'}
                    onClick={() => onStatusFilterChange('all')}
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border transition-colors ${
                        statusFilter === 'all'
                            ? 'border-[#1A1A18] dark:border-[#EDECE6] bg-[#1A1A18] dark:bg-[#EDECE6] text-white dark:text-[#141412]'
                            : 'border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412] text-[#5C5E56] dark:text-[#8C8E82] hover:border-[#1A1A18] dark:hover:border-[#EDECE6]'
                    }`}
                >
                    Todas
                </button>
                {DISPUTE_STATUSES.map((status) => (
                    <button
                        key={status}
                        type="button"
                        aria-pressed={statusFilter === status}
                        onClick={() => onStatusFilterChange(status)}
                        className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border transition-colors ${
                            statusFilter === status
                                ? 'border-[#1A1A18] dark:border-[#EDECE6] bg-[#1A1A18] dark:bg-[#EDECE6] text-white dark:text-[#141412]'
                                : 'border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412] text-[#5C5E56] dark:text-[#8C8E82] hover:border-[#1A1A18] dark:hover:border-[#EDECE6]'
                        }`}
                    >
                        {STATUS_LABELS[status]}
                    </button>
                ))}
            </div>
        </div>
    )
}