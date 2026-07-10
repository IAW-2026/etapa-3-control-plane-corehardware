'use client'

import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
    const pathname = usePathname()
    const section = pathname?.split('/').filter(Boolean)[0] ?? 'dashboard'

    return (
        <header className="flex items-center justify-between gap-3 px-4 sm:px-10 py-3 min-h-16 border-b border-[#D3D2C9] dark:border-[#2A2A26] shrink-0 z-20 relative bg-[#EBEAE3] dark:bg-[#141412]">
            <div className="flex items-center gap-3 min-w-0">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Abrir navegación"
                    className="lg:hidden inline-flex items-center justify-center w-9 h-9 border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors shrink-0"
                >
                    <Menu className="w-4 h-4" />
                </button>

                <span className="flex items-baseline gap-2 text-sm tracking-tight min-w-0 overflow-hidden">
                    <span className="hidden sm:inline text-[#5C5E56] dark:text-[#8C8E82] shrink-0">
                        CoreHardware
                    </span>
                    <span
                        className="hidden sm:inline text-[#D3D2C9] dark:text-[#2A2A26] shrink-0"
                        aria-hidden="true"
                    >
                        ·
                    </span>
                    <span className="font-semibold truncate">Control Plane</span>
                </span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-[#C1440E] dark:text-[#E0662B]">
                    /{section}
                </span>
                <UserButton
                    appearance={{
                        elements: {
                            userButtonAvatarBox: 'w-8 h-8',
                        },
                    }}
                />
            </div>
        </header>
    )
}