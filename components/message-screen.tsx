import Link from 'next/link'
import type { ReactNode } from 'react'

const GRID_SIZE = 40

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
                {/* grilla */}
                <div
                    className="absolute inset-0 dark:hidden"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #D3D2C9 1px, transparent 1px), linear-gradient(to bottom, #D3D2C9 1px, transparent 1px)',
                        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                    }}
                />
                <div
                    className="absolute inset-0 hidden dark:block"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #2A2A26 1px, transparent 1px), linear-gradient(to bottom, #2A2A26 1px, transparent 1px)',
                        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                    }}
                />

                {/* marcas de registro */}
                {[
                    'top-3 left-3 sm:top-6 sm:left-6 border-t border-l',
                    'top-3 right-3 sm:top-6 sm:right-6 border-t border-r',
                    'bottom-3 left-3 sm:bottom-6 sm:left-6 border-b border-l',
                    'bottom-3 right-3 sm:bottom-6 sm:right-6 border-b border-r',
                ].map((pos) => (
                    <span
                        key={pos}
                        className={`absolute w-5 h-5 sm:w-6 sm:h-6 border-[#6B6D64] dark:border-[#8C8E82] ${pos}`}
                    />
                ))}

                {/* panel central */}
                <div className="relative z-10 w-full">{children}</div>
            </main>

            {/* Footer */}
            <footer className="px-4 sm:px-10 py-6 border-t border-[#D3D2C9] dark:border-[#2A2A26] flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 text-center sm:text-left z-20 relative bg-[#EBEAE3] dark:bg-[#141412]">
                <span className="flex items-baseline gap-2 text-xs text-[#5C5E56] dark:text-[#8C8E82]">
                    <span>CoreHardware</span>
                    <span aria-hidden="true">·</span>
                    <span>Control Plane</span>
                </span>
                <span className="text-xs text-[#5C5E56] dark:text-[#8C8E82]">© {new Date().getFullYear()}</span>
            </footer>
        </div>
    )
}