'use client'

import { useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface UseListViewOptions<T> {
    items: T[]
    search: string
    page: number
    totalPages: number
}

export function useListView<T>({ items: initialItems, search, page, totalPages }: UseListViewOptions<T>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [, startTransition] = useTransition()

    const [items, setItems] = useState(initialItems)
    useEffect(() => {
        setItems(initialItems)
    }, [initialItems])

    const [searchInput, setSearchInput] = useState(search)
    useEffect(() => {
        setSearchInput(search)
    }, [search])

    useEffect(() => {
        const handle = setTimeout(() => {
            if (searchInput === search) return
            updateParams({ q: searchInput || null, page: null })
        }, 300)
        return () => clearTimeout(handle)
    }, [searchInput])

    function updateParams(next: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString())
        for (const [key, value] of Object.entries(next)) {
            if (value === null || value === '') {
                params.delete(key)
            } else {
                params.set(key, value)
            }
        }
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`)
        })
    }

    function handlePageChange(newPage: number) {
        if (newPage < 1 || newPage > totalPages || newPage === page) return
        updateParams({ page: newPage === 1 ? null : String(newPage) })
    }

    return { items, setItems, searchInput, setSearchInput, updateParams, handlePageChange }
}