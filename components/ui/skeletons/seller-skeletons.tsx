import { PageHeaderSkeleton, FiltersSkeleton, PaginationSkeleton, Skeleton } from './common-skeletons'

interface SellersSkeletonProps {
    rows?: number
}

export function SellersSkeleton({ rows = 8 }: SellersSkeletonProps) {
    return (
        <div className="space-y-6">
            <PageHeaderSkeleton />

            <FiltersSkeleton />

            <div className="border border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412]">
                {/* mobile — calca seller-mobile-list.tsx */}
                <ul className="lg:hidden divide-y divide-[#D3D2C9] dark:divide-[#2A2A26]">
                    {Array.from({ length: rows }).map((_, i) => (
                        <li key={i} className="px-4 py-4 space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-24" />
                            </div>

                            <div>
                                <Skeleton className="h-[15px] w-16 mb-1" />
                                <Skeleton className="h-6 w-48" />
                            </div>

                            <div>
                                <Skeleton className="h-[15px] w-16 mb-1" />
                                <div>
                                    <Skeleton className="h-4 w-44" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                            </div>

                            <Skeleton className="h-[31px] w-full" />
                        </li>
                    ))}
                </ul>

                {/* desktop — calca sellers-table.tsx */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#D3D2C9] dark:border-[#2A2A26] text-left">
                                <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                                    CUIT
                                </th>
                                <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                                    Nombre
                                </th>
                                <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium">
                                    Contacto
                                </th>
                                <th className="px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#5C5E56] dark:text-[#8C8E82] font-medium text-right">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: rows }).map((_, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-[#D3D2C9] dark:border-[#2A2A26] last:border-b-0 align-top"
                                >
                                    <td className="px-4 py-3">
                                        <Skeleton className="h-4 w-14" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Skeleton className="h-4 w-20" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Skeleton className="h-4 w-40" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Skeleton className="h-4 w-36" />
                                        <Skeleton className="h-4 w-24" />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Skeleton className="h-7 w-28 ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <PaginationSkeleton />
            </div>
        </div>
    )
}