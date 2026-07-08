'use client'

import { useState } from 'react'
import { StatusBadge } from './status-badge'
import { DISPUTE_STATUSES, STATUS_LABELS, type Dispute, type DisputeStatus } from '@/types/payments'
import { shortId } from '@/lib/format'

interface EditStatusModalProps {
    dispute: Dispute
    onCancel: () => void
    onConfirm: (newStatus: DisputeStatus) => void
    isSubmitting?: boolean
    error?: string | null
    isSuccess?: boolean
}

export function EditStatusModal({
    dispute,
    onCancel,
    onConfirm,
    isSubmitting = false,
    error = null,
    isSuccess = false,
}: EditStatusModalProps) {
    const [newStatus, setNewStatus] = useState<DisputeStatus>(dispute.estado)
    const hasChanged = newStatus !== dispute.estado

    const isCurrentlyPending = dispute.estado === 'pendiente'
    const availableStatuses = isCurrentlyPending
        ? DISPUTE_STATUSES
        : DISPUTE_STATUSES.filter((status) => status !== 'pendiente')

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#1A1A18]/50 dark:bg-black/70"
                onClick={isSubmitting || isSuccess ? undefined : onCancel}
                aria-hidden="true"
            />
            <div className="relative w-full max-w-md border border-[#1A1A18] dark:border-[#EDECE6] bg-[#EBEAE3] dark:bg-[#141412] font-mono">
                <div className="px-6 py-4 border-b border-[#D3D2C9] dark:border-[#2A2A26]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#5C5E56] dark:text-[#8C8E82]">
                        Disputa /{shortId(dispute.id)}
                    </span>
                    <h2 className="text-lg font-semibold uppercase tracking-tight mt-1">Cambiar estado</h2>
                </div>

                <div className="px-6 py-5 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-xs uppercase tracking-wide text-[#5C5E56] dark:text-[#8C8E82]">
                            Estado actual
                        </span>
                        <StatusBadge status={dispute.estado} />
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="new-status"
                            className="block text-xs uppercase tracking-wide text-[#5C5E56] dark:text-[#8C8E82]"
                        >
                            Nuevo estado
                        </label>
                        <select
                            id="new-status"
                            value={newStatus}
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => setNewStatus(e.target.value as DisputeStatus)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        >
                            {availableStatuses.map((status) => (
                                <option
                                    key={status}
                                    value={status}
                                    className="bg-[#EBEAE3] dark:bg-[#141412]"
                                >
                                    {STATUS_LABELS[status]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <span className="block text-xs uppercase tracking-wide text-[#5C5E56] dark:text-[#8C8E82]">
                            Descripción del reclamo
                        </span>
                        <p className="text-sm leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] border border-[#D3D2C9] dark:border-[#2A2A26] px-3 py-2 bg-[#D3D2C9]/20 dark:bg-[#2A2A26]/30">
                            {dispute.descripcion ?? '—'}
                        </p>
                    </div>

                    {hasChanged && !error && (
                        <p className="text-xs leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] border-l-2 border-[#C1440E] dark:border-[#E0662B] pl-3">
                            El control plane es para resolver casos excepcionales. Confirmá que
                            este cambio corresponde a esta disputa antes de continuar.
                        </p>
                    )}

                    {error && (
                        <p className="text-xs leading-relaxed text-red-700 dark:text-red-400 border-l-2 border-red-700 dark:border-red-400 pl-3">
                            {error}
                        </p>
                    )}

                    {isSuccess && (
                        <p className="text-xs leading-relaxed text-green-700 dark:text-green-400 border-l-2 border-green-700 dark:border-green-400 pl-3">
                            Estado actualizado correctamente.
                        </p>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-[#D3D2C9] dark:border-[#2A2A26] flex justify-end gap-3">
                    {isSuccess ? (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm uppercase tracking-wide bg-[#1A1A18] hover:bg-[#C1440E] dark:bg-[#EDECE6] dark:text-[#141412] dark:hover:bg-[#E0662B] text-white transition-colors"
                        >
                            Cerrar
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={isSubmitting}
                                className="px-4 py-2 text-sm uppercase tracking-wide border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors disabled:opacity-40 disabled:pointer-events-none"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                disabled={!hasChanged || isSubmitting}
                                onClick={() => onConfirm(newStatus)}
                                className="px-4 py-2 text-sm uppercase tracking-wide bg-[#1A1A18] hover:bg-[#C1440E] dark:bg-[#EDECE6] dark:text-[#141412] dark:hover:bg-[#E0662B] text-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
                            >
                                {isSubmitting ? 'Confirmando...' : 'Confirmar'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}