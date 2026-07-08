'use client'

import { useState } from 'react'
import type { Buyer, BuyerUpdatableFields } from '@/types/buyer'
import { shortId } from '@/lib/format'
import { Field } from '@/components/ui/field'

interface EditBuyerModalProps {
    buyer: Buyer
    onCancel: () => void
    onConfirm: (changes: Partial<BuyerUpdatableFields>) => void
    isSubmitting?: boolean
    error?: string | null
    isSuccess?: boolean
}

const EDITABLE_FIELDS: (keyof BuyerUpdatableFields)[] = [
    'nombre',
    'apellido',
    'sexo',
    'direccion',
    'mail',
    'celular',
    'condicionIva',
]

export function EditBuyerModal({
    buyer,
    onCancel,
    onConfirm,
    isSubmitting = false,
    error = null,
    isSuccess = false,
}: EditBuyerModalProps) {
    const [form, setForm] = useState<BuyerUpdatableFields>({
        nombre: buyer.nombre,
        apellido: buyer.apellido,
        sexo: buyer.sexo,
        direccion: buyer.direccion,
        mail: buyer.mail,
        celular: buyer.celular,
        condicionIva: buyer.condicionIva,
    })

    const hasChanged = EDITABLE_FIELDS.some((key) => form[key] !== buyer[key])

    function update<K extends keyof BuyerUpdatableFields>(key: K, value: BuyerUpdatableFields[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function getChanges(): Partial<BuyerUpdatableFields> {
        const changes: Partial<BuyerUpdatableFields> = {}
        for (const key of EDITABLE_FIELDS) {
            if (form[key] !== buyer[key]) {
                changes[key] = form[key]
            }
        }
        return changes
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#1A1A18]/50 dark:bg-black/70"
                onClick={isSubmitting || isSuccess ? undefined : onCancel}
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
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => update('nombre', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        />
                    </Field>

                    <Field label="Apellido">
                        <input
                            type="text"
                            value={form.apellido}
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => update('apellido', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        />
                    </Field>

                    <Field label="Sexo">
                        <input
                            type="text"
                            value={form.sexo}
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => update('sexo', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        />
                    </Field>

                    <Field label="Dirección">
                        <input
                            type="text"
                            value={form.direccion}
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => update('direccion', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        />
                    </Field>

                    <Field label="Email">
                        <input
                            type="email"
                            value={form.mail}
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => update('mail', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        />
                    </Field>

                    <Field label="Teléfono">
                        <input
                            type="tel"
                            value={form.celular}
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => update('celular', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        />
                    </Field>

                    <Field label="Condición IVA">
                        <input
                            type="text"
                            value={form.condicionIva}
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => update('condicionIva', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        />
                    </Field>

                    {hasChanged && !error && !isSuccess && (
                        <p className="text-xs leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] border-l-2 border-[#C1440E] dark:border-[#E0662B] pl-3">
                            El control plane es para resolver casos excepcionales. Confirmá que
                            estos cambios corresponden a este comprador antes de continuar.
                        </p>
                    )}

                    {error && (
                        <p className="text-xs leading-relaxed text-red-700 dark:text-red-400 border-l-2 border-red-700 dark:border-red-400 pl-3">
                            {error}
                        </p>
                    )}

                    {isSuccess && (
                        <p className="text-xs leading-relaxed text-green-700 dark:text-green-400 border-l-2 border-green-700 dark:border-green-400 pl-3">
                            Datos actualizados correctamente.
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
                                onClick={() => onConfirm(getChanges())}
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