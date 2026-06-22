"use server";

import { revalidatePath } from "next/cache";
import { getApp } from "@/lib/apps";
import { callApp } from "@/lib/client";

export async function asignarOperadorAction(
  envioId: string,
  operadorId: string | null
): Promise<{ ok: boolean; error?: string }> {
  const shipping = getApp("shipping");
  const res = await callApp(shipping, `/api/control-plane/envios/${envioId}`, {
    method: "PATCH",
    body: { operador_id: operadorId },
  });
  if (!res.ok) {
    return { ok: false, error: res.error ?? `HTTP ${res.status}` };
  }
  revalidatePath("/envios");
  return { ok: true };
}
