import type { ReactNode } from 'react'
import { BackgroundGrid } from '@/components/decor/background-grid'
import { CornerMarks } from '@/components/decor/corner-marks'
import { AppFooter } from './app-footer'


export default function MessageScreen({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#EBEAE3] dark:bg-[#141412] text-[#1A1A18] dark:text-[#EDECE6] font-mono">
            {/* Header */}
            <header className="flex items-center gap-3 px-4 sm:px-10 py-3 min-h-16 border-b border-[#D3D2C9] dark:border-[#2A2A26] shrink-0 z-20 relative bg-[#EBEAE3] dark:bg-[#141412]">
                <span className="flex items-baseline gap-2 text-sm tracking-tight min-w-0 overflow-hidden">
                    <span className="hidden sm:inline text-[#5C5E56] dark:text-[#8C8E82] shrink-0">CoreHardware</span>
                    <span className="hidden sm:inline text-[#D3D2C9] dark:text-[#2A2A26] shrink-0" aria-hidden="true">·</span>
                    <span className="font-semibold truncate">Control Plane</span>
                </span>
            </header>

            {/* Plano */}
            <main className="relative flex-1 flex flex-col justify-center px-6 sm:px-14 py-16 overflow-hidden">
                {/* fondo */}
                <BackgroundGrid />
                <CornerMarks />

                {/* panel central */}
                <div className="relative z-10 w-full">{children}</div>
            </main>

            <AppFooter />
        </div>
    )
}