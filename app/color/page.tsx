import { getAllColors } from '../actions'
import ColorCardGrid from '../components/ColorCardGrid'
import HugePageTitle from '../components/HugePageTitle'
import PageWrapper from '../components/PageWrapper'

export default async function ColorPage() {
    const colors = await getAllColors()

    const colorCategoryDescriptions = colors.reduce(
        (descriptions, color) => {
            descriptions[color.color_category_name] =
                color.color_category_description
            return descriptions
        },
        {} as Record<string, string>,
    )

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
                colorCategoryDescriptions={colorCategoryDescriptions}
            />
        </PageWrapper>
    )
}
