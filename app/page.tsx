import HugePageTitle from './components/HugePageTitle'
import PageWrapper from './components/PageWrapper'
import TokenGrid from './components/TokensGrid'
import { NAV_LINKS } from './nav'

export default function TokensPage() {
    return (
        <PageWrapper>
            <HugePageTitle>Tokens</HugePageTitle>
            <TokenGrid items={NAV_LINKS} />
        </PageWrapper>
    )
}
