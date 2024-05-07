'use client'

import { Dot, StickyNote, User } from 'lucide-react'

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/app/components/shadcn/command'
import { NAV_LINKS } from '../nav'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header({
    organizationName,
    currentDesignSystem,
}: {
    organizationName?: string
    currentDesignSystem?: string
}) {
    return (
        <header className="flex w-full items-center justify-between p-8">
            <Breadcrumbs />
            <div className="flex gap-2">
                {organizationName && (
                    <span className="font-bold">{organizationName}</span>
                )}
                {currentDesignSystem && (
                    <span className="text-zinc-600">{currentDesignSystem}</span>
                )}
            </div>
            <CommandBox />
        </header>
    )
}

function Breadcrumbs() {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter((path) => path)

    return (
        <div className="flex items-center">
            <span>Home</span>
            {pathSegments.map((breadcrumb, i) => {
                return (
                    <span className="inline-flex items-center" key={i}>
                        <Dot
                            size={24}
                            color="inherit"
                            className="stroke-zinc-400"
                        />
                        <span>{formatBreadcrumnLabel(breadcrumb)}</span>
                    </span>
                )
            })}
        </div>
    )
}

function formatBreadcrumnLabel(label: string) {
    const capitalizedFirstLetterString =
        label.charAt(0).toUpperCase() + label.slice(1)

    return capitalizedFirstLetterString.replaceAll('-', ' ')
}

export function CommandBox() {
    const [open, setOpen] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    function handleRouteSelect(href: string) {
        setOpen(false)
        router.push(href)
    }

    return (
        <>
            <p
                className="text-muted-foreground flex cursor-pointer items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm transition-all duration-150 hover:bg-zinc-200"
                onClick={() => setOpen(true)}
            >
                Search
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-300 px-1.5 text-[10px] font-medium opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </p>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {NAV_LINKS.map((link) => (
                            <CommandItem
                                key={link.href}
                                className="flex items-center gap-2"
                                onSelect={() => handleRouteSelect(link.href)}
                            >
                                <StickyNote size={16} />
                                <span>{link.label}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
