const POSITIONS = [
    'top-3 left-3 sm:top-6 sm:left-6 border-t border-l',
    'top-3 right-3 sm:top-6 sm:right-6 border-t border-r',
    'bottom-3 left-3 sm:bottom-6 sm:left-6 border-b border-l',
    'bottom-3 right-3 sm:bottom-6 sm:right-6 border-b border-r',
] as const

export function CornerMarks() {
    return (
        <>
            {POSITIONS.map((pos) => (
                <span
                    key={pos}
                    className={`pointer-events-none absolute w-5 h-5 sm:w-6 sm:h-6 border-[#6B6D64] dark:border-[#8C8E82] ${pos}`}
                />
            ))}
        </>
    )
}