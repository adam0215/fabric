import { Tac_One } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

const tacOne = Tac_One({ weight: '400' })

export default function Logo() {
    return (
        <div className={twMerge('text-4xl font-bold', tacOne.className)}>
            FABRIC
        </div>
    )
}
