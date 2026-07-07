'use client'

import { Pencil } from 'lucide-react'
import type { Operator } from '@/types/shipping'
import { shortId } from '@/lib/format'

interface OperatorMobileListProps {
    items: Operator[]
    onEdit: (operator: Operator) => void
}

export function OperatorMobileList({ items, onEdit }: OperatorMobileListProps) {
    return (
        <ul className="lg:hidden divide-y divide-[#D3D2C9] dark:divide-[#2A2A26]">
            {items.map((operator) => (
                <li key={operator.id} className="px-4 py-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium">
                            {operator.apellido}, {operator.nombre}
                        </span>
                        <span
                            title={operator.id}
                            className="font-mono text-[10px] text-[#5C5E56] dark:text-[#8C8E82] whitespace-nowrap"
                        >
                            {shortId(operator.id)}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span className="block text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82]">
                                DNI
                            </span>
                            {operator.dni}
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82]">
                                Celular
                            </span>
                            {operator.celular}
                        </div>
                        <div className="col-span-2">
                            <span className="block text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82]">
                                Mail
                            </span>
                            {operator.mail}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => onEdit(operator)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.15em] border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors"
                    >
                        <Pencil className="w-3 h-3" />
                        Editar
                    </button>
                </li>
            ))}
        </ul>
    )
}