export interface Operator {
    id: string
    dni: string
    cuilCuit: string
    apellido: string
    nombre: string
    sexo: string
    direccion: string
    mail: string
    celular: string
}

export type OperatorUpdatableFields = Pick<
    Operator,
    'nombre' | 'apellido' | 'sexo' | 'direccion' | 'mail' | 'celular'
>