'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { AppSidebar } from '@/components/app-sidebar'

const GRID_SIZE = 40

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const pathname = usePathname()

    // Cierra el drawer al navegar
    useEffect(() => {
        setMobileNavOpen(false)
    }, [pathname])

    // Cierra el drawer con Escape
    useEffect(() => {
        if (!mobileNavOpen) return
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileNavOpen(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [mobileNavOpen])

    return (
        <div className="min-h-screen flex flex-col bg-[#EBEAE3] dark:bg-[#141412] text-[#1A1A18] dark:text-[#EDECE6] font-mono">
            <AppHeader onMenuClick={() => setMobileNavOpen(true)} />

            <div className="flex flex-1 min-h-0">
                {/* Sidebar fija (desktop) */}
                <div className="hidden lg:block">
                    <AppSidebar />
                </div>

                {/* Drawer (mobile) */}
                {mobileNavOpen && (
                    <div className="lg:hidden fixed inset-0 z-30">
                        <div
                            className="absolute inset-0 bg-[#1A1A18]/40 dark:bg-black/60"
                            onClick={() => setMobileNavOpen(false)}
                            aria-hidden="true"
                        />
                        <div className="absolute inset-y-0 left-0 flex">
                            <AppSidebar onNavigate={() => setMobileNavOpen(false)} />
                            <button
                                type="button"
                                onClick={() => setMobileNavOpen(false)}
                                aria-label="Cerrar navegación"
                                className="mt-4 -ml-px h-9 w-9 flex items-center justify-center border border-[#1A1A18] dark:border-[#EDECE6] bg-[#EBEAE3] dark:bg-[#141412] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Contenido */}
                <main className="relative flex-1 min-w-0 overflow-y-auto">
                    <div
                        className="absolute inset-0 dark:hidden pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #D3D2C9 1px, transparent 1px), linear-gradient(to bottom, #D3D2C9 1px, transparent 1px)',
                            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                        }}
                    />
                    <div
                        className="absolute inset-0 hidden dark:block pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #2A2A26 1px, transparent 1px), linear-gradient(to bottom, #2A2A26 1px, transparent 1px)',
                            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                        }}
                    />
                    <div className="relative z-10 px-4 sm:px-10 py-8">{children}</div>
                </main>
            </div>
        </div>
    )
}