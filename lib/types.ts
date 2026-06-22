// Tipos compartidos para las respuestas de las APIs consumidas.

export interface ListResponse<T> {
  total: number;
  items: T[];
}

// Shipping App

export interface ShippingEnvio {
  id: string;
  pedido_id: string;
  estado: "PENDIENTE" | "ASIGNADO" | "RETIRADO" | "EN_CAMINO" | "ENTREGADO";
  direccion: string;
  monto: number;
  fecha_de_entrega: string | null;
  operador: {
    id: string;
    nombre: string;
    mail: string;
  } | null;
}

export interface ShippingOperador {
  id: string;
  nombre: string;
  apellido: string;
  mail: string;
  celular: string;
  dni: string;
  is_deleted: boolean;
  total_envios: number;
}
