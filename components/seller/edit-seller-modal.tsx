'use client'

import { useState } from 'react'
import type { Seller } from '@/types/seller'
import { shortId } from '@/lib/format'
import { Field } from '@/components/ui/field'

interface EditSellerModalProps {
    seller: Seller
    onCancel: () => void
    onConfirm: (updated: Seller) => void
}

export function EditSellerModal({ seller, onCancel, onConfirm }: EditSellerModalProps) {
    const [form, setForm] = useState(seller)
    const hasChanged = JSON.stringify(form) !== JSON.stringify(seller)

    function update<K extends keyof Seller>(key: K, value: Seller[K]) {
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
                        Vendedor / {shortId(seller.id)}
                    </span>
                    <h2 className="text-lg font-semibold uppercase tracking-tight mt-1">Editar datos</h2>
                </div>

                <div className="px-6 py-5 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-xs uppercase tracking-wide text-[#5C5E56] dark:text-[#8C8E82]">
                            CUIT
                        </span>
                        <span className="text-sm">{seller.cuit}</span>
                    </div>

                    <Field label="Nombre">
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => update('name', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <Field label="Dirección">
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => update('address', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <Field label="Email">
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update('email', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <Field label="Teléfono">
                        <input
                            type="tel"
                            value={form.phoneNumber}
                            onChange={(e) => update('phoneNumber', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <Field label="Condición IVA">
                        <input
                            type="text"
                            value={form.VATCondition}
                            onChange={(e) => update('VATCondition', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    {hasChanged && (
                        <p className="text-xs leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] border-l-2 border-[#C1440E] dark:border-[#E0662B] pl-3">
                            Confirmá que estos cambios corresponden a este vendedor antes de continuar.
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