import { AppService } from "@/lib/apps";
import { AppResponse } from "@/lib/client";

interface HealthData {
  status: string;
  db?: string;
  latency_ms?: number;
  timestamp?: string;
}

const STATUS_STYLES: Record<string, { color: string; label: string; dot: string }> = {
  ok:        { color: "border-green-700 bg-green-950/40",  label: "Online",      dot: "bg-green-400" },
  degraded:  { color: "border-yellow-700 bg-yellow-950/40", label: "Degradado",  dot: "bg-yellow-400" },
  down:      { color: "border-red-700 bg-red-950/40",       label: "Caído",      dot: "bg-red-400" },
  unknown:   { color: "border-gray-700 bg-gray-900",        label: "Sin datos",  dot: "bg-gray-500" },
};

interface Props {
  app: AppService;
  response: AppResponse<HealthData>;
}

export default function ServiceStatusCard({ app, response }: Props) {
  const status = !response.ok
    ? "down"
    : response.data?.status === "ok"
      ? "ok"
      : response.data?.status === "degraded"
        ? "degraded"
        : "unknown";

  const style = STATUS_STYLES[status];

  return (
    <div className={`rounded-xl border ${style.color} p-5 transition`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">{app.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{app.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
          <span className="text-xs text-gray-300">{style.label}</span>
        </div>
      </div>

      <div className="text-xs text-gray-400 space-y-1 mt-3 pt-3 border-t border-gray-800">
        <div className="flex justify-between">
          <span>Latencia</span>
          <span className="text-gray-200 font-mono">
            {response.latencyMs}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span>Owner</span>
          <span className="text-gray-200">{app.owner}</span>
        </div>
        {response.data?.db && (
          <div className="flex justify-between">
            <span>DB</span>
            <span className={response.data.db === "ok" ? "text-green-400" : "text-red-400"}>
              {response.data.db}
            </span>
          </div>
        )}
        {response.error && (
          <p className="text-red-400 text-xs mt-2 truncate" title={response.error}>
            {response.error}
          </p>
        )}
      </div>
    </div>
  );
}
