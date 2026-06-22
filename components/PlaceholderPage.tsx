interface Props {
  title: string;
  description: string;
  sourceApp: string;
  endpoint: string;
  status: "ready" | "pending" | "blocked";
  notes?: string;
}

export default function PlaceholderPage({
  title, description, sourceApp, endpoint, status, notes,
}: Props) {
  const statusInfo = {
    ready:   { color: "text-green-400 bg-green-950/40 border-green-800",   label: "Listo para implementar" },
    pending: { color: "text-yellow-400 bg-yellow-950/40 border-yellow-800", label: "Pendiente integración" },
    blocked: { color: "text-red-400 bg-red-950/40 border-red-800",         label: "Bloqueado" },
  }[status];

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400 mt-1">{description}</p>
      </div>

      <div className={`rounded-xl border ${statusInfo.color} p-6`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs uppercase tracking-wider font-semibold">{statusInfo.label}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
          <div>
            <span className="text-gray-500">App de origen:</span>{" "}
            <span className="text-white font-semibold">{sourceApp}</span>
          </div>
          <div>
            <span className="text-gray-500">Endpoint:</span>{" "}
            <span className="text-white font-mono text-xs">{endpoint}</span>
          </div>
        </div>
        {notes && (
          <p className="text-gray-400 text-sm mt-4 leading-relaxed">{notes}</p>
        )}
      </div>
    </main>
  );
}
