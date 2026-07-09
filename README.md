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
app/                    → Páginas Next.js
  ├ (auth)              → Página de login
  └ (protected)
      ├ page.tsx        → Landing Page
      ├ buyer/          → Consume Buyer
      ├ home/           → Mapa del ecosistema CoreHardware
      ├ payments/       → Consume Payments
      ├ seller/         → Consume Seller
      └ shipping/       → Consume Shipping
components/             → React components
proxy.ts                → bloquea acceso sin rol admin
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

| App | Endpoint consumido |
|-----|-------------------|
| Buyer | `/api/buyers/paginated`, `/api/buyers/[id]` |
| Seller | `/api/sellers/paginated`, `/api/sellers/[id]` |
| Shipping | `/api/operadores`, `/api/operadores/[id]` |
| Payments | `/api/disputes`, `/api/disputes/[id]` |


---

## Estrategia de autenticación

- **Hacia los usuarios:** Clerk con rol `admin`. El middleware redirige a `/unauthorized` a quien no tenga el rol.
- **Hacia las otras apps:** API Key en header `X-API-Key`. Cada app del ecosistema valida su propia key.

---

## Decisiones de diseño

- **No DB propia.** La fuente de verdad de cada entidad sigue siendo su app dueña.
- **Acciones administrativas se derivan, no se duplican.** Si el admin modifica un comprador, el Control Plane llama a `PATCH /api/buyers/[id]` de Buyer App, no toca su DB.

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
