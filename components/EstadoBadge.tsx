interface Props {
  estado: string;
}

const STYLES: Record<string, string> = {
  PENDIENTE:  "bg-gray-800 text-gray-400",
  ASIGNADO:   "bg-cyan-900 text-cyan-400",
  RETIRADO:   "bg-orange-900 text-orange-400",
  EN_CAMINO:  "bg-blue-900 text-blue-400",
  ENTREGADO:  "bg-green-900 text-green-400",
};

export default function EstadoBadge({ estado }: Props) {
  const style = STYLES[estado] ?? "bg-gray-800 text-gray-400";
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
      {estado}
    </span>
  );
}
