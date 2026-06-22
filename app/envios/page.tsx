import { requireAdminPage } from "@/lib/auth";
import { getApp } from "@/lib/apps";
import { callApp } from "@/lib/client";
import { ListResponse, ShippingEnvio, ShippingOperador } from "@/lib/types";
import EstadoBadge from "@/components/EstadoBadge";
import FiltroEstado from "@/components/FiltroEstado";
import ErrorPanel from "@/components/ErrorPanel";
import AsignarOperador from "./AsignarOperador";

export const dynamic = "force-dynamic";

const ESTADOS = ["PENDIENTE", "ASIGNADO", "RETIRADO", "EN_CAMINO", "ENTREGADO"] as const;

interface Props {
  searchParams: Promise<{ estado?: string }>;
}

export default async function EnviosPage({ searchParams }: Props) {
  await requireAdminPage();
  const { estado } = await searchParams;

  const shipping = getApp("shipping");
  const [enviosRes, operadoresRes] = await Promise.all([
    callApp<ListResponse<ShippingEnvio>>(shipping, "/api/control-plane/envios"),
    callApp<ListResponse<ShippingOperador>>(shipping, "/api/control-plane/operadores"),
  ]);

  if (!enviosRes.ok || !enviosRes.data) {
    return (
      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Envíos</h1>
          <p className="text-gray-400 mt-1">Datos provistos por Shipping App</p>
        </div>
        <ErrorPanel
          app="Shipping App"
          endpoint={`${shipping.url}/api/control-plane/envios`}
          status={enviosRes.status}
          message={enviosRes.error}
        />
      </main>
    );
  }

  const operadoresActivos = operadoresRes.ok && operadoresRes.data
    ? operadoresRes.data.items
        .filter((o) => !o.is_deleted)
        .map((o) => ({ id: o.id, label: `${o.apellido}, ${o.nombre}` }))
    : [];

  const envios = estado
    ? enviosRes.data.items.filter((e) => e.estado === estado)
    : enviosRes.data.items;

  const stats = ESTADOS.reduce(
    (acc, e) => {
      acc[e] = enviosRes.data!.items.filter((env) => env.estado === e).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Envíos</h1>
        <p className="text-gray-400 mt-1">
          Datos provistos por <span className="text-cyan-400">Shipping App</span>
          {" · "}
          <span className="text-white font-semibold">{enviosRes.data.total}</span> envíos totales
          {" · "}
          latencia <span className="font-mono">{enviosRes.latencyMs}ms</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {ESTADOS.map((e) => (
          <div
            key={e}
            className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center"
          >
            <p className="text-2xl font-bold text-white">{stats[e]}</p>
            <p className="text-xs text-gray-400 mt-1">{e}</p>
          </div>
        ))}
      </div>

      <FiltroEstado basePath="/envios" current={estado} estados={ESTADOS} />

      {envios.length === 0 ? (
        <p className="text-gray-400">No hay envíos con ese criterio.</p>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-left text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Dirección</th>
                <th className="px-4 py-3">Operador asignado</th>
                <th className="px-4 py-3">Asignar / cambiar</th>
                <th className="px-4 py-3 text-right">Monto</th>
                <th className="px-4 py-3">Entrega</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {envios.map((envio) => (
                <tr key={envio.id} className="hover:bg-gray-800 transition text-gray-300 text-sm">
                  <td className="px-4 py-3 font-mono text-xs text-cyan-400" title={envio.id}>
                    {envio.id.slice(0, 8)}...
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" title={envio.pedido_id}>
                    #{envio.pedido_id.slice(0, 8)}...
                  </td>
                  <td className="px-4 py-3">
                    <EstadoBadge estado={envio.estado} />
                  </td>
                  <td className="px-4 py-3">{envio.direccion}</td>
                  <td className="px-4 py-3">
                    {envio.operador ? (
                      <div>
                        <p className="text-white">{envio.operador.nombre}</p>
                        <p className="text-gray-500 text-xs">{envio.operador.mail}</p>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">Sin asignar</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <AsignarOperador
                      envioId={envio.id}
                      operadorActual={envio.operador?.id ?? null}
                      operadores={operadoresActivos}
                      estado={envio.estado}
                    />
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    ${envio.monto.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {envio.fecha_de_entrega
                      ? new Date(envio.fecha_de_entrega).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
