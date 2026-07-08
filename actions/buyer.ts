'use server'

import { type Buyer, type BuyerUpdatableFields } from '@/types/buyer'


const UPDATABLE_FIELD_TO_API_PARAM: Record<keyof BuyerUpdatableFields, string> = {
    nombre: 'nombre',
    apellido: 'apellido',
    sexo: 'sexo',
    direccion: 'direccion',
    mail: 'mail',
    celular: 'celular',
    condicionIva: 'condicion_iva',
}


interface ApiBuyer {
    id: string
    dni: string
    cuil_cuit: string
    apellido: string
    nombre: string
    sexo: string
    direccion: string
    mail: string
    celular: string
    condicion_iva: string
}

function apiBuyerToBuyer({ cuil_cuit, condicion_iva, ...rest }: ApiBuyer): Buyer {
    return { ...rest, cuilCuit: cuil_cuit, condicionIva: condicion_iva }
}


interface GetBuyersResult {
    buyers: Buyer[]
    total: number
    offset: number
    limit: number
}


export async function getBuyers(
    search: string,
    offset: number,
    limit: number,
): Promise<GetBuyersResult> {
    const searchParams = new URLSearchParams()
    if (search.trim()) searchParams.set('q', search.trim())
    searchParams.set('offset', String(offset))
    searchParams.set('limit', String(limit))

    const url = `${process.env.BUYER_APP_URL!}/api/buyers/paginated?${searchParams.toString()}`

    const response = await fetch(url, {
        headers: { 'X-API-Key': process.env.BUYER_API_KEY! },
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new Error(`Error al obtener compradores: ${response.status} ${response.statusText}`)
    }

    const raw = (await response.json()) as {
        buyers: ApiBuyer[]
        total: number
        offset: number
        limit: number
    }

    return {
        buyers: raw.buyers.map(apiBuyerToBuyer),
        total: raw.total,
        offset: raw.offset,
        limit: raw.limit,
    }
}


export async function updateBuyer(id: string, data: Partial<BuyerUpdatableFields>): Promise<Buyer> {
    const invalidFields = Object.keys(data).filter(
        (key) => !(key in UPDATABLE_FIELD_TO_API_PARAM),
    )
    if (invalidFields.length > 0) {
        throw new Error(`Campos no editables: ${invalidFields.join(', ')}`)
    }

    const requestBody: Record<string, unknown> = {}
    for (const [field, apiParam] of Object.entries(UPDATABLE_FIELD_TO_API_PARAM) as [
        keyof BuyerUpdatableFields,
        string,
    ][]) {
        if (field in data) {
            requestBody[apiParam] = data[field]
        }
    }

    const url = `${process.env.BUYER_APP_URL!}/api/buyers/${id}`

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'X-API-Key': process.env.BUYER_API_KEY!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        throw new Error(`Error al actualizar el comprador: ${response.status} ${response.statusText}`)
    }

    return apiBuyerToBuyer((await response.json()) as ApiBuyer)
}