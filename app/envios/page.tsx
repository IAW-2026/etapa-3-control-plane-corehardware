import { requireAdminPage } from "@/lib/auth";
import PlaceholderPage from "@/components/PlaceholderPage";

export default async function EnviosPage() {
  await requireAdminPage();
  return (
    <PlaceholderPage
      title="Envíos"
      description="Listado de envíos del ecosistema"
      sourceApp="Shipping App"
      endpoint="GET /api/admin/envios"
      status="ready"
      notes="Shipping ya tiene la página /admin/envios. Falta extraer el listado como endpoint JSON consumible vía API Key. Acciones: asignar operador, ver detalle."
    />
  );
}
