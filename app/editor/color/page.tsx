import SmallPageTitle from '@/app/components/SmallPageTitle'
import AdminPageWrapper from '@/app/components/AdminPageWrapper'
import {
    AddColorTokenCard,
    ColorTokenCard,
} from '@/app/components/editor/ColorTokenCard'
import { getAllCategories, getAllColors } from '@/app/actions'
import AddCategoryButton from '@/app/components/editor/AddCategoryButton'
import InteractiveCategoryHeading from '@/app/components/editor/InteractiveCategoryHeading'

export default async function EditorMainPage() {
    const colors = await getAllColors()
    const colorCategories = await getAllCategories()

    return (
        <AdminPageWrapper>
            <SmallPageTitle>Color</SmallPageTitle>
            {colorCategories.map((category) => (
                <section className="flex flex-col gap-4" key={category.id}>
                    <InteractiveCategoryHeading {...category} />
                    <div className="flex w-full flex-wrap gap-4">
                        {colors
                            .filter(
                                (color) =>
                                    color.color_category_id == category.id,
                            )
                            .map((color) => (
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
                        <AddColorTokenCard
                            colorCategories={colorCategories}
                            currentCategoryId={category.id}
                        />
                    </div>
                </section>
            ))}
            <AddCategoryButton />
        </AdminPageWrapper>
    )
}
