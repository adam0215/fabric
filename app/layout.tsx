import type { Metadata } from 'next'
import { Overpass } from 'next/font/google'
import './globals.css'
import SideNav from './components/SideNav'
import { twMerge } from 'tailwind-merge'
import Header from './components/Header'
import {
    getDesignSystemInfo,
    getEnabledSections,
    getOrganizationDesignSystems,
    getOrganizationInfo,
} from './actions'

const overpass = Overpass()

export const metadata: Metadata = {
    title: 'Fabric',
    description: 'A design system library',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const orgInfo = await getOrganizationInfo(1)
    const designSystemInfo = await getDesignSystemInfo(1)

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
                    <div className="w-full">
                        <Header
                            organizationName={orgInfo.name}
                            currentDesignSystem={designSystemInfo.name}
                        />
                        <main className="flex max-w-full flex-col px-8 pb-8 pt-8">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    )
}
