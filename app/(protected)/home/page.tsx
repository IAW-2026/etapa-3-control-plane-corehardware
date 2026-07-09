import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

type GovernedApp = {
    name: string
    description: string
    href: string
    accent: string
}

const governedApps: GovernedApp[] = [
    {
        name: 'Buyer',
        description: 'Pedidos y seguimiento para compradores.',
        href: process.env.BUYER_APP_URL ?? '#',
        accent: '#0891B2',
    },
    {
        name: 'Seller',
        description: 'Publicación de productos y revisión de ventas.',
        href: process.env.SELLER_APP_URL ?? '#',
        accent: '#0891B2',
    },
    {
        name: 'Payments',
        description: 'Procesamiento de pagos y disputas.',
        href: process.env.PAYMENTS_APP_URL ?? '#',
        accent: '#16A34A',
    },
    {
        name: 'Shipping',
        description: 'Asignación de envíos a operadores y actualización de estados.',
        href: process.env.SHIPPING_APP_URL ?? '#',
        accent: '#0891B2',
    },
]

const CONTROL_PLANE_ACCENT = '#C1440E'
const ANALYTICS_ACCENT = '#7C3AED'

/** Conector: línea que baja desde el punto del nodo hasta el próximo hermano.
 *  Vive DENTRO de cada item y mide el 100% de su propia altura, por eso
 *  no se rompe cuando el contenido wrappea a más líneas en mobile. */
function Connector() {
    return <span className="absolute left-0 top-[13px] bottom-0 w-px bg-[#D3D2C9] dark:bg-[#2A2A26]" />
}

function Dot({ color }: { color: string }) {
    return (
        <span
            className="absolute left-0 top-[13px] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: color }}
        />
    )
}

export default function HomePage() {
    return (
        <div className="space-y-6">
            <PageHeader breadcrumb="Control Plane / Inicio" title="Inicio" />

            <div className="border border-[#D3D2C9] dark:border-[#2A2A26] bg-[#EBEAE3] dark:bg-[#141412] p-6 sm:p-10">
                {/* raíz: CoreHardware */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#1A1A18] dark:bg-[#EDECE6]" />
                    <span className="text-xs tracking-[0.2em] uppercase text-[#5C5E56] dark:text-[#8C8E82]">
                        CoreHardware
                    </span>
                </div>

                {/* nivel 1: Control Plane y Analytics, hermanos dentro del ecosistema */}
                <div className="pl-[7px] ml-1">
                    {/* Control Plane — acá estás parado, gobierna las 4 apps de abajo */}
                    <div className="relative pl-8 pb-2">
                        <Connector />
                        <Dot color={CONTROL_PLANE_ACCENT} />

                        <div className="flex items-center gap-3 py-2">
                            <span className="text-base font-semibold" style={{ color: CONTROL_PLANE_ACCENT }}>
                                Control Plane
                            </span>
                            <span className="text-[10px] tracking-[0.1em] uppercase text-[#5C5E56] dark:text-[#8C8E82] border border-[#D3D2C9] dark:border-[#2A2A26] px-1.5 py-0.5">
                                estás aquí
                            </span>
                        </div>

                        {/* nivel 2: las 4 apps que este Control Plane administra */}
                        <div className="pl-[7px] ml-1 mt-1">
                            {governedApps.map((app, i) => (
                                <div key={app.name} className="relative pl-8 pb-5 last:pb-0">
                                    {i < governedApps.length - 1 && <Connector />}
                                    <Dot color={app.accent} />

                                    <Link
                                        href={app.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2 border-b border-transparent hover:border-[#1A1A18] dark:hover:border-[#EDECE6] transition-colors"
                                    >
                                        <span className="text-base font-semibold" style={{ color: app.accent }}>
                                            {app.name}
                                        </span>
                                        <span className="text-xs text-[#5C5E56] dark:text-[#8C8E82]">
                                            {app.description}
                                        </span>
                                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 ml-auto self-center text-[#5C5E56] dark:text-[#8C8E82] group-hover:text-[#1A1A18] dark:group-hover:text-[#EDECE6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Analytics — hermano de Control Plane, no un hijo */}
                    <div className="relative pl-8">
                        <Dot color={ANALYTICS_ACCENT} />

                        <Link
                            href={process.env.NEXT_PUBLIC_ANALYTICS_APP_URL ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2 border-b border-transparent hover:border-[#1A1A18] dark:hover:border-[#EDECE6] transition-colors"
                        >
                            <span className="text-base font-semibold" style={{ color: ANALYTICS_ACCENT }}>
                                Analytics
                            </span>
                            <span className="text-xs text-[#5C5E56] dark:text-[#8C8E82]">
                                Reportes y métricas del ecosistema.
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 ml-auto self-center text-[#5C5E56] dark:text-[#8C8E82] group-hover:text-[#1A1A18] dark:group-hover:text-[#EDECE6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}