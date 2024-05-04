import { ReactNode } from 'react'

export default function AdminPageWrapper({
    children,
}: {
    children?: ReactNode | ReactNode[]
}) {
    return <div className="flex flex-col gap-8">{children}</div>
}
