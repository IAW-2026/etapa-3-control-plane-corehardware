'use server'

import { type Operator, type OperatorUpdatableFields } from '@/types/shipping'


const UPDATABLE_FIELD_TO_API_PARAM: Record<keyof OperatorUpdatableFields, string> = {
    nombre: 'nombre',
    apellido: 'apellido',
    sexo: 'sexo',
    direccion: 'direccion',
    mail: 'mail',
    celular: 'celular',
}

interface ApiOperator {
    id: string
    dni: string
    cuil_cuit: string
    apellido: string
    nombre: string
    sexo: string
    direccion: string
    mail: string
    celular: string
}

function apiOperatorToOperator({ cuil_cuit, ...rest }: ApiOperator): Operator {
    return { ...rest, cuilCuit: cuil_cuit }
}


interface GetOperatorsResult {
    operators: Operator[]
    total: number
    offset: number
    limit: number
}


export async function getOperators(
    search: string,
    offset: number,
    limit: number,
): Promise<GetOperatorsResult> {
    const searchParams = new URLSearchParams()
    if (search.trim()) searchParams.set('q', search.trim())
    searchParams.set('offset', String(offset))
    searchParams.set('limit', String(limit))

    const url = `${process.env.SHIPPING_APP_URL!}/api/control-plane/operadores?${searchParams.toString()}`

    const response = await fetch(url, {
        headers: { 'X-API-Key': process.env.SHIPPING_API_KEY! },
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new Error(`Error al obtener operadores: ${response.status} ${response.statusText}`)
    }

    const raw = (await response.json()) as {
        operadores: ApiOperator[]
        total: number
        offset: number
        limit: number
    }

    return {
        operators: raw.operadores.map(apiOperatorToOperator),
        total: raw.total,
        offset: raw.offset,
        limit: raw.limit,
    }
}


export async function updateOperator(id: string, data: Partial<OperatorUpdatableFields>): Promise<Operator> {
    const invalidFields = Object.keys(data).filter(
        (key) => !(key in UPDATABLE_FIELD_TO_API_PARAM),
    )
    if (invalidFields.length > 0) {
        throw new Error(`Campos no editables: ${invalidFields.join(', ')}`)
    }

    const requestBody: Record<string, unknown> = {}
    for (const [field, apiParam] of Object.entries(UPDATABLE_FIELD_TO_API_PARAM) as [
        keyof OperatorUpdatableFields,
        string,
    ][]) {
        if (field in data) {
            requestBody[apiParam] = data[field]
        }
    }

    const url = `${process.env.SHIPPING_APP_URL!}/api/control-plane/operadores/${id}`

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'X-API-Key': process.env.SHIPPING_API_KEY!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        throw new Error(`Error al actualizar el operador: ${response.status} ${response.statusText}`)
    }

    return apiOperatorToOperator((await response.json()) as ApiOperator)
}