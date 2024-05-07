import { z } from 'zod'

export const ExtendedColorsZodSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        hex_code: z.string(),
        color_category_id: z.number(),
        color_category_name: z.string(),
        color_category_description: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
    }),
)

export const ColorCategoriesZodSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
    }),
)

export type ColorCategoriesTableSchemaType = z.infer<
    typeof ColorCategoriesZodSchema
>

export const EnabledSectionsZodSchema = z.array(
    z.object({
        section_name: z.string(),
    }),
)

export const OrganizationDesignSystemsZodSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().nullable(),
        organization_id: z.number(),
        created_at: z.string(),
        updated_at: z.string(),
    }),
)

export const OrganizationInfoZodSchema = z.object({
    name: z.string(),
})

export const OrganizationDesignSystemInfoZodSchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
})
