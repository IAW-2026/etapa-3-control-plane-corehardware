'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BackgroundGrid } from '@/components/decor/background-grid'
import { CornerMarks } from '@/components/decor/corner-marks'
import { AppFooter } from '@/components/app-footer'


export default function LandingPage() {
    const [mounted, setMounted] = useState(false)
    const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
    const mainRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true))
        return () => cancelAnimationFrame(t)
    }, [])

    useEffect(() => {
        const el = mainRef.current
        if (!el) return
        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }
        const handleLeave = () => setPointer(null)
        el.addEventListener('mousemove', handleMove)
        el.addEventListener('mouseleave', handleLeave)
        return () => {
            el.removeEventListener('mousemove', handleMove)
            el.removeEventListener('mouseleave', handleLeave)
        }
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-[#EBEAE3] dark:bg-[#141412] text-[#1A1A18] dark:text-[#EDECE6] font-mono">
            {/* Header */}
            <header className="flex items-center justify-between gap-3 px-4 sm:px-10 py-3 min-h-16 border-b border-[#D3D2C9] dark:border-[#2A2A26] shrink-0 z-20 relative bg-[#EBEAE3] dark:bg-[#141412]">
                <span className="flex items-baseline gap-2 text-sm tracking-tight min-w-0 overflow-hidden">
                    <span className="hidden sm:inline text-[#5C5E56] dark:text-[#8C8E82] shrink-0">CoreHardware</span>
                    <span className="hidden sm:inline text-[#D3D2C9] dark:text-[#2A2A26] shrink-0" aria-hidden="true">·</span>
                    <span className="font-semibold truncate">Control Plane</span>
                </span>
                <Link
                    href="/sign-in"
                    className="group inline-flex items-center gap-2 text-sm px-3 py-2 sm:px-3.5 sm:py-1.5 border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors shrink-0"
                >
                    sign-in
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </header>

            {/* Plano */}
            <main
                ref={mainRef}
                className="relative flex-1 flex flex-col justify-center px-6 sm:px-14 py-16 overflow-hidden cursor-none"
            >
                {/* Fondo */}
                <BackgroundGrid />
                <CornerMarks />

                {/* guías del cursor */}
                {pointer && (
                    <>
                        <div
                            className="pointer-events-none absolute left-0 right-0 h-px bg-[#C1440E]/40 dark:bg-[#E0662B]/40"
                            style={{ top: pointer.y }}
                        />
                        <div
                            className="pointer-events-none absolute top-0 bottom-0 w-px bg-[#C1440E]/40 dark:bg-[#E0662B]/40"
                            style={{ left: pointer.x }}
                        />
                        <div
                            className="pointer-events-none absolute w-2.5 h-2.5 rounded-full border border-[#C1440E] dark:border-[#E0662B] -translate-x-1/2 -translate-y-1/2"
                            style={{ left: pointer.x, top: pointer.y }}
                        />
                        <span
                            className="pointer-events-none absolute text-[10px] tracking-[0.1em] text-[#C1440E] dark:text-[#E0662B] uppercase"
                            style={{ left: pointer.x + 12, top: pointer.y - 18 }}
                        >
                            x{String(Math.round(pointer.x)).padStart(4, '0')} y{String(Math.round(pointer.y)).padStart(4, '0')}
                        </span>
                    </>
                )}

                {/* contenido */}
                <div className="relative z-10 max-w-4xl">
                    <span className="block text-xs tracking-[0.25em] uppercase text-[#5C5E56] dark:text-[#8C8E82] mb-6">
                        CoreHardware · Control Plane
                    </span>

                    {/* titulo con efecto de trazado */}
                    <div className="relative mb-8 -ml-1">
                        <h1
                            className="text-[3.25rem] sm:text-[6rem] md:text-[7.5rem] font-bold uppercase leading-[0.85] tracking-tight text-[#C1440E] dark:text-[#E0662B]"
                            style={{
                                clipPath: mounted ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                                transition: 'clip-path 1.1s cubic-bezier(0.65, 0, 0.35, 1)',
                            }}
                        >
                            Control
                            <br />
                            Plane
                        </h1>
                        {/* punta de trazo que recorre el titulo al montar */}
                        <span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 w-[2px] bg-[#1A1A18] dark:bg-[#EDECE6]"
                            style={{
                                left: mounted ? '100%' : '0%',
                                opacity: mounted ? 0 : 1,
                                transition: 'left 1.1s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s linear 1.0s',
                            }}
                        />
                    </div>

                    <p
                        className="max-w-md text-sm sm:text-base leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] mb-10"
                        style={{
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(6px)',
                            transition: 'opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s',
                        }}
                    >
                        Panel de administración de CoreHardware.
                    </p>

                    <div
                        style={{
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(6px)',
                            transition: 'opacity 0.5s ease 1.05s, transform 0.5s ease 1.05s',
                        }}
                    >
                        <Link
                            href="/sign-in"
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1A18] hover:bg-[#C1440E] dark:bg-[#EDECE6] dark:text-[#141412] dark:hover:bg-[#E0662B] text-white text-sm uppercase tracking-wide transition-colors"
                        >
                            ingresar
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </main>

            <AppFooter />
        </div>
    )
}