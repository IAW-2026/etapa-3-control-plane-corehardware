'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    ShoppingCart,
    Store,
    CreditCard,
    Truck,
} from 'lucide-react'

const NAV_ITEMS = [
    { href: '/home', label: 'Inicio', icon: LayoutDashboard },
    { href: '/buyer', label: 'Comprador', icon: ShoppingCart },
    { href: '/seller', label: 'Vendedor', icon: Store },
    { href: '/payments', label: 'Pagos', icon: CreditCard },
    { href: '/shipping', label: 'Envíos', icon: Truck },
] as const

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname()

    return (
        <nav className="flex flex-col h-full w-56 border-r border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412] shrink-0">
            <ul className="flex-1 py-2 mt-2">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                    const active =
                        pathname === href || pathname?.startsWith(`${href}/`)

                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                onClick={onNavigate}
                                aria-current={active ? 'page' : undefined}
                                className={[
                                    'group flex items-center gap-3 px-4 py-3 text-sm border-l-2 transition-colors',
                                    active
                                        ? 'border-[#C1440E] dark:border-[#E0662B] text-[#C1440E] dark:text-[#E0662B] bg-[#D3D2C9]/40 dark:bg-[#2A2A26]/60 font-semibold'
                                        : 'border-transparent text-[#5C5E56] dark:text-[#8C8E82] hover:text-[#1A1A18] hover:dark:text-[#EDECE6] hover:bg-[#D3D2C9]/20 dark:hover:bg-[#2A2A26]/30',
                                ].join(' ')}
                            >
                                <Icon
                                    className={[
                                        'w-4 h-4 shrink-0 transition-colors',
                                        active
                                            ? 'text-[#C1440E] dark:text-[#E0662B]'
                                            : 'text-[#6B6D64] dark:text-[#8C8E82] group-hover:text-[#1A1A18] group-hover:dark:text-[#EDECE6]',
                                    ].join(' ')}
                                />
                                <span className="uppercase tracking-wide">{label}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <div className="px-4 py-4 border-t border-[#D3D2C9] dark:border-[#2A2A26] text-[10px] text-[#5C5E56] dark:text-[#8C8E82]">
                CoreHardware · Control Plane
            </div>
        </nav>
    )
}