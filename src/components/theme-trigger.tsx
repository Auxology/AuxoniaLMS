'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'

import { Toggle } from '@/components/ui/toggle'

export default function ThemeTrigger() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div>
                <Toggle
                    variant="default"
                    className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent"
                    pressed={false}
                    aria-label="Toggle theme"
                    disabled
                >
                    <SunIcon
                        size={16}
                        className="shrink-0 scale-100 opacity-100 transition-all"
                        aria-hidden="true"
                    />
                </Toggle>
            </div>
        )
    }

    return (
        <div>
            <Toggle
                variant="default"
                className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent"
                pressed={theme === 'dark'}
                onPressedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                <MoonIcon
                    size={16}
                    className="shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100 group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
                    aria-hidden="true"
                />
                <SunIcon
                    size={16}
                    className="absolute shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0 group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                    aria-hidden="true"
                />
            </Toggle>
        </div>
    )
}
