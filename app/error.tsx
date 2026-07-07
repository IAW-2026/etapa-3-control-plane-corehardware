'use client'

import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import MessageScreen from '@/components/message-screen'

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    console.error(error)

    return (
        <MessageScreen>
            <div className="mx-auto max-w-md w-full border border-[#1A1A18] dark:border-[#EDECE6] bg-[#EBEAE3] dark:bg-[#141412] px-6 sm:px-10 py-10 text-center flex flex-col items-center">
                <h1 className="text-[2.5rem] sm:text-[3.5rem] font-bold uppercase leading-[0.9] tracking-tight text-[#C1440E] dark:text-[#E0662B] mb-6">
                    Error
                </h1>

                <p className="text-sm sm:text-base leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] mb-8">
                    Ocurrió un error al procesar esta vista. Podés intentar de nuevo o volver al inicio.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={() => reset()}
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1A18] hover:bg-[#C1440E] dark:bg-[#EDECE6] dark:text-[#141412] dark:hover:bg-[#E0662B] text-white text-sm uppercase tracking-wide transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-45" />
                        reintentar
                    </button>
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-sm px-6 py-3.5 border border-[#1A1A18] dark:border-[#EDECE6] hover:border-[#C1440E] hover:text-[#C1440E] dark:hover:border-[#E0662B] dark:hover:text-[#E0662B] transition-colors"
                    >
                        volver al inicio
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </MessageScreen>
    )
}