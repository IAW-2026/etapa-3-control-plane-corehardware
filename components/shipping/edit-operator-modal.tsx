'use client'

import { useState } from 'react'
import type { Operator } from '@/types/shipping'
import { shortId } from '@/lib/format'
import { Field } from '@/components/ui/field'
import { IdentityTag } from '../ui/identity-tag'

interface EditOperatorModalProps {
    operator: Operator
    onCancel: () => void
    onConfirm: (updated: Operator) => void
}

export function EditOperatorModal({ operator, onCancel, onConfirm }: EditOperatorModalProps) {
    const [form, setForm] = useState(operator)
    const hasChanged = JSON.stringify(form) !== JSON.stringify(operator)

    function update<K extends keyof Operator>(key: K, value: Operator[K]) {
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
                                onChange={(e) => update('nombre', e.target.value)}
                                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                            />
                        </Field>
                        <Field label="Apellido">
                            <input
                                type="text"
                                value={form.apellido}
                                onChange={(e) => update('apellido', e.target.value)}
                                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                            />
                        </Field>
                    </div>

                    <Field label="Dirección">
                        <input
                            type="text"
                            value={form.direccion}
                            onChange={(e) => update('direccion', e.target.value)}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Mail">
                            <input
                                type="email"
                                value={form.mail}
                                onChange={(e) => update('mail', e.target.value)}
                                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                            />
                        </Field>
                        <Field label="Celular">
                            <input
                                type="tel"
                                value={form.celular}
                                onChange={(e) => update('celular', e.target.value)}
                                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                            />
                        </Field>
                    </div>

                    <Field label="Fecha de nacimiento">
                        <input
                            type="date"
                            value={form.fechaNacimiento.slice(0, 10)}
                            onChange={(e) => update('fechaNacimiento', new Date(e.target.value).toISOString())}
                            className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Nacionalidad">
                            <input
                                type="text"
                                value={form.nacionalidad}
                                onChange={(e) => update('nacionalidad', e.target.value)}
                                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                            />
                        </Field>
                        <Field label="Sexo">
                            <select
                                value={form.sexo}
                                onChange={(e) => update('sexo', e.target.value)}
                                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B]"
                            >
                                <option value="M" className="bg-[#EBEAE3] dark:bg-[#141412]">M</option>
                                <option value="F" className="bg-[#EBEAE3] dark:bg-[#141412]">F</option>
                            </select>
                        </Field>
                    </div>

                    {hasChanged && (
                        <p className="text-xs leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] border-l-2 border-[#C1440E] dark:border-[#E0662B] pl-3">
                            Confirmá que estos cambios corresponden a este operador antes de continuar.
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