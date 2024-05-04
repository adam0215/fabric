import React from 'react'
import ColorCardCodeCopyable from './ColorCardCodeCopyable'
import { addHashtagToHexCode } from '../utils/colorUtils'
import tinycolor from 'tinycolor2'
import { twMerge } from 'tailwind-merge'
import { groupArrayOfObjects } from '../utils/arrayUtils'

export type ColorCard = {
    name?: string
    hexCode?: string
    textColor?: string
    id: number
    category?: string
}

export default function ColorCardGrid({
    items,
    colorCategoryDescriptions,
}: {
    items?: ColorCard[]
    colorCategoryDescriptions: { [key: string]: string }
}) {
    const groupedColors = groupArrayOfObjects(
        items ?? [],
        (c) => c.category ?? 'uncategorized',
    )

    return (
        <div className="flex w-full flex-col gap-32">
            {groupedColors &&
                Object.keys(groupedColors).map((category) => (
                    <div className="flex flex-col gap-16" key={category}>
                        <div className="flex flex-col justify-between gap-8 lg:flex-row">
                            <h2 className="font-display text-6xl font-bold">
                                {category}
                            </h2>
                            <p className="mt-2 max-w-[512px]">
                                {colorCategoryDescriptions[category]}
                            </p>
                        </div>
                        <div className="auto-fit-[360px] grid w-full gap-4">
                            {groupedColors[category].map((color) => (
                                <ColorCard key={color.id} {...color} />
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}

function ColorCard({ name, hexCode, textColor }: ColorCard) {
    hexCode = addHashtagToHexCode(hexCode ?? '')
    textColor = addHashtagToHexCode(textColor ?? '')

    const backgroundIsLight = tinycolor(hexCode).getLuminance() > 0.3
    const dynamicDefaultTextColor = backgroundIsLight
        ? 'inherit'
        : 'text-zinc-100'

    return (
        <div
            className={twMerge(
                'flex h-80 flex-col justify-between gap-4 rounded-md p-8',
                !textColor && dynamicDefaultTextColor,
            )}
            style={{
                backgroundColor: hexCode,
                color: textColor ? textColor : '',
            }}
        >
            <ColorCardCodeCopyable hexCode={hexCode} />
            <p className="text-6xl font-medium">{name}</p>
        </div>
    )
}
