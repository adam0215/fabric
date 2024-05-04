'use client'

import { addHashtagToHexCode } from '../utils/colorUtils'

export default function ColorCardCodeCopyable({
    hexCode,
}: {
    hexCode?: string
}) {
    const copyColorCode = () => {
        navigator.clipboard.writeText(addHashtagToHexCode(hexCode ?? ''))
    }

    return (
        <p
            className="flex cursor-pointer justify-between"
            onClick={() => copyColorCode()}
        >
            <span>HEX:</span>
            <span>{hexCode}</span>
        </p>
    )
}
