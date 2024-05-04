import SmallPageTitle from '@/app/components/SmallPageTitle'
import AdminPageWrapper from '@/app/components/AdminPageWrapper'
import {
    AddColorTokenCard,
    ColorTokenCard,
} from '@/app/components/editor/ColorTokenCard'
import { getAllCategories, getAllColors } from '@/app/actions'
import { groupArrayOfObjects } from '@/app/utils/arrayUtils'

export default async function EditorMainPage() {
    const colors = await getAllColors()

    const groupedColors = groupArrayOfObjects(
        colors,
        (c) => c.color_category_name,
    )

    const colorCategories = await getAllCategories()

    return (
        <AdminPageWrapper>
            <SmallPageTitle>Color</SmallPageTitle>
            {groupedColors &&
                Object.keys(groupedColors).map((category) => (
                    <section className="flex flex-col gap-4">
                        <h3 className="text-2xl font-medium text-zinc-600">
                            {category}
                        </h3>
                        <div className="flex w-full flex-wrap gap-4">
                            {groupedColors[category].map((color) => (
                                <ColorTokenCard
                                    id={color.id}
                                    colorName={color.name}
                                    hexCode={color.hex_code}
                                    category={color.color_category_name}
                                    categoryId={color.color_category_id}
                                    colorCategories={colorCategories}
                                    key={color.id}
                                />
                            ))}
                            <AddColorTokenCard />
                        </div>
                    </section>
                ))}
        </AdminPageWrapper>
    )
}
