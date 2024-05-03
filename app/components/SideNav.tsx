'use client'

import { ReactNode } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { NAV_LINKS } from '../nav'

export default function SideNav() {
    const pathname = usePathname()

    return (
        <aside>
            <nav className="flex w-64 flex-col gap-12 p-8">
                <Link href="/">
                    <Logo />
                </Link>
                <ul className="flex flex-col gap-2">
                    {NAV_LINKS.map(({ label, href }) => (
                        <li key={label}>
                            <MenuLink
                                active={isLinkActive(pathname, href)}
                                href={href}
                            >
                                {label}
                            </MenuLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

function MenuLink({
    children,
    href,
    active = false,
}: {
    active?: boolean
    href: string
    children?: ReactNode
}) {
    return (
        <Link
            className={twMerge(
                clsx('cursor-pointer hover:underline', active && 'font-black'),
            )}
            href={href}
        >
            {children}
        </Link>
    )
}

function isLinkActive(currentPathName: string, linkPathName: string) {
    return `/${linkPathName}` == currentPathName
}
