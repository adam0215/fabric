'use server'

import { createClient } from '@libsql/client'
import {
    ColorCategoriesZodSchema,
    EnabledSectionsZodSchema,
    ExtendedColorsZodSchema,
    OrganizationDesignSystemInfoZodSchema,
    OrganizationDesignSystemsZodSchema,
    OrganizationInfoZodSchema,
} from './querySchemas'
import { revalidatePath } from 'next/cache'

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
})

export async function getAllColors() {
    const { rows } = await client.execute({
        sql: 'SELECT colors.*, color_categories.name AS color_category_name, color_categories.description AS color_category_description FROM colors JOIN color_categories ON colors.color_category_id = color_categories.id;',
        args: {},
    })

    return ExtendedColorsZodSchema.parse(rows)
}

export async function getAllCategories() {
    const { rows } = await client.execute({
        sql: 'SELECT * FROM color_categories;',
        args: {},
    })

    return ColorCategoriesZodSchema.parse(rows)
}

export async function getEnabledSections(designSystemId: number) {
    const { rows } = await client.execute({
        sql: `SELECT
                ds.name AS section_name
                FROM
                design_system_sections AS ds
                JOIN organization_design_system_sections AS org_ds ON ds.id = org_ds.section_id
                JOIN organization_design_systems AS org_design ON org_ds.design_system_id = org_design.id
                WHERE
                org_ds.mode = 1
                AND org_design.organization_id = (:designSystemId);`,
        args: { designSystemId: designSystemId },
    })

    return EnabledSectionsZodSchema.parse(rows)
}

export async function getOrganizationDesignSystems(organizationId: number) {
    const { rows } = await client.execute({
        sql: 'SELECT * FROM organization_design_systems WHERE organization_id = (:organizationId)',
        args: { organizationId: organizationId },
    })

    return OrganizationDesignSystemsZodSchema.parse(rows[0])
}
export async function getOrganizationInfo(organizationId: number) {
    const { rows } = await client.execute({
        sql: 'SELECT name FROM organizations WHERE id = (:organizationId) LIMIT 1',
        args: { organizationId: organizationId },
    })

    return OrganizationInfoZodSchema.parse(rows[0])
}

export async function getDesignSystemInfo(designSystemId: number) {
    const { rows } = await client.execute({
        sql: 'SELECT name, description FROM organization_design_systems WHERE id = (:designSystemId) LIMIT 1',
        args: { designSystemId: designSystemId },
    })

    return OrganizationDesignSystemInfoZodSchema.parse(rows[0])
}

export async function updateColorToken(colorId: number, formData: FormData) {
    const name = formData.get('color-name') as string
    const hexCode = formData.get('hex-code') as string
    const categoryId = formData.get('color-category') as string

    if (!colorId) return false

    const fieldsToChange = []

    if (name) fieldsToChange.push('name = (:name)')
    if (hexCode) fieldsToChange.push('hex_code = (:hexCode)')
    if (categoryId) fieldsToChange.push('color_category_id = (:categoryId)')

    await client.execute({
        sql: `UPDATE colors SET ${fieldsToChange.join(',')} WHERE id = (:id)`,
        args: {
            name: name,
            hexCode: hexCode,
            categoryId: categoryId,
            id: colorId,
        },
    })

    revalidatePath('/editor/color')
    revalidatePath('/color')

    return true
}

export async function deleteColorToken(colorId: number) {
    await client.execute({
        sql: `DELETE FROM colors WHERE id = (:id)`,
        args: {
            id: colorId,
        },
    })

    revalidatePath('/editor/color')
    revalidatePath('/color')

    return true
}

export async function addColorToken(formData: FormData) {
    const name = formData.get('color-name') as string
    const hexCode = formData.get('hex-code') as string
    const categoryId = formData.get('color-category') as string

    if (!name && !hexCode && !categoryId) return false

    await client.execute({
        sql: `INSERT INTO colors (name, hex_code, color_category_id) VALUES ((:name), (:hexCode), (:categoryId));`,
        args: {
            name: name,
            hexCode: hexCode,
            categoryId: categoryId,
        },
    })

    revalidatePath('/editor/color')
    revalidatePath('/color')

    return true
}

export async function addColorCategory(formData: FormData) {
    const name = formData.get('category-name') as string
    const description = formData.get('category-desc') as string

    if (!name && !description) return false

    await client.execute({
        sql: `INSERT INTO color_categories (name, description) VALUES ((:name), (:description));`,
        args: {
            name: name,
            description: description,
        },
    })

    revalidatePath('/editor/color')
    revalidatePath('/color')

    return true
}

export async function updateColorCategory(
    categoryId: number,
    formData: FormData,
) {
    const name = formData.get('category-name') as string
    const description = formData.get('category-desc') as string

    if (!categoryId) return false
    if (!name && !description) return false

    await client.execute({
        sql: `UPDATE color_categories SET name = (:name), description = (:description) WHERE id = (:id)`,
        args: {
            name: name,
            description: description,
            id: categoryId,
        },
    })

    revalidatePath('/editor/color')
    revalidatePath('/color')

    return true
}

export async function deleteColorCategory(categoryId: number) {
    await client.execute({
        sql: `DELETE FROM color_categories WHERE id = (:id)`,
        args: {
            id: categoryId,
        },
    })

    revalidatePath('/editor/color')
    revalidatePath('/color')

    return true
}
