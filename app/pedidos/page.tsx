import { requireAdminPage } from "@/lib/auth";
import PlaceholderPage from "@/components/PlaceholderPage";

export default async function PedidosPage() {
  await requireAdminPage();
  return (
    <PlaceholderPage
      title="Pedidos"
      description="Listado consolidado de pedidos del marketplace"
      sourceApp="Buyer App"
      endpoint="GET /api/admin/orders"
      status="ready"
      notes="Buyer ya expone /api/admin/orders. Falta exponerlo con auth por API Key (hoy usa solo sesión Clerk)."
    />
  );
}
