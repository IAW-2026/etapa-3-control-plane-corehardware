[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Fu6E-LL6)

# Control Plane — CoreHardware

Panel administrativo centralizado del ecosistema CoreHardware (comisión **CoreHardware** del [Proyecto IAW 2026](https://iaw-2026.github.io/proyecto/)). Consolida la gestión de las cuatro apps (Buyer, Seller, Shipping, Payments) en una sola interfaz, comunicándose con cada una vía sus APIs públicas.

> **No reemplaza** los paneles admin individuales de cada app — los **complementa** con una vista de mayor nivel.

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Autenticación:** Clerk (rol `admin`)
- **Estilos:** Tailwind CSS v4
- **Deploy:** Vercel (branch `produccion`)

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
components/          → React components
lib/
  ├ apps.ts          → registro central de las 4 apps
  ├ client.ts        → cliente HTTP genérico
  └ auth.ts          → guard de rol admin
middleware.ts        → bloquea acceso sin rol admin
```

---

## Branches

| Branch | Uso |
|--------|-----|
| `main` | Sólo README (la generada por Classroom) |
| `produccion` | **Branch de deploy** (Vercel auto-deploya desde acá) |
| `develop` | Integración de features (cuando se sumen más personas) |
| `feature/*` | Features puntuales que se mergean a `develop` |

---

## Setup local

1. **Clonar y entrar:**
   ```bash
   git clone https://github.com/IAW-2026/etapa-3-control-plane-corehardware.git
   cd etapa-3-control-plane-corehardware
   git checkout produccion
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env.local` siguiendo el formato de `.env.example`. Hay que conseguir:
   - Las credenciales de Clerk (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`).
   - Las API keys de cada app del ecosistema (las comparten los responsables de cada repo).

4. **Correr en dev:**
   ```bash
   npm run dev
   ```

---

## Deploy en Vercel

1. Importar el repo `etapa-3-control-plane-corehardware`.
2. En **Project Settings → Git → Production Branch** cambiar de `main` a `produccion`.
3. Cargar las variables de entorno (las mismas que el `.env.local`).
4. Cada push a `produccion` deploya automáticamente.

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
- **Auth dual en endpoints destino:** las apps consumidas deben aceptar tanto sesión Clerk (para sus propias UIs) como API Key (para el Control Plane y servicios externos).

---

## Decisiones de diseño

- **No DB propia.** El Control Plane es un cliente HTTP elegante: lee de cada app y delega acciones. La fuente de verdad de cada entidad sigue siendo su app dueña.
- **Acciones administrativas se derivan, no se duplican.** Si el admin desactiva un comprador, el Control Plane llama a `PATCH /api/admin/buyers/{id}` de Buyer App, no toca su DB.
- **Health checks por servicio.** El dashboard principal hace ping a `/api/health` de cada app en paralelo y muestra estado en tiempo real.
- **Registro central de apps** en `lib/apps.ts`. Si cambia una URL o key, se actualiza un solo archivo.

---

## Responsables del ecosistema

| App | Owner |
|-----|-------|
| Buyer | Yanina Rivera |
| Seller | Sebastián Pereda |
| Shipping | Matías Junca |
| Payments | Agustín Ferrante |
| Control Plane (este) | (definir) |

Enunciado completo: <https://iaw-2026.github.io/proyecto/>
