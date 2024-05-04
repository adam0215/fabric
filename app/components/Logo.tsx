import { Bricolage_Grotesque } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

const bricolage_grotesque = Bricolage_Grotesque()

export default function Logo() {
    return (
        <div
            className={twMerge(
                'text-4xl font-black',
                bricolage_grotesque.className,
            )}
        >
            fabric
        </div>
    )
}
