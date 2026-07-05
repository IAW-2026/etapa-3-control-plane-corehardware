const dateFormatter = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})

export function formatDate(date: string | null): string {
    if (!date) return '—'
    return dateFormatter.format(new Date(date))
}

export function shortId(id: string, length = 8): string {
    return `…${id.slice(-length)}`
}