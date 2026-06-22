// Registro central de las apps del ecosistema CoreHardware.
// Cada entrada es la "definición" de una app: URL, API key, ícono, descripción.
// Cuando se agregan nuevas apps o cambian endpoints, se modifica acá.

export interface AppService {
  id: "buyer" | "seller" | "shipping" | "payments";
  name: string;
  shortName: string;
  url: string;
  apiKey: string;
  color: string;
  description: string;
  owner: string;
}

export const APPS: AppService[] = [
  {
    id: "buyer",
    name: "Buyer App",
    shortName: "Buyer",
    url: process.env.BUYER_APP_URL ?? "",
    apiKey: process.env.BUYER_API_KEY ?? "",
    color: "blue",
    description: "Compradores y pedidos",
    owner: "Yanina Rivera",
  },
  {
    id: "seller",
    name: "Seller App",
    shortName: "Seller",
    url: process.env.SELLER_APP_URL ?? "",
    apiKey: process.env.SELLER_API_KEY ?? "",
    color: "purple",
    description: "Vendedores, productos y ventas",
    owner: "Sebastián Pereda",
  },
  {
    id: "shipping",
    name: "Shipping App",
    shortName: "Shipping",
    url: process.env.SHIPPING_APP_URL ?? "",
    apiKey: process.env.SHIPPING_API_KEY ?? "",
    color: "cyan",
    description: "Operadores y envíos",
    owner: "Matías Junca",
  },
  {
    id: "payments",
    name: "Payments App",
    shortName: "Payments",
    url: process.env.PAYMENTS_APP_URL ?? "",
    apiKey: process.env.PAYMENTS_API_KEY ?? "",
    color: "green",
    description: "Pagos y disputas",
    owner: "Agustín Ferrante",
  },
];

export function getApp(id: AppService["id"]): AppService {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`App ${id} no encontrada en el registro`);
  return app;
}
