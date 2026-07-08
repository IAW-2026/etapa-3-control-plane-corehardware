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
    fechaNacimiento: string
    nacionalidad: string
    condicionIva: string
    clerkUserId: string
    isDeleted: Boolean
    perfilCompleto: Boolean
}

export type BuyerUpdatableFields = Pick<
    Buyer,
    'nombre' | 'apellido' | 'sexo' | 'direccion' | 'mail' | 'celular' | 'condicionIva'
>