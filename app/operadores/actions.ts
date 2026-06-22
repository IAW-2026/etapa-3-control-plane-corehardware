"use server";

import { revalidatePath } from "next/cache";
import { getApp } from "@/lib/apps";
import { callApp } from "@/lib/client";

interface ToggleResponse {
  id: string;
  nombre: string;
  apellido: string;
  is_deleted: boolean;
  envios_liberados?: number;
}

export async function toggleOperadorAction(
  operadorId: string,
  isDeleted: boolean
): Promise<{ ok: boolean; error?: string; enviosLiberados?: number }> {
  const shipping = getApp("shipping");
  const res = await callApp<ToggleResponse>(
    shipping,
    `/api/control-plane/operadores/${operadorId}`,
    {
      method: "PATCH",
      body: { is_deleted: isDeleted },
    }
  );
  if (!res.ok) {
    return { ok: false, error: res.error ?? `HTTP ${res.status}` };
  }
  revalidatePath("/operadores");
  revalidatePath("/envios");
  return { ok: true, enviosLiberados: res.data?.envios_liberados };
}
