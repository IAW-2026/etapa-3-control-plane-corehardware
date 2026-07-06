import { SHORT_ID_DEFAULT_LENGTH } from "./constants"

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})

export function formatDate(date: string | null): string {
    if (!date) return '—'
    return dateFormatter.format(new Date(date))
}

export function shortId(id: string, length = SHORT_ID_DEFAULT_LENGTH): string {
    return `…${id.slice(-length)}`
}