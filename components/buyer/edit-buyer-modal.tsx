'use client'

import { useState } from 'react'
import type { Buyer } from '@/types/buyer'
import { shortId } from '@/lib/format'
import { Field } from '@/components/ui/field'

interface EditBuyerModalProps {
    buyer: Buyer
    onCancel: () => void
    onConfirm: (updated: Buyer) => void
}

export function EditBuyerModal({ buyer, onCancel, onConfirm }: EditBuyerModalProps) {
    const [form, setForm] = useState(buyer)
    const hasChanged = JSON.stringify(form) !== JSON.stringify(buyer)

    function update<K extends keyof Buyer>(key: K, value: Buyer[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#1A1A18]/50 dark:bg-black/70"
                onClick={onCancel}
                aria-hidden="true"
            />
            <div className="relative w-full max-w-lg border border-[#1A1A18] dark:border-[#EDECE6] bg-[#EBEAE3] dark:bg-[#141412] font-mono max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-[#D3D2C9] dark:border-[#2A2A26]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#5C5E56] dark:text-[#8C8E82]">
                        Comprador / {shortId(buyer.id)}
                    </span>
                    <h2 className="text-lg font-semibold uppercase tracking-tight mt-1">Editar datos</h2>
                </div>

                <div className="px-6 py-5 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-xs uppercase tracking-wide text-[#5C5E56] dark:text-[#8C8E82]">
                            DNI
                        </span>
                        <span className="text-sm">{buyer.dni}</span>
                    </div>

                    <Field label="Nombre">
                        <input
                            type="text"
                            value={form.nombre}
                            onChange={(e) => update('nombre', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <Field label="Dirección">
                        <input
                            type="text"
                            value={form.direccion}
                            onChange={(e) => update('direccion', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <Field label="Email">
                        <input
                            type="email"
                            value={form.mail}
                            onChange={(e) => update('mail', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <Field label="Teléfono">
                        <input
                            type="tel"
                            value={form.celular}
                            onChange={(e) => update('celular', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <Field label="Condición IVA">
                        <input
                            type="text"
                            value={form.condicionIva}
                            onChange={(e) => update('condicionIva', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    {hasChanged && (
                        <p className="text-xs leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] border-l-2 border-[#C1440E] dark:border-[#E0662B] pl-3">
                            Confirmá que estos cambios corresponden a este comprador antes de continuar.
                        </p>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-[#D3D2C9] dark:border-[#2A2A26] flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm uppercase tracking-wide border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        disabled={!hasChanged}
                        onClick={() => onConfirm(form)}
                        className="px-4 py-2 text-sm uppercase tracking-wide bg-[#1A1A18] hover:bg-[#C1440E] dark:bg-[#EDECE6] dark:text-[#141412] dark:hover:bg-[#E0662B] text-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}