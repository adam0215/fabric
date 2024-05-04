import { getAllColors } from '../actions'
import ColorCardGrid from '../components/ColorCardGrid'
import HugePageTitle from '../components/HugePageTitle'
import PageWrapper from '../components/PageWrapper'

export default async function ColorPage() {
    const colors = await getAllColors()

    return (
        <PageWrapper>
            <HugePageTitle>Color</HugePageTitle>
            <ColorCardGrid
                items={colors.map((color) => ({
                    hexCode: color.hex_code,
                    name: color.name,
                    id: color.id,
                    category: color.color_category_name,
                }))}
            />
        </PageWrapper>
    )
}
