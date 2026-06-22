import { requireAdminPage } from "@/lib/auth";
import { APPS } from "@/lib/apps";
import { callApp } from "@/lib/client";
import ServiceStatusCard from "@/components/ServiceStatusCard";

export const dynamic = "force-dynamic";

interface HealthResponse {
  status: string;
  db?: string;
  latency_ms?: number;
  timestamp?: string;
}

export default async function DashboardPage() {
  await requireAdminPage();

  const checks = await Promise.all(
    APPS.map(async (app) => {
      const res = await callApp<HealthResponse>(app, "/api/health", { timeoutMs: 5000 });
      return { app, res };
    })
  );

  const totalApps = APPS.length;
  const onlineApps = checks.filter((c) => c.res.ok).length;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Estado del ecosistema: <span className="text-cyan-400 font-semibold">{onlineApps}/{totalApps}</span> servicios online
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-cyan-400 mb-4">Estado de servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {checks.map(({ app, res }) => (
            <ServiceStatusCard key={app.id} app={app} response={res} />
          ))}
        </div>
      </section>

      <section className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-cyan-400 mb-2">Acerca del Control Plane</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Panel administrativo centralizado que consolida la gestión de las cuatro apps
          del ecosistema CoreHardware. <b className="text-white">No reemplaza</b> los paneles
          individuales — los complementa con vista de mayor nivel. Las acciones de gestión
          se derivan a la app dueña de cada entidad vía API.
        </p>
      </section>
    </main>
  );
}
