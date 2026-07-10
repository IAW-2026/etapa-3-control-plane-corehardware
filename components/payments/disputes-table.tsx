'use client'

import { Pencil } from 'lucide-react'
import { StatusBadge } from './status-badge'
import { DisputeDescription } from './dispute-description'
import type { Dispute } from '@/types/payments'
import { formatDate, shortId } from '@/lib/format'

interface DisputeTableProps {
    items: Dispute[]
    onEdit: (dispute: Dispute) => void
}

export function DisputesTable({ items, onEdit }: DisputeTableProps) {
    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[#D3D2C9] dark:border-[#2A2A26] text-left">
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            ID
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            Inicio
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            Fin
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            Estado
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            Descripción
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium text-right">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((dispute) => (
                        <tr
                            key={dispute.id}
                            className="border-b border-[#D3D2C9] dark:border-[#2A2A26] last:border-b-0 align-top"
                        >
                            <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                                <span title={dispute.id}>{shortId(dispute.id)}</span>
                            </td>
                            <td className="px-4 py-3 text-xs text-[#5C5E56] dark:text-[#8C8E82] whitespace-nowrap">
                                {formatDate(dispute.fechaDeInicio)}
                            </td>
                            <td className="px-4 py-3 text-xs text-[#5C5E56] dark:text-[#8C8E82] whitespace-nowrap">
                                {formatDate(dispute.fechaDeFinalizacion)}
                            </td>
                            <td className="px-4 py-3">
                                <StatusBadge status={dispute.estado} />
                            </td>
                            <td className="px-4 py-3 max-w-xs">
                                <DisputeDescription description={dispute.descripcion ?? '—'} />
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                <button
                                    type="button"
                                    onClick={() => onEdit(dispute)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors"
                                >
                                    <Pencil className="w-3 h-3" />
                                    Cambiar estado
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}