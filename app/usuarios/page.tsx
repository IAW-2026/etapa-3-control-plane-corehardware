import { requireAdminPage } from "@/lib/auth";
import PlaceholderPage from "@/components/PlaceholderPage";

export default async function UsuariosPage() {
  await requireAdminPage();
  return (
    <PlaceholderPage
      title="Usuarios"
      description="Vista unificada de compradores, vendedores y operadores"
      sourceApp="Buyer + Seller + Shipping"
      endpoint="GET /api/admin/buyers, /api/admin/sellers, /api/admin/operadores"
      status="pending"
      notes="Consolida los tres tipos de usuarios en una tabla con filtros por tipo. Cada app expone su propio endpoint admin, el Control Plane los llama en paralelo. Acciones: desactivar/activar usuario (deriva a la app dueña vía PATCH)."
    />
  );
}
