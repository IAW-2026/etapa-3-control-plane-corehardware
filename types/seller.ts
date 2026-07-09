export interface Seller {
    id: string
    cuit: string
    razon_social: string
    direccion: string
    mail: string
    celular: string
    condicion_iva: string
}

export type SellerUpdatableFields = Pick<Seller, 'razon_social' | 'direccion' | 'mail' | 'celular' | 'condicion_iva'>