import {
    BetweenVerticalEnd,
    Palette,
    Ruler,
    SquarePi,
    StickyNote,
    Type,
    Image,
    LandPlot,
    BookA,
    AudioLines,
} from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'

export type TokenGridItem = {
    label?: string
    href?: string
}

export default function TokenGrid({ items }: { items?: TokenGridItem[] }) {
    return (
        <div className="auto-fit-[360px] grid w-full gap-4">
            {items &&
                items.length > 0 &&
                items.map(({ label, href }) => (
                    <TokenGridItem href={href}>{label}</TokenGridItem>
                ))}
        </div>
    )
}

function TokenGridItem({
    children,
    href,
}: {
    href?: string
    children?: string
}) {
    return (
        <Link href={href ?? '/'}>
            <div className="flex flex-col gap-4">
                <GridItemImage page={children} />
                <p className="text-3xl font-bold">{children}</p>
            </div>
        </Link>
    )
}

const pageIconDefaultProps = {
    size: 64,
    color: 'inherit',
}

function GridItemImage({ page }: { page?: string }) {
    const pageIcon = getPageIcon(page ? page.toLowerCase() : '')
    const icons = []

    let nIcons = 4 + 1
    while (--nIcons) {
        icons.push(pageIcon)
    }

    return (
        <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-100">
            <div className="flex gap-4 stroke-zinc-400">
                {icons.map(
                    (icon) =>
                        React.cloneElement(icon, {
                            key: page ?? '',
                        }) as ReactNode,
                )}
            </div>
        </div>
    )
}

function getPageIcon(page: string) {
    switch (page) {
        case 'color':
            return <Palette {...pageIconDefaultProps} />
        case 'typography':
            return <Type {...pageIconDefaultProps} />
        case 'icons':
            return <SquarePi {...pageIconDefaultProps} />
        case 'spacing':
            return <BetweenVerticalEnd {...pageIconDefaultProps} />
        case 'sizing':
            return <Ruler {...pageIconDefaultProps} />
        case 'imagery':
            return <Image {...pageIconDefaultProps} />
        case 'mission':
            return <LandPlot {...pageIconDefaultProps} />
        case 'vocabulary':
            return <BookA {...pageIconDefaultProps} />
        case 'tone of voice':
            return <AudioLines {...pageIconDefaultProps} />
        default:
            return <StickyNote {...pageIconDefaultProps} />
    }
}
