"use client";

import { useState, useTransition } from "react";
import { asignarOperadorAction } from "./actions";

interface OperadorOption {
  id: string;
  label: string;
}

interface Props {
  envioId: string;
  operadorActual: string | null;
  operadores: OperadorOption[];
  estado: string;
}

const ESTADO_BLOQUEA = ["ENTREGADO"];

export default function AsignarOperador({
  envioId,
  operadorActual,
  operadores,
  estado,
}: Props) {
  const [seleccion, setSeleccion] = useState<string>(operadorActual ?? "");
  const [isPending, startTransition] = useTransition();
  const [mensaje, setMensaje] = useState<string | null>(null);

  if (ESTADO_BLOQUEA.includes(estado)) {
    return <span className="text-gray-500 text-xs italic">No editable</span>;
  }

  const cambioPendiente = seleccion !== (operadorActual ?? "");

  function handleGuardar() {
    setMensaje(null);
    startTransition(async () => {
      const res = await asignarOperadorAction(envioId, seleccion || null);
      if (res.ok) {
        setMensaje("✓ Guardado");
        setTimeout(() => setMensaje(null), 1500);
      } else {
        setMensaje(`✗ ${res.error ?? "Error"}`);
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={seleccion}
        onChange={(e) => setSeleccion(e.target.value)}
        disabled={isPending}
        className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500 max-w-[160px]"
      >
        <option value="">— Sin asignar —</option>
        {operadores.map((op) => (
          <option key={op.id} value={op.id}>
            {op.label}
          </option>
        ))}
      </select>
      {cambioPendiente && (
        <button
          onClick={handleGuardar}
          disabled={isPending}
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 px-2 py-1 rounded text-xs font-semibold disabled:opacity-50 transition"
        >
          {isPending ? "..." : "Guardar"}
        </button>
      )}
      {mensaje && (
        <span className={`text-xs ${mensaje.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
          {mensaje}
        </span>
      )}
    </div>
  );
}
