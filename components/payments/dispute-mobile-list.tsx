'use client'

import { Pencil } from 'lucide-react'
import { StatusBadge } from './status-badge'
import { DisputeDescription } from './dispute-description'
import type { Dispute } from '@/types/payments'
import { formatDate, shortId } from '@/lib/format'

interface DisputeMobileListProps {
    items: Dispute[]
    onEdit: (dispute: Dispute) => void
}

export function DisputeMobileList({ items, onEdit }: DisputeMobileListProps) {
    return (
        <ul className="lg:hidden divide-y divide-[#D3D2C9] dark:divide-[#2A2A26]">
            {items.map((dispute) => (
                <li key={dispute.id} className="px-4 py-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <span
                            title={dispute.id}
                            className="font-mono text-xs text-[#5C5E56] dark:text-[#8C8E82] whitespace-nowrap"
                        >
                            {shortId(dispute.id)}
                        </span>
                        <span className="shrink-0">
                            <StatusBadge status={dispute.estado} />
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span className="block text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82]">
                                Inicio
                            </span>
                            {formatDate(dispute.fechaDeInicio)}
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82]">
                                Fin
                            </span>
                            {formatDate(dispute.fechaDeFinalizacion)}
                        </div>
                    </div>

                    <div>
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] mb-1">
                            Descripción
                        </span>
                        <DisputeDescription description={dispute.descripcion ?? '—'} />
                    </div>

                    <button
                        type="button"
                        onClick={() => onEdit(dispute)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.15em] border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors"
                    >
                        <Pencil className="w-3 h-3" />
                        Cambiar estado
                    </button>
                </li>
            ))}
        </ul>
    )
}