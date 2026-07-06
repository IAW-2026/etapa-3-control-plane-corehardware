'use client'

import { Pencil } from 'lucide-react'
import type { Seller } from '@/types/seller'
import { shortId } from '@/lib/format'

interface SellerMobileListProps {
    items: Seller[]
    onEdit: (seller: Seller) => void
}

export function SellerMobileList({ items, onEdit }: SellerMobileListProps) {
    return (
        <ul className="lg:hidden divide-y divide-[#D3D2C9] dark:divide-[#2A2A26]">
            {items.map((seller) => (
                <li key={seller.id} className="px-4 py-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <span
                            title={seller.id}
                            className="font-mono text-xs text-[#5C5E56] dark:text-[#8C8E82] whitespace-nowrap"
                        >
                            {shortId(seller.id)}
                        </span>
                        <span className="text-xs whitespace-nowrap">{seller.cuit}</span>
                    </div>

                    <div>
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] mb-1">
                            Nombre
                        </span>
                        {seller.name}
                    </div>

                    <div>
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] mb-1">
                            Contacto
                        </span>
                        <div className="text-xs text-[#5C5E56] dark:text-[#8C8E82]">
                            <div>{seller.email}</div>
                            <div>{seller.phoneNumber}</div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => onEdit(seller)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.15em] border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors"
                    >
                        <Pencil className="w-3 h-3" />
                        Editar datos
                    </button>
                </li>
            ))}
        </ul>
    )
}