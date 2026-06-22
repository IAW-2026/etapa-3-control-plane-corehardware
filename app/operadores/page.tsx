import { requireAdminPage } from "@/lib/auth";
import { getApp } from "@/lib/apps";
import { callApp } from "@/lib/client";
import { ListResponse, ShippingOperador } from "@/lib/types";
import ErrorPanel from "@/components/ErrorPanel";
import SearchInput from "@/components/SearchInput";
import ToggleOperador from "./ToggleOperador";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ q?: string; estado?: "activos" | "inactivos" }>;
}

export default async function OperadoresPage({ searchParams }: Props) {
  await requireAdminPage();
  const { q, estado } = await searchParams;

  const shipping = getApp("shipping");
  const res = await callApp<ListResponse<ShippingOperador>>(
    shipping,
    "/api/control-plane/operadores"
  );

  if (!res.ok || !res.data) {
    return (
      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Operadores</h1>
          <p className="text-gray-400 mt-1">Datos provistos por Shipping App</p>
        </div>
        <ErrorPanel
          app="Shipping App"
          endpoint={`${shipping.url}/api/control-plane/operadores`}
          status={res.status}
          message={res.error}
        />
      </main>
    );
  }

  const term = q?.toLowerCase().trim();

  let operadores = res.data.items;
  if (estado === "activos") operadores = operadores.filter((o) => !o.is_deleted);
  if (estado === "inactivos") operadores = operadores.filter((o) => o.is_deleted);
  if (term) {
    operadores = operadores.filter(
      (o) =>
        o.nombre.toLowerCase().includes(term) ||
        o.apellido.toLowerCase().includes(term) ||
        o.mail.toLowerCase().includes(term) ||
        o.dni.includes(term)
    );
  }

  const totalActivos = res.data.items.filter((o) => !o.is_deleted).length;
  const totalInactivos = res.data.items.length - totalActivos;
  const totalEnvios = res.data.items.reduce((acc, o) => acc + o.total_envios, 0);

  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium border transition ${
      active
        ? "bg-cyan-500 text-gray-950 border-cyan-500"
        : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
    }`;

  const queryString = (params: Record<string, string | undefined>) => {
    const usp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) usp.set(k, v);
    const s = usp.toString();
    return s ? `?${s}` : "";
  };

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Operadores</h1>
        <p className="text-gray-400 mt-1">
          Datos provistos por <span className="text-cyan-400">Shipping App</span>
          {" · "}
          latencia <span className="font-mono">{res.latencyMs}ms</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{totalActivos}</p>
          <p className="text-xs text-gray-400 mt-1">Activos</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{totalInactivos}</p>
          <p className="text-xs text-gray-400 mt-1">Inactivos</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-cyan-400">{totalEnvios}</p>
          <p className="text-xs text-gray-400 mt-1">Envíos gestionados</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <a href={`/operadores${queryString({ q })}`} className={tabClass(!estado)}>
          Todos
        </a>
        <a href={`/operadores${queryString({ q, estado: "activos" })}`} className={tabClass(estado === "activos")}>
          Activos
        </a>
        <a href={`/operadores${queryString({ q, estado: "inactivos" })}`} className={tabClass(estado === "inactivos")}>
          Inactivos
        </a>
      </div>

      <SearchInput
        basePath="/operadores"
        defaultValue={q}
        placeholder="Buscar por nombre, apellido, email o DNI..."
      />

      {operadores.length === 0 ? (
        <p className="text-gray-400">No hay operadores con ese criterio.</p>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-left text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3">Operador</th>
                <th className="px-4 py-3">DNI</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3 text-center">Envíos</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {operadores.map((op) => (
                <tr key={op.id} className="hover:bg-gray-800 transition text-gray-300 text-sm">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white font-medium">
                        {op.apellido}, {op.nombre}
                      </p>
                      <p className="text-gray-500 text-xs font-mono mt-0.5" title={op.id}>
                        {op.id.slice(0, 8)}...
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono">{op.dni || "-"}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gray-200">{op.mail}</p>
                      <p className="text-gray-500 text-xs">{op.celular || "-"}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-mono">{op.total_envios}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      op.is_deleted
                        ? "bg-red-900 text-red-400"
                        : "bg-green-900 text-green-400"
                    }`}>
                      {op.is_deleted ? "Inactivo" : "Activo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ToggleOperador
                      operadorId={op.id}
                      nombreCompleto={`${op.nombre} ${op.apellido}`}
                      isDeleted={op.is_deleted}
                      enviosActivos={op.envios_activos}
                    />
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
