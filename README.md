[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Fu6E-LL6)

# Control Plane — CoreHardware

Panel administrativo centralizado del ecosistema CoreHardware (comisión **CoreHardware** del [Proyecto IAW 2026](https://iaw-2026.github.io/proyecto/)). Consolida la gestión de las cuatro apps (Buyer, Seller, Shipping, Payments) en una sola interfaz, comunicándose con cada una vía sus APIs públicas.

> **No reemplaza** los paneles admin individuales de cada app — los **complementa** con una vista de mayor nivel.

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Autenticación:** Clerk (rol `admin`)
- **Estilos:** Tailwind CSS v4
- **Deploy:** Vercel

No tiene base de datos propia: todos los datos vienen de las APIs de las otras apps.

---

## Estructura del proyecto

```
app/                 → páginas Next.js
  ├ page.tsx         → Dashboard global (health checks + KPIs)
  ├ usuarios/        → vista unificada de usuarios
  ├ pedidos/         → consume Buyer
  ├ envios/          → consume Shipping
  ├ pagos/           → consume Payments
  └ disputas/        → consume Payments
  (obsoleto, a determinar)
components/          → React components
proxy.ts        → bloquea acceso sin rol admin
```

---

## Branches

| Branch | Uso |
|--------|-----|
| `main` | Branch de produccion |
| `develop` | Integración de features |
| `feature/*` | Features puntuales que se mergean a `develop` |

---

## Setup local

1. **Clonar y entrar:**
   ```bash
   git clone git@github.com:github.com/IAW-2026/etapa-3-control-plane-corehardware.git
   cd etapa-3-control-plane-corehardware
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` siguiendo el formato de `.env.example`. Hay que conseguir:
   - Las credenciales de Clerk (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`).
   - Las API keys de cada app del ecosistema (las comparten los responsables de cada repositorio).

4. **Correr en dev:**
   ```bash
   pnpm dev
   ```

---

## Integraciones

| App | Endpoint consumido | Estado |
|-----|-------------------|--------|
| Buyer | `/api/admin/buyers`, `/api/admin/orders`, `/api/admin/orders/stats` | ⚠️ Hay que agregar auth dual (Clerk + API Key) |
| Seller | `/api/admin/sellers` | ❌ Aún no expuesto |
| Shipping | `/api/admin/envios`, `/api/admin/operadores`, `/api/health`, `/api/admin/stats/*` | ✅ Ya disponible |
| Payments | `/api/admin/pagos`, `/api/admin/disputas` | ❌ Aún no expuesto |

A medida que cada app expone sus endpoints admin, el Control Plane los va consumiendo.

---

## Estrategia de autenticación

- **Hacia los usuarios:** Clerk con rol `admin`. El middleware redirige a `/unauthorized` a quien no tenga el rol.
- **Hacia las otras apps:** API Key en header `X-API-Key`. Cada app del ecosistema valida su propia key.

---

## Decisiones de diseño

- **No DB propia.** La fuente de verdad de cada entidad sigue siendo su app dueña.
- **Acciones administrativas se derivan, no se duplican.** Si el admin desactiva un comprador, el Control Plane llama a `PUT /api/admin/buyers/{id}` de Buyer App, no toca su DB.

---

## Responsables del ecosistema

| App | Owner |
|-----|-------|
| Buyer | Yanina Rivera |
| Seller | Sebastián Pereda |
| Shipping | Matías Junca |
| Payments | Agustín Ferrante |
| Control Plane (este) | Agustín Ferrante |
| Analytics Dahsboard | **Compartida** (Yanina Rivera, Sebastián Pereda, Matías Junca) |

Enunciado completo: <https://iaw-2026.github.io/proyecto/>
