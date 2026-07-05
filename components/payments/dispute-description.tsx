'use client'

import { useEffect, useRef, useState } from 'react'

interface DisputeDescriptionProps {
    description: string
}

// Detecta si el texto realmente se corta con line-clamp-2 midiendo el DOM,
// en vez de adivinar por cantidad de caracteres (eso no se adapta al ancho
// real del contenedor, que cambia según breakpoint/sidebar/zoom).
export function DisputeDescription({ description }: DisputeDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isTruncated, setIsTruncated] = useState(false)
    const textRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const el = textRef.current
        // Si está expandido no hay clamp aplicado, así que no tiene sentido
        // remedir (scrollHeight == clientHeight siempre en ese estado).
        if (!el || isExpanded) return

        function checkTruncation() {
            if (!el) return
            setIsTruncated(el.scrollHeight > el.clientHeight + 1)
        }

        checkTruncation()

        const observer = new ResizeObserver(checkTruncation)
        observer.observe(el)
        return () => observer.disconnect()
    }, [description, isExpanded])

    return (
        <div>
            <p ref={textRef} className={isExpanded ? '' : 'line-clamp-2'}>
                {description}
            </p>
            {isTruncated && (
                <button
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#C1440E] dark:text-[#E0662B]"
                >
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                </button>
            )}
        </div>
    )
}