import { ReactNode } from 'react'

export default function PageWrapper({
    children,
}: {
    children?: ReactNode | ReactNode[]
}) {
    return <div className="flex flex-col gap-40">{children}</div>
}
