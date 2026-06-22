"use client";

import { useTransition, useState } from "react";
import { toggleOperadorAction } from "./actions";

interface Props {
  operadorId: string;
  nombreCompleto: string;
  isDeleted: boolean;
  enviosActivos: number;
}

export default function ToggleOperador({
  operadorId,
  nombreCompleto,
  isDeleted,
  enviosActivos,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);

  function handleClick() {
    const nuevoEstado = !isDeleted;
    const accion = nuevoEstado ? "desactivar" : "activar";

    let confirmMsg = `¿Seguro que querés ${accion} a ${nombreCompleto}?`;
    if (nuevoEstado && enviosActivos > 0) {
      confirmMsg += `\n\nEsto va a liberar ${enviosActivos} envío(s) en curso, que volverán a estado PENDIENTE.`;
    }
    if (!confirm(confirmMsg)) return;

    setFeedback(null);
    startTransition(async () => {
      const res = await toggleOperadorAction(operadorId, nuevoEstado);
      if (!res.ok) {
        setFeedback({ kind: "error", msg: res.error ?? "Error" });
        return;
      }
      const msg = nuevoEstado
        ? res.enviosLiberados && res.enviosLiberados > 0
          ? `✓ Desactivado · ${res.enviosLiberados} envío(s) liberado(s)`
          : "✓ Desactivado"
        : "✓ Activado";
      setFeedback({ kind: "ok", msg });
      setTimeout(() => setFeedback(null), 3000);
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
      {feedback && (
        <span className={`text-xs ${feedback.kind === "ok" ? "text-green-400" : "text-red-400"}`}>
          {feedback.msg}
        </span>
      )}
    </div>
  );
}
