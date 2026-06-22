interface Props {
  app: string;
  endpoint: string;
  status: number;
  message: string | null;
}

export default function ErrorPanel({ app, endpoint, status, message }: Props) {
  return (
    <div className="bg-red-950/40 border border-red-800 rounded-xl p-6">
      <h3 className="text-red-400 font-semibold mb-2">
        No se pudo cargar la información
      </h3>
      <div className="space-y-1 text-sm text-gray-300">
        <p><span className="text-gray-500">App:</span> {app}</p>
        <p><span className="text-gray-500">Endpoint:</span> <span className="font-mono text-xs">{endpoint}</span></p>
        <p><span className="text-gray-500">HTTP status:</span> {status || "sin respuesta"}</p>
        {message && (
          <p className="text-red-400 mt-2 text-xs">{message}</p>
        )}
      </div>
      <p className="text-gray-400 text-xs mt-4 leading-relaxed">
        Verificar que la API Key esté configurada y que el endpoint exista en la app destino.
      </p>
    </div>
  );
}
