import { GRID_SIZE } from '@/lib/constants'

export function BackgroundGrid() {
    return (
        <>
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
        </>
    )
}