'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

interface SelectOption {
    value: string
    label: string
}

interface SelectProps {
    value: string
    onChange: (value: string) => void
    options: (string | SelectOption)[]
    disabled?: boolean
    ariaLabel?: string
}

function normalize(option: string | SelectOption): SelectOption {
    return typeof option === 'string' ? { value: option, label: option } : option
}

export function Select({ value, onChange, options, disabled = false, ariaLabel }: SelectProps) {
    const normalized = options.map(normalize)
    const selected = normalized.find((option) => option.value === value)

    return (
        <Listbox value={value} onChange={onChange} disabled={disabled}>
            <ListboxButton
                aria-label={ariaLabel}
                className="w-full border border-[#D3D2C9] dark:border-[#2A2A26] bg-transparent px-3 py-2 text-sm font-mono text-left focus:outline-none focus:border-[#C1440E] dark:focus:border-[#E0662B] data-[open]:border-[#C1440E] dark:data-[open]:border-[#E0662B] disabled:opacity-50"
            >
                {selected?.label ?? value}
            </ListboxButton>
            <ListboxOptions
                anchor="bottom start"
                className="w-[var(--button-width)] border border-[#1A1A18] dark:border-[#EDECE6] bg-[#EBEAE3] dark:bg-[#141412] font-mono z-[60]"
            >
                {normalized.map((option) => (
                    <ListboxOption
                        key={option.value}
                        value={option.value}
                        className="px-3 py-2 text-sm cursor-pointer text-[#1A1A18] dark:text-[#EDECE6] data-[focus]:bg-[#C1440E]/10 data-[focus]:text-[#C1440E] dark:data-[focus]:text-[#E0662B]"
                    >
                        {option.label}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}