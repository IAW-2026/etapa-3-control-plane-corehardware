interface IdentityTagProps {
    label: string
    value: string
}

export function IdentityTag({ label, value }: IdentityTagProps) {
    return (
        <div className="relative border border-[#1A1A18] dark:border-[#EDECE6] px-4 py-3 flex items-center justify-between">
            <span className="absolute -top-px -left-px w-2 h-2 border-t border-l border-[#1A1A18] dark:border-[#EDECE6]" />
            <span className="absolute -top-px -right-px w-2 h-2 border-t border-r border-[#1A1A18] dark:border-[#EDECE6]" />
            <span className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-[#1A1A18] dark:border-[#EDECE6]" />
            <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-[#1A1A18] dark:border-[#EDECE6]" />
            <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#5C5E56] dark:text-[#8C8E82]">
                    {label}
                </span>
                <span className="block text-lg font-semibold tracking-wide tabular-nums mt-0.5">
                    {value}
                </span>
            </div>
            <span className="w-2 h-2 bg-[#C1440E] dark:bg-[#E0662B]" />
        </div>
    )
}