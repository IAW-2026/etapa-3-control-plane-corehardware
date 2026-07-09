interface FieldProps {
    label: string
    children: React.ReactNode
}

export function Field({ label, children }: FieldProps) {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wide text-[#5C5E56] dark:text-[#8C8E82]">
                {label}
            </label>
            {children}
        </div>
    )
}