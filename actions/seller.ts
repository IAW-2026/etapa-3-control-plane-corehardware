'use server'

import { type Seller, type SellerUpdatableFields } from '@/types/seller'

const UPDATABLE_FIELD_TO_API_PARAM: Record<keyof SellerUpdatableFields, string> = {
    razon_social: 'razon_social',
    direccion: 'direccion',
    mail: 'mail',
    celular: 'celular',
    condicion_iva: 'condicion_iva',
}

interface GetSellersResult {
    sellers: Seller[]
    total: number
    offset: number
    limit: number
}

export async function getSellers(
    search: string,
    offset: number,
    limit: number,
): Promise<GetSellersResult> {
    const searchParams = new URLSearchParams()
    if (search.trim()) searchParams.set('q', search.trim())
    searchParams.set('offset', String(offset))
    searchParams.set('limit', String(limit))

    const url = `${process.env.SELLER_APP_URL!}/api/sellers/paginated?${searchParams.toString()}`

    const response = await fetch(url, {
        headers: { 'X-API-Key': process.env.SELLER_API_KEY! },
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new Error(`Error al obtener vendedores: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as GetSellersResult
}

export async function updateSeller(id: string, data: Partial<SellerUpdatableFields>): Promise<Seller> {
    const invalidFields = Object.keys(data).filter(
        (key) => !(key in UPDATABLE_FIELD_TO_API_PARAM),
    )
    if (invalidFields.length > 0) {
        throw new Error(`Campos no editables: ${invalidFields.join(', ')}`)
    }

    const requestBody: Record<string, unknown> = {}
    for (const [field, apiParam] of Object.entries(UPDATABLE_FIELD_TO_API_PARAM) as [
        keyof SellerUpdatableFields,
        string,
    ][]) {
        if (field in data) {
            requestBody[apiParam] = data[field]
        }
    }

    const url = `${process.env.SELLER_APP_URL!}/api/sellers/${id}`

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'X-API-Key': process.env.SELLER_API_KEY!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        throw new Error(`Error al actualizar el vendedor: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as Seller
}