import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MessageScreen from '@/components/message-screen'

export default function NotFound() {
    return (
        <MessageScreen>
            <div className="mx-auto max-w-md w-full border border-[#1A1A18] dark:border-[#EDECE6] bg-[#EBEAE3] dark:bg-[#141412] px-6 sm:px-10 py-10 text-center flex flex-col items-center">
                <h1 className="text-[2.5rem] sm:text-[3.5rem] font-bold uppercase leading-[0.9] tracking-tight text-[#C1440E] dark:text-[#E0662B] mb-6">
                    Página no encontrada
                </h1>

                <p className="text-sm sm:text-base leading-relaxed text-[#5C5E56] dark:text-[#8C8E82] mb-8">
                    No existe ninguna página en esta dirección. Revisá la URL o volvé al inicio.
                </p>

                <Link
                    href="/"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1A18] hover:bg-[#C1440E] dark:bg-[#EDECE6] dark:text-[#141412] dark:hover:bg-[#E0662B] text-white text-sm uppercase tracking-wide transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    volver al inicio
                </Link>
            </div>
        </MessageScreen>
    )
}