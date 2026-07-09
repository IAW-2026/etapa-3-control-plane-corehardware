import { STATUS_LABELS, type DisputeStatus } from '@/types/payments'

const STATUS_STYLES: Record<DisputeStatus, string> = {
    pendiente: 'border-[#C1440E] text-[#C1440E] dark:border-[#E0662B] dark:text-[#E0662B]',
    repuesta: 'border-[#5C5E56] text-[#5C5E56] dark:border-[#8C8E82] dark:text-[#8C8E82]',
    reembolsada: 'border-[#3F7D4C] text-[#3F7D4C] dark:border-[#5FAE72] dark:text-[#5FAE72]',
    rechazada: 'border-[#9B3A2E] text-[#9B3A2E] dark:border-[#C15A46] dark:text-[#C15A46]',
}

export function StatusBadge({ status }: { status: DisputeStatus }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-[10px] uppercase tracking-[0.15em] font-mono whitespace-nowrap ${STATUS_STYLES[status]}`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
            {STATUS_LABELS[status]}
        </span>
    )
}