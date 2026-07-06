'use client'

import { Search } from 'lucide-react'

interface BuyersFiltersProps {
    searchInput: string
    onSearchChange: (value: string) => void
}

export function BuyerFilters({ searchInput, onSearchChange }: BuyersFiltersProps) {
    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:w-72 lg:flex-shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6D64] dark:text-[#8C8E82]" />
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar por ID de comprador"
                    className="w-full pl-9 pr-3 py-2 border border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412] text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                />
            </div>
        </div>
    )
}