import React, { ReactNode } from 'react'
import ColorCardCodeCopyable from './ColorCardCodeCopyable'
import { addBangToHexCode } from '../utils/colorUtils'
import tinycolor from 'tinycolor2'
import { twMerge } from 'tailwind-merge'

export type ColorCard = {
    name?: string
    hexCode?: string
    textColor?: string
    id?: number
    category?: string
}

export default function ColorCardGrid({ items }: { items?: ColorCard[] }) {
    const groupedColors = items?.reduce(
        (groups: { [key: string]: ColorCard[] }, item: ColorCard) => {
            groups[item.category!] ||= []
            groups[item.category!].push(item)

            return groups
        },
        {},
    )

    return (
        <div className="flex w-full flex-col">
            {groupedColors &&
                Object.keys(groupedColors).map((category) => (
                    <div className="flex flex-col gap-16" key={category}>
                        <div className="flex justify-between">
                            <h2 className="font-display text-6xl font-bold">
                                {category}
                            </h2>
                            <p className="mt-2 w-[512px]">
                                Mollit veniam do voluptate. Ad magna laborum
                                velit. Culpa eiusmod deserunt dolore esse culpa
                                sit est. Et velit enim nulla labore veniam
                                voluptate proident nisi ex Lorem exercitation
                                Lorem sit. Magna esse ex elit ea esse consequat
                                nostrud in eiusmod amet occaecat occaecat
                                voluptate in.
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
    hexCode = addBangToHexCode(hexCode ?? '')
    textColor = addBangToHexCode(textColor ?? '')

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
