function Skeleton({ className = '' }: { className?: string }) {
    return <div className={`animate-pulse bg-[#D3D2C9] dark:bg-[#2A2A26] ${className}`} />
}

interface PageHeaderSkeletonProps {
    showLink?: boolean
}

export function PageHeaderSkeleton({ showLink = true }: PageHeaderSkeletonProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <Skeleton className="h-[15px] w-40" />
                <Skeleton className="mt-1 h-8 sm:h-9 w-56" />
            </div>

            {showLink && <Skeleton className="h-4 w-56" />}
        </div>
    )
}

interface FiltersSkeletonProps {
    pillCount?: number
}

export function FiltersSkeleton({ pillCount = 0 }: FiltersSkeletonProps) {
    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <Skeleton className="h-[38px] w-full lg:w-72 lg:flex-shrink-0" />

            {pillCount > 0 && (
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: pillCount }).map((_, i) => (
                        <Skeleton key={i} className="h-7 w-20" />
                    ))}
                </div>
            )}
        </div>
    )
}

export function PaginationSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-[#D3D2C9] dark:border-[#2A2A26]">
            <Skeleton className="h-[15px] w-28" />
            <div className="flex gap-2">
                <Skeleton className="h-[29px] flex-1 sm:flex-none sm:w-28" />
                <Skeleton className="h-[29px] flex-1 sm:flex-none sm:w-28" />
            </div>
        </div>
    )
}

export { Skeleton }