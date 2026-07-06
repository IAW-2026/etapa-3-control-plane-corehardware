'use client'

import { useEffect, useRef, useState } from 'react'

interface DisputeDescriptionProps {
    description: string
}

export function DisputeDescription({ description }: DisputeDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isTruncated, setIsTruncated] = useState(false)
    const textRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const el = textRef.current
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