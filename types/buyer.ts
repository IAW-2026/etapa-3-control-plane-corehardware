export interface Buyer {
    id: string
    dni: string
    cuilCuit: string
    apellido: string
    nombre: string
    sexo: string
    direccion: string
    mail: string
    celular: string
    condicionIva: string
}

export type BuyerUpdatableFields = Pick<
    Buyer,
    'nombre' | 'apellido' | 'sexo' | 'direccion' | 'mail' | 'celular' | 'condicionIva'
>