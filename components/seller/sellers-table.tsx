'use client'

import { Pencil } from 'lucide-react'
import type { Seller } from '@/types/seller'
import { shortId } from '@/lib/format'

interface SellersTableProps {
    items: Seller[]
    onEdit: (seller: Seller) => void
}

export function SellersTable({ items, onEdit }: SellersTableProps) {
    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[#D3D2C9] dark:border-[#2A2A26] text-left">
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            ID
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            CUIT
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            Nombre
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                            Contacto
                        </th>
                        <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium text-right">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((seller) => (
                        <tr
                            key={seller.id}
                            className="border-b border-[#D3D2C9] dark:border-[#2A2A26] last:border-b-0 align-top"
                        >
                            <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                                <span title={seller.id}>{shortId(seller.id)}</span>
                            </td>
                            <td className="px-4 py-3 text-xs whitespace-nowrap">
                                {seller.cuit}
                            </td>
                            <td className="px-4 py-3 text-xs">
                                {seller.name}
                            </td>
                            <td className="px-4 py-3 text-xs text-[#5C5E56] dark:text-[#8C8E82]">
                                <div>{seller.email}</div>
                                <div>{seller.phoneNumber}</div>
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                <button
                                    type="button"
                                    onClick={() => onEdit(seller)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors"
                                >
                                    <Pencil className="w-3 h-3" />
                                    Editar datos
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}