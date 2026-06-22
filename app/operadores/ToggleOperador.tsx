"use client";

import { useTransition, useState } from "react";
import { toggleOperadorAction } from "./actions";

interface Props {
  operadorId: string;
  nombreCompleto: string;
  isDeleted: boolean;
}

export default function ToggleOperador({
  operadorId,
  nombreCompleto,
  isDeleted,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    const nuevoEstado = !isDeleted;
    const accion = nuevoEstado ? "desactivar" : "activar";
    if (!confirm(`¿Seguro que querés ${accion} a ${nombreCompleto}?`)) return;

    setError(null);
    startTransition(async () => {
      const res = await toggleOperadorAction(operadorId, nuevoEstado);
      if (!res.ok) setError(res.error ?? "Error");
    });
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleClick}
        disabled={isPending}
        className={`px-3 py-1 rounded-lg text-xs font-semibold transition disabled:opacity-50 ${
          isDeleted
            ? "bg-green-700 hover:bg-green-600 text-white"
            : "bg-red-700 hover:bg-red-600 text-white"
        }`}
      >
        {isPending ? "..." : isDeleted ? "Activar" : "Desactivar"}
      </button>
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
}
