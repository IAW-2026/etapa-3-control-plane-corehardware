"use server";

import { revalidatePath } from "next/cache";
import { getApp } from "@/lib/apps";
import { callApp } from "@/lib/client";

export async function toggleOperadorAction(
  operadorId: string,
  isDeleted: boolean
): Promise<{ ok: boolean; error?: string }> {
  const shipping = getApp("shipping");
  const res = await callApp(shipping, `/api/control-plane/operadores/${operadorId}`, {
    method: "PATCH",
    body: { is_deleted: isDeleted },
  });
  if (!res.ok) {
    return { ok: false, error: res.error ?? `HTTP ${res.status}` };
  }
  revalidatePath("/operadores");
  revalidatePath("/envios");
  return { ok: true };
}
