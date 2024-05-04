import type { Metadata } from 'next'
import { Bricolage_Grotesque, Exo_2, Overpass } from 'next/font/google'
import './globals.css'
import SideNav from './components/SideNav'
import { twMerge } from 'tailwind-merge'

const overpass = Overpass()
const bricolage_grotesque = Bricolage_Grotesque()

export const metadata: Metadata = {
    title: 'Fabric',
    description: 'A design system library',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={twMerge(
                    'flex min-h-screen w-full justify-center',
                    overpass.className,
                )}
            >
                <div className="flex w-full max-w-[1440px]">
                    <SideNav />
                    <main className="flex w-full flex-col px-8 pb-8 pt-20">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}
