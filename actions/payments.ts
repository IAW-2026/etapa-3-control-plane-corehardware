'use server'

import { CACHE_TIME } from '@/lib/constants'
import { type Dispute, type DisputeStatus } from '@/types/payments'


const STATUS_TO_API_PARAM: Record<DisputeStatus, string> = {
    pendiente: 'pending',
    reembolsada: 'refunded',
    repuesta: 'replaced',
    rechazada: 'rejected',
}


interface GetDisputesResult {
    disputes: Dispute[]
    total: number
    offset: number
    limit: number
}


export async function getDisputes(
    search: string,
    statusFilter: DisputeStatus | 'all',
    offset: number,
    limit: number,
): Promise<GetDisputesResult> {
    const searchParams = new URLSearchParams()
    if (search.trim()) searchParams.set('q', search.trim())
    if (statusFilter !== 'all') searchParams.set('status', STATUS_TO_API_PARAM[statusFilter])
    searchParams.set('offset', String(offset))
    searchParams.set('limit', String(limit))

    const url = `${process.env.PAYMENTS_APP_URL}/api/disputes?${searchParams.toString()}`

    const response = await fetch(url, {
        headers: { 'X-API-Key': process.env.PAYMENTS_API_KEY ?? '' },
        next: { revalidate: CACHE_TIME },
    })

    if (!response.ok) {
        throw new Error(`Error al obtener disputas: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as GetDisputesResult
}


export async function updateDisputeStatus(id: string, newStatus: DisputeStatus): Promise<Dispute> {
    const url = `${process.env.PAYMENTS_APP_URL}/api/disputes/${id}`
 
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'X-API-Key': process.env.PAYMENTS_API_KEY ?? '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: STATUS_TO_API_PARAM[newStatus] }),
    })
 
    if (!response.ok) {
        throw new Error(`Error al actualizar la disputa: ${response.status} ${response.statusText}`)
    }
 
    return (await response.json()) as Dispute
}