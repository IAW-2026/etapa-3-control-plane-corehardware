'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-[#D3D2C9] dark:border-[#2A2A26]">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82]">
                Página {page} de {totalPages}
            </span>
            <div className="flex gap-2">
                <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                    <ChevronLeft className="w-3 h-3" />
                    Anterior
                </button>
                <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                    Siguiente
                    <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    )
}