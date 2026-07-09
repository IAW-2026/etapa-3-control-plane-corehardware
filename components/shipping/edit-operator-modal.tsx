'use client'

import { useState } from 'react'
import type { Operator, OperatorUpdatableFields } from '@/types/shipping'
import { shortId } from '@/lib/format'
import { Field } from '@/components/ui/field'
import { Select } from '@/components/ui/select'
import { IdentityTag } from '../ui/identity-tag'

interface EditOperatorModalProps {
    operator: Operator
    onCancel: () => void
    onConfirm: (changes: Partial<OperatorUpdatableFields>) => void
    isSubmitting?: boolean
    error?: string | null
    isSuccess?: boolean
}

const EDITABLE_FIELDS: (keyof OperatorUpdatableFields)[] = [
    'nombre',
    'apellido',
    'sexo',
    'direccion',
    'mail',
    'celular',
]

export function EditOperatorModal({
    operator,
    onCancel,
    onConfirm,
    isSubmitting = false,
    error = null,
    isSuccess = false,
}: EditOperatorModalProps) {
    const [form, setForm] = useState<OperatorUpdatableFields>({
        nombre: operator.nombre,
        apellido: operator.apellido,
        sexo: operator.sexo,
        direccion: operator.direccion,
        mail: operator.mail,
        celular: operator.celular,
    })

    const hasChanged = EDITABLE_FIELDS.some((key) => form[key] !== operator[key])

    function update<K extends keyof OperatorUpdatableFields>(key: K, value: OperatorUpdatableFields[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function getChanges(): Partial<OperatorUpdatableFields> {
        const changes: Partial<OperatorUpdatableFields> = {}
        for (const key of EDITABLE_FIELDS) {
            if (form[key] !== operator[key]) {
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
                        Operador / {shortId(operator.id)}
                    </span>
                    <h2 className="text-lg font-semibold uppercase tracking-tight mt-1">
                        Editar datos
                    </h2>
                </div>

                <div className="px-6 py-5 space-y-4">

                    <IdentityTag label="DNI" value={operator.dni} />

                    <div className="grid grid-cols-2 gap-3">
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
                    </div>

                    <Field label="Dirección">
                        <input
                            type="text"
                            value={form.direccion}
                            disabled={isSubmitting || isSuccess}
                            onChange={(e) => update('direccion', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Mail">
                            <input
                                type="email"
                                value={form.mail}
                                disabled={isSubmitting || isSuccess}
                                onChange={(e) => update('mail', e.target.value)}
                                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                            />
                        </Field>
                        <Field label="Celular">
                            <input
                                type="tel"
                                value={form.celular}
                                disabled={isSubmitting || isSuccess}
                                onChange={(e) => update('celular', e.target.value)}
                                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] disabled:opacity-50"
                            />
                        </Field>
                    </div>

                    <Field label="Sexo">
                        <Select
                            value={form.sexo}
                            onChange={(value) => update('sexo', value)}
                            options={['M', 'F']}
                            disabled={isSubmitting || isSuccess}
                        />
                    </Field>

                    {hasChanged && !error && !isSuccess && (
                        <p className="text-xs leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] border-l-2 border-[#C1440E] dark:border-[#E0662B] pl-3">
                            El control plane es para resolver casos excepcionales. Confirmá que
                            estos cambios corresponden a este operador antes de continuar.
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