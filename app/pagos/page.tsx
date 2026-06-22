import { requireAdminPage } from "@/lib/auth";
import PlaceholderPage from "@/components/PlaceholderPage";

export default async function PagosPage() {
  await requireAdminPage();
  return (
    <PlaceholderPage
      title="Pagos"
      description="Listado de transacciones del ecosistema"
      sourceApp="Payments App"
      endpoint="GET /api/admin/pagos"
      status="pending"
      notes="Payments aún no expone endpoint admin. Hay que coordinar con Agustín para que cree GET /api/admin/pagos con auth por API Key."
    />
  );
}
