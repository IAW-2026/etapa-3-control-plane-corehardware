import { requireAdminPage } from "@/lib/auth";
import PlaceholderPage from "@/components/PlaceholderPage";

export default async function DisputasPage() {
  await requireAdminPage();
  return (
    <PlaceholderPage
      title="Disputas"
      description="Resolución de disputas de pago entre compradores y vendedores"
      sourceApp="Payments App"
      endpoint="GET /api/admin/disputas, PATCH /api/admin/disputas/{id}"
      status="pending"
      notes="Payments aún no expone endpoints de disputas para admin. Acción principal: resolver disputa (deriva a Payments via PATCH)."
    />
  );
}
