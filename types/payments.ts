export type DisputeStatus = 'pendiente' | 'repuesta' | 'reembolsada' | 'rechazada'

export interface Dispute {
    id: string
    clerkUserId: string
    pedidoId: string
    pagoId: string
    fechaDeInicio: string
    fechaDeFinalizacion: string | null
    estado: DisputeStatus
    descripcion: string | null
}

export const DISPUTE_STATUSES: DisputeStatus[] = ['pendiente', 'repuesta', 'reembolsada', 'rechazada']

export const STATUS_LABELS: Record<DisputeStatus, string> = {
    pendiente: 'Pendiente',
    repuesta: 'Repuesta',
    reembolsada: 'Reembolsada',
    rechazada: 'Rechazada',
}