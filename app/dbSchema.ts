import { z } from 'zod'

export const ColorsTableZodSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        hex_code: z.string(),
        color_category_id: z.number(),
        created_at: z.string(),
        updated_at: z.string(),
    }),
)

export type ColorsTableSchemaType = z.infer<typeof ColorsTableZodSchema>

export const ExtendedColorsZodSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        hex_code: z.string(),
        color_category_id: z.number(),
        color_category_name: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
    }),
)

export type ExtendedColorsSchemaType = z.infer<typeof ExtendedColorsZodSchema>
