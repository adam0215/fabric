'use client'

import { addBangToHexCode } from '../utils/colorUtils'

export default function ColorCardCodeCopyable({
    hexCode,
}: {
    hexCode?: string
}) {
    const copyColorCode = () => {
        navigator.clipboard.writeText(addBangToHexCode(hexCode ?? ''))
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
